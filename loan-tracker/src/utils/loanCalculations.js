export const calculateMonthlyPayment = (totalPrice, downpayment, terms, monthlyInterestPct) => {
  const principal = totalPrice - downpayment;
  const totalInterest = principal * (monthlyInterestPct / 100) * terms;
  const totalAmount = principal + totalInterest;
  return parseFloat((totalAmount / terms).toFixed(2));
};

export const calculateTotalInterest = (totalPrice, downpayment, terms, monthlyInterestPct) => {
  const principal = totalPrice - downpayment;
  return parseFloat((principal * (monthlyInterestPct / 100) * terms).toFixed(2));
};

export const calculateLoanDetails = (totalPrice, downpayment, terms, monthlyInterestPct) => {
  const monthlyDue = calculateMonthlyPayment(totalPrice, downpayment, terms, monthlyInterestPct);
  const totalInterest = calculateTotalInterest(totalPrice, downpayment, terms, monthlyInterestPct);
  const totalAmount = (totalPrice - downpayment) + totalInterest;
  
  return {
    monthlyDue,
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    totalInterest
  };
};

export const getPaymentProgress = (totalPaid, totalAmount) => {
  const progress = (totalPaid / totalAmount) * 100;
  return Math.min(100, Math.max(0, parseFloat(progress.toFixed(2))));
};