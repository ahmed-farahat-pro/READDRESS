'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import i18nConfig from '../../../i18nConfig';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    // Set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // Redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push('/' + newLocale + currentPathname);
    } else {
      router.push(
        currentPathname.replace(`/${currentLocale}`, `/${newLocale}`)
      );
    }

    router.refresh();
  };

  return (
    <div className="language-changer flex items-center space-x-4">
      {currentLocale !== 'en' && (
        <button
          onClick={() => handleLanguageChange('en')}
          className={`px-4 py-2 rounded ${currentLocale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          English
        </button>
      )}
      {currentLocale !== 'ar' && (
        <button
          onClick={() => handleLanguageChange('ar')}
          className={`px-4 py-2 rounded ${currentLocale === 'ar' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          العربية
        </button>
      )}
    </div>
  );
}
