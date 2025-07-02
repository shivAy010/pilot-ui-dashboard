export const EMAIL_MAX_LENGTH = 64;
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const passwordMinLength = 8;
export const passwordMaxLength = 64;

export function emailValidate(email: string): string {
  if (email.length > EMAIL_MAX_LENGTH) {
    return 'Email length exceeds the maximum limit';
  }
  if (!emailRegex.test(email)) {
    return 'Enter a valid email';
  }
  return '';
}

export function passwordValidate(password: string): string {
  if (password.length < passwordMinLength) {
    return 'Password must be at least 8 characters long';
  }
  if (password.length > passwordMaxLength) {
    return 'Password must be less than 64 characters long';
  }
//   if (!passwordRegex.test(password)) {
//     return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
//   }
  return '';
}

