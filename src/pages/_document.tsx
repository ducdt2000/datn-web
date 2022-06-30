import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { i18n } from 'next-i18next';
import { initReactI18next } from 'react-i18next';

export default class CustomDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    return Document.getInitialProps(ctx);
  }
  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr';
    if (process.env.NODE_ENV !== 'production') {
      // i18n
      //   ?.use(initReactI18next)
      //   .init({ fallbackLng: 'en', debug: true, initImmediate: true });
      i18n?.init();
      i18n!.reloadResources(locale);
    }

    return (
      <Html>
        <Head />
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
