const mongoose = require("mongoose");

// Define a schema
const profileImageSchema = new mongoose.Schema({
  urls: [String],
});

// Create a model
const ProfileImage = mongoose.model("ProfileImage", profileImageSchema);

async function getRandomUrl() {
  try {
    // Use aggregation to sample one random document
    const result = await ProfileImage.aggregate([{ $sample: { size: 1 } }]);
    if (result.length > 0 && result[0].urls && result[0].urls.length > 0) {
      // Select a random URL from the array in the document
      const urls = result[0].urls;
      const randomUrl = urls[Math.floor(Math.random() * urls.length)];
      return randomUrl;
    } else {
      console.log("No URLs found");
      return null;
    }
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

module.exports = getRandomUrl;
