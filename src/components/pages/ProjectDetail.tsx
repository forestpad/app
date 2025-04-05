import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchLsts, LstData } from '../../services/api';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { fetchSwapQuote } from '../../services/trading-api';
import { swap } from '../../services/jupiter-api';

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const [stakeAmount, setStakeAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lstData, setLstData] = useState<LstData | null>(null);

  const { sendTransaction, publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const lsts = await fetchLsts();
        const lst = lsts.find((lst) => lst.mint === projectId);

        if (lst == null) {
          setError('Project not found');
          setLoading(false);
          return;
        }

        setLstData(lst);
      } catch (err) {
        setError('Failed to fetch project data');
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1C2D] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !lstData) {
    return (
      <div className="min-h-screen bg-[#1A1C2D] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400">{error || 'The requested project does not exist.'}</p>
        </div>
      </div>
    );
  }

  const handleStake = async () => {
    if (!publicKey) {
      alert('Please connect your wallet first');
      return;
    }

    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      alert('Please enter a valid stake amount');
      return;
    }

    try {
      const quoteParams = {
        input: "bSo13r4TkiE4KumL71LsHTPpL2euBYLFx6h9HP3piy1",
        outputLstMint: projectId || '',
        amount: stakeAmount,
      };

      const quote = await fetchSwapQuote(quoteParams);
      console.log('Swap quote:', quote);

      await swap(quoteParams, connection, publicKey, sendTransaction);
      alert(`You will receive approximately ${quote.outAmount} LST tokens`);
    } catch (error) {
      console.error('Error getting swap quote:', error);
      alert('Failed to get swap quote. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1A1C2D] text-white pt-16">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Project Header */}
        <div className="flex items-center gap-6 mb-8">
          <img src={lstData.meta?.["Mint logo URL"]} alt={lstData.name} className="w-20 h-20 rounded-full shadow-lg" />
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold text-green-500">{lstData.meta?.["Mint name"]}</h1>
              <span className="text-gray-400 text-lg">{lstData.meta?.["Mint symbol"]}</span>
            </div>
            <p className="text-gray-300 text-lg mb-2">{lstData.meta?.["One-liner"]}</p>
            <div className="flex gap-2">
              {lstData.meta?.Categories?.split(", ").map((category, index) => (
                <span key={index} className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">
                  {category}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            {lstData.meta?.Website && (
              <a
                href={lstData.meta.Website}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
            {lstData.meta?.Twitter && (
              <a
                href={`https://twitter.com/${lstData.meta.Twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            )}
            {lstData.meta?.["TG group link"] && (
              <a
                href={lstData.meta["TG group link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Project Info */}
          <div className="space-y-8">
            {/* Features */}
            <div className="bg-[#1F2937] p-6 rounded-2xl shadow hover:shadow-md transition duration-300">
              <h2 className="text-2xl font-bold mb-6 text-green-500">Key Features</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-300">Main Value Proposition</h3>
                  <p className="text-gray-400">{lstData.meta?.["Main value proposition"]}</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-gray-300">Key Points</h3>
                  <ul className="space-y-2">
                    {lstData.meta?.["First bullet point"] && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-400">{lstData.meta["First bullet point"]}</span>
                      </li>
                    )}
                    {lstData.meta?.["Second bullet point"] && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-400">{lstData.meta["Second bullet point"]}</span>
                      </li>
                    )}
                    {lstData.meta?.["Third bullet point"] && (
                      <li className="flex items-start gap-2">
                        <span className="text-green-500 mt-1">•</span>
                        <span className="text-gray-400">{lstData.meta["Third bullet point"]}</span>
                      </li>
                    )}
                  </ul>
                </div>
                {lstData.meta?.["Vote account"] && (
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-gray-300">Vote Account</h3>
                    <p className="text-gray-400 font-mono text-sm">{lstData.meta["Vote account"]}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Staking Interface */}
          <div>
            <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-md transition duration-300 border">
              <h2 className="text-2xl font-bold mb-6 text-green-600">Staking</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-600 mb-2">Stake Amount</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-black appearance-none focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span className="absolute right-4 top-3 text-gray-600">SOL</span>
                  </div>
                </div>

                <button
                  onClick={handleStake}
                  disabled={!stakeAmount}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Staking
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
