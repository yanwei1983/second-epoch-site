'use client';

import { useEffect, useState } from 'react';
import { localizeNode, pageMeta } from './i18n';

const factions = [
  {id:'iron',name:'铁血军团',en:'IRON BLOOD LEGION',role:'秩序 / 防御 / 正规军',desc:'以军事秩序维持边境稳定。重装甲、严密编队与持续火力构成他们的战争语言。',ship:'破晓级护卫舰',shipDesc:'铁血军团·破晓级护卫舰（Dawn-Class Frigate）：机动性极强，搭载中/轻型武器与基础电子战模块，适合侦察、巡逻和快速拦截。采用轻量合金装甲，兼顾防护与灵活度。',strength:'装甲防御 92',weak:'机动效率 48'},
  {id:'canaan',name:'自由者迦南',en:'FREE CANAAN',role:'探索 / 贸易 / 反压迫',desc:'由旅行者、探索者和自由贸易者组成。他们不断越过已知航线，把情报与货物送往文明边缘。',ship:'旅星级护卫舰',shipDesc:'由自由者迦南打造的小型护卫舰，机动性优秀，适合侦察、护航和快速探索，体现自由者迦南的机动作战理念。',strength:'跃迁机动 91',weak:'正面防御 52'},
  {id:'nova',name:'超新星科技集团',en:'SUPERNOVA GROUP',role:'人工智能 / 生物科技',desc:'掌握机器人、人工智能与生物科技的巨型企业集团，用技术优势重新定义战场效率。',ship:'量子锋级护卫舰',shipDesc:'由超新星科技集团开发的实验型护卫舰，采用量子扰动引擎实现高速突进，搭载智能化武器系统。',strength:'电子科技 96',weak:'维护成本 78'},
  {id:'trade',name:'银河商贸同盟',en:'GALACTIC TRADE ALLIANCE',role:'航线 / 资源 / 经济',desc:'控制关键贸易航线与资源星球。对他们而言，价格波动和物流封锁同样是战争手段。',ship:'金舵级护卫舰',shipDesc:'由银河商贸同盟统一制造的基础护卫舰，强调雷达侦测与快速拦截，主要用于护航商队与清理小规模威胁。',strength:'物流网络 94',weak:'独立作战 46'},
  {id:'light',name:'圣光教廷',en:'HOLY LIGHT CHURCH',role:'信仰 / 医疗 / 社会影响',desc:'以信仰维系庞大的社会网络，医疗舰队与宗教影响力让他们能在战后迅速重建秩序。',ship:'神选级护卫舰',shipDesc:'圣光教廷·神选级护卫舰（神选-Morninglight Class Frigate）：光束炮、医疗救援，结合最新星际科技，适合多种复杂战场任务。',strength:'支援恢复 90',weak:'战术弹性 55'},
  {id:'zero',name:'零界骑士',en:'ZERO REALM KNIGHTS',role:'黑客 / 网络战 / 匿名正义',desc:'游走在数据边界的匿名组织。他们入侵通讯、篡改情报，并让敌人的武器在开火前失去目标。',ship:'断序级护卫舰',shipDesc:'由零界骑士打造的小型舰，以强大电子对抗和黑客入侵模块著称，可迅速瘫痪敌方通讯并突袭要害。',strength:'网络干扰 98',weak:'舰体强度 44'}
];

const gallery = [
  {src:'/gallery/concept-orbital-city.png',title:'晨昏轨道城',meta:'殖民地概念 / 近地轨道'},
  {src:'/gallery/concept-stargate.png',title:'寂静星门',meta:'星际设施 / 跃迁航道'},
  {src:'/gallery/concept-mining-belt.png',title:'环带矿区',meta:'工业场景 / 小行星带'},
  {src:'/gallery/concept-archive.png',title:'深空档案库',meta:'文明遗迹 / 数据圣殿'},
  {src:'/gallery/concept-colony.png',title:'赤昼殖民地',meta:'地表聚落 / 边境世界'},
  {src:'/gallery/concept-nebula.png',title:'蓝冠异常区',meta:'未知空间 / 星云风暴'},
  {src:'/gallery/concept-market.png',title:'无昼贸易港',meta:'空间站内部 / 商业枢纽'},
  {src:'/gallery/concept-ruins.png',title:'失落环世界',meta:'远古工程 / 世界遗迹'}
];

const nav = [
  ['home','纪元'],['demo','实录'],['lore','世界'],['factions','势力'],['dynamic','动态世界'],['gallery','美术'],['community','社区']
];

