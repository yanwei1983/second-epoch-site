'use client';

import { useEffect } from 'react';
import { languagePaths, languageStorageKey, resolveDefaultLocale } from './site-language.mjs';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function LanguageRedirect() {
  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem(languageStorageKey);
    } catch {
      // Use the browser preference when persistent storage is unavailable.
    }
    const lang = resolveDefaultLocale(saved, navigator.languages?.[0] || navigator.language);
    const destination = new URL(window.location.href);
    destination.pathname = `${basePath}${languagePaths[lang]}`;
    window.location.replace(destination.href);
  }, []);

  return (
    <main style={{ minHeight: '100svh', display: 'grid', placeContent: 'center', justifyItems: 'center', gap: '24px' }}>
      <p style={{ fontSize: '24px', fontWeight: 700 }}>THE SECOND EPOCH</p>
      <nav aria-label="选择语言 / Choose language" style={{ display: 'flex', gap: '24px' }}>
        <a href={`${basePath}${languagePaths.zh}`} hrefLang="zh-CN" lang="zh-CN">中文</a>
        <a href={`${basePath}${languagePaths.en}`} hrefLang="en" lang="en">English</a>
      </nav>
    </main>
  );
}
