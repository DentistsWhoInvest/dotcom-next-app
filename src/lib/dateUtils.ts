export function processDate(publishDate: string): any {
  const date = new Date(publishDate);

  // Extract the day, month, and year
  const day = date.getDate();
  const year = date.getFullYear();

  // Get the month name
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = monthNames[date.getMonth()];

  // Format the time (hours and minutes)
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  // Convert 24-hour format to 12-hour format
  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12 || 12; // Convert 0 hours to 12

  // Format the minutes with leading zeros if necessary
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  const publishedDate = `${month} ${day}, ${year}`;
  const publishedTime = `${hours}:${formattedMinutes} ${ampm}`;
  return { publishedDate, publishedTime };
}
