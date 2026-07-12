import './globals.css';
import './tweaks.css';
import './motion.css';
import './journey.css';
import './journey-tweaks.css';
import './replica.css';
import './replica-fixes.css';
import './scenes.css';
import './pages.css';
import './dwell.css';
import './epoch.css';
import './overlay.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata = { title: '第二纪元 | 开放宇宙星舰战争 MMO', description: '玩家行为会改变世界、并持续产生机遇与风险的开放宇宙星舰战争 MMO。' };

export default function RootLayout({ children }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
