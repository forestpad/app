import React, { useState, useRef, useCallback } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { 
  Connection,
  PublicKey, 
  Transaction, 
  Keypair,
  SystemProgram,
  sendAndConfirmTransaction
} from '@solana/web3.js';
import { 
  AuthorityType,
  createSetAuthorityInstruction,
  createMint,
  getMint,
} from '@solana/spl-token';

// Metaplex 관련 임포트 제거 (브라우저 호환성 개선)

// Sanctum 지갑 주소
const SanctumWalletAddress = new PublicKey('GRwm4EXMyVwtftQeTft7DZT3HBRxx439PrKq4oM6BwoZ');

export const LSTCreator = () => {
  const { connection } = useConnection();
  const wallet = useWallet();
  const { publicKey, sendTransaction, signTransaction }: any = wallet;
  
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenDescription, setDescription] = useState('');
  const [tokenImageUrl, setTokenImageUrl] = useState('');
  const [offchainMetadataUrl, setOffchainMetadataUrl] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [metadataAddress, setMetadataAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [connectionStatus, setConnectionStatus] = useState('');
  
  const logoInputRef = useRef(null);

  // 지갑 연결 상태 확인 함수
  const checkWalletConnection = async () => {
    if (!publicKey) {
      setError('지갑이 연결되지 않았습니다.');
      setConnectionStatus('');
      return false;
    }
    
    try {
      const balance = await connection.getBalance(publicKey);
      const solBalance = balance / 1000000000;
      
      setConnectionStatus(`연결됨: ${publicKey.toString()}, 잔액: ${solBalance} SOL`);
      return true;
    } catch (err) {
      console.error('지갑 연결 확인 오류:', err);
      setError(`지갑 연결 확인 중 오류가 발생했습니다: ${err.message}`);
      setConnectionStatus('');
      return false;
    }
  };
  
  // 컴포넌트 마운트 시 지갑 연결 확인
  React.useEffect(() => {
    if (publicKey) {
      checkWalletConnection();
    } else {
      setConnectionStatus('');
    }
  }, [publicKey]);
  
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    // 실제 구현에서는 여기서 IPFS나 Arweave 등에 이미지를 업로드하고 URL을 받아옵니다.
    // 예시를 위해 가짜 URL을 사용합니다.
    setTokenImageUrl(`https://arweave.net/your-image-hash`);
    
    alert('실제 구현에서는 이미지를 IPFS나 Arweave에 업로드해야 합니다.');
  };
  
  const prepareOffchainMetadata = async () => {
    if (!await checkWalletConnection()) return;
    
    setIsLoading(true);
    setCurrentStep(2);
    setError('');
    
    try {
      // 오프체인 메타데이터 JSON 생성
      const offchainMetadata = {
        name: tokenName,
        symbol: tokenSymbol,
        description: tokenDescription,
        image: tokenImageUrl
      };
      
      // 실제로는 이 JSON을 IPFS나 Arweave에 업로드해야 합니다
      console.log('오프체인 메타데이터:', offchainMetadata);
      
      // 예시를 위해 가짜 URL을 사용합니다.
      setOffchainMetadataUrl(`https://arweave.net/your-metadata-hash`);
      setSuccess('오프체인 메타데이터가 준비되었습니다. (실제 환경에서는 업로드 필요)');
      
      alert('실제 구현에서는 메타데이터를 IPFS나 Arweave에 업로드해야 합니다.');
      
    } catch (err) {
      console.error('오프체인 메타데이터 준비 오류:', err);
      setError(`오프체인 메타데이터 준비 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 지갑 어댑터와 연동할 수 있는 서명자 함수 생성 (브라우저 호환성 개선)
  const createMintWithAdapter = useCallback(async (mintKeypair) => {
    if (!publicKey || !signTransaction) {
      throw new Error('지갑이 연결되지 않았거나 서명 기능을 사용할 수 없습니다.');
    }
    
    try {
      // 계정 생성 명령어
      const lamports = await connection.getMinimumBalanceForRentExemption(
        82 // SPL 토큰 민트 계정 크기
      );
      
      const createAccountIx = SystemProgram.createAccount({
        fromPubkey: publicKey,
        newAccountPubkey: mintKeypair.publicKey,
        lamports,
        space: 82,
        programId: new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA') // SPL Token 프로그램 ID
      });
      
      // 민트 초기화 명령어
      const splToken = await import('@solana/spl-token');
      const initMintIx = splToken.createInitializeMintInstruction(
        mintKeypair.publicKey,
        9, // 소수점 자리수
        publicKey,
        publicKey
      );
      
      // 트랜잭션 생성 및 전송
      const transaction = new Transaction().add(createAccountIx).add(initMintIx);
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      
      // 트랜잭션에 서명
      transaction.partialSign(mintKeypair);
      const signedTx = await signTransaction(transaction);
      
      // 서명된 트랜잭션 전송
      const signature = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(signature, 'confirmed');
      
      return mintKeypair.publicKey;
    } catch (err) {
      console.error('민트 생성 오류:', err);
      throw new Error(`민트 생성 중 오류: ${err.message}`);
    }
  }, [connection, publicKey, signTransaction]);
  
  const createTokenMint = async () => {
    if (!await checkWalletConnection()) return;
    
    if (!offchainMetadataUrl) {
      setError('오프체인 메타데이터 URL이 필요합니다.');
      return;
    }
    
    setIsLoading(true);
    setCurrentStep(3);
    setError('');
    setSuccess('');
    
    try {
      // 토큰 민트 키페어 생성
      const mintKeypair = Keypair.generate();
      console.log('민트 키페어 생성됨:', mintKeypair.publicKey.toString());
      
      // 지갑 어댑터를 사용하여 민트 생성
      const mintPubkey = await createMintWithAdapter(mintKeypair);
      
      console.log('민트 주소 생성됨:', mintPubkey.toString());
      
      // 민트 정보 저장
      setMintAddress(mintPubkey.toString());
      setMetadataAddress('메타데이터 없음 - 기본 SPL 토큰');
      setSuccess(`LST 토큰이 생성되었습니다! Mint 주소: ${mintPubkey.toString()}`);
      
    } catch (err) {
      console.error('토큰 민트 생성 오류:', err);
      setError(`토큰 민트 생성 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const disableFreezeAuthority = async () => {
    if (!await checkWalletConnection()) return;
    
    if (!mintAddress) {
      setError('민트 주소가 필요합니다.');
      return;
    }
    
    setIsLoading(true);
    setCurrentStep(4);
    setError('');
    setSuccess('');
    
    try {
      const mintPublicKey = new PublicKey(mintAddress);
      
      // Freeze authority 제거
      const disableFreezeInstruction = createSetAuthorityInstruction(
        mintPublicKey,
        publicKey,
        AuthorityType.FreezeAccount,
        null // null로 설정하여 authority 제거
      );
      
      const transaction: any = new Transaction().add(disableFreezeInstruction);
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      setSuccess('Freeze authority가 성공적으로 비활성화되었습니다.');
      
    } catch (err) {
      console.error('Freeze authority 비활성화 오류:', err);
      setError(`Freeze authority 비활성화 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const transferMintAuthority = async () => {
    if (!await checkWalletConnection()) return;
    
    if (!mintAddress) {
      setError('민트 주소가 필요합니다.');
      return;
    }
    
    setIsLoading(true);
    setCurrentStep(5);
    setError('');
    setSuccess('');
    
    try {
      const mintPublicKey = new PublicKey(mintAddress);
      
      // 민트 권한을 Sanctum에 이전
      const transferMintInstruction = createSetAuthorityInstruction(
        mintPublicKey,
        publicKey,
        AuthorityType.MintTokens,
        SanctumWalletAddress
      );
      
      const transaction: any = new Transaction().add(transferMintInstruction);
      transaction.feePayer = publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
      
      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');
      
      setSuccess('민트 권한이 성공적으로 Sanctum에 이전되었습니다.');
      
    } catch (err) {
      console.error('민트 권한 이전 오류:', err);
      setError(`민트 권한 이전 중 오류가 발생했습니다: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  // 처음으로 돌아가기 함수 (모든 상태 초기화)
  const resetToStart = () => {
    setTokenName('');
    setTokenSymbol('');
    setDescription('');
    setTokenImageUrl('');
    setOffchainMetadataUrl('');
    setMintAddress('');
    setMetadataAddress('');
    setCurrentStep(1);
    setError('');
    setSuccess('');
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center">LST 토큰 생성하기</h1>
      
      {/* 지갑 연결 상태 */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-sm">
          {connectionStatus || '지갑이 연결되지 않았습니다. 지갑을 연결해 주세요.'}
        </p>
      </div>
      
      {/* 단계 표시 */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div 
              key={step} 
              className={`w-1/5 text-center relative ${
                currentStep >= step ? 'text-blue-600' : 'text-gray-400'
              }`}
            >
              <div className={`h-8 w-8 rounded-full flex items-center justify-center mx-auto mb-1 ${
                currentStep >= step ? 'bg-blue-600 text-white' : 'bg-gray-200'
              }`}>
                {step}
              </div>
              <div className="text-xs">
                {step === 1 && '정보 입력'}
                {step === 2 && '메타데이터'}
                {step === 3 && '민트 생성'}
                {step === 4 && 'Freeze 해제'}
                {step === 5 && '권한 이전'}
              </div>
              {step < 5 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 ${
                  currentStep > step ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>
      
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              토큰 이름
            </label>
            <input 
              type="text" 
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="예: Power Staked SOL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              토큰 심볼
            </label>
            <input 
              type="text" 
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="예: pwrSOL"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              설명
            </label>
            <textarea 
              value={tokenDescription}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="토큰에 대한 설명을 입력하세요."
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              토큰 로고
            </label>
            <input 
              type="file"
              ref={logoInputRef}
              onChange={handleImageUpload}
              className="w-full"
              accept="image/*"
            />
            <p className="text-xs text-gray-500 mt-1">
              이미지는 Arweave 또는 IPFS에 저장되어야 합니다.
            </p>
          </div>
          
          <button
            onClick={prepareOffchainMetadata}
            disabled={!publicKey || !tokenName || !tokenSymbol || !tokenDescription || !tokenImageUrl || isLoading}
            className={`w-full py-2 px-4 rounded-md ${
              !publicKey || !tokenName || !tokenSymbol || !tokenDescription || !tokenImageUrl || isLoading
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? '처리 중...' : '다음: 오프체인 메타데이터 준비'}
          </button>
        </div>
      )}
      
      {currentStep === 2 && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-md">
            <h3 className="text-lg font-medium mb-2">오프체인 메타데이터</h3>
            <pre className="bg-gray-100 p-2 rounded text-sm overflow-auto">
              {JSON.stringify({
                name: tokenName,
                symbol: tokenSymbol,
                description: tokenDescription,
                image: tokenImageUrl
              }, null, 2)}
            </pre>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              오프체인 메타데이터 URL
            </label>
            <input 
              type="text" 
              value={offchainMetadataUrl}
              onChange={(e) => setOffchainMetadataUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="예: https://arweave.net/your-metadata-hash"
            />
            <p className="text-xs text-gray-500 mt-1">
              실제 구현에서는 위 메타데이터를 Arweave/IPFS에 업로드하고 URL을 입력해야 합니다.
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setCurrentStep(1)}
              className="w-1/3 py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              이전 단계
            </button>
            
            <button
              onClick={createTokenMint}
              disabled={!publicKey || !offchainMetadataUrl || isLoading}
              className={`w-2/3 py-2 px-4 rounded-md ${
                !publicKey || !offchainMetadataUrl || isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? '처리 중...' : '다음: 토큰 민트 생성'}
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 3 && mintAddress && (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-medium text-green-800 mb-2">토큰 민트 생성 완료!</h3>
            <div className="mb-2">
              <span className="font-medium">민트 주소:</span> {mintAddress}
            </div>
            <div>
              <span className="font-medium">메타데이터 주소:</span> {metadataAddress}
            </div>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setCurrentStep(2)}
              className="w-1/3 py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              이전 단계
            </button>
            
            <button
              onClick={disableFreezeAuthority}
              disabled={isLoading}
              className={`w-2/3 py-2 px-4 rounded-md ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? '처리 중...' : '다음: Freeze Authority 비활성화'}
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 4 && (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-medium text-green-800 mb-2">Freeze Authority 비활성화 완료!</h3>
            <p>이제 최종 단계인 민트 권한을 Sanctum에게 이전합니다.</p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setCurrentStep(3)}
              className="w-1/3 py-2 px-4 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800"
            >
              이전 단계
            </button>
            
            <button
              onClick={transferMintAuthority}
              disabled={isLoading}
              className={`w-2/3 py-2 px-4 rounded-md ${
                isLoading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? '처리 중...' : '다음: 민트 권한 Sanctum에 이전'}
            </button>
          </div>
        </div>
      )}
      
      {currentStep === 5 && (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-md">
            <h3 className="text-lg font-medium text-green-800 mb-2">모든 과정이 완료되었습니다!</h3>
            <p className="mb-4">
              축하합니다! LST 토큰 설정이 완료되었습니다. 이제 Sanctum 팀에 연락하여 스테이크 풀을 시작하세요.
            </p>
            <div className="mb-2">
              <span className="font-medium">민트 주소:</span> {mintAddress}
            </div>
            <div>
              <span className="font-medium">메타데이터 주소:</span> {metadataAddress}
            </div>
          </div>
          
          <button
            onClick={resetToStart}
            className="w-full py-2 px-4 rounded-md bg-gray-600 hover:bg-gray-700 text-white"
          >
            처음으로 돌아가기
          </button>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      {success && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-md">
          {success}
        </div>
      )}
    </div>
  );
};

export default LSTCreator;