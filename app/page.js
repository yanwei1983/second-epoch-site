'use client';

import { Fragment, useEffect, useState } from 'react';

const stages = [
  {id:'orbit',code:'ORBIT 01',label:'轨道外层',title:'一个真实存在的宇宙',copy:'十二个文明在同一片星海中生存。空间站按真实周期生产，运输船沿玩家建立的航线往返，而边境每天都在改变。',data:['12,400 恒星系','42,817 舰长在线','UTC 05:42']},
  {id:'cruise',code:'CRUISE 02',label:'航行区',title:'离开航道，寻找自己的坐标',copy:'扫描未知星系、标记异常信号、穿越断层风暴。每次远航都会留下可交易的情报，也可能开启一条从未存在过的航线。',data:['跃迁航程 32.6 AU','信号强度 78%','前方航路稳定']},
  {id:'industry',code:'INDUSTRY 03',label:'工业区',title:'世界不会等待玩家上线',copy:'矿区持续开采，订单不断成交，工厂按照你的蓝图制造舰体。每一艘战舰背后，都是玩家经营的资源、物流和工业网络。',data:['钛合金 +4.8%','船坞队列 08:16','运输节点 137']},
  {id:'conflict',code:'CONFLICT 04',label:'交战区',title:'战争改变的不是比分，而是疆域',copy:'侦察、拦截、补给和舰队指挥共同决定战局。一次跃迁错误会失去整支舰队，一场胜利可能重画数十个星系的边界。',data:['舰队接触 6.4 AU','火控链路 ONLINE','交战权限开放']},
  {id:'deep',code:'DEEP SPACE 05',label:'深空区',title:'宇宙仍在生成未知',copy:'异常空间没有固定答案。失落信标、先驱遗迹和不断变化的引力场组成持续演化的探索网络，等待第一个抵达的人。',data:['未知信号 03','空间曲率 1.82','数据库无匹配']},
  {id:'gate',code:'GATE 06',label:'星门',title:'现在，选择你的第一艘船',copy:'成为探索者、工业家、舰队指挥官，或让所有航线避开你的名字。这个宇宙已经开始运转，你只需要进入其中。',data:['身份同步完成','舰船许可可用','跃迁窗口已开启']}
];

const artworks=[
  {src:'/journey.png',title:'边境远征舰队',meta:'轨道编队 / 航行概念'},
  {src:'/scene-industry.png',title:'赫利俄斯轨道船坞',meta:'工业区 / 环境概念'},
  {src:'/scene-conflict.png',title:'灰烬带会战',meta:'舰队战争 / 战斗概念'},
  {src:'/scene-deep.png',title:'无名异常体',meta:'深空区 / 探索概念'},
  {src:'/scene-gate.png',title:'第二纪元星门',meta:'跃迁设施 / 关键美术'}
];

