import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1A1C2D] text-white pt-16">
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-8">
            The Greenest<br />
            Launchpad<br />
            For your profit and<br />
            Growth
          </h1>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/explore')}
              className="px-8 py-3 bg-[#1E2128] hover:bg-[#22C55E]/20 rounded-lg font-semibold transition-colors"
            >
              Explore All
            </button>
            <button
              onClick={() => navigate('/launch')}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold transition-colors"
            >
              Launch
            </button>
          </div>
        </div>

        <section className="container mx-auto px-4 py-32">
          <div className="mb-24">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">Let's make staking SOL and earning tokens easy and secure</p>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-4">Who Wants to Stake</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-4 mt-4">Find the soil</h3>
              <img src="/images/home/1.png" alt="Find the soil" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-400">Launch your project and create a secure staking environment for your community</p>
            </div>

            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-4 mt-4">Plant the seed</h3>
              <img src="/images/home/2.png" alt="Plant the seed" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-400">Stake SOL tokens to participate in the project's growth and earn rewards</p>
            </div>

            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-4 mt-4">Watch your tree grows</h3>
              <img src="/images/home/3.png" alt="Watch your tree grows" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-400">Hold LST tokens while your investment grows with the project</p>
            </div>

            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="text-xl font-bold mb-4 mt-4">Find the soil</h3>
              <img src="/images/home/4.png" alt="Find the soil" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-400">Collect your rewards and see your investment flourish in the ecosystem</p>
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Who Wants to Launch</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">1</div>
              <h3 className="text-xl font-bold mb-4 mt-4">Prepare the soil</h3>
              <img src="/images/home/5.png" alt="Prepare the soil" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-400">Set up your project's foundation with our secure and efficient launchpad platform. Configure your staking parameters and tokenomics.</p>
            </div>

            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">2</div>
              <h3 className="text-xl font-bold mb-4 mt-4">Nurture the tree</h3>
              <img src="/images/home/6.png" alt="Nurture the tree" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-400">Earn consistent staking yields from SOL deposits. Our platform automatically manages rewards distribution and reinvestment.</p>
            </div>

            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">3</div>
              <h3 className="text-xl font-bold mb-4 mt-4">Watch your tree grows</h3>
              <img src="/images/home/7.png" alt="Watch your tree grows" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-400">Grow your project organically without token sales. Our innovative LST mechanism ensures sustainable growth and community engagement.</p>
            </div>

            <div className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative">
              <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">4</div>
              <h3 className="text-xl font-bold mb-4 mt-4">Harvest Time</h3>
              <img src="/images/home/3.png" alt="Harvest Time" className="w-32 h-32 mx-auto mb-4" />
              <p className="text-gray-400">Create instant liquidity with zero initial capital. Our platform automatically generates LST tokens backed by staked SOL.</p>
            </div>
          </div>
        </section>

        <div className="mt-32 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Launch?</h2>
          <p className="text-gray-400 text-lg mb-8">We've built a platform that prioritizes security, transparency, and user experience</p>
          <button
            onClick={() => navigate('/launch')}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-4 rounded-xl transition-colors text-lg font-medium">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
};