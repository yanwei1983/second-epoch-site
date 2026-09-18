'use client';

import { useState } from 'react';

function openDetail(event, id) {
  event.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  history.replaceState(null, '', `#${id}`);
  window.scrollTo({ top: window.scrollY + target.getBoundingClientRect().top + target.getBoundingClientRect().height / 2 - window.innerHeight / 2, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}


const crew = [
  {
    "image": "portrait-005",
    "job": [
      "旅行见闻家",
      "Wandering traveler"
    ],
    "story": [
      "走过不少偏远星站，乐于用一杯酒交换途中见闻。",
      "A traveler who has visited many remote stations, happy to trade stories from the journey over a drink."
    ]
  },
  {
    "image": "portrait-088",
    "job": [
      "泊位信号员",
      "Docking signal operator"
    ],
    "story": [
      "操作泊位引导信号，负责让进港船只安全进入指定位置。",
      "Operates docking guidance signals, bringing arriving ships safely into their assigned berths."
    ]
  },
  {
    "image": "portrait-102",
    "job": [
      "机械智团战术教官",
      "Machine Collective tactician"
    ],
    "story": [
      "机械智团战术教官：机械智团的阵营特有角色。",
      "A tactical instructor from the Machine Collective."
    ]
  }
];

export function CrewChapter({ lang, assetUrl }) {
  const en = lang === 'en';
  const t = (zh, eng) => en ? eng : zh;
  const [person, setPerson] = useState(0);
  const profile = crew[person];
  return <>
    <section id="crew" data-main data-scroll-page className="main-page crew-page chapter-intro">
      <div className="page-sticky" style={{'--chapter-art': `url('${assetUrl('/gallery/concept-market.png')}')`}}><div className="chapter-shade" aria-hidden="true"/>
        <div className="intro-copy"><span className="eyebrow">THE PEOPLE ABOARD / 04</span><h2>{t('一艘舰船。', 'One ship.')}<br/><em>{t('一群值得记住的人。', 'A crew worth remembering.')}</em></h2><p>{t('从空间站酒吧的一次相遇，到舰桥上的并肩作战。招募伙伴，发掘专长，让你的船员与舰船一起成长。', 'From a chance encounter in a station bar to standing together on the bridge. Recruit companions, discover their strengths, and grow together.')}</p><div className="intro-points"><span>{t('酒吧招募', 'Meet & recruit')}</span><span>{t('岗位成长', 'Duty progression')}</span><span>{t('技能搭配', 'Skill combinations')}</span></div><a className="chapter-explore" href="#crew-details" onClick={event => openDetail(event, "crew-details")}>{t('走进你的舰桥', 'Meet your bridge crew')} <span aria-hidden="true">↓</span></a></div>
        <div className="crew-portraits" aria-label={t('你的旅途伙伴', 'Your companions')}>
          {crew.map((item,i)=><figure key={item.image} style={{'--index':i}}><img src={assetUrl(`/crew/${item.image}.png`)} alt={item.job[en?1:0]}/><figcaption><b>{item.job[en?1:0]}</b><span>CREW / 0{i+1}</span></figcaption></figure>)}
        </div><span className="chapter-coordinate">STATION → BRIDGE → BEYOND</span>
      </div>
    </section>
    <section id="crew-details" data-chapter="crew" data-scroll-page className="transition-page chapter-transition crew-transition">
      <div className="transition-overlay"><div className="chapter-detail">
        <header className="detail-heading"><span className="eyebrow">INSIDE THE BRIDGE</span><h2>{t('把相遇，变成默契。', 'Turn an encounter into a trusted crew.')}</h2></header>
        <div className="crew-layout">

        <div className="crew-dossier">
          <div className="dossier-top"><span>PERSONNEL ARCHIVE</span><span>0{person + 1} / 03</span></div>
          <div className="crew-person" key={profile.image}><img src={assetUrl(`/crew/${profile.image}.png`)} alt={profile.job[en ? 1 : 0]}/><div><h3>{profile.job[en ? 1 : 0]}</h3><p>{profile.story[en ? 1 : 0]}</p></div></div>
          <div className="crew-selector" aria-label={t('船员人物', 'Crew profiles')}>{crew.map((item, i) => <button key={item.image} aria-pressed={i === person} onClick={() => setPerson(i)}><img src={assetUrl(`/crew/${item.image}.png`)} alt=""/><span>{item.job[en ? 1 : 0]}</span></button>)}</div>
          <div className="crew-journey">{[[t('结识与招募', 'Meet & recruit'), '01'], [t('安排岗位', 'Assign duties'), '02'], [t('培养与搭配', 'Develop & combine'), '03']].map(([label, n]) => <span key={n}><small>{n}</small>{label}</span>)}</div>
        </div>
        <div className="crew-summary"><span className="eyebrow">GROW TOGETHER</span><h3>{t('同一艘船，不同的打法。', 'The same ship. Different tactics.')}</h3><p>{t('为船员安排适合的岗位，在旅途中培养专长。不同的技能组合，让同行的伙伴成为你独有的战术。', 'Find the right role for each crewmate and develop their strengths along the journey. Combine their skills to shape your own approach.')}</p></div>
      </div>
      <div className="detail-end"><span>{t('从核心小队，到旗舰舰桥', 'From a close-knit team to a flagship bridge')}</span><a href="#dynamic">{t('带上船员，驶向变化的世界', 'Take your crew into a changing world')} <span aria-hidden="true">↓</span></a></div>
      </div></div>
    </section>
  </>;
}

const scenarios = [
  { label: ['航道危机', 'Route under threat'], image: '/scene-conflict.png', title: ['下一趟航行，还走这条路吗？', 'Will you take the same route again?'], signal: ['航道周边海盗活动增加，安全形势发生变化。', 'Pirate activity rises along a shipping route, changing local security conditions.'], choice: ['查看星闻与航路情报，选择迎战、结伴护航，或避开危险。', 'Read the news and route intelligence. Confront the threat, travel together, or avoid the danger.'], result: ['战斗与运输活动成为世界的新输入，影响后续局势。', 'Combat and transport activity become new inputs into the world’s changing conditions.'], tags: [['安全', 'Security'], ['情报', 'Intelligence']] },
  { label: ['资源热潮', 'Resource rush'], image: '/gallery/concept-mining-belt.png', title: ['机会出现时，你准备好了吗？', 'When opportunity arrives, are you ready?'], signal: ['区域资源与工业事件，让一片矿区重新受到关注。', 'Regional resource and industrial events put a mining belt back in the spotlight.'], choice: ['组织采集、运输补给，或为同行的舰船提供保护。', 'Organize mining, transport supplies, or provide protection for ships working alongside you.'], result: ['资源流动与玩家活动进入区域反馈，机会和风险继续变化。', 'Resource flows and player activity feed back into the region as opportunities and risks evolve.'], tags: [['工业', 'Industry'], ['经济', 'Economy']] },
  { label: ['空间站短缺', 'Station shortages'], image: '/gallery/concept-market.png', title: ['一座空间站的困境，你的下一站。', 'A station’s shortage. Your next destination.'], signal: ['空间站发生商品短缺，市场与补给需求受到影响。', 'A station faces a shortage, affecting its market and demand for supplies.'], choice: ['比较交易机会与航行成本，决定运什么、去哪里。', 'Weigh trading opportunities against travel costs. Decide what to carry and where to go.'], result: ['交易和补给参与改变站点状态，下一次出航需要重新判断。', 'Trade and supplies help reshape local conditions. Your next voyage calls for a fresh decision.'], tags: [['经济', 'Economy'], ['空间站', 'Station']] }
];

export function LivingWorldChapter({ lang, assetUrl }) {
  const en = lang === 'en';
  const t = (zh, eng) => en ? eng : zh;
  const [scenario, setScenario] = useState(0);
  const current = scenarios[scenario];
  return <>
    <section id="dynamic" data-main data-scroll-page className="main-page living-page chapter-intro"><div className="page-sticky" style={{'--chapter-art': `url('${assetUrl('/scene-industry.png')}')`}}><div className="chapter-shade" aria-hidden="true"/>
      <div className="intro-copy"><span className="eyebrow">A WORLD IN MOTION / 05</span><h2>{t('世界不会等待', 'A world that')}<br/><em>{t('你上线。', 'never stands still.')}</em></h2><p>{t('玩家活动、世界事件与势力的战略倾向，共同塑造银河的局势。星闻与酒吧谣言带来线索，你决定下一步行动。', 'Player activity, world events, and faction priorities shape the galaxy. News and station rumors offer clues. You decide what to do next.')}</p><div className="intro-points"><span>{t('星闻与谣言', 'News & rumors')}</span><span>{t('局势与机会', 'Risk & opportunity')}</span><span>{t('行动与回响', 'Action & consequence')}</span></div><a className="chapter-explore" href="#world-details" onClick={event => openDetail(event, "world-details")}>{t('追踪一次世界变化', 'Follow a change in the world')} <span aria-hidden="true">↓</span></a></div>
      <div className="world-orbit"><div className="orbit-track"/><div className="orbit-track second"/><div className="world-core"><span>EVERY ACTION MATTERS</span><b>{t('持续演化', 'EVER EVOLVING')}</b><small>{t('你的选择，成为新的变量', 'Your choices become part of the world')}</small></div>{[['经济', 'Economy'], ['安全', 'Security'], ['工业', 'Industry'], ['情报', 'Intelligence'], ['政治', 'Politics']].map((item,i)=><div className="orbit-node" key={item[1]} style={{'--index':i}}><small>0{i+1}</small><span>{item[en?1:0]}</span></div>)}</div>
      <span className="chapter-coordinate">OBSERVE → DECIDE → ACT → CHANGE</span>
    </div></section>
    <section id="world-details" data-chapter="dynamic" data-scroll-page className="transition-page chapter-transition world-transition"><div className="transition-overlay"><div className="chapter-detail">
    <header className="detail-heading"><span className="eyebrow">THE RIPPLE OF YOUR CHOICES</span><h2>{t('一次行动，下一段故事。', 'One action. The next story.')}</h2></header>
    <div className="scenario-switch" aria-label={t('选择世界情境', 'Choose a world scenario')}>{scenarios.map((item, i) => <button key={item.image} aria-pressed={i === scenario} onClick={() => setScenario(i)}><small>0{i + 1}</small>{item.label[en ? 1 : 0]}<span aria-hidden="true">↗</span></button>)}</div>
    <div className="scenario-body" aria-live="polite">
      <div className="scenario-art" style={{backgroundImage: `linear-gradient(180deg,rgba(2,6,9,.08),rgba(2,6,9,.92)),url('${assetUrl(current.image)}')`}}><span className="scenario-caption">{t('玩法情境示意', 'Illustrative gameplay scenario')}</span><div><div className="scenario-tags">{current.tags.map(item => <span key={item[1]}>{item[en ? 1 : 0]}</span>)}</div><h3>{current.title[en ? 1 : 0]}</h3></div></div>
      <ol className="scenario-steps">{[[t('发现变化', 'Read the signs'), current.signal], [t('做出选择', 'Make your choice'), current.choice], [t('留下影响', 'Leave an impact'), current.result]].map(([label, content], i) => <li key={label}><span>0{i + 1}</span><div><h4>{label}</h4><p>{content[en ? 1 : 0]}</p></div></li>)}</ol>
    </div>
    <div className="world-feedback"><span>{t('空间站与星系的变化', 'Changes in stations & systems')}</span><i aria-hidden="true">→</i><span>{t('事件、情报与机会', 'Events, intelligence & opportunity')}</span><i aria-hidden="true">→</i><span>{t('你和船员的行动', 'You and your crew act')}</span><i aria-hidden="true">↺</i><b>{t('新的世界状态', 'A changed world')}</b></div>
  </div></div></section>
  </>;
}
