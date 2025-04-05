import { useNavigate } from 'react-router-dom';

export const Explore = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0F1115] text-white px-4 py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🔥 Choose a project to support</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search projects..."
              className="bg-[#1F2937] text-white px-4 py-2 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project Alpha Card */}
          <div className="bg-[#1F2937] p-6 rounded-xl hover:bg-[#374151] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <img src="/images/doge-coin.png" alt="Project Alpha" className="w-12 h-12 rounded-full" />
              <h2 className="text-2xl font-bold">Project Alpha</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• DeFi lending platform</li>
                <li>• Cross-chain capabilities</li>
                <li>• Automated market maker</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Expected Rewards</h3>
              <p className="text-green-400 font-semibold">18% APY</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Community Rating</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-3 mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Investing progress</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <button
              onClick={() => navigate('/stake/alpha')}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition-colors"
            >
              Stake Now
            </button>
          </div>

          {/* Project Beta Card */}
          <div className="bg-[#1F2937] p-6 rounded-xl hover:bg-[#374151] transition-all">
            <div className="flex items-center gap-4 mb-6">
              <img src="/images/doge-coin.png" alt="Project Beta" className="w-12 h-12 rounded-full" />
              <h2 className="text-2xl font-bold">Project Beta</h2>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="text-gray-300 space-y-2">
                <li>• DeFi lending platform</li>
                <li>• Cross-chain capabilities</li>
                <li>• Automated market maker</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Expected Rewards</h3>
              <p className="text-green-400 font-semibold">22% APY</p>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Community Rating</h3>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400">★</span>
                ))}
              </div>
            </div>

            <div className="bg-gray-700 rounded-lg p-3 mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span>Investing progress</span>
                <span>80%</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <button
              onClick={() => navigate('/stake/beta')}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition-colors"
            >
              Stake Now
            </button>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">View more projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Cards */}
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-[#1F2937] p-4 rounded-xl hover:bg-[#374151] transition-all cursor-pointer">
                <div className="flex items-center gap-3 mb-4">
                  <img src="/images/doge-coin.png" alt={`Project ${index + 1}`} className="w-10 h-10 rounded-full" />
                  <h3 className="font-semibold">Project {index + 1}</h3>
                </div>
                <div className="flex justify-between text-sm text-gray-400 mb-3">
                  <span>APY</span>
                  <span className="text-green-400">{15 + index}%</span>
                </div>
                <div className="bg-gray-700 rounded-lg p-2">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Progress</span>
                    <span>{70 + index}%</span>
                  </div>
                  <div className="w-full bg-gray-600 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full"
                      style={{ width: `${70 + index}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};