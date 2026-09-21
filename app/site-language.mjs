export const languageStorageKey = 'second-epoch-language';
export const languagePaths = { zh: '/cn/', en: '/en/' };
export const languageAlternates = {
  'zh-CN': '/cn/',
  en: '/en/',
  'x-default': '/',
};

export function resolveDefaultLocale(saved, browserLanguage) {
  if (saved === 'zh' || saved === 'en') return saved;
  return /^zh(?:-|$)/i.test(browserLanguage) ? 'zh' : 'en';
}
