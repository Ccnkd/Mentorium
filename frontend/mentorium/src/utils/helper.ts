export function validateEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._%+-]+@(st\.)?knust\.edu\.gh$/;
  return re.test(email);
}

export function formatDate(date: Date | undefined) {
  if (!date) {
    return ""
  }
  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })
}