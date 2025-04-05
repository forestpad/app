import { useState } from 'react';

export const Launch = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    uri: '',
    originTokenAddress: '',
    sellerFeeBasisPoints: 0,
    creators: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission logic
    console.log('Form submitted:', formData);
  };

  return (
    <div className="bg-[#0F1115] text-white min-h-screen pt-16">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Create Staking Pool</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Token Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1F2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter token name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Token Symbol</label>
              <input
                type="text"
                name="symbol"
                value={formData.symbol}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1F2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter token symbol"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Metadata URI</label>
              <input
                type="text"
                name="uri"
                value={formData.uri}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1F2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter metadata URI"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Original Token Address</label>
              <input
                type="text"
                name="originTokenAddress"
                value={formData.originTokenAddress}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1F2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter original token address"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Seller Fee Basis Points (0-10000)</label>
              <input
                type="number"
                name="sellerFeeBasisPoints"
                value={formData.sellerFeeBasisPoints}
                onChange={handleInputChange}
                min="0"
                max="10000"
                className="w-full px-4 py-3 bg-[#1F2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Creators (JSON string)</label>
              <input
                type="text"
                name="creators"
                value={formData.creators}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-[#1F2937] rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder='[{"address":"...","share":100}]'
              />
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-semibold transition-colors"
            >
              Create Staking Pool
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};