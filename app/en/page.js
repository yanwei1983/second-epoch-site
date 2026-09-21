import GameSite from '../game-site';
import { pageMeta } from '../i18n';
import { languageAlternates } from '../site-language.mjs';

export const metadata = {
  ...pageMeta.en,
  alternates: { canonical: '/en/', languages: languageAlternates },
};

export default function EnglishHome() {
  return <GameSite lang="en" />;
}
