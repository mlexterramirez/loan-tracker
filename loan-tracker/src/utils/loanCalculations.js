// src/utils/loanCalculations.js
export const calculateLoanDetails = (totalPrice, downpayment, terms, monthlyInterestRate) => {
  const principal = totalPrice - downpayment;
  const totalInterest = principal * (monthlyInterestRate / 100) * terms;
  const totalAmount = principal + totalInterest;
  const monthlyDue = totalAmount / terms;

  return {
    monthlyDue: parseFloat(monthlyDue.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    principal: parseFloat(principal.toFixed(2))
  };
};

export const checkOverdueStatus = (loan) => {
  if (loan.status === 'completed') return loan;

  const today = new Date();
  const dueDate = new Date(loan.nextDueDate);
  const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
  
  if (daysOverdue > 5) {
    // Check if this is a new overdue period (new month)
    const lastDueDate = loan.lastDueDate ? new Date(loan.lastDueDate) : dueDate;
    const isNewOverduePeriod = dueDate.getMonth() !== lastDueDate.getMonth() || 
                              dueDate.getFullYear() !== lastDueDate.getFullYear();
    
    let penalty = 0;
    let cumulativeAmount = loan.cumulativeAmount || 0;
    
    if (isNewOverduePeriod) {
      penalty = loan.monthlyDue * 0.03; // 3% one-time penalty
      cumulativeAmount += loan.monthlyDue + penalty;
    }

    return {
      ...loan,
      status: `delayed (${daysOverdue} days)`,
      penalty,
      cumulativeAmount,
      totalDue: cumulativeAmount,
      lastDueDate: loan.nextDueDate,
      isOverdue: true,
      overdueSince: loan.overdueSince || loan.nextDueDate
    };
  }
  return loan;
};

export const getCurrentOverdueLoans = (loans) => {
  return loans
    .map(loan => checkOverdueStatus(loan))
    .filter(loan => loan.isOverdue);
};

export const calculateNextDueDate = (loan) => {
  const lastDate = loan.lastPaymentDate 
    ? new Date(loan.lastPaymentDate) 
    : new Date(loan.startDate);
  const nextDate = new Date(lastDate);
  nextDate.setMonth(nextDate.getMonth() + 1);
  return nextDate.toISOString();
};

export const processPayment = (loan, paymentAmount) => {
  const amountDue = loan.totalDue || loan.monthlyDue;
  const isFullPayment = paymentAmount >= amountDue;
  
  return {
    isFullPayment,
    remainingAmount: isFullPayment ? paymentAmount - amountDue : 0,
    amountCleared: Math.min(paymentAmount, amountDue),
    amountDue
  };
};