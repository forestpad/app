import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchLsts, LstData } from '../../services/api';

export const Explore = () => {
  const navigate = useNavigate();
  const [lsts, setLsts] = useState<LstData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLsts = async () => {
      const data = await fetchLsts();
      setLsts(data);
      setLoading(false);
    };
    loadLsts();
  }, []);

  const renderBulletList = (meta: any) => (
    <ul className="text-gray-300 space-y-2">
      {meta?.["First bullet point"] && meta["First bullet point"].length > 0 && (
        <li>• {meta["First bullet point"]}</li>
      )}
      {meta?.["Second bullet point"] && meta["Second bullet point"].length > 0 && (
        <li>• {meta["Second bullet point"]}</li>
      )}
      {meta?.["Third bullet point"] && meta["Third bullet point"].length > 0 && (
        <li>• {meta["Third bullet point"]}</li>
      )}
    </ul>
  );

  const getRandomTwo = (array: LstData[]) => {
    if (array.length < 2) return [];
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 2);
  };

  const filteredLsts = lsts
    .filter((lst) => !lst.name.includes('(Sanctum Automated)'))
    .filter((lst) => lst.meta?.["First bullet point"]?.length > 0);

  const featured = filteredLsts.length >= 2 ? getRandomTwo(filteredLsts) : [];
  const [featured1, featured2] = featured;
  const rest = filteredLsts.filter((lst) => lst !== featured1 && lst !== featured2);

  return (
    <div className="min-h-screen bg-[#1A1C2D] text-white px-4 py-16">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">🔥 Choose a project to support</h1>
        </div>

        {/* Featured Section */}
        {featured1 && featured2 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {[featured1, featured2].map((lst, index) => (
              <div
                key={index}
                className="bg-[#1F2937] p-6 rounded-xl hover:bg-[#22C55E]/10 transition-all cursor-pointer"
                onClick={() => navigate(`/detail/${lst.mint}`)}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img src={lst.logo_uri} alt={lst.name} className="w-12 h-12 rounded-full" />
                  <h2 className="text-2xl font-bold">{lst.name}</h2>
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-1">Key Points</h3>
                  {renderBulletList(lst.meta)}
                </div>
                <button className="w-full py-3 mt-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-lg font-semibold transition-colors">
                  Stake Now
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">View more projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {loading ? (
              <div className="col-span-full text-center py-8 text-gray-400">Loading projects...</div>
            ) : (
              rest.map((lst, index) => (
                <div
                  key={index}
                  className="bg-[#1F2937] p-4 rounded-xl hover:bg-[#22C55E]/10 transition-all cursor-pointer"
                  onClick={() => navigate(`/detail/${lst.meta?.[`Mint address`]}`)}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img src={lst.logo_uri} alt={lst.name} className="w-10 h-10 rounded-full" />
                    <h3 className="font-semibold">{lst.name}</h3>
                  </div>
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-1">Description</h4>
                    {renderBulletList(lst.meta)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
