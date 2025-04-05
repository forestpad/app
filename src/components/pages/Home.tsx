import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-[#1A1C2D] text-white pt-20">
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-10">
            The Greenest <br />
            Launchpad <br />
            For your profit and <br />
            Growth
          </h1>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => navigate('/explore')}
              className="px-8 py-3 bg-[#1E2128] hover:bg-[#2e323c] rounded-lg font-medium transition-colors"
            >
              Explore All
            </button>
            <button
              onClick={() => navigate('/launch')}
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-medium transition-colors"
            >
              Launch
            </button>
          </div>
        </div>

        <section className="mt-32">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-400 text-lg">
              Let's make staking SOL and earning tokens easy and secure
            </p>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-10 text-center">For Stakers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((step, idx) => {
                const titles = [
                  "Find the soil",
                  "Plant the seed",
                  "Watch your tree grow",
                  "Harvest your rewards",
                ];
                const images = ["1.png", "2.png", "3.png", "4.png"];
                const descriptions = [
                  "Launch your project and create a secure staking environment for your community",
                  "Stake SOL tokens to participate in the project's growth and earn rewards",
                  "Hold LST tokens while your investment grows with the project",
                  "Collect your rewards and see your investment flourish in the ecosystem",
                ];
                return (
                  <div
                    key={idx}
                    className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative"
                  >
                    <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">
                      {step}
                    </div>
                    <h3 className="text-xl font-bold mb-4 mt-6">{titles[idx]}</h3>
                    <img
                      src={`/images/home/${images[idx]}`}
                      alt={titles[idx]}
                      className="w-32 h-32 mx-auto mb-4"
                    />
                    <p className="text-gray-400">{descriptions[idx]}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-10 text-center">For Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((step, idx) => {
                const titles = [
                  "Prepare the soil",
                  "Nurture the tree",
                  "Watch your tree grow",
                  "Harvest Time",
                ];
                const images = ["5.png", "6.png", "7.png", "3.png"];
                const descriptions = [
                  "Set up your project's foundation with our secure and efficient launchpad platform. Configure your staking parameters and tokenomics.",
                  "Earn consistent staking yields from SOL deposits. Our platform automatically manages rewards distribution and reinvestment.",
                  "Grow your project organically without token sales. Our innovative LST mechanism ensures sustainable growth and community engagement.",
                  "Create instant liquidity with zero initial capital. Our platform automatically generates LST tokens backed by staked SOL.",
                ];
                return (
                  <div
                    key={idx}
                    className="bg-[#1F2937] p-8 rounded-2xl hover:bg-[#374151] transition-colors relative"
                  >
                    <div className="absolute -top-4 left-8 w-12 h-12 bg-[#22C55E] rounded-2xl flex items-center justify-center text-xl font-bold">
                      {step}
                    </div>
                    <h3 className="text-xl font-bold mb-4 mt-6">{titles[idx]}</h3>
                    <img
                      src={`/images/home/${images[idx]}`}
                      alt={titles[idx]}
                      className="w-32 h-32 mx-auto mb-4"
                    />
                    <p className="text-gray-400">{descriptions[idx]}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-32 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Launch?</h2>
            <p className="text-gray-400 text-lg mb-8">
              We've built a platform that prioritizes security, transparency, and user experience
            </p>
            <button
              onClick={() => navigate('/launch')}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-4 rounded-xl transition-colors text-lg font-semibold"
            >
              Get Started
            </button>
          </div>
        </section>
      </section>
    </div>
  );
};
