import { useNavigate } from 'react-router-dom';

export const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#0F1115] text-white pt-16">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">Earn Tokens While Staking Your Sol</h1>
          <p className="text-gray-400 text-lg mb-8">Secure, transparent, and user-friendly platform for SOL staking</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/explore')}
              className="px-8 py-3 bg-[#1E2128] hover:bg-[#2A2E37] rounded-lg font-semibold transition-colors"
            >
              Explore All
            </button>
            <button
              onClick={() => navigate('/create')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition-colors"
            >
              Create
            </button>
          </div>
        </div>

        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Let's make staking SOL and earning tokens easy and secure</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors">
              <div className="w-12 h-12 bg-[#6366F1] rounded-2xl flex items-center justify-center mb-6 text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-4">Who Wants to Launch</h3>
              <p className="text-gray-400">Create your own staking pool and token distribution plan</p>
            </div>
            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors">
              <div className="w-12 h-12 bg-[#6366F1] rounded-2xl flex items-center justify-center mb-6 text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-4">Who Wants to Stake</h3>
              <p className="text-gray-400">Choose from verified staking pools with transparent terms</p>
            </div>
            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors">
              <div className="w-12 h-12 bg-[#6366F1] rounded-2xl flex items-center justify-center mb-6 text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-4">Stake SOL</h3>
              <p className="text-gray-400">Securely stake your SOL with just a few clicks</p>
            </div>
            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors">
              <div className="w-12 h-12 bg-[#6366F1] rounded-2xl flex items-center justify-center mb-6 text-xl font-bold">4</div>
              <h3 className="text-xl font-bold mb-4">Earn Tokens</h3>
              <p className="text-gray-400">Automatically receive rewards in project tokens</p>
            </div>
          </div>
        </div>

        <div className="mt-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Key Features</h2>
            <p className="text-gray-400 text-lg">We've built a platform that prioritizes transparency and user experience</p>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch?</h2>
          <p className="text-gray-400 text-lg mb-8">We've built a platform that prioritizes security, transparency, and user experience</p>
          <button className="bg-[#6366F1] text-white px-12 py-4 rounded-xl hover:bg-[#4F46E5] transition-colors text-lg font-medium">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};