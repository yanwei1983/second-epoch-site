import './globals.css';
import './tweaks.css';
import './motion.css';
import './journey.css';
import './journey-tweaks.css';
import './replica.css';
import './replica-fixes.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

export const metadata = { title: '断层纪元 | 星海沙盒 MMO', description: '在破碎星域中定义你的秩序。' };

export default function RootLayout({ children }) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
