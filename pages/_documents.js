// app.js 를 감싸면서 head 및 다른 부분들을 터치 할 수 있음
import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet(); // 서버사이드 랜더링에 스타일드 컴포넌트 추가
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <scripts src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2022%2Ces2021%2Ces2020%2Ces2019%2Ces2018%2Ces2017%2Ces2016%2CIntl%2Cblissfuljs" />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
