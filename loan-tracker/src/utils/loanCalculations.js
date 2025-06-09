export const calculateMonthlyPayment = (principal, terms, interestRate) => {
  const monthlyRate = interestRate / 100 / 12;
  return principal * monthlyRate * Math.pow(1 + monthlyRate, terms) / 
         (Math.pow(1 + monthlyRate, terms) - 1);
};

export const calculateLoanStats = (loans) => {
  return loans.reduce((stats, loan) => {
    stats.totalLoans += 1;
    if (loan.status === 'late') stats.latePayments += 1;
    stats.totalPaid += loan.totalPaid;
    return stats;
  }, { totalLoans: 0, latePayments: 0, totalPaid: 0 });
};