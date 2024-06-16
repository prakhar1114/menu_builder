import Fuse from 'fuse.js';
import foodItems from "./FoodItems";

const getBaseUrl = () => {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`;
  };

export default getBaseUrl;
export {getWeekMapping};

function getWeekMapping() {
  const today = new Date(); // Get the current date
  const dayOfWeek = today.getDay(); // Get today's day of the week (0-6, where 0 is Sunday)

  const weekMapping = {};

  // Loop through each day of the week
  for (let i = 0; i < 7; i++) {
    // Calculate the date offset from today to the current day of the loop
    const offset = i - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const dayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + offset);

    // Format the date and day name
    const dayName = dayDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get the day name
    const date = dayDate.toLocaleDateString('en-US', { day: '2-digit' }); // Format the date
    const month = dayDate.toLocaleDateString('en-US', { month: 'short' }); // Format the date

    // Add the mapping to the object
    weekMapping[dayName] = date + " " + month;
  }

  return weekMapping;
}

const options = {
  includeScore: true, // Include the score in the result
  findAllMatches: true, // When true, will continue searching even after a perfect match is found.
  threshold: 0.5 // Threshold for matching, with 0 being a perfect match and 1 matching nothing.
};
const fuse = new Fuse(foodItems, options);
export {fuse};