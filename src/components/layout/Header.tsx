import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletContextProvider } from '../WalletContextProvider';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaXTwitter, FaGithub } from 'react-icons/fa6';

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed left-0 top-0 h-screen w-[240px] bg-[#0F1115] text-white p-6 flex flex-col justify-between z-[100] shadow-xl">
      <div>
        <div className="flex items-center mb-12 cursor-pointer" onClick={() => navigate('/')}>
          <img src="/images/logo.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold ml-3">ForestPad</h1>
        </div>

        <WalletContextProvider>
          <WalletMultiButton />
        </WalletContextProvider>

        <nav className="space-y-4">
          <button
            onClick={() => navigate('/explore')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/explore') ? 'bg-[#1E2128] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1E2128]/50'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Explore
          </button>
          <button
            onClick={() => navigate('/stake')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/stake') ? 'bg-[#1E2128] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1E2128]/50'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
              <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
            </svg>
            Stake
          </button>
          <button
            onClick={() => navigate('/profile')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/profile') ? 'bg-[#1E2128] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1E2128]/50'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Profile
          </button>
          <button
            onClick={() => navigate('/rewards')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/rewards') ? 'bg-[#1E2128] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1E2128]/50'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            Rewards
          </button>
          <button
            onClick={() => navigate('/ranking')}
            className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${isActive('/ranking') ? 'bg-[#1E2128] text-white' : 'text-gray-400 hover:text-white hover:bg-[#1E2128]/50'}`}
          >
            <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
            </svg>
            Ranking
          </button>
        </nav>
      </div>

      <SocialLinks />
    </header>
  );
};

function SocialLinks() {
  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4 pt-4 border-t border-gray-800">
        <a href="#" className="text-gray-400 hover:text-white">
          <FaXTwitter className="w-5 h-5" />
        </a>
        <a href="https://github.com/team-seoulana" className="text-gray-400 hover:text-white">
          <FaGithub className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
