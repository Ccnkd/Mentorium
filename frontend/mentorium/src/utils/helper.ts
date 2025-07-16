export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@(st\.)?knust\.edu\.gh$/;
  return re.test(email);
}