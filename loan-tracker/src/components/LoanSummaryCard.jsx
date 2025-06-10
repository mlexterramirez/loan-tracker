import React from 'react';

const LoanSummaryCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-gray-500 text-sm font-medium mb-1">{title}</h3>
      <p className="text-2xl font-bold text-primary-600">{value}</p>
    </div>
  );
};

export default LoanSummaryCard;