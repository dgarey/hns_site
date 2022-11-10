import "../styles/globals.css";
import type { AppProps } from "next/app";
import { WalletProvider } from "../contexts/wallet";
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import Nav from '../components/navbar'


export default function App({ Component, pageProps }: AppProps) {

	return (
		<WalletProvider>
		 {/* <ChakraProvider>   */}
					{/* <Nav /> */}
					<Component
						{...pageProps }
					/>
			{/* </ChakraProvider>    */}
		</WalletProvider>
	)
}