export const validateEmail = (email: string): boolean => {
  const emailRegex = /^\S+@\S+\.\S+$/;
  return emailRegex.test(email);
};

export const validatePhoneNumber = (phone?: string): boolean => {
  if (!phone) return true; // Optional field, valid if undefined
  const phoneRegex = /^[0-9]{10,15}$/;
  return phoneRegex.test(phone);
};

export const validateBirthday = (date?: string): boolean => {
  if (!date) return true; // Optional field, valid if undefined
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  return dateRegex.test(date);
};

export const validateIpAddress = (ip?: string): boolean => {
  if (!ip) return true; // Optional field, valid if undefined
  const ipRegex = /^(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|[0-1]?[0-9]{1,2})){3}$/;
  return ipRegex.test(ip);
};

export const validatePassword = (password: string): boolean => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}