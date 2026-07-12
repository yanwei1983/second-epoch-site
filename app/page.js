'use client';

import { useEffect, useState } from 'react';

const factions = [
  { id:'tianque', no:'01', name:'天阙联合体', motto:'秩序，是人类最后的护盾', desc:'由旧地球轨道城邦重组的技术官僚联盟。他们控制稳定跃迁航路，以精密的磁轨武器和坚固的阵列舰队维持核心星域秩序。', color:'#e4f4ff', stats:['磁轨火力','阵列防御','跃迁管制'] },
  { id:'chiyan', no:'02', name:'赤焰公约', motto:'自由不需要许可', desc:'矿业殖民地与流亡船团组成的松散同盟。改装、超载与近距离突袭是他们的生存哲学，任何舰体都能成为一件危险武器。', color:'#f4a261', stats:['高速突击','舰体改装','资源掠夺'] },
  { id:'huiguang', no:'03', name:'回光圣庭', motto:'倾听群星留下的回声', desc:'围绕先驱遗迹建立的神秘共同体。他们将意识映射技术视为神谕，擅长无人机集群、信号干扰与远程战场塑形。', color:'#8bd3c7', stats:['无人集群','电子战','遗迹科技'] }
];

const ships = [
  {class:'巡航舰',name:'归墟级',role:'远征 / 火力支援',mass:'18,400 t',crew:'312',range:'32.6 AU',copy:'为穿越断层风暴而生。三组折叠式磁轨炮列与自愈装甲，使归墟级能够在没有补给的深空持续作战。'},
  {class:'截击舰',name:'烬羽级',role:'追猎 / 跃迁拦截',mass:'1,280 t',crew:'24',range:'12.4 AU',copy:'以反应堆安全裕度换取惊人的加速度。烬羽级会在目标完成跃迁前撕开空间，锁死整支舰队的退路。'},
  {class:'母舰',name:'观星者级',role:'指挥 / 无人机平台',mass:'1.2 Mt',crew:'4,800',range:'87.0 AU',copy:'一座可移动的星港，也是联盟意志的投影。它能同步指挥数百架无人战斗单元并重构局部通讯网络。'}
];

function IconButton({icon,label,onClick}) { return <button className="icon-btn" aria-label={label} title={label} onClick={onClick}><i className={`fa-solid ${icon}`}/></button> }

