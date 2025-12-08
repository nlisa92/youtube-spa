export function formatViews(num) {
  if (num >= 1000000) {
    return Math.floor(num / 1000000) + " млн";
  } else if (num >= 1000) {
    return Math.floor(num / 1000) + " тыс.";
  }
  return num.toString();
}
