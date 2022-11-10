import { useState } from "react";
import {
    Box, Heading, Text, Button, Center, Spinner, Link
} from "@chakra-ui/react"
import useWallet from "../../contexts/wallet";

import { Transaction } from '@martifylabs/mesh'

const donationAddress = "addr1v9zerqqlnz7xz8nxajcwg6wrqsy6rrypcdeu9enxg6hk49gzd8hhu"

export default function DonateButton() {
    const { walletConnected, wallet } = useWallet();
    const [successfulTxHash, setSuccessfulTxHash] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleDonate = async () => {
        if (walletConnected) {
            setLoading(true)
            const network = await wallet.getNetworkId()
            if (network == 0) {
                alert("this dapp only works on Cardano Testnet")
            }
            else {
                const tx = new Transaction({ initiator: wallet }).sendLovelace(
                    donationAddress,
                    "10000000"
                );
                try {
                    const unsignedTx = await tx.build();
                    const signedTx = await wallet.signTx(unsignedTx);
                    const txHash = await wallet.submitTx(signedTx);
                    setSuccessfulTxHash(txHash)
                } catch (error: any) {
                    if (error.info) {
                        alert(error.info)
                    }
                    else {
                        console.log(error)
                    }
                }
            }
            setLoading(false)
        }
        else {
            alert("please connect a wallet")
        }
    }

    return (
        <Box p='5' bg='orange.100' border='1px' borderRadius='xl' fontSize='lg'>
            <Heading size='xl'>
                Adagotchi Trait pack
                
            </Heading>
            <Text py='15'>
                10 ADA To Begin your Journey
            </Text>
            <Button onClick={handleDonate} colorScheme='green' my='3'>Press Start</Button>
            <Box p='5' bg='blue.100'>
                <Text py='2'>Tx Status</Text>
                {loading ? (
                    <Center>
                        <Spinner />
                    </Center>
                ) : (
                    <>
                        <Text pt='17'>
                            You'll know the transaction was successful if you see a TxHash here: {successfulTxHash}
                        </Text>
                        <Text pt='3'>
                        </Text>
                    </>
                )}
            </Box>
        </Box>
    );
}