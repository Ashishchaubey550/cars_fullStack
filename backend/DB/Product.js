const mongoose = require("mongoose");

// Define the Car schema with specific fields
const productSchema = new mongoose.Schema({
  company: { type: String, }, // Car company name
  model: { type: String,  },   // Car model
  color: { type: String,  },   // Car color
  distanceCovered: { type: Number,  }, // Distance covered in kilometers/miles
  modelYear: { type: Number, required: true },           // Manufacturing year of the car
  price: {  type: Number, },       // Price of the car
  image: { type: String,  },               // URL for the car image
});

// Export the Car model
module.exports = mongoose.model("Product", productSchema);



