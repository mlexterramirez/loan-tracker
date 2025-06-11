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

export const getPaymentStatus = (dueDate, paymentDate) => {
  if (!paymentDate) return 'pending';
  return new Date(paymentDate) <= new Date(dueDate) ? 'on-time' : 'late';
};