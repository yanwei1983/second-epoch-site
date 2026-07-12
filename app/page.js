'use client';

import { useEffect, useState } from 'react';

const factions = [
  {id:'iron',name:'铁血军团',en:'IRON BLOOD LEGION',role:'秩序 / 防御 / 正规军',desc:'以军事秩序维持边境稳定。重装甲、严密编队与持续火力构成他们的战争语言。',ship:'破晓级护卫舰',strength:'装甲防御 92',weak:'机动效率 48'},
  {id:'canaan',name:'自由者迦南',en:'FREE CANAAN',role:'探索 / 贸易 / 反压迫',desc:'由旅行者、探索者和自由贸易者组成。他们不断越过已知航线，把情报与货物送往文明边缘。',ship:'旅星级护卫舰',strength:'跃迁机动 91',weak:'正面防御 52'},
  {id:'nova',name:'超新星科技集团',en:'SUPERNOVA GROUP',role:'人工智能 / 生物科技',desc:'掌握机器人、人工智能与生物科技的巨型企业集团，用技术优势重新定义战场效率。',ship:'量子锋级护卫舰',strength:'电子科技 96',weak:'维护成本 78'},
  {id:'trade',name:'银河商贸同盟',en:'GALACTIC TRADE ALLIANCE',role:'航线 / 资源 / 经济',desc:'控制关键贸易航线与资源星球。对他们而言，价格波动和物流封锁同样是战争手段。',ship:'金舵级护卫舰',strength:'物流网络 94',weak:'独立作战 46'},
  {id:'light',name:'圣光教廷',en:'HOLY LIGHT CHURCH',role:'信仰 / 医疗 / 社会影响',desc:'以信仰维系庞大的社会网络，医疗舰队与宗教影响力让他们能在战后迅速重建秩序。',ship:'神选级护卫舰',strength:'支援恢复 90',weak:'战术弹性 55'},
  {id:'zero',name:'零界骑士',en:'ZERO REALM KNIGHTS',role:'黑客 / 网络战 / 匿名正义',desc:'游走在数据边界的匿名组织。他们入侵通讯、篡改情报，并让敌人的武器在开火前失去目标。',ship:'断序级护卫舰',strength:'网络干扰 98',weak:'舰体强度 44'}
];

const gallery = [
  ...factions.map(f=>({src:`/factions/${f.id}.png`,title:f.name,meta:f.role})),
  {src:'/factions/blackstar.png',title:'黑星海盗团',meta:'袭击 / 走私 / 黑市'},
  {src:'/factions/zealot.png',title:'光明狂热者',meta:'极端信仰 / 恐怖活动'}
];

const nav = [
  ['home','纪元'],['demo','实录'],['lore','世界'],['factions','势力'],['dynamic','动态世界'],['gallery','美术'],['community','社区']
];

