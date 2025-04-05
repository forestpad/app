import { Connection, PublicKey, Transaction, TransactionSignature, VersionedTransaction } from "@solana/web3.js";
import { SwapQuoteParams } from "./trading-api";
import { SendTransactionOptions } from "@solana/wallet-adapter-base";

export const swap = async (
    params: SwapQuoteParams,
    connection: Connection,
    publicKey: PublicKey,
    signTransaction: (transaction: VersionedTransaction | Transaction, connection: Connection, options?: SendTransactionOptions) => Promise<TransactionSignature>
) => {
    const amountInLamports = (Number(params.amount) * 1e9).toString();
    const quoteRes = await (
        await fetch(
            `https://api.jup.ag/swap/v1/quote?inputMint=So11111111111111111111111111111111111111112&outputMint=${params.outputLstMint}&amount=${amountInLamports}&slippageBps=50&restrictIntermediateTokens=true`
        )
    ).json();

    console.log(JSON.stringify(quoteRes, null, 2));

    const swapResponse = await (
        await fetch('https://api.jup.ag/swap/v1/swap', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                quoteResponse: quoteRes,
                userPublicKey: publicKey.toBase58(),

                dynamicComputeUnitLimit: true,
                dynamicSlippage: true,
                prioritizationFeeLamports: {
                    priorityLevelWithMaxLamports: {
                        maxLamports: 1000000,
                        priorityLevel: "veryHigh"
                    }
                }
            })
        })
    ).json();

    console.log(swapResponse);

    const transactionBase64 = swapResponse.swapTransaction
    const transaction = VersionedTransaction.deserialize(Buffer.from(transactionBase64, 'base64'));
    console.log(transaction);

    const signedTx = await signTransaction(transaction, connection);
    console.log(signedTx);

    const signature = await connection.sendRawTransaction(signedTx.serialize(), {
        maxRetries: 2,
        skipPreflight: true
    });

    const confirmation = await connection.confirmTransaction(signature);

    if (confirmation.value.err) {
        throw new Error(`Transaction failed: ${JSON.stringify(confirmation.value.err)}\nhttps://solscan.io/tx/${signature}/`);
    } else console.log(`Transaction successful: https://solscan.io/tx/${signature}/`);
}
