export function extractTime(dataString) {
  const date = new Date(dataString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
}

//get single digit after zero
function padZero(number) {
  return number.toString().padStart(2, "0");
}
