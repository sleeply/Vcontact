import { nextTick } from "vue";
import { createI18n } from "vue-i18n";
export async function loadLocaleMessages(i18n: any, locale: string) {
  // load locale messages with dynamic import
  const messages = await import(`./locales/${locale}.json`);

  i18n.global.setLocaleMessage(locale, messages);

  return nextTick();
}
export function setupI18n(
  options: any = {
    locale: localStorage.getItem("locale") || "ru",
    legacy: false,
    globalInjection: true,
    silentTranslationWarn: true,
    pluralizationRules: {},
    datetimeFormats: {
      en: {
        long: {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        },
      },
      ru: {
        long: {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        },
      },
      uz: {
        long: {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        },
      },
    },
    numberFormats: {
      en: {
        currency: {
          style: "currency",
          currency: "USD",
        },
      },
      ru: {
        currency: {
          style: "currency",
          currency: "RUB",
        },
      },
      uz: {
        currency: {
          style: "currency",
          currency: "UZS",
          currencyDisplay: "symbol",
        },
      },
    },
  }
) {
  const i18n = createI18n(options);
  loadLocaleMessages(i18n, options.locale);
  setI18nLanguage(i18n, options.locale);
  return i18n;
}
export function setI18nLanguage(i18n: any, locale: any) {
  if (i18n.mode === "legacy") {
    i18n.global.locale = locale;
  } else {
    i18n.global.locale.value = locale;
  }
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */
  try {
    document.querySelector("html")?.setAttribute("lang", locale);
  } catch {
    console.log();
  }
}

export const i18n = setupI18n();
