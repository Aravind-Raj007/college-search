const categoryColors = {
  OC: 'text-black',
  BC: 'text-blue-700',
  BCM: 'text-fuchsia-700',
  MBC: 'text-green-700',
  MBCDNC: 'text-green-700',
  MBCV: 'text-green-700',
  SC: 'text-red-600',
  SCA: 'text-blue-600',
  ST: 'text-gray-700',
};

const CollegeList = ({ colleges, page = 1, userCutoff, userCategory }) => {
  // Only sort if both cutoff and category are provided
  const sortedColleges = (userCutoff && userCategory)
    ? [...colleges].sort((a, b) => {
        const aVal = parseFloat(a[userCategory]);
        const bVal = parseFloat(b[userCategory]);
        // If value is missing, treat as Infinity (put at end)
        const aDiff = isNaN(aVal) ? Infinity : Math.abs(aVal - userCutoff);
        const bDiff = isNaN(bVal) ? Infinity : Math.abs(bVal - userCutoff);
        return aDiff - bDiff;
      })
    : colleges;

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      <div className="px-6 py-4 text-base text-gray-700 flex flex-wrap items-center gap-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-100">
        <span className="font-bold text-blue-700">Page Number: <span className="text-black">{page}</span></span>
        <span className="font-bold text-purple-700">Number of Results: <span className="text-black">{sortedColleges.length}</span></span>
        {userCutoff && <span className="font-bold text-pink-700">Your Cutoff Mark: <span className="text-black">{userCutoff}</span></span>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 rounded-xl overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-100 to-purple-100">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-blue-700 uppercase tracking-wider">College Code</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-blue-700 uppercase tracking-wider">College Name</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-purple-700 uppercase tracking-wider">Branch Code</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-pink-700 uppercase tracking-wider">Branch Name</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-black uppercase tracking-wider">OC</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-blue-700 uppercase tracking-wider">BC</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-fuchsia-700 uppercase tracking-wider">BCM</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-green-700 uppercase tracking-wider">MBC</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-green-700 uppercase tracking-wider">MBCDNC</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-green-700 uppercase tracking-wider">MBCV</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-red-600 uppercase tracking-wider">SC</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-blue-600 uppercase tracking-wider">SCA</th>
              <th className="px-4 py-3 text-left text-xs font-extrabold text-gray-700 uppercase tracking-wider">ST</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {sortedColleges.map((college, index) => (
              <tr key={index} className={
                `hover:bg-blue-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`
              }>
                <td className="px-4 py-3 whitespace-nowrap font-semibold text-gray-700">{college.coc}</td>
                <td className="px-4 py-3 whitespace-normal break-words font-semibold text-blue-900 max-w-xs" style={{maxWidth: '18rem'}}>{college.con}</td>
                <td className="px-4 py-3 whitespace-nowrap text-purple-700 font-bold">{college.brc}</td>
                <td className="px-4 py-3 whitespace-normal break-words text-pink-700 font-bold max-w-xs" style={{maxWidth: '16rem'}}>{college.brn}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.OC}`}>{college.OC}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.BC}`}>{college.BC}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.BCM}`}>{college.BCM}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.MBC}`}>{college.MBC}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.MBCDNC}`}>{college.MBCDNC}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.MBCV}`}>{college.MBCV}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.SC}`}>{college.SC}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.SCA}`}>{college.SCA}</td>
                <td className={`px-4 py-3 whitespace-nowrap font-bold ${categoryColors.ST}`}>{college.ST}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CollegeList; 