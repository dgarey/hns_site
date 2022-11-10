import { useEffect, useState } from "react";
import { BrowserWallet } from "@martifylabs/mesh";
import type { Wallet } from "@martifylabs/mesh";
import useWallet from "../contexts/wallet";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useRouter } from 'next/router'


import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	ButtonGroup,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	Stack,
	Collapse,
	Icon,
	Link,
	Popover,
	PopoverTrigger,
	PopoverContent,
	useColorModeValue,
	useBreakpointValue,
	useDisclosure,
} from '@chakra-ui/react';

export default function ConnectWallet() {
	const [walletIcon, setWalletIcon] = useState(<AccountBalanceWalletIcon />);
	const [balance, setBalance] = useState<number>();
	const [availableWallets, setAvailableWallets] = useState<Wallet[] | undefined>(undefined);
	const { walletNameConnected, connecting, connectWallet, walletConnected } = useWallet();

	const router = useRouter();

	const updateWalletInfo = async (availWallet : any) => {
		const wallet: any = await connectWallet(availWallet.name);
		if (wallet !== undefined) {
			setWalletIcon(
				<img
					src={availWallet.icon}
					style={{
						width: "30px",
						height: "30px"
					}}
				/>
			);
			const getBalance: any = await wallet.getBalance();
			if (getBalance.length !== 0) {
				for(let item of getBalance) {
					if (item.unit === 'lovelace') {
						//console.log(item.quantity)
						setBalance(item.quantity * 0.000001);
					}
				}
			}
		}
	}

	function handleClick() {
		if (router.pathname !== '/assets') {
			router.push('/assets', undefined, { shallow: true });
		} else {
			router.reload(); // quick and dirty fix to refresh displayed assets
		}
	}

	useEffect(() => {
		async function init() {
			setAvailableWallets(BrowserWallet.getInstalledWallets());
		}
		// reinitialize active wallet on refresh
	//	async function storedWallet() {
		//	const active = await getActiveWallet(); // localStorage function
			//console.log(active);
			// need to perform a check isEnabled(), in case user removes from allow list
	// 	//	if (active) {
	// 			updateWalletInfo(active);
	// 		}
	// 	}
	// 	init();
	// 	storedWallet();
	 }, []);

	return (
		<ButtonGroup size='md' isAttached variant='outline' style={{marginRight: 20}}>
			<Menu>
				<MenuButton aria-label='Wallets' as={IconButton} icon={walletIcon} />
				<MenuList>
				{availableWallets
					? availableWallets.length == 0
					? "No wallets found"
					: availableWallets.map((availWallet, i) => (
						<MenuItem
							key={i}
							onClick={() => updateWalletInfo(availWallet)}
							disabled={
								walletConnected ||
								connecting ||
								walletNameConnected == availWallet.name
							}
						>
							<img
								src={availWallet.icon}
								style={{
									width: "35px",
									height: "35px",
									marginRight: 25
								}}
							/>
								{availWallet.name}
						</MenuItem>
					))
				: ""}
				</MenuList>
			</Menu>
			<Button
				//router.reload(window.location.pathname)
				onClick={() => handleClick()}
				style={{minWidth: 125}}
			>
				{balance === 0 || balance ? Math.round(balance).toFixed(2) : 'Balance' }
			</Button>
		</ButtonGroup>
	);
}