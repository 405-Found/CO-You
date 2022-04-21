import * as React from 'react';
import Head from "next/head";

export default function App({ Component, pageProps }) {
  return <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
  </>
}
