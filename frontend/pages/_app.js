import * as React from 'react'
import Head from 'next/head'
import { ThemeProvider } from '@mui/system'
import theme from '../lib/styles/theme'
import './styles.css';
export default function App({ Component, pageProps }) {
    return (
        <>
            <Head>
                <meta
                    name="viewport"
                    content="initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                <Component {...pageProps} />
            </ThemeProvider>
        </>
    )
}
