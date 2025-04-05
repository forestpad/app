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
      <div className="min-h-screen bg-[#1A1C2D] text-white flex items-center justify-center">
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
    <div className="min-h-screen bg-[#1A1C2D] text-gray-800 pt-16">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Project Header */}
        <div className="flex items-center gap-6 mb-12">
          <img src={project.logo} alt={project.name} className="w-20 h-20 rounded-full shadow-lg" />
          <div>
            <h1 className="text-4xl font-bold mb-2 text-green-600">{project.name}</h1>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Project Info */}
          <div className="space-y-8">
            {/* Key Statistics */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-md transition duration-300 border">
              <h2 className="text-2xl font-bold mb-6 text-green-600">Key Statistics</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600 mb-1">Expected Returns</p>
                  <p className="text-2xl font-bold text-green-500">{project.apy}% APY</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Total Staked</p>
                  <p className="text-2xl font-bold text-gray-800">{project.totalStaked}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Total Stakers</p>
                  <p className="text-2xl font-bold text-gray-800">{project.stakersCount}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Minimum Stake</p>
                  <p className="text-2xl font-bold text-gray-800">{project.minStake}</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-100 p-6 rounded-2xl shadow hover:shadow-md transition duration-300 border">
              <h2 className="text-2xl font-bold mb-6 text-green-600">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <span className="text-green-500">•</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
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
                      type="text"
                      value={stakeAmount}
                      onChange={(e) => setStakeAmount(e.target.value)}
                      placeholder="0.0"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <span className="absolute right-4 top-3 text-gray-600">SOL</span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg space-y-3 border border-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Daily Rewards</span>
                    <span className="font-semibold text-gray-800">
                      {stakeAmount ? `${(Number(stakeAmount) * project.apy / 365).toFixed(2)} SOL` : '0.00 SOL'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Estimated Annual Rewards</span>
                    <span className="font-semibold text-gray-800">
                      {stakeAmount ? `${(Number(stakeAmount) * project.apy / 100).toFixed(2)} SOL` : '0.00 SOL'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleStake}
                  disabled={!stakeAmount}
                  className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Start Staking
                </button>

                <p className="text-sm text-gray-600 text-center">
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