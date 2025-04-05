import { useState } from 'react';
import { Rocket, ShieldCheck, Gift, Coins, RefreshCcw, Users2, PieChart, HandCoins } from "lucide-react"

export const Launch = () => {
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    uri: '',
    originTokenAddress: '',
    sellerFeeBasisPoints: 0,
    creators: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'sellerFeeBasisPoints') {
      const numValue = parseInt(value);
      if (isNaN(numValue)) {
        setValidationErrors(prev => ({ ...prev, [name]: 'Please enter a valid number' }));
        return;
      }
      if (numValue < 0 || numValue > 10000) {
        setValidationErrors(prev => ({ ...prev, [name]: 'Value must be between 0 and 10000' }));
        return;
      }
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    setFormData(prev => ({
      ...prev,
      [name]: name === 'sellerFeeBasisPoints' ? parseInt(value) || 0 : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numValue = formData.sellerFeeBasisPoints;
    if (numValue < 0 || numValue > 10000) {
      setValidationErrors(prev => ({ ...prev, sellerFeeBasisPoints: 'Value must be between 0 and 10000' }));
      return;
    }
    console.log('Form submitted:', formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="bg-[#1A1C2D] min-h-screen text-white">
      <div className="container mx-auto px-4 py-16">

        {/* Benefits Section */}
        <section className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Launch on ForestPad?</h2>
            <p className="text-gray-600 mt-2">Our innovative LST model creates a win-win ecosystem for projects and investors</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-md transition duration-300 border">
              <div className="flex items-center gap-3 mb-4">
                <Rocket className="text-green-500" />
                <h3 className="text-xl font-semibold text-green-500">Fast Funding</h3>
              </div>
              <p className="text-gray-600">Quickly secure funding through SOL staking without giving up equity or initial costs. Get your project off the ground in record time.</p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-md transition duration-300 border">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-green-500" />
                <h3 className="text-xl font-semibold text-green-500">Investor Trust</h3>
              </div>
              <p className="text-gray-600">Build credibility through our verification process. Investors stake SOL with confidence knowing their principal is secure.</p>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 shadow hover:shadow-md transition duration-300 border">
              <div className="flex items-center gap-3 mb-4">
                <Gift className="text-green-500" />
                <h3 className="text-xl font-semibold text-green-500">Retention Incentives</h3>
              </div>
              <p className="text-gray-600">Create long-term investor relationships with built-in holding bonuses and automated token distributions.</p>
            </div>
          </div>
        </section>

        {/* Staking Pool Creation Form */}
        <div className="max-w-2xl mx-auto bg-gray-50 p-10 rounded-2xl shadow border relative">
          {showSuccess && (
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Staking pool creation submitted!
            </div>
          )}
          <h1 className="text-3xl font-bold text-green-600 mb-8 text-center">Create Staking Pool</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            {[
              { label: 'Token Name', name: 'name', type: 'text', placeholder: 'Enter token name' },
              { label: 'Token Symbol', name: 'symbol', type: 'text', placeholder: 'Enter token symbol' },
              { label: 'Metadata URI', name: 'uri', type: 'text', placeholder: 'Enter metadata URI' },
              { label: 'Original Token Address', name: 'originTokenAddress', type: 'text', placeholder: 'Enter original token address' },
              { label: 'Seller Fee Basis Points (0-10000)', name: 'sellerFeeBasisPoints', type: 'number', placeholder: '', min: 0, max: 10000 },
              { label: 'Creators (JSON string)', name: 'creators', type: 'text', placeholder: '[{"address":"...","share":100}]' },
            ].map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-black mb-2">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={(formData as any)[field.name]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-black"
                  placeholder={field.placeholder}
                  required={field.name !== 'creators'}
                  min={field.name === 'sellerFeeBasisPoints' ? 0 : undefined}
                  max={field.name === 'sellerFeeBasisPoints' ? 10000 : undefined}
                />
                {validationErrors[field.name] && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors[field.name]}</p>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold transition-colors"
            >
              Create Staking Pool
            </button>
          </form>
        </div>

        {/* Incentive Structure Section */}
        <section className="mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-green-600">Incentive Structure for Investors</h2>
            <p className="text-gray-600 mt-2">Show potential investors how they'll benefit from supporting your project</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-gray-100 rounded-2xl p-6 border shadow">
              <div className="flex items-center gap-3 mb-4">
                <Coins className="text-green-500" />
                <h3 className="text-xl font-semibold text-green-500">For Investors</h3>
              </div>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start gap-2"><HandCoins className="w-5 h-5 text-green-400 mt-1" /> Earn two income streams: SOL staking rewards + your project tokens</li>
                <li className="flex items-start gap-2"><ShieldCheck className="w-5 h-5 text-green-400 mt-1" /> Zero risk to principal - original SOL can be unstaked anytime</li>
                <li className="flex items-start gap-2"><Gift className="w-5 h-5 text-green-400 mt-1" /> Long-term holding bonuses increase token rewards over time</li>
                <li className="flex items-start gap-2"><Users2 className="w-5 h-5 text-green-400 mt-1" /> Direct communication with project team through AMA features</li>
              </ul>
            </div>
            <div className="bg-gray-100 rounded-2xl p-6 border shadow">
              <div className="flex items-center gap-3 mb-4">
                <RefreshCcw className="text-green-500" />
                <h3 className="text-xl font-semibold text-green-500">For Project Teams</h3>
              </div>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-start gap-2"><Gift className="w-5 h-5 text-green-400 mt-1" /> No upfront costs to launch your project - distribute tokens only</li>
                <li className="flex items-start gap-2"><Coins className="w-5 h-5 text-green-400 mt-1" /> Share staking rewards with your project and bootstrap operations</li>
                <li className="flex items-start gap-2"><RefreshCcw className="w-5 h-5 text-green-400 mt-1" /> Automatic token distribution reduces operational overhead</li>
                <li className="flex items-start gap-2"><PieChart className="w-5 h-5 text-green-400 mt-1" /> Real-time investment tracking and detailed investor analytics</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
