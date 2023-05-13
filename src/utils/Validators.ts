export const isValidEmail = (email: string) => {
  // Regular expression for email validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email.toLowerCase());
};

export const minLengthValidator = (
  value: string,
  minLength: number
): boolean => {
  return value.trim().length >= minLength;
};

export const requiredValidator = (value: string): boolean => {
  return value.trim() !== "";
};
