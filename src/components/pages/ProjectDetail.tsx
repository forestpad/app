import { useParams } from 'react-router-dom';
import { useState } from 'react';

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const [stakeAmount, setStakeAmount] = useState('');

  // Mock project data - In real app, this would come from an API or state management
  const projectData = {
    alpha: {
      name: 'Project Alpha',
      description: 'An innovative DeFi lending platform offering cross-chain capabilities and automated market maker functionality.',
      features: [
        'DeFi Lending Platform',
        'Cross-chain Capabilities',
        'Automated Market Maker',
        'Real-time Reward Distribution',
        'Community Governance'
      ],
      apy: 18,
      totalStaked: '1,234,567 SOL',
      stakersCount: '3,456',
      minStake: '10 SOL',
      maxStake: '50,000 SOL',
      logo: '/images/doge-coin.png'
    },
    beta: {
      name: 'Project Beta',
      description: 'A next-generation DeFi protocol featuring innovative yield optimization strategies and high security.',
      features: [
        'Yield Optimization Algorithm',
        'Multi-sig Security',
        'Smart Contract Automation',
        'Liquidity Mining',
        'NFT Staking'
      ],
      apy: 22,
      totalStaked: '987,654 SOL',
      stakersCount: '2,789',
      minStake: '5 SOL',
      maxStake: '100,000 SOL',
      logo: '/images/doge-coin.png'
    }
  };

  const project = projectData[projectId as keyof typeof projectData];

  if (!project) {
    return (
      <div className="min-h-screen bg-[#0F1115] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400">The requested project does not exist.</p>
        </div>
      </div>
    );
  }

  const handleStake = () => {
    // Implement staking logic here
    console.log(`Staking ${stakeAmount} SOL to ${project.name}`);
  };

  return (
    <div className="min-h-screen bg-[#0F1115] text-white px-4 py-16">
      <div className="container mx-auto max-w-4xl">
        {/* Project Header */}
        <div className="flex items-center gap-6 mb-12">
          <img src={project.logo} alt={project.name} className="w-20 h-20 rounded-full" />
          <div>
            <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
            <p className="text-gray-400 text-lg">{project.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Project Info */}
          <div className="space-y-8">
            {/* Key Statistics */}
            <div className="bg-[#1F2937] p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Key Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 mb-1">Expected Returns</p>
                  <p className="text-2xl font-bold text-green-400">{project.apy}% APY</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Total Staked</p>
                  <p className="text-2xl font-bold">{project.totalStaked}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Total Stakers</p>
                  <p className="text-2xl font-bold">{project.stakersCount}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Minimum Stake</p>
                  <p className="text-2xl font-bold">{project.minStake}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-[#1F2937] p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-blue-500">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column - Staking Interface */}
          <div>
            <div className="bg-[#1F2937] p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-6">Staking</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-400 mb-2">Stake Amount</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full bg-[#374151] text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="absolute right-4 top-3 text-gray-400">SOL</span>
                  </div>
                </div>

                <div className="bg-[#374151] p-4 rounded-lg space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Daily Rewards</span>
                    <span className="font-semibold">
                      {stakeAmount ? `${(Number(stakeAmount) * project.apy / 365).toFixed(2)} SOL` : '0.00 SOL'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Estimated Annual Rewards</span>
                    <span className="font-semibold">
                      {stakeAmount ? `${(Number(stakeAmount) * project.apy / 100).toFixed(2)} SOL` : '0.00 SOL'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleStake}
                  disabled={!stakeAmount}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Staking
                </button>

                <p className="text-sm text-gray-400 text-center">
                  Min Stake: {project.minStake} • Max Stake: {project.maxStake}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};