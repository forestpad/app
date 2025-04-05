import React, { useState } from "react";
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import LSTCreator from "./LSTCreator";
// import { Link } from 'react-router-dom'; // react-router 사용 가정

export const Hero = () => {
  const { publicKey } = useWallet();
  const [walletInfo, setWalletInfo] = useState('');
  const [error, setError] = useState('');
  const { connection } = useConnection();
  const [success, setSuccess] = useState('');
  const [showLSTCreator, setShowLSTCreator] = useState(false);
  
  // 기본 Solana 연결 확인하는 함수
  const checkWalletConnection = async () => {
    console.log({publicKey});
    if (!publicKey) {
      setError('지갑이 연결되지 않았습니다.');
      return;
    }
    
    try {
      // 지갑 연결과 기본 정보 확인
      const balance = await connection.getBalance(publicKey);
      const recentBlockhash = await connection.getLatestBlockhash();
      
      const info = `
        지갑 주소: ${publicKey.toString()}
        SOL 잔액: ${balance / 1000000000} SOL
        최신 블록해시: ${recentBlockhash.blockhash.slice(0, 10)}...
        슬롯: ${recentBlockhash.lastValidBlockHeight}
      `;
      
      setWalletInfo(info);
      setSuccess('지갑 연결에 성공했습니다!');
      setError('');
      
    } catch (err) {
      console.error('지갑 연결 확인 오류:', err);
      setError(`지갑 연결 확인 중 오류가 발생했습니다: ${err.message}`);
    }
  };

  // LSTCreator로 이동하는 함수
  const navigateToLSTCreator = () => {
    setShowLSTCreator(true);
  };

  // LSTCreator 컴포넌트가 필요한 경우, 여기서 임포트하고 조건부 렌더링 처리
  // import { LSTCreator } from './LSTCreator';
  if (showLSTCreator) {
    // 라우팅 사용하지 않는 경우 아래 주석 해제
    return <LSTCreator />;
  }

  return (
    <section className="flex flex-col justify-center min-h-screen px-4 sm:px-8 pt-16 sm:pt-20">
      <div className="w-full max-w-2xl">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 sm:mb-8">Welcome to ForrestPad</h1>

        {/* 지갑 상태 영역 */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h2 className="text-lg font-medium mb-2">지갑 상태</h2>
          <p className="mb-4">{publicKey ? `연결됨: ${publicKey.toString().slice(0, 6)}...${publicKey.toString().slice(-4)}` : "지갑이 연결되지 않았습니다"}</p>
          
          {!publicKey && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-700 mb-4">
              LST 토큰을 생성하려면 먼저 지갑을 연결해 주세요.
            </div>
          )}
          
          <button
            onClick={checkWalletConnection}
            className="text-sm bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            지갑 상태 확인
          </button>
          
          {error && (
            <div className="mt-2 p-2 bg-red-100 text-red-700 rounded text-xs">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mt-2 p-2 bg-green-100 text-green-700 rounded text-xs">
              {success}
            </div>
          )}
          
          {walletInfo && (
            <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
              {walletInfo}
            </pre>
          )}
        </div>
        
        {/* 기능 버튼 영역 */}
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
          {/* react-router 사용 경우 */}
          {/* <Link 
            to="/dashboard" 
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors text-center text-lg"
          >
            대시보드로 이동
          </Link> */}
          
          {/* 직접 네비게이션 처리 경우 */}
          <button 
            onClick={navigateToLSTCreator}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={!publicKey}
          >
            LST 토큰 생성하기
          </button>
        </div>
        
        {/* 추가 기능 영역 */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">ForrestPad 기능</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>LST 토큰 생성 및 관리</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>스테이킹 풀 설정</span>
            </li>
            <li className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>실시간 스테이킹 수익 모니터링</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};