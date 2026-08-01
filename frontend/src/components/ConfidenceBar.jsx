function ConfidenceBar({ value }) {
  return (
    <div className="mt-4">
      <div className="flex justify-between text-sm font-medium">
        <span>Confidence</span>
        <span>{value}%</span>
      </div>

      <div className="mt-2 h-3 w-full rounded-full bg-gray-200">
        <div
          className="h-3 rounded-full bg-indigo-600 transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export default ConfidenceBar;