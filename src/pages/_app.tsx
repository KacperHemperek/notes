import '~/styles/globals.css'
import type { AppProps } from 'next/app'
import { GlobalContext } from '~/context/global-context'
import { BaseLayout } from '~/components/layout/base-layout'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <GlobalContext>
            <BaseLayout>
                <Component {...pageProps} />
            </BaseLayout>
        </GlobalContext>
    )
}
