export const UserStatistics = ({ statisticsData }) => (
  <div className="col-span-1">
    <h3 className="text-2xl mb-4 h-fit shadow-md bg-white rounded-lg p-4 text-center font-semibold">
      Statistics
    </h3>

    <div className="bg-white flex items-center justify-center p-4 rounded-lg shadow-md">
      <div className="grid grid-cols-2 gap-4">
        {statisticsData.map(({ icon, label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center justify-center mb-2"
          >
            {icon}
            <div className="flex flex-col items-center  gap-2">
              <p className="text-gray-600">{label}</p>
              <p className="text-2xl font-bold">{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
