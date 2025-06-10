export const calculateMonthlyPayment = (principal, annualRate, months) => {
  const monthlyRate = annualRate / 12 / 100;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
    (Math.pow(1 + monthlyRate, months) - 1)
  ).toFixed(2);
};

export const calculateTotalInterest = (principal, annualRate, months) => {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
  return (monthlyPayment * months - principal).toFixed(2);
};

export const calculatePaymentSchedule = (principal, annualRate, months) => {
  const monthlyRate = annualRate / 12 / 100;
  const monthlyPayment = calculateMonthlyPayment(principal, annualRate, months);
  let balance = principal;
  const schedule = [];

  for (let i = 1; i <= months; i++) {
    const interest = balance * monthlyRate;
    const principalPaid = monthlyPayment - interest;
    balance -= principalPaid;

    schedule.push({
      month: i,
      payment: monthlyPayment,
      principal: principalPaid.toFixed(2),
      interest: interest.toFixed(2),
      balance: balance > 0 ? balance.toFixed(2) : '0.00'
    });
  }

  return schedule;
};