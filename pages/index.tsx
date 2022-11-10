import { useState } from "react";
import type { NextPage } from "next";
import useWallet from "../contexts/wallet";
import ConnectWallet from "../components/connectWallet";
import DonateButton from '../components/transactions/donateButton';
import {
  Box, Heading, Text, Link, Spinner, Center, Flex, Spacer, Grid, GridItem
} from '@chakra-ui/react'

const Home: NextPage = () => {
  const { wallet, walletConnected, connecting } = useWallet();
  const [assets, setAssets] = useState<null | any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function getAssets() {
    if (wallet) {
      setLoading(true);
      const _assets = await wallet.getAssets();
      setAssets(_assets);
      setLoading(false);
    }
  }


    return (
      <Grid templateColumns='repeat(5, 1fr)' gap='10'>
        <GridItem colSpan={3}><ConnectWallet /></GridItem>
        <GridItem colSpan={3}><DonateButton /></GridItem>
      </Grid>


    )
  }

  export default Home