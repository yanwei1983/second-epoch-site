import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {DatabaseSync} from 'node:sqlite';
const source = readFileSync(new URL('../functions/api/reservations.js', import.meta.url), 'utf8');
const {onRequest} = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const sqlite = new DatabaseSync(':memory:');
sqlite.exec(readFileSync(new URL('../migrations/0001_reservations.sql', import.meta.url), 'utf8'));
const env = {FEEDBACK_DB: {prepare(sql) {return {bind(...params) {return {first:async()=>sqlite.prepare(sql).get(...params),run:async()=>sqlite.prepare(sql).run(...params)};}};}}};
const payload = {id:'f6f64191-5c0b-4a84-b662-2f1aef823587',nickname:'测试舰长',email:'test@example.com',message:'希望加入更多探索玩法',language:'zh'};
const send = (data=payload, options={}) => onRequest({env:options.env??env,request:new Request('https://tse.polardog.cc/api/reservations',{method:'POST',headers:{'Content-Type':'application/json',Origin:options.origin??'https://tse.polardog.cc'},body:JSON.stringify(data)})});
test('saves real fields and makes retry idempotent',async()=>{
  assert.equal((await send()).status,201);
  assert.deepEqual({...sqlite.prepare('SELECT nickname,email,message FROM reservations').get()},{nickname:payload.nickname,email:payload.email,message:payload.message});
  assert.equal((await send()).status,200);
  assert.equal(sqlite.prepare('SELECT count(*) AS n FROM reservations').get().n,1);
});
test('rejects bad fields and excessive payloads',async()=>{
  assert.equal((await send({...payload,email:'bad'})).status,400);
  assert.equal((await send({...payload,message:'x'.repeat(2001)})).status,400);
  assert.equal((await send({...payload,message:'x'.repeat(17000)})).status,413);
});
test('rejects cross-origin submissions and bot trap',async()=>{
  assert.equal((await send(payload,{origin:'https://example.com'})).status,403);
  assert.equal((await send({...payload,website:'spam'})).status,400);
});
test('reports unavailable storage without claiming success',async()=>{
  assert.equal((await send(payload,{env:{}})).status,503);
});
test('limits repeat submissions per email',async()=>{
  assert.equal((await send({...payload,id:'9e48b04b-0e68-48af-a617-67c25f682405'})).status,429);
});
