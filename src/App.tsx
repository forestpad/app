import React from "react";
import { Header } from './components/layout/Header';
import { Hero } from './components/layout/Hero';
import { Footer } from './components/layout/Footer';
import { WalletContextProvider } from './components/WalletContextProvider';
import LSTCreator from "./components/layout/LSTCreator";

function App() {
  return (
    <WalletContextProvider>
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-grow">
          <Hero />
          {/* <LSTCreator /> */}
        </main>
        <Footer />
      </div>
    </WalletContextProvider>
  )
}

export default App