const reply = (status, body) => Response.json(body, {status, headers: {'Cache-Control': 'no-store'}});

export async function onRequest({request, env}) {
  if (request.method !== 'POST') return reply(405, {error: 'method'});
  if (request.headers.get('Origin') !== new URL(request.url).origin) return reply(403, {error: 'origin'});
  if (!request.headers.get('Content-Type')?.startsWith('application/json')) return reply(415, {error: 'type'});
  let data;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, {error: 'invalid'});
    const chunks = []; let length = 0;
    while (true) {
      const {done, value} = await reader.read();
      if (done) break;
      length += value.length;
      if (length > 16384) { await reader.cancel(); return reply(413, {error: 'size'}); }
      chunks.push(value);
    }
    data = JSON.parse(await new Blob(chunks).text());
  } catch { return reply(400, {error: 'invalid'}); }
  if (!data || typeof data !== 'object') return reply(400, {error: 'invalid'});
  if (data.website) return reply(400, {error: 'invalid'});
  const {id, nickname, email, message} = data;
  if (typeof id !== 'string' || !/^[0-9a-f-]{36}$/i.test(id) ||
      typeof nickname !== 'string' || !nickname.trim() || nickname.trim().length > 24 ||
      typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
      typeof message !== 'string' || message.length > 2000) return reply(400, {error: 'invalid'});
  if (!env.FEEDBACK_DB) return reply(503, {error: 'unavailable'});
  try {
    const previous = await env.FEEDBACK_DB.prepare('SELECT id FROM reservations WHERE id = ?').bind(id).first();
    if (previous) return reply(200, {ok: true});
    const recent = await env.FEEDBACK_DB.prepare("SELECT id FROM reservations WHERE email = ? AND created_at > datetime('now', '-1 minute') LIMIT 1").bind(email.toLowerCase()).first();
    if (recent) return reply(429, {error: 'rate'});
    await env.FEEDBACK_DB.prepare('INSERT INTO reservations (id, nickname, email, message, language) VALUES (?, ?, ?, ?, ?) ON CONFLICT(id) DO NOTHING')
      .bind(id, nickname.trim(), email.toLowerCase(), message.trim(), data.language === 'en' ? 'en' : 'zh').run();
    return reply(201, {ok: true});
  } catch { return reply(503, {error: 'unavailable'}); }
}
