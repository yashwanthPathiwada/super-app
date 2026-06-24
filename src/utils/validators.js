export const validateName = (name) => {
  if (!name || !name.trim()) return 'Name is required';
  if (name.trim().length < 2) return 'Name must be at least 2 characters';
  if (!/^[a-zA-Z\s.'-]+$/.test(name.trim())) return 'Name contains invalid characters';
  return '';
};

export const validateUsername = (username) => {
  if (!username || !username.trim()) return 'Username is required';
  if (username.trim().length < 3) return 'Username must be at least 3 characters';
  if (!/^[a-zA-Z0-9_]+$/.test(username.trim()))
    return 'Username can only contain letters, numbers, and underscores';
  return '';
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email is required';
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) return 'Enter a valid email address';
  return '';
};

export const validateMobile = (mobile) => {
  if (!mobile || !mobile.trim()) return 'Mobile number is required';
  const mobileRegex = /^[0-9]{10}$/;
  if (!mobileRegex.test(mobile.trim()))
    return 'Enter a valid 10-digit mobile number';
  return '';
};

export const validateRegistrationForm = (values) => ({
  name: validateName(values.name),
  username: validateUsername(values.username),
  email: validateEmail(values.email),
  mobile: validateMobile(values.mobile),
});

export const isFormValid = (errors) =>
  Object.values(errors).every((error) => error === '');
