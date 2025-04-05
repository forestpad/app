import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/layout/Hero';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { WalletContextProvider } from './components/WalletContextProvider';

import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Explore } from './components/pages/Explore';
import { ProjectDetail } from './components/pages/ProjectDetail';
import { Launch } from './components/pages/Launch';

const endpoint = clusterApiUrl('devnet');

function App() {
  return (
    <BrowserRouter>
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <WalletContextProvider>
              <div className="flex flex-col min-h-screen bg-white">
                <Header />
                <main className="flex-grow pt-[72px]">
                  <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/detail" element={<ProjectDetail />} />
                    <Route path="/launch" element={<Launch />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            </WalletContextProvider>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </BrowserRouter>
  );
}

export default App