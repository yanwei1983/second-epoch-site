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
import './transition-flow.css';
import './living-chapters.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata = { title: '第二纪元 | 开放宇宙星舰战争 MMO', description: '驾驶舰船、招募船员，在持续变化的宇宙中探索、贸易与战斗。' };

export default function RootLayout({ children }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
