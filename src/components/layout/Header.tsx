import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletContextProvider } from '../WalletContextProvider';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-4 sm:px-8 py-4 bg-[#0F1115]/95 backdrop-blur-sm shadow-lg">
      <div className="flex items-center">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-8 h-8"
          onClick={() => navigate('/')}
        />
        <h1
          className="text-xl sm:text-2xl font-bold ml-2 text-white"
          onClick={() => navigate('/')}
        >
          ForestPad
        </h1>ForestPad
      </div>
      <WalletContextProvider>
        <nav className="flex items-center gap-4">
          <button
            onClick={() => navigate('/explore')}
            className="text-gray-600 hover:text-gray-900 text-base sm:text-lg"
          >
            Exploer
          </button>
          <WalletMultiButton />
        </nav>
      </WalletContextProvider>
    </header>
  );
};