export default function Home(){
  const [active,setActive]=useState('home');
  const [faction,setFaction]=useState(0);
  const [art,setArt]=useState(null);
  const [community,setCommunity]=useState(0);
  const [menu,setMenu]=useState(false);
  const selected=factions[faction];

  useEffect(()=>{
    const root=document.documentElement;
    const pages=[...document.querySelectorAll('[data-scroll-page]')];
    let raf=0;
    const update=()=>{
      let best='home',distance=Infinity;
      pages.forEach(el=>{
        const r=el.getBoundingClientRect();
        const progress=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));
        const visible=Math.max(0,1-Math.abs(r.top+r.height/2-innerHeight/2)/(innerHeight*.9));
        el.style.setProperty('--p',progress.toFixed(4));
        el.style.setProperty('--v',visible.toFixed(4));
        if(el.dataset.main){const d=Math.abs(r.top+r.height/2-innerHeight/2);if(d<distance){distance=d;best=el.id}}
      });
      root.style.setProperty('--route',(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)).toFixed(4));
      setActive(x=>x===best?x:best);raf=0;
    };
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
    return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(raf)};
  },[]);

  return <main className="epoch-site">
    <div className="global-space" aria-hidden="true"><div className="stars"/><div className="route-line"/><div className="route-fill"/></div>
    <header className="epoch-nav">
      <a href="#home" className="epoch-brand"><span>II</span><b>第二纪元<small>THE SECOND EPOCH</small></b></a>
      <nav className={menu?'open':''}>{nav.map(([id,label])=><a key={id} className={active===id?'active':''} href={`#${id}`}>{label}</a>)}</nav>
      <span className="world-online"><i/>世界在线</span><a className="nav-enter" href="#community">进入宇宙</a>
      <button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="菜单"><i className="fa-solid fa-bars"/></button>
    </header>

    <section id="home" data-main data-scroll-page className="main-page hero-page"><div className="page-sticky">
      <div className="hero-ship"/><div className="hero-copy"><span className="eyebrow">开放宇宙大规模星舰战争 MMO</span><h1>第二纪元</h1><p>玩家行为会改变世界、并持续产生机遇与风险的开放宇宙星舰战争 MMO。</p><div className="hero-tags"><span>单服开放宇宙</span><span>万人星舰战争</span><span>动态世界经济</span></div><a href="#manifesto" className="primary-action">启动航行 <i className="fa-solid fa-arrow-down"/></a></div>
      <div className="hero-telemetry"><span>SECTOR / NEW ERA</span><b>世界持续运行中</b><small>舰长身份等待同步</small></div>
    </div></section>

    <section id="manifesto" data-scroll-page className="transition-page manifesto-page"><div><span>THE WORLD IS ALREADY MOVING</span><h2>这不是等待英雄抵达的舞台。</h2><p>1000+ 星系、约 700 座空间站与跨越高安、低安、零安的航线，正在同一个世界里持续运行。</p><p>你的战斗、采矿、贸易、护航与袭击，都会成为下一次区域变化的原因。</p></div></section>

    <section id="demo" data-main data-scroll-page className="main-page demo-page"><div className="page-sticky"><div className="demo-copy"><span className="eyebrow">IN-ENGINE RECORD</span><h2>一场战争，<br/>从一次锁定开始。</h2><p>固定 2.5D 视角保持高速、清晰与低眩晕体验，从小队行动延伸到万人级星舰战争。</p></div><div className="demo-window"><div className="demo-shot"/><div className="demo-hud"><span>COMBAT RECORD / 04:18</span><button aria-label="播放演示"><i className="fa-solid fa-play"/></button><b>舰队交战实录</b></div></div></div></section>

    <section data-scroll-page className="transition-page dust-page"><div className="dust">{Array.from({length:48},(_,i)=><i key={i} style={{'--i':i}}/>)}</div><div><span>STAR DUST / 02</span><b>穿越旧宇宙的余烬</b></div></section>

    <section id="lore" data-main data-scroll-page className="main-page lore-page"><div className="page-sticky"><div className="lore-art"/><div className="lore-copy"><span className="eyebrow">FROM EARTH TO NEW ERA</span><h2>文明毁灭过一次。<br/>这一次，历史由玩家书写。</h2><div className="timeline"><span><b>2050—2600</b>月球基地、火星殖民与星际文明</span><span><b>3000—3800</b>虫族战争、AI 冲突与黑暗时代</span><span><b>新纪元 1 年</b>人类穿越虫洞，建立第一座殖民地</span><span><b>新纪元 240 年</b>虫群与机械势力扩散，星海再次失衡</span></div></div></div></section>

    <section data-scroll-page className="transition-page quote-page"><div><span>NEW EARTH ARCHIVE / 3800</span><blockquote>“人类早已摆脱重力的束缚，<br/>却依然走不出战争恶魔的阴影。”</blockquote><p>旧宇宙最后一批文明档案</p></div></section>

    <section id="factions" data-main data-scroll-page className="main-page faction-page"><div className="page-sticky">
      <div className="faction-art" style={{backgroundImage:`linear-gradient(90deg,rgba(3,6,8,.96) 0%,rgba(3,6,8,.46) 48%,rgba(3,6,8,.08)),url('/factions/${selected.id}.png')`}}/>
      <div className="faction-tabs">{factions.map((f,i)=><button key={f.id} className={faction===i?'active':''} onClick={()=>setFaction(i)}><img src={`/badges/${f.id}.png`} alt=""/><span>{String(i+1).padStart(2,'0')}</span>{f.name}</button>)}</div>
      <div className="faction-copy"><span className="eyebrow">EIGHT POWERS / MAJOR FACTION {String(faction+1).padStart(2,'0')}</span><h2>{selected.name}</h2><small>{selected.en}</small><p>{selected.desc}</p><div className="faction-stats"><span>{selected.strength}</span><span>{selected.weak}</span></div></div>
      <div className="hostile-strip"><span>边境威胁</span><b>黑星海盗团</b><b>光明狂热者</b></div>
    </div></section>

    <section data-scroll-page className="transition-page ship-page"><div className="ship-blueprint"><img src={`/ships/${selected.id}.png`} alt={selected.ship}/><div className="scan-line"/></div><div className="ship-copy"><span>{selected.en} / STANDARD ISSUE</span><h2>{selected.ship}</h2><p>阵营选择已同步至舰船档案。滚动离开时，舰体将进入装配航线。</p><div><b>舰体许可</b><em>AUTHORIZED</em></div></div></section>

    <section id="dynamic" data-main data-scroll-page className="main-page dynamic-page"><div className="page-sticky"><div className="dynamic-copy"><span className="eyebrow">PERSISTENT WORLD SIMULATION</span><h2>世界不会等待<br/>玩家上线。</h2><p>玩家行为改变空间站状态，推动星系局势、区域变化与势力决策，最终形成新的风险与机遇窗口。</p><div className="change-list"><span>价格与订单</span><span>护航与运输需求</span><span>巡逻强度</span><span>冲突与繁荣</span><span>限时资源和任务</span></div></div><div className="dynamic-radar"><i/><i/><i/><b>1000+<small>SCENES</small></b>{['经济','治安','工业','情报','政治'].map((x,i)=><span key={x} style={{'--n':i}}>{x}</span>)}</div></div></section>

    <section data-scroll-page className="transition-page loop-page"><div className="loop-title"><span>SIMULATION TICK / LIVE</span><h2>每一次变化都进入下一次循环</h2></div><div className="world-loop">{[['阵营','1h—1d'],['势力','10m—1h'],['空域','5—30m'],['场景','1—5m'],['空间站','10s—1m']].map(([a,b],i)=><div key={a} style={{'--n':i}}><span>{a}</span><small>{b}</small></div>)}<b>玩家行为<br/><small>INPUT</small></b></div><div className="loop-output"><span>市场</span><span>舰队生成</span><span>巡逻</span><span>任务池</span><span>传闻</span></div></section>

    <section id="gallery" data-main data-scroll-page className="main-page gallery-page"><div className="page-sticky"><div className="gallery-title"><span className="eyebrow">ART OF THE SECOND EPOCH</span><h2>势力视觉档案</h2><p>八个文明与组织，以完全不同的方式争夺同一片星海。</p></div><div className="gallery-grid">{gallery.map((item,i)=><button key={item.src} onClick={()=>setArt(i)}><img src={item.src} alt={item.title}/><span><b>{item.title}</b><small>{item.meta}</small></span></button>)}</div></div></section>

    <section data-scroll-page className="transition-page gate-page"><div className="gate-core"><i/><i/><i/></div><div><span>GATE SYNCHRONIZED</span><h2>下一个跃迁点，<br/>由你选择。</h2></div></section>

    <section id="community" data-main data-scroll-page className="main-page community-page"><div className="page-sticky"><div className="community-title"><span className="eyebrow">JOIN THE FLEET</span><h2>加入星际社区</h2><p>在世界开放前，先找到与你并肩航行的人。</p></div><div className="community-panel"><div className="community-tabs">{['Discord','官方论坛','社交媒体'].map((x,i)=><button className={community===i?'active':''} onClick={()=>setCommunity(i)} key={x}>{x}</button>)}</div><div className="community-content"><span>{['FLEET COMMS','CAPTAIN FORUM','STAR NETWORK'][community]}</span><h3>{['加入实时舰队频道','参与世界设定与测试讨论','追踪开发日志和星际新闻'][community]}</h3><a href="#home">建立连接 <i className="fa-solid fa-arrow-right"/></a></div></div><form className="subscribe" onSubmit={e=>e.preventDefault()}><label htmlFor="email">测试资格与开发通讯</label><div><input id="email" type="email" placeholder="舰长邮箱" required/><button type="submit">申请订阅</button></div><small>订阅制为核心，免费试玩为进入这个世界的第一扇门。</small></form></div></section>

    {art!==null&&<div className="art-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={()=>setArt(null)} aria-label="关闭"><i className="fa-solid fa-xmark"/></button><button className="modal-prev" onClick={()=>setArt((art-1+gallery.length)%gallery.length)} aria-label="上一张"><i className="fa-solid fa-arrow-left"/></button><figure><img src={gallery[art].src} alt={gallery[art].title}/><figcaption><b>{gallery[art].title}</b><span>{gallery[art].meta}</span><small>{String(art+1).padStart(2,'0')} / {String(gallery.length).padStart(2,'0')}</small></figcaption></figure><button className="modal-next" onClick={()=>setArt((art+1)%gallery.length)} aria-label="下一张"><i className="fa-solid fa-arrow-right"/></button></div>}
    <footer><span>© 2026 第二纪元</span><span>THE SECOND EPOCH</span><a href="#home">返回轨道</a></footer>
  </main>;
}
