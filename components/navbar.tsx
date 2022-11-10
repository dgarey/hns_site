import { ReactNode, useState } from 'react';
import {
  Box,
  ButtonGroup,
  Flex,
  Avatar,
  IconButton,
  Link,
  Button,
  Image,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
} from '@chakra-ui/react';
import { useRouter } from 'next/router'
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import ConnectWallet from './walletConnect';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

/* color mode for toggle switch
const NavLink = ({ children }: { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={'#'}>
    {children}
  </Link>
);
*/

export default function Nav() {

	const { colorMode, toggleColorMode } = useColorMode();
	const [walletIcon, setWalletIcon] = useState(<AccountBalanceWalletIcon />);
	const router = useRouter();

	return (
		<Flex
			as='header'
			position='fixed'
			top='0' left='0'
			w='100%'
			h={16}
			alignItems={'center'}
			justifyContent={'space-between'}
			backgroundColor='gray.900'
			zIndex={100}
		>
			<Image
				//boxSize='64px'
				src='/images/GotchiLogo32x32.png'
				alt='Adagotchi Logo'
				style={{marginLeft: 20}}
				onClick={() => router.push('/', undefined, { shallow: true })}
				_hover={{cursor: 'pointer'}}
			/>
			<Flex>
				<Button
					variant='outline'
					marginRight={2}
					onClick={() => router.push('/dressingroom', undefined, { shallow: true })}
				>

				</Button>
				<ConnectWallet />
			</Flex>
		</Flex>
	);
}