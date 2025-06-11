// src/utils/helpers.js
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(value);
};

export const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getStatusColor = (status) => {
  const colors = {
    active: 'bg-blue-100 text-blue-800',
    late: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    defaulted: 'bg-red-100 text-red-800'
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  // Simple formatting for Philippine numbers
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
  }
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{4})(\d{3})(\d{4})/, '$1 $2 $3');
  }
  return phone;
};