function SiteFooter({lang}){
  const columns=[['游戏','关于游戏','派系介绍','玩法特色','新闻资讯'],['社区','官方论坛','Discord','Steam 社区','玩家手册'],['支持','帮助中心','系统要求','联系我们','反馈问题'],['法律','隐私政策','用户协议','Cookie 政策']];
  const footer=<footer className="site-footer"><div className="footer-brand"><b><i className="fa-solid fa-ring"/> 第二纪元</b><p>征服银河<br/>从此刻开始</p></div>{columns.map(([title,...items])=><div className="footer-column" key={title}><b>{title}</b>{items.map(x=><a href="#home" key={x}>{x}</a>)}</div>)}<div className="footer-bottom"><span>© 2026 第二纪元. 保留所有权利。</span><div><a href="#home" aria-label="Steam"><i className="fa-brands fa-steam"/></a><a href="#home" aria-label="Discord"><i className="fa-brands fa-discord"/></a><a href="#home" aria-label="视频频道"><i className="fa-brands fa-youtube"/></a><a href="#home" aria-label="X"><i className="fa-brands fa-x-twitter"/></a></div><span>Second Epoch | PolarDog Studio</span></div></footer>;
  return localizeNode(footer,lang);
}

export default function Home(){
  const [active,setActive]=useState('home');
  const [faction,setFaction]=useState(0);
  const [ship,setShip]=useState(0);
  const [art,setArt]=useState(null);
  const [joinOpen,setJoinOpen]=useState(false);
  const [joined,setJoined]=useState(false);
  const [menu,setMenu]=useState(false);
  const [lang,setLang]=useState('zh');
  const [languageReady,setLanguageReady]=useState(false);
  const selected=factions[faction];
  const selectedShip=factions[ship];

  useEffect(()=>{
    const saved=localStorage.getItem('second-epoch-language');
    if(saved==='zh'||saved==='en')setLang(saved);
    setLanguageReady(true);
  },[]);

  useEffect(()=>{
    if(!languageReady)return;
    localStorage.setItem('second-epoch-language',lang);
    document.documentElement.lang=lang==='en'?'en':'zh-CN';
  },[lang,languageReady]);

  useEffect(()=>{
    const root=document.documentElement;
    const pages=[...document.querySelectorAll('[data-scroll-page]')];
    let raf=0;
    const update=()=>{
      let best='home',distance=Infinity;
      pages.forEach(el=>{
        const r=el.getBoundingClientRect();
        const progress=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight+r.height)));
        const enter=Math.max(0,Math.min(1,(innerHeight-r.top)/(innerHeight*.45)));
        const exit=Math.max(0,Math.min(1,r.bottom/(innerHeight*.45)));
        const visible=el.dataset.main?Math.min(enter,exit):Math.max(0,1-Math.abs(r.top+r.height/2-innerHeight/2)/(innerHeight*.5));
        el.style.setProperty('--p',progress.toFixed(4));
        el.style.setProperty('--v',visible.toFixed(4));
        if(!el.dataset.main){
          const slotTop=scrollY+r.top;
          const zoomRaw=Math.max(0,Math.min(1,(scrollY-(slotTop-innerHeight*.6))/innerHeight));
          const zoom=zoomRaw*zoomRaw*(3-2*zoomRaw);
          const fade=Math.max(0,Math.min(1,1-(scrollY-(slotTop+r.height))/(innerHeight*.6)));
          const mobile=innerWidth<1024;
          const baseX=mobile?0:64,baseY=mobile?0:-112,baseScale=mobile?1.15:1.21;
          const targetX=mobile?0:-innerWidth/4,targetY=mobile?-innerHeight/4:0;
          el.style.setProperty('--visual-scale',(baseScale+(3-baseScale)*zoom).toFixed(4));
          el.style.setProperty('--visual-x',`${(baseX+(targetX-baseX)*zoom).toFixed(2)}px`);
          el.style.setProperty('--visual-y',`${(baseY+(targetY-baseY)*zoom).toFixed(2)}px`);
          el.style.setProperty('--visual-opacity',fade.toFixed(4));
          el.dataset.visible=visible>.05?'true':'false';
        }
        if(el.dataset.main){const d=Math.abs(r.top+r.height/2-innerHeight/2);if(d<distance){distance=d;best=el.id}}
      });
      root.style.setProperty('--route',(scrollY/Math.max(1,document.documentElement.scrollHeight-innerHeight)).toFixed(4));
      setActive(x=>x===best?x:best);raf=0;
    };
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};
    update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
    return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);cancelAnimationFrame(raf)};
  },[]);

  const content=<main className="epoch-site">
    <div className="global-space" aria-hidden="true"><div className="stars"/></div>
    <aside className="route-indicator" aria-label="主分页导航"><i className="route-rail"/><b className="route-current"/>{nav.map(([id,label],i)=><a key={id} href={`#${id}`} className={active===id?'active':''} style={{'--n':i}} aria-label={label}><i/><span>{label}</span></a>)}</aside>
    <header className="epoch-nav">
      <a href="#home" className="epoch-brand"><span>II</span><b>第二纪元<small>THE SECOND EPOCH</small></b></a>
      <nav className={menu?'open':''}>{nav.map(([id,label])=><a key={id} className={active===id?'active':''} href={`#${id}`}>{label}</a>)}</nav>
      <label className="language-switch"><i className="fa-solid fa-globe" aria-hidden="true"/><span className="sr-only">选择语言</span><select value={lang} onChange={e=>{setLang(e.target.value);e.currentTarget.blur()}} aria-label="选择语言"><option value="zh">中文</option><option value="en">English</option></select><i className="fa-solid fa-chevron-down" aria-hidden="true"/></label>
      <a className="nav-enter" href="#community">进入宇宙</a>
      <button className="menu-button" onClick={()=>setMenu(!menu)} aria-label="菜单"><i className="fa-solid fa-bars"/></button>
    </header>

    <section id="home" data-main data-scroll-page className="main-page hero-page"><div className="page-sticky">
      <div className="hero-ship"/><div className="hero-copy"><span className="eyebrow">开放宇宙大规模星舰战争 MMO</span><h1>第二纪元</h1><p>玩家行为会改变世界、并持续产生机遇与风险的开放宇宙星舰战争 MMO。</p><div className="hero-tags"><span>单服开放宇宙</span><span>万人星舰战争</span><span>动态世界经济</span></div><button className="primary-action join-now" onClick={()=>{setJoined(false);setJoinOpen(true)}}>JOIN NOW <i className="fa-solid fa-arrow-right"/></button></div>
      <div className="hero-telemetry"><span>SECTOR / NEW ERA</span><b>世界持续运行中</b><small>舰长身份等待同步</small></div>
    </div></section>

    <section id="manifesto" data-scroll-page className="transition-page manifesto-page"><div className="transition-overlay"><div><span>THE WORLD IS ALREADY MOVING</span><h2>这是等待英雄抵达的舞台。</h2><p>1000+ 星系、约 700 座空间站与跨越高安、低安、零安的航线，正在同一个世界里持续运行。</p><p>你的战斗、采矿、贸易、护航与袭击，都会成为下一次区域变化的原因。</p></div></div></section>

    <section id="demo" data-main data-scroll-page className="main-page demo-page"><div className="page-sticky"><div className="demo-copy"><span className="eyebrow">IN-ENGINE RECORD</span><h2>一场战争，<br/>从一次锁定开始。</h2><p>固定 2.5D 视角保持高速、清晰与低眩晕体验，从小队行动延伸到万人级星舰战争。</p></div><div className="demo-window"><div className="demo-shot"/><div className="demo-hud"><span>COMBAT RECORD / 04:18</span><button aria-label="播放演示"><i className="fa-solid fa-play"/></button><b>舰队交战实录</b></div></div></div></section>

    <section data-scroll-page className="transition-page dust-page"><div className="transition-overlay"><div className="dust">{Array.from({length:48},(_,i)=><i key={i} style={{'--i':i}}/>)}</div><div className="dust-label"><span>STAR DUST / 02</span><b>穿越旧宇宙的余烬</b></div></div></section>

    <section id="lore" data-main data-scroll-page className="main-page lore-page"><div className="page-sticky"><div className="lore-art"/><div className="lore-copy"><span className="eyebrow">RIFT ARRIVAL / NEW CALENDAR 227</span><h2>你迟到了<br/>两个世纪。</h2><p className="lore-lead">最后一批“虫洞逃亡计划”船队因量子相位偏移，在时间线上断续抵达。如今，裂隙口 #17 再次波动，而你正是本应在新历 002 年现身的时迟裂隙移民。</p><div className="timeline"><span><b>新历 001 年</b>冷冻移民、自适应人类与未知意识体穿越未知裂隙</span><span><b>跨越百年</b>穿越者因虫洞不稳定而分批、滞后抵达新宇宙</span><span><b>新历 227 年</b>裂隙口 #17 再度波动，小批次穿越者重新浮现</span><span><b>人权协议</b>任何穿越个体不得被视作势力资产，必须自主选择归属</span></div></div></div></section>

    <section data-scroll-page className="transition-page quote-page"><div className="transition-overlay"><div className="quote-rotation"><article><blockquote>这里没有正义，只有胜者与败者。<br/>我们在深空中书写自己的法则。</blockquote><p>— 《星际法典》引言</p></article><article><blockquote>每一艘战舰都是一颗星辰，而你的舰队就是<br/>整片银河。</blockquote><p>— 铁血军团元帅 索尔·瓦伦</p></article><article><blockquote>虚空从不仁慈，但虚空从不说谎。<br/>在黑暗中，真相反而更加清晰。</blockquote><p>— 星空海盗王 红狐</p></article></div></div></section>

    <section id="factions" data-main data-scroll-page className="main-page faction-page"><div className="page-sticky">
      <div className="faction-art" style={{backgroundImage:`linear-gradient(90deg,rgba(3,6,8,.96) 0%,rgba(3,6,8,.46) 48%,rgba(3,6,8,.08)),url('/factions/${selected.id}.png')`}}/>
      <div className="faction-tabs">{factions.map((f,i)=><button key={f.id} className={faction===i?'active':''} onClick={()=>{setFaction(i);setShip(i)}}><img src={`/badges/${f.id}.png`} alt=""/><span>{String(i+1).padStart(2,'0')}</span>{f.name}</button>)}</div>
      <div className="faction-copy"><span className="eyebrow">EIGHT POWERS / MAJOR FACTION {String(faction+1).padStart(2,'0')}</span><h2>{selected.name}</h2><small>{selected.en}</small><p>{selected.desc}</p><div className="faction-stats"><span>{selected.strength}</span><span>{selected.weak}</span></div></div>
      <div className="hostile-strip"><span>边境威胁</span><b>黑星海盗团</b><b>光明狂热者</b></div>
    </div></section>

    <section data-scroll-page className="transition-page ship-page"><div className="transition-overlay"><div className="ship-blueprint"><img key={selectedShip.id} src={`/ships/${selectedShip.id}.png`} alt={selectedShip.ship}/><div className="scan-line"/><span className="ship-counter">{String(ship+1).padStart(2,'0')} / {String(factions.length).padStart(2,'0')}</span></div><div className="ship-copy"><span>{selectedShip.en} / FRIGATE ARCHIVE</span><h2>{selectedShip.ship}</h2><p>{selectedShip.shipDesc}</p><div><b>舰体许可</b><em>AUTHORIZED</em></div><div className="ship-controls"><button onClick={()=>setShip((ship-1+factions.length)%factions.length)} aria-label="上一艘护卫舰"><i className="fa-solid fa-arrow-left"/></button><div>{factions.map((f,i)=><button key={f.id} className={ship===i?'active':''} onClick={()=>setShip(i)} aria-label={`查看${f.ship}`}/>)}</div><button onClick={()=>setShip((ship+1)%factions.length)} aria-label="下一艘护卫舰"><i className="fa-solid fa-arrow-right"/></button></div></div></div></section>

    <section id="dynamic" data-main data-scroll-page className="main-page dynamic-page"><div className="page-sticky"><div className="dynamic-copy"><span className="eyebrow">PERSISTENT WORLD SIMULATION</span><h2>世界不会等待<br/>玩家上线。</h2><p>你看到的价格、任务和安全局势，都来自其他玩家已经做出的选择。观察世界，判断机会，然后让下一次变化因你而发生。</p><div className="world-scale"><span><b>1000+</b>星系</span><span><b>8</b>主要势力</span><span><b>≈700</b>空间站</span></div></div><div className="player-cycle"><b>世界持续运行<small>PLAYER DRIVEN</small></b>{['收集情报','判断机会','选择行动','收益 / 损失','影响世界'].map((x,i)=><div key={x} style={{'--n':i}}><small>0{i+1}</small><span>{x}</span></div>)}<footer><span>星际星闻</span><span>酒吧谣言</span><span>交易与航线变化</span></footer></div></div></section>

    <section data-scroll-page className="transition-page loop-page"><div className="transition-overlay"><div className="simulation-detail"><header><span>WORLD SIMULATION / LIVE</span><h2>玩家行为如何生成新内容</h2></header><div className="simulation-flow"><div className="report-stack"><small>逐级上报</small>{['玩家行为','空间站状态','星系态势','星域冲突'].map(x=><b key={x}>{x}</b>)}</div><div className="decision-core"><span>势力决策</span><small>经济 · 安全 · 工业<br/>情报 · 政治</small></div><div className="dispatch-stack"><small>分级下发</small>{['空间站事件','星系事件','星域事件','军团目标'].map(x=><b key={x}>{x}</b>)}</div></div><div className="route-example"><span>运输线持续受袭</span><i className="fa-solid fa-arrow-right"/><span>库存减少 · 物价上涨</span><i className="fa-solid fa-arrow-right"/><span>护航与拦截任务</span><i className="fa-solid fa-arrow-right"/><b>势力介入 · 冲突升级</b></div><footer><span>任务变化</span><span>物价调整</span><span>巡逻变化</span><span>护航生成</span><span>局部战争</span></footer></div></div></section>

    <section id="gallery" data-main data-scroll-page className="main-page gallery-page"><div className="page-sticky"><div className="gallery-title"><span className="eyebrow">ART OF THE SECOND EPOCH</span><h2>新宇宙美术长廊</h2><p>从轨道都市到失落环世界，记录舰船之外仍在生长的宇宙。</p></div><div className="gallery-grid">{gallery.map((item,i)=><button key={item.src} onClick={()=>setArt(i)}><img src={item.src} alt={item.title}/><span><b>{item.title}</b><small>{item.meta}</small></span></button>)}</div></div></section>

    <section data-scroll-page className="transition-page gate-page"><div className="transition-overlay"><div className="gate-core"><i/><i/><i/></div><div className="gate-copy"><span>GATE SYNCHRONIZED</span><h2>下一个跃迁点，<br/>由你选择。</h2></div></div></section>

    <section id="community" data-main data-scroll-page className="main-page community-page"><div className="page-sticky"><div className="community-title"><span className="eyebrow">JOIN THE FLEET</span><h2>加入星际社区</h2><p>与全球指挥官一起，开启你的银河征程</p><button className="primary-action join-now community-join" onClick={()=>{setJoined(false);setJoinOpen(true)}}>JOIN NOW <i className="fa-solid fa-arrow-right"/></button></div><div className="community-cards">{[
      ['fa-brands fa-steam','STEAM','将《第二纪元》加入愿望单，获取最新游戏资讯','加入愿望单'],
      ['fa-brands fa-discord','DISCORD','加入官方 Discord，与开发者和舰长直接交流','加入 Discord'],
      lang==='en'
        ? ['fa-brands fa-x-twitter','X','Follow Second Epoch on X for development updates and community news','FOLLOW ON X']
        : ['fa-solid fa-book-bookmark','小红书','关注官方小红书，获取中文独家内容与开发动态','关注小红书']
    ].map(([icon,title,copy,action])=><article key={title}><i className={icon}/><h3>{title}</h3><p>{copy}</p><a href="#home">{action} <i className="fa-solid fa-arrow-right"/></a></article>)}</div><SiteFooter lang={lang}/></div></section>

    {art!==null&&<div className="art-modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={()=>setArt(null)} aria-label="关闭"><i className="fa-solid fa-xmark"/></button><button className="modal-prev" onClick={()=>setArt((art-1+gallery.length)%gallery.length)} aria-label="上一张"><i className="fa-solid fa-arrow-left"/></button><figure><img src={gallery[art].src} alt={gallery[art].title}/><figcaption><b>{gallery[art].title}</b><span>{gallery[art].meta}</span><small>{String(art+1).padStart(2,'0')} / {String(gallery.length).padStart(2,'0')}</small></figcaption></figure><button className="modal-next" onClick={()=>setArt((art+1)%gallery.length)} aria-label="下一张"><i className="fa-solid fa-arrow-right"/></button></div>}
    {joinOpen&&<div className="join-dialog-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setJoinOpen(false)}}><section className="join-dialog" role="dialog" aria-modal="true" aria-labelledby="join-title"><button className="join-close" onClick={()=>setJoinOpen(false)} aria-label="关闭预约窗口"><i className="fa-solid fa-xmark"/></button>{joined?<div className="join-success"><i className="fa-solid fa-check"/><span>RESERVATION RECEIVED</span><h2>舰长档案已登记</h2><p>测试资格开放后，我们会通过你的邮箱发送通知。</p><button onClick={()=>setJoinOpen(false)}>完成</button></div>:<form onSubmit={e=>{e.preventDefault();setJoined(true)}}><span>CAPTAIN REGISTRATION / 227</span><h2 id="join-title">立即预约</h2><p>登记你的舰长身份，等待裂隙航线开放。</p><label htmlFor="join-name">昵称</label><input id="join-name" name="nickname" type="text" placeholder="输入你的舰长昵称" required maxLength={24}/><label htmlFor="join-email">Email</label><input id="join-email" name="email" type="email" placeholder="captain@example.com" required/><button type="submit">提交预约 <i className="fa-solid fa-arrow-right"/></button></form>}</section></div>}
  </main>;
  return <>
    <title>{pageMeta[lang].title}</title>
    <meta name="description" content={pageMeta[lang].description}/>
    {localizeNode(content,lang)}
  </>;
}
