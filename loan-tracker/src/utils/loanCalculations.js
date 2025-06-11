// src/utils/loanCalculations.js
export const calculateLoanDetails = (
  totalPrice,
  downpayment,
  terms,
  monthlyInterestRate
) => {
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

export const calculateRemainingBalance = (totalAmount, totalPaid) => {
  return parseFloat((totalAmount - totalPaid).toFixed(2));
};

export const checkOverdueStatus = (loan) => {
  if (loan.status === 'completed') return {};

  const today = new Date();
  const dueDate = new Date(loan.nextDueDate);
  const daysOverdue = Math.floor((today - dueDate) / (1000 * 60 * 60 * 24));
  
  if (daysOverdue > 5) {
    const penalty = loan.monthlyDue * 0.03 * daysOverdue;
    return {
      status: `delayed (${daysOverdue} days)`,
      penalty: parseFloat(penalty.toFixed(2)),
      amountDue: loan.monthlyDue + penalty
    };
  }
  return {};
};

export const calculateNextDueDate = (loan) => {
  const lastDate = loan.lastPaymentDate 
    ? new Date(loan.lastPaymentDate) 
    : new Date(loan.startDate);
  const nextDate = new Date(lastDate);
  nextDate.setMonth(nextDate.getMonth() + 1);
  return nextDate.toISOString();
};

export const getPaymentStatus = (dueDate, paymentDate) => {
  if (!paymentDate) return 'pending';
  return new Date(paymentDate) <= new Date(dueDate) ? 'on-time' : 'late';
};