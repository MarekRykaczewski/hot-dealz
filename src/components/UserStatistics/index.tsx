export const UserStatistics = ({ statisticsData }) => (
  <div className="bg-white flex flex-col items-center justify-center p-4 shadow-md rounded-xl">
    <h3 className="text-2xl h-fit mb-2 bg-white rounded-lg text-center font-semibold">
      Statistics
    </h3>
    <div className="flex flex-col gap-4">
      {statisticsData.map(({ icon, label, value }) => (
        <div
          key={label}
          className="flex flex-row gap-2 items-center justify-start"
        >
          {icon}
          <p className="text-lg font-bold">{value}</p>
          <p className="text-gray-600 text-sm">{label}</p>
        </div>
      ))}
    </div>
  </div>
);