export default function Home() {
  const [faction,setFaction]=useState(0); const [ship,setShip]=useState(0); const [menu,setMenu]=useState(false);
  useEffect(()=>{
    const root=document.documentElement;
    const reveal=new IntersectionObserver(entries=>entries.forEach(entry=>entry.isIntersecting&&entry.target.classList.add('is-visible')),{threshold:.14});
    document.querySelectorAll('.band, .section-head, .ship-stage, .career-grid').forEach(el=>reveal.observe(el));
    let raf=0;
    const update=()=>{const max=document.documentElement.scrollHeight-innerHeight;root.style.setProperty('--scroll',max>0?scrollY/max:0);root.style.setProperty('--drift',`${Math.min(scrollY*.16,140)}px`);raf=0};
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    const onMove=e=>{root.style.setProperty('--mx',`${(e.clientX/innerWidth-.5)*18}px`);root.style.setProperty('--my',`${(e.clientY/innerHeight-.5)*12}px`)};
    update();addEventListener('scroll',onScroll,{passive:true});addEventListener('pointermove',onMove,{passive:true});
    return()=>{reveal.disconnect();removeEventListener('scroll',onScroll);removeEventListener('pointermove',onMove);cancelAnimationFrame(raf)};
  },[]);
  return <main>
    <div className="scroll-progress" aria-hidden="true"/><div className="grain" aria-hidden="true"/>
    <header className="topbar">
      <a className="brand" href="#top" aria-label="断层纪元首页"><span className="brand-mark">F</span><span>断层纪元<small>FRACTURE ERA</small></span></a>
      <nav className={menu?'open':''}><a href="#world">宇宙</a><a href="#factions">势力</a><a href="#ships">舰船</a><a href="#careers">生涯</a></nav>
      <div className="actions"><a className="login" href="#careers">舰长登录</a><a className="primary" href="#careers">开始征途 <i className="fa-solid fa-arrow-right"/></a><IconButton icon="fa-bars" label="导航菜单" onClick={()=>setMenu(!menu)}/></div>
    </header>

    <section id="top" className="hero"><div className="hero-stars" aria-hidden="true">{Array.from({length:18},(_,i)=><i key={i}/>)}</div><div className="hero-scan" aria-hidden="true"/>
      <div className="hero-copy"><p className="eyebrow">大型多人在线星海沙盒</p><h1>你不是英雄。<br/><em>你是变量。</em></h1><p className="lead">每一艘舰船、每一次交易、每一场战争，都由真实玩家推动。在 12,400 个恒星系中，建立你的秩序。</p><div className="hero-cta"><a className="primary large" href="#world">探索宇宙 <i className="fa-solid fa-chevron-down"/></a><button className="watch"><i className="fa-solid fa-play"/> 观看世界预告</button></div></div>
      <div className="hero-status"><span className="pulse"/> 服务器在线 <b>42,817</b> 名舰长</div>
      <div className="scroll-note">SCROLL TO DISCOVER <span/></div>
    </section>

    <section id="world" className="world band">
      <div className="section-head"><div><p className="eyebrow">THE KNOWN EXPANSE / 已知疆域</p><h2>破碎之后，<br/>群星成为疆场</h2></div><p>公元 2479 年，“断层”撕裂了人类的跃迁网络。孤立百年的殖民地重新相遇，却早已发展出截然不同的文明。贸易、信仰和领土，让每一条航线都充满代价。</p></div>
      <div className="map-wrap"><div className="orbit o1"/><div className="orbit o2"/><div className="map-core"><b>断层核心</b><small>UNMAPPED</small></div>{[['天阙核心区','26.4 / 91.7','n1'],['赤焰边境','63.2 / 48.1','n2'],['回光圣域','78.8 / 20.4','n3'],['自由港群','41.9 / 66.0','n4']].map(n=><button className={`node ${n[2]}`} key={n[0]} title={n[0]}><span/><b>{n[0]}</b><small>{n[1]}</small></button>)}</div>
      <div className="world-stats"><div><strong>12,400</strong><span>可探索恒星系</span></div><div><strong>1</strong><span>持续演化的世界</span></div><div><strong>24 / 7</strong><span>永不停服的战争</span></div></div>
    </section>

    <section id="factions" className="factions band">
      <div className="section-label">03 / 势力档案</div><div className="faction-layout"><aside>{factions.map((f,i)=><button className={faction===i?'active':''} onClick={()=>setFaction(i)} key={f.id}><span>{f.no}</span>{f.name}</button>)}</aside><article key={factions[faction].id} className="faction-panel" style={{'--accent':factions[faction].color}}><p className="eyebrow">FACTION DOSSIER</p><h2>{factions[faction].name}</h2><blockquote>“{factions[faction].motto}”</blockquote><p>{factions[faction].desc}</p><div className="tags">{factions[faction].stats.map(s=><span key={s}>{s}</span>)}</div><a href="#ships">查看舰队编制 <i className="fa-solid fa-arrow-right"/></a></article><div key={`${factions[faction].id}-sigil`} className="sigil"><span>{factions[faction].no}</span><i className="fa-solid fa-satellite"/></div></div>
    </section>

    <section id="ships" className="ships band">
      <div className="section-head"><div><p className="eyebrow">VESSEL ARCHIVE / 舰船档案</p><h2>每一艘船，<br/>都是你的答案</h2></div><div className="ship-nav"><IconButton icon="fa-arrow-left" label="上一艘" onClick={()=>setShip((ship+ships.length-1)%ships.length)}/><span>{String(ship+1).padStart(2,'0')} / 03</span><IconButton icon="fa-arrow-right" label="下一艘" onClick={()=>setShip((ship+1)%ships.length)}/></div></div>
      <div className="ship-stage"><div key={`${ship}-visual`} className="ship-visual"><div className="scanner"/><div className="scan-line"/><div className="ship-shape"><span/><span/><span/></div><b>HULL // {ships[ship].name}</b></div><article key={`${ship}-copy`} className="ship-copy"><p className="eyebrow">{ships[ship].class}</p><h3>{ships[ship].name}</h3><p>{ships[ship].copy}</p><dl><div><dt>战术定位</dt><dd>{ships[ship].role}</dd></div><div><dt>标准质量</dt><dd>{ships[ship].mass}</dd></div><div><dt>标准编制</dt><dd>{ships[ship].crew}</dd></div><div><dt>跃迁航程</dt><dd>{ships[ship].range}</dd></div></dl><a className="text-link" href="#careers">完整舰船数据库 <i className="fa-solid fa-arrow-right"/></a></article></div>
    </section>

    <section id="careers" className="careers band"><div className="career-copy"><p className="eyebrow">CHOOSE YOUR VECTOR / 定义方向</p><h2>没有预设的命运</h2><p>成为舰队指挥官、星际商人、遗迹猎手，或让整个星域记住你的海盗信号。技能没有职业限制，世界不会替你做选择。</p><a className="primary large" href="#top">创建舰长 <i className="fa-solid fa-arrow-right"/></a></div><div className="career-grid">{[['fa-crosshairs','猎手','追踪悬赏，截断航路'],['fa-chart-line','商人','操纵市场，建立物流帝国'],['fa-compass','探索者','穿越断层，唤醒先驱遗迹'],['fa-people-group','统帅','集结军团，改写星域版图']].map(x=><div key={x[1]}><i className={`fa-solid ${x[0]}`}/><b>{x[1]}</b><span>{x[2]}</span></div>)}</div></section>
    <footer><div className="brand"><span className="brand-mark">F</span><span>断层纪元<small>FRACTURE ERA</small></span></div><p>这是一个原创科幻 MMO 世界观概念站。所有文明、舰船与设定均为虚构。</p><div><a href="#">世界观</a><a href="#">支持中心</a><a href="#">社群</a></div><small>© 2026 FRACTURE ERA</small></footer>
  </main>
}
