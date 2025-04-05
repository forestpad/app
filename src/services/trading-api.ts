const API_TRADING_URL = 'https://sanctum-s-api.fly.dev/v1';

export type SwapMode = 'ExactIn' | 'ExactOut';
export type SwapSource = 'SPool' | 'Stakedex';

export interface SwapQuoteParams {
    input: string;
    outputLstMint: string;
    amount: string;
    mode?: SwapMode;
    swapSrc?: SwapSource[];
}

export interface SwapQuoteResponse {
    inAmount: string;
    outAmount: string;
    feeAmount: string;
    feeMint: string;
    feePct: string;
    swapSrc: string;
}

export const fetchSwapQuote = async (params: SwapQuoteParams): Promise<SwapQuoteResponse> => {
    try {
        const amountInLamports = (Number(params.amount) * 1e9).toString();
        const queryParams = new URLSearchParams({
            input: params.input,
            outputLstMint: params.outputLstMint,
            amount: amountInLamports,
            ...(params.mode && { mode: params.mode }),
            ...(params.swapSrc && { swapSrc: JSON.stringify(params.swapSrc) })
        });

        const response = await fetch(`${API_TRADING_URL}/swap/quote?${queryParams}`);
        if (!response.ok) {
            throw new Error('Failed to fetch swap quote');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching swap quote:', error);
        throw error;
    }
};
