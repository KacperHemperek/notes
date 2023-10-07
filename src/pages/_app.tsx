import '~/styles/globals.css'
import type {AppProps} from 'next/app'
import GlobalContext from "~/context/global-context";

export default function App({Component, pageProps}: AppProps) {
    return <GlobalContext><Component {...pageProps} /></GlobalContext>
}
