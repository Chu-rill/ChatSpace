const mongoose = require("mongoose");

// Define a schema
const profileImageSchema = new mongoose.Schema({
  urls: [String],
});

// Create a model
const ProfileImage = mongoose.model("ProfileImage", profileImageSchema);

// Function to get all URLs
async function getAllUrls() {
  try {
    // Fetch all documents
    const result = await ProfileImage.findOne({}); // Assuming only one document with URLs
    if (result && result.urls && result.urls.length > 0) {
      return result.urls;
    } else {
      console.log("No URLs found");
      return [];
    }
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
}

// Function to get a random URL
async function getRandomUrl() {
  try {
    // Get all URLs
    const urls = await getAllUrls();
    if (urls.length > 0) {
      // Select a random URL from the array
      const randomUrl = urls[Math.floor(Math.random() * urls.length)];
      return randomUrl;
    } else {
      console.log("No URLs available");
      return null;
    }
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

module.exports = getRandomUrl;
