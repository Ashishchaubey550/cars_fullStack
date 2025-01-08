const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config();
const multer = require("./multer-config"); // Import Multer configuration
const User = require("./DB/User"); // User model
const Product = require("./DB/Product"); // Product model

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve static files from "uploads"

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Database connected"))
  .catch((err) => console.error("Database connection error:", err));

// Register API
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).send({ error: "All fields are required." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ error: "Email is already registered." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    const result = await user.save();

    res.status(201).send({
      message: "User registered successfully",
      user: { id: result._id, name: result.name, email: result.email },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send({ error });
  }
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ result: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ result: "No user found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ result: "Invalid credentials" });
    }

    res.status(200).send({ id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).send({ error: "Server error" });
  }
});

// Add Product API
app.post("/add", multer.single("image"), async (req, res) => {
  const { company, model,  color, distanceCovered , modelYear , price , } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;
  if (!company || !model || !color || !distanceCovered || !modelYear || !price || !req.file) {
    return res.status(400).send({ error: "All fields and image are required." });
  }

  // Convert numeric fields to numbers
  const product = new Product({
    company,
    model,
    color,
    distanceCovered: Number(distanceCovered),
    modelYear: Number(modelYear),
    price: Number(price),
    image: `/uploads/${req.file.filename}`,
  });
  try{
  const result = await product.save();
  res.status(201).send(result);
  }catch (error) {
  console.error("Error saving product:", error);
  res.status(400).send({ error: error.message });
}
});

// Get Products API
app.get("/product", async (req, res) => {
  try {
    const products = await Product.find();
    if (products.length > 0) {
      res.send(products);
    } else {
      res.send({ result: "No products found" });
    }
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({ error: error.message });
  }
});

// Product DELETE

app.delete('/product/:id',async(req,res)=>{
  const result =  await Product.deleteOne({_id:req.params.id})
  res.send(result);

});


//Auto fill form

app.get("/product/:id",async (req,res)=>{
  let result = await Product.findOne({_id:req.params.id});
  if(result){
    res.send(result)
  }else {
    res.send({result:"No Record Found."})
  }
})


// update Product


app.put("/product/:id" ,async (req,res) => {
  let result = await Product.updateOne(
    {_id: req.params.id},
    {
      $set : req.body 
    }
  )
  res.send(result)
})


// Search Product

// app.get("/search/:key",async(req,res)=>{
//   let result = await Product.find({
//     "$or":[
//       {name:{ $regex: req.params.key}},
//       {category:{ $regex: req.params.key}},
//       {company:{ $regex: req.params.key}}
//     ]
//   });
//   res.send(result)
// })

app.get("/search/:key", async (req, res) => {
  try {
      if (!req.params.key) {
          return res.status(400).send({ message: "Search key is required" });
      }

      let result = await Product.find({
          "$or": [
              { name: { $regex: req.params.key, $options: "i" } },
              { category: { $regex: req.params.key, $options: "i" } },
              { company: { $regex: req.params.key, $options: "i" } }
          ]
      });

      if (result.length > 0) {
          res.send(result); // Return matching products
      } else {
          res.status(404).send({ message: "No matching products found" });
      }
  } catch (error) {
      console.error("Error in search route:", error);
      res.status(500).send({ message: "Server error" });
  }
});




// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
