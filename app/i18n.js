import { cloneElement, isValidElement } from 'react';

const EN = {
  '第二纪元':'SECOND EPOCH',
  '纪元':'Epoch', '实录':'Combat', '世界':'World', '势力':'Factions', '动态世界':'Living World', '美术':'Art', '社区':'Community',
  '进入宇宙':'ENTER UNIVERSE', '菜单':'Menu', '选择语言':'Select language', '主分页导航':'Primary section navigation', '视频频道':'Video channel', '中文':'中文',
  '开放宇宙大规模星舰战争 MMO':'OPEN-UNIVERSE MASSIVE STARSHIP WARFARE MMO',
  '玩家行为会改变世界、并持续产生机遇与风险的开放宇宙星舰战争 MMO。':'An open-universe starship warfare MMO where player actions reshape the world and continually create new opportunities and risks.',
  '单服开放宇宙':'Single-shard universe', '万人星舰战争':'Massive fleet warfare', '动态世界经济':'Living world economy',
  '世界持续运行中':'THE WORLD KEEPS MOVING', '舰长身份等待同步':'Captain identity awaiting sync',
  '这是等待英雄抵达的舞台。':'This is a stage awaiting the arrival of heroes.',
  '1000+ 星系、约 700 座空间站与跨越高安、低安、零安的航线，正在同一个世界里持续运行。':'More than 1,000 systems, nearly 700 stations, and routes spanning high-, low-, and null-security space all persist in one shared world.',
  '你的战斗、采矿、贸易、护航与袭击，都会成为下一次区域变化的原因。':'Your battles, mining, trade, escorts, and raids can all trigger the next regional shift.',
  '一场战争，':'A war begins', '从一次锁定开始。':'with a single lock.',
  '固定 2.5D 视角保持高速、清晰与低眩晕体验，从小队行动延伸到万人级星舰战争。':'A fixed 2.5D view keeps combat fast, readable, and comfortable, from small-squad actions to massive fleet warfare.',
  '播放演示':'Play demo', '舰队交战实录':'FLEET COMBAT RECORD', '穿越旧宇宙的余烬':'Through the ashes of the old universe',
  '你迟到了':'You arrived', '两个世纪。':'two centuries late.',
  '最后一批“虫洞逃亡计划”船队因量子相位偏移，在时间线上断续抵达。如今，裂隙口 #17 再次波动，而你正是本应在新历 002 年现身的时迟裂隙移民。':'The final Wormhole Exodus fleets arrived in fragments after a quantum phase shift displaced them across the timeline. Now Rift Gate #17 stirs again, and you are one of the delayed migrants meant to emerge in New Calendar 002.',
  '新历 001 年':'NC 001', '冷冻移民、自适应人类与未知意识体穿越未知裂隙':'Cryogenic settlers, adaptive humans, and unknown consciousnesses cross an uncharted rift',
  '跨越百年':'Across centuries', '穿越者因虫洞不稳定而分批、滞后抵达新宇宙':'Unstable transit scatters arrivals across decades and centuries',
  '新历 227 年':'NC 227', '裂隙口 #17 再度波动，小批次穿越者重新浮现':'Rift Gate #17 fluctuates again and another small group emerges',
  '人权协议':'Rift Rights Accord', '任何穿越个体不得被视作势力资产，必须自主选择归属':'No rift traveler may be treated as faction property; allegiance must be freely chosen',
  '这里没有正义，只有胜者与败者。':'There is no justice here, only victors and the defeated.', '我们在深空中书写自己的法则。':'In deep space, we write our own laws.', '— 《星际法典》引言':'— Preface to the Interstellar Codex',
  '每一艘战舰都是一颗星辰，而你的舰队就是':'Every warship is a star, and your fleet becomes', '整片银河。':'the entire galaxy.', '— 铁血军团元帅 索尔·瓦伦':'— Marshal Sol Valen, Iron Blood Legion',
  '虚空从不仁慈，但虚空从不说谎。':'The void is never merciful, but the void never lies.', '在黑暗中，真相反而更加清晰。':'In darkness, the truth becomes clearer.', '— 星空海盗王 红狐':'— Red Fox, Pirate King of the Void',
  '铁血军团':'IRON BLOOD LEGION', '秩序 / 防御 / 正规军':'ORDER / DEFENSE / REGULAR FORCES', '以军事秩序维持边境稳定。重装甲、严密编队与持续火力构成他们的战争语言。':'They preserve frontier stability through military order. Heavy armor, disciplined formations, and sustained firepower define their language of war.',
  '破晓级护卫舰':'DAWN-CLASS FRIGATE', '铁血军团·破晓级护卫舰（Dawn-Class Frigate）：机动性极强，搭载中/轻型武器与基础电子战模块，适合侦察、巡逻和快速拦截。采用轻量合金装甲，兼顾防护与灵活度。':'The Dawn-Class is a highly mobile frigate armed with medium and light weapons plus basic electronic warfare modules. Lightweight alloy armor balances protection and agility for reconnaissance, patrol, and rapid interception.', '装甲防御 92':'Armor Defense 92', '机动效率 48':'Mobility 48',
  '自由者迦南':'FREE CANAAN', '探索 / 贸易 / 反压迫':'EXPLORATION / TRADE / LIBERATION', '由旅行者、探索者和自由贸易者组成。他们不断越过已知航线，把情报与货物送往文明边缘。':'Travelers, explorers, and free traders who continually push beyond known routes, carrying intelligence and cargo to the edge of civilization.',
  '旅星级护卫舰':'WAYFARER-CLASS FRIGATE', '由自由者迦南打造的小型护卫舰，机动性优秀，适合侦察、护航和快速探索，体现自由者迦南的机动作战理念。':'A nimble Free Canaan frigate built for reconnaissance, escort duty, and rapid exploration, embodying the faction’s doctrine of mobile warfare.', '跃迁机动 91':'Warp Mobility 91', '正面防御 52':'Frontal Defense 52',
  '超新星科技集团':'SUPERNOVA GROUP', '人工智能 / 生物科技':'AI / BIOTECHNOLOGY', '掌握机器人、人工智能与生物科技的巨型企业集团，用技术优势重新定义战场效率。':'A corporate giant controlling robotics, artificial intelligence, and biotechnology, using technological superiority to redefine battlefield efficiency.',
  '量子锋级护卫舰':'QUANTUM EDGE FRIGATE', '由超新星科技集团开发的实验型护卫舰，采用量子扰动引擎实现高速突进，搭载智能化武器系统。':'An experimental frigate with a quantum-distortion drive for high-speed assaults and an integrated intelligent weapons suite.', '电子科技 96':'Electronic Systems 96', '维护成本 78':'Maintenance Cost 78',
  '银河商贸同盟':'GALACTIC TRADE ALLIANCE', '航线 / 资源 / 经济':'ROUTES / RESOURCES / ECONOMY', '控制关键贸易航线与资源星球。对他们而言，价格波动和物流封锁同样是战争手段。':'They control critical trade routes and resource worlds. To them, price shocks and logistics blockades are weapons of war.',
  '金舵级护卫舰':'GOLDEN HELM FRIGATE', '由银河商贸同盟统一制造的基础护卫舰，强调雷达侦测与快速拦截，主要用于护航商队与清理小规模威胁。':'A standardized frigate emphasizing radar detection and rapid interception, primarily used to escort trade convoys and clear small-scale threats.', '物流网络 94':'Logistics Network 94', '独立作战 46':'Independent Combat 46',
  '圣光教廷':'CHURCH OF HOLY LIGHT', '信仰 / 医疗 / 社会影响':'FAITH / MEDICINE / INFLUENCE', '以信仰维系庞大的社会网络，医疗舰队与宗教影响力让他们能在战后迅速重建秩序。':'Faith binds their vast social network. Medical fleets and religious influence allow them to restore order rapidly after war.',
  '神选级护卫舰':'CHOSEN-CLASS FRIGATE', '圣光教廷·神选级护卫舰（神选-Morninglight Class Frigate）：光束炮、医疗救援，结合最新星际科技，适合多种复杂战场任务。':'The Morninglight combines beam weapons, medical rescue systems, and advanced interstellar technology for complex battlefield missions.', '支援恢复 90':'Support Recovery 90', '战术弹性 55':'Tactical Flexibility 55',
  '零界骑士':'ZERO REALM KNIGHTS', '黑客 / 网络战 / 匿名正义':'HACKING / CYBERWAR / ANONYMOUS JUSTICE', '游走在数据边界的匿名组织。他们入侵通讯、篡改情报，并让敌人的武器在开火前失去目标。':'An anonymous order operating at the edge of the data sphere. They breach communications, rewrite intelligence, and blind enemy weapons before they fire.',
  '断序级护卫舰':'DISRUPTOR-CLASS FRIGATE', '由零界骑士打造的小型舰，以强大电子对抗和黑客入侵模块著称，可迅速瘫痪敌方通讯并突袭要害。':'A compact frigate renowned for electronic countermeasures and intrusion modules, capable of disabling enemy communications before striking critical targets.', '网络干扰 98':'Network Disruption 98', '舰体强度 44':'Hull Strength 44',
  '边境威胁':'FRONTIER THREATS', '黑星海盗团':'BLACK STAR CORSAIRS', '光明狂热者':'LUMINANT ZEALOTS',
  '舰体许可':'Hull License', '上一艘护卫舰':'Previous frigate', '下一艘护卫舰':'Next frigate',
  '世界不会等待':'THE WORLD DOES NOT WAIT', '玩家上线。':'FOR PLAYERS TO LOG IN.',
  '你看到的价格、任务和安全局势，都来自其他玩家已经做出的选择。观察世界，判断机会，然后让下一次变化因你而发生。':'The prices, missions, and security conditions you see are consequences of choices other players have already made. Read the world, judge the opportunity, and become the cause of the next change.',
  '星系':'Systems', '主要势力':'Major Factions', '空间站':'Stations', '世界持续运行':'WORLD IN MOTION',
  '收集情报':'Gather Intelligence', '判断机会':'Assess Opportunity', '选择行动':'Choose Action', '收益 / 损失':'Gain / Loss', '影响世界':'Influence World',
  '星际星闻':'Interstellar News', '酒吧谣言':'Station Rumors', '交易与航线变化':'Trade & Route Shifts',
  '玩家行为如何生成新内容':'How Player Actions Generate New Content', '逐级上报':'ESCALATION REPORTS', '玩家行为':'Player Actions', '空间站状态':'Station Status', '星系态势':'System Conditions', '星域冲突':'Regional Conflict',
  '势力决策':'FACTION DECISION', '经济 · 安全 · 工业':'Economy · Security · Industry', '情报 · 政治':'Intelligence · Politics', '分级下发':'TIERED RESPONSE',
  '空间站事件':'Station Events', '星系事件':'System Events', '星域事件':'Regional Events', '军团目标':'Faction Objectives',
  '运输线持续受袭':'Shipping Route Raided', '库存减少 · 物价上涨':'Stock Falls · Prices Rise', '护航与拦截任务':'Escort & Interception Missions', '势力介入 · 冲突升级':'Faction Intervention · Escalation',
  '任务变化':'Mission Shifts', '物价调整':'Price Changes', '巡逻变化':'Patrol Changes', '护航生成':'Escort Contracts', '局部战争':'Local War',
  '新宇宙美术长廊':'ART OF THE NEW UNIVERSE', '从轨道都市到失落环世界，记录舰船之外仍在生长的宇宙。':'From orbital cities to lost ringworlds, discover a universe still growing beyond its fleets.',
  '晨昏轨道城':'Terminator Orbital City', '殖民地概念 / 近地轨道':'Colony Concept / Low Orbit', '寂静星门':'Silent Stargate', '星际设施 / 跃迁航道':'Interstellar Structure / Warp Route',
  '环带矿区':'Belt Mining Zone', '工业场景 / 小行星带':'Industrial Scene / Asteroid Belt', '深空档案库':'Deep-Space Archive', '文明遗迹 / 数据圣殿':'Civilization Relic / Data Sanctum',
  '赤昼殖民地':'Red Day Colony', '地表聚落 / 边境世界':'Surface Settlement / Frontier World', '蓝冠异常区':'Blue Crown Anomaly', '未知空间 / 星云风暴':'Unknown Space / Nebula Storm',
  '无昼贸易港':'Nightless Trade Port', '空间站内部 / 商业枢纽':'Station Interior / Trade Hub', '失落环世界':'Lost Ringworld', '远古工程 / 世界遗迹':'Ancient Engineering / World Relic',
  '下一个跃迁点，':'THE NEXT JUMP', '由你选择。':'IS YOUR CHOICE.',
  '加入星际社区':'JOIN THE INTERSTELLAR COMMUNITY', '与全球指挥官一起，开启你的银河征程':'Begin your galactic journey alongside commanders from around the world',
  '将《第二纪元》加入愿望单，获取最新游戏资讯':'Wishlist Second Epoch and receive the latest game updates', '加入愿望单':'ADD TO WISHLIST',
  '加入官方 Discord，与开发者和舰长直接交流':'Join the official Discord and talk directly with developers and captains', '加入 Discord':'JOIN DISCORD',
  '游戏':'GAME', '关于游戏':'About', '派系介绍':'Factions', '玩法特色':'Features', '新闻资讯':'News', '官方论坛':'Official Forum', 'Steam 社区':'Steam Community', '玩家手册':'Player Guide',
  '支持':'SUPPORT', '帮助中心':'Help Center', '系统要求':'System Requirements', '联系我们':'Contact', '反馈问题':'Report an Issue', '法律':'LEGAL', '隐私政策':'Privacy Policy', '用户协议':'User Agreement', 'Cookie 政策':'Cookie Policy',
  '征服银河':'CONQUER THE GALAXY', '从此刻开始':'STARTING NOW', '© 2026 第二纪元. 保留所有权利。':'© 2026 Second Epoch. All rights reserved.',
  '关闭':'Close', '上一张':'Previous artwork', '下一张':'Next artwork', '关闭预约窗口':'Close reservation dialog',
  '舰长档案已登记':'CAPTAIN PROFILE REGISTERED', '测试资格开放后，我们会通过你的邮箱发送通知。':'We will notify you by email when testing access becomes available.', '完成':'DONE',
  '立即预约':'RESERVE NOW', '登记你的舰长身份，等待裂隙航线开放。':'Register your captain identity and await the opening of the rift route.', '昵称':'CALLSIGN', '输入你的舰长昵称':'Enter your captain callsign', '提交预约':'SUBMIT RESERVATION'
};

function translateString(value, lang) {
  if (lang !== 'en' || !value) return value;
  if (EN[value]) return EN[value];
  if (value.startsWith('查看')) return `View ${EN[value.slice(2)] || value.slice(2)}`;
  return value;
}

const localizedProps = ['aria-label', 'placeholder', 'alt', 'title'];

export function localizeNode(node, lang) {
  if (typeof node === 'string') return translateString(node, lang);
  if (Array.isArray(node)) return node.map(child => localizeNode(child, lang));
  if (!isValidElement(node)) return node;
  const props = {};
  localizedProps.forEach(key => {
    if (typeof node.props[key] === 'string') props[key] = translateString(node.props[key], lang);
  });
  if ('children' in node.props) props.children = localizeNode(node.props.children, lang);
  return cloneElement(node, props);
}

export const pageMeta = {
  zh: {
    title: '第二纪元 | 开放宇宙星舰战争 MMO',
    description: '玩家行为会改变世界、并持续产生机遇与风险的开放宇宙星舰战争 MMO。'
  },
  en: {
    title: 'Second Epoch | Open-Universe Starship Warfare MMO',
    description: 'An open-universe starship warfare MMO where player actions reshape a persistent world.'
  }
};