export default function Home(){
  const [active,setActive]=useState(0); const [menu,setMenu]=useState(false); const [gallery,setGallery]=useState(null);
  useEffect(()=>{
    const root=document.documentElement,els=[...document.querySelectorAll('.route-stage')],pages=[...document.querySelectorAll('.scroll-page')];
    let raf=0;
    const metrics=el=>{const r=el.getBoundingClientRect(),p=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height))),v=Math.max(0,1-Math.abs(r.top+r.height/2-innerHeight/2)/(innerHeight*.78));return{r,p,v}};
    const update=()=>{const max=document.documentElement.scrollHeight-innerHeight,route=max?scrollY/max:0;root.style.setProperty('--route',route.toFixed(4));let best=0,dist=Infinity;els.forEach((el,i)=>{const {r,p,v}=metrics(el);el.style.setProperty('--stage-p',p.toFixed(4));el.style.setProperty('--stage-v',v.toFixed(4));const d=Math.abs(r.top+r.height/2-innerHeight/2);if(d<dist){dist=d;best=i}});pages.forEach(el=>{const {p,v}=metrics(el);el.style.setProperty('--page-p',p.toFixed(4));el.style.setProperty('--page-v',v.toFixed(4))});setActive(x=>x===best?x:best);raf=0};
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll,{passive:true});return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(raf)};
  },[]);
  const stage=stages[active];
  return <main className="journey">
    <div className="flight-bg" aria-hidden="true">{['orbit','cruise','industry','conflict','deep','gate'].map((name,i)=><div className={`scene-bg bg-${name} ${active===i?'active':''}`} key={name}/>)}<div className="space-dust"/><div className="nav-lane l1"/><div className="nav-lane l2"/><div className="fleet-mark m1"/><div className="fleet-mark m2"/><div className="gate-flare"/></div>
    <div className="hud-frame" aria-hidden="true"><span className="corner tl"/><span className="corner tr"/><span className="corner bl"/><span className="corner br"/></div>
    <div className="route-progress" aria-hidden="true"><span style={{height:`${(active/(stages.length-1))*100}%`}}/></div>
    <aside className="side-chapters" aria-label="航线章节">{stages.map((s,i)=><a className={active===i?'active':''} href={`#${s.id}`} aria-label={s.label} title={s.label} key={s.id}><i/><span>{s.label}</span></a>)}</aside>
    <header className="journey-nav"><a className="archive-link" href="#cruise"><i className="fa-solid fa-diamond"/> 宇宙档案</a><a className="brand" href="#orbit"><span className="brand-mark">F</span><span>断层纪元<small>FRACTURE ERA</small></span></a><nav className={menu?'open':''}>{stages.map((s,i)=><a className={active===i?'active':''} href={`#${s.id}`} key={s.id}>{s.label}</a>)}</nav><div className="nav-status"><span className="pulse"/> 世界在线 <b>42,817</b></div><a className="play-now" href="#gate">进入游戏 <i className="fa-solid fa-arrow-right"/></a><button className="icon-btn menu-toggle" onClick={()=>setMenu(!menu)} aria-label="导航菜单" title="导航菜单"><i className="fa-solid fa-bars"/></button></header>
    <aside className="flight-hud" aria-live="polite"><span>FLIGHT VECTOR</span><b>{stage.code}</b><small>{String(active+1).padStart(2,'0')} / 06</small></aside>
    <aside className="telemetry" aria-hidden="true"><span>VEL</span><b>{Math.round(2840+active*617)} m/s</b><span>RANGE</span><b>{(18.4-active*2.1).toFixed(1)} AU</b><span>SYNC</span><b>98.7%</b></aside>
    {stages.map((s,i)=><Fragment key={s.id}><section id={s.id} className={`route-stage stage-${i}`}>
      <div className="stage-copy"><p className="stage-code">{s.code} / {s.label}</p><h1>{i===0?<>在文明边界之外，<br/>建立你的第二纪元。</>:s.title}</h1>{i===0?<p className="intro">探索、贸易、战争，以及由玩家共同塑造的星际世界。</p>:<p>{s.copy}</p>}<div className="stage-data">{s.data.map(d=><span key={d}>{d}</span>)}</div>{i===0&&<a className="hud-action" href="#cruise">启动航行 <i className="fa-solid fa-arrow-down"/></a>}{i===stages.length-1&&<div className="gate-actions"><a className="hud-action solid" href="#orbit">创建舰长 <i className="fa-solid fa-arrow-right"/></a><button>查看舰船档案</button></div>}</div>
      <div className={`stage-instrument instrument-${i}`} aria-hidden="true"><i/><i/><i/><span>{s.label}</span></div>
    </section>
      {i===0&&<><section className="scroll-page quote-page"><div><span>TRANSMISSION 01</span><blockquote>“这里没有被写好的历史。<br/>只有正在发生的选择。”</blockquote><p>来自边境联合舰队的公开广播</p></div></section><section className="scroll-page particle-page" aria-label="穿越星尘"><div className="particle-curtain">{Array.from({length:38},(_,n)=><i key={n}/>)}</div><strong>正在离开安全航道</strong></section></>}
      {i===1&&<section className="scroll-page reel-page"><div className="reel-screen"><div className="reel-frame rf1"/><div className="reel-frame rf2"/><div className="reel-ui"><span>IN-ENGINE RECORD / 04:18</span><b>舰队航行实录</b><button aria-label="播放舰队航行实录"><i className="fa-solid fa-play"/></button></div></div></section>}
      {i===2&&<section className="scroll-page system-page"><div className="system-copy"><span>WORLD SIMULATION</span><h2>资源、订单与航线<br/>从不停止</h2><p>矿物离开采集器，经由玩家运输，在船坞成为舰体。战争摧毁需求，贸易重建秩序，价格记录着整个宇宙的行为。</p></div><div className="economy-viz" aria-hidden="true"><div className="eco-ring"><i/><i/><i/></div>{['矿物开采','星际物流','舰船制造','市场成交'].map((x,n)=><span style={{'--n':n}} key={x}>{x}<b>{[84,61,73,92][n]}%</b></span>)}</div></section>}
      {i===3&&<section className="scroll-page gallery-page"><div className="gallery-head"><span>ART OF THE FRACTURE</span><h2>构成第二纪元的视觉档案</h2><p>选择画面查看完整美术设定</p></div><div className="art-strip">{artworks.slice(0,3).map((art,n)=><button onClick={()=>setGallery(n)} key={art.src}><img src={art.src} alt={art.title}/><span><b>{art.title}</b><small>{art.meta}</small></span></button>)}</div></section>}
    </Fragment>)}
    {gallery!==null&&<div className="art-modal" role="dialog" aria-modal="true" aria-label="美术设定浏览"><button className="modal-close" onClick={()=>setGallery(null)} aria-label="关闭" title="关闭"><i className="fa-solid fa-xmark"/></button><button className="modal-prev" onClick={()=>setGallery((gallery-1+artworks.length)%artworks.length)} aria-label="上一张" title="上一张"><i className="fa-solid fa-arrow-left"/></button><figure><img src={artworks[gallery].src} alt={artworks[gallery].title}/><figcaption><b>{artworks[gallery].title}</b><span>{artworks[gallery].meta}</span><small>{String(gallery+1).padStart(2,'0')} / {String(artworks.length).padStart(2,'0')}</small></figcaption></figure><button className="modal-next" onClick={()=>setGallery((gallery+1)%artworks.length)} aria-label="下一张" title="下一张"><i className="fa-solid fa-arrow-right"/></button></div>}
    <footer className="journey-footer"><span>© 2026 FRACTURE ERA</span><span>原创科幻 MMO 世界观概念</span><a href="#orbit">返回轨道</a></footer>
  </main>
}
