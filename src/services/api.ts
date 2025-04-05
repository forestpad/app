const API_EXTRA_URL = 'https://extra-api.sanctum.so/v1';

export interface LstMetadata {
  coingeckoId: string;
  description: string;
  external_uri: string | null;
  image: string;
  name: string;
  symbol: string;
  twitter: string;
  website: string;
}

export interface LstPool {
  pool: string;
  program: string;
  validator_list: string;
  vote_account?: string;
}

export interface LstMeta {
  [key: string]: any;
}

export interface LstData {
  decimals: number;
  logo_uri: string;
  meta?: LstMeta;
  mint: string;
  name: string;
  pool: LstPool;
  symbol: string;
  token_program: string;
}

export const fetchLsts = async (): Promise<LstData[]> => {
  try {
    const response = await fetch(`${API_EXTRA_URL}/lsts`);
    if (!response.ok) {
      throw new Error('Failed to fetch LSTs');
    }
    const data = await response.json();
    return data.lsts.map((lst: LstData) => ({
      decimals: lst.decimals,
      logo_uri: lst.logo_uri,
      meta: lst.meta,
      mint: lst.mint,
      name: lst.name,
      pool: lst.pool,
      symbol: lst.symbol,
      token_program: lst.token_program
    }));
  } catch (error) {
    console.error('Error fetching LSTs:', error);
    return [];
  }
};

export const fetchLstMetadata = async (tokenMint: string): Promise<LstMetadata> => {
  try {
    const response = await fetch(`${API_EXTRA_URL}/metadata/${tokenMint}`);
    if (!response.ok) {
      throw new Error('Failed to fetch LST metadata');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching LST metadata:', error);
    throw error;
  }
};
