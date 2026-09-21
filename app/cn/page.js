import GameSite from '../game-site';
import { pageMeta } from '../i18n';
import { languageAlternates } from '../site-language.mjs';

export const metadata = {
  ...pageMeta.zh,
  alternates: { canonical: '/cn/', languages: languageAlternates },
};

export default function ChineseHome() {
  return <GameSite lang="zh" />;
}
