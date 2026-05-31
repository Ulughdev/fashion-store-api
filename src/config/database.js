// const mongoose = require("mongoose");

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB connected ✅");
//   } catch (err) {
//     console.error("MongoDB connection error ❌", err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MONGO_URI:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected ✅");

    // Default kategoriyalarni avtomatik yaratish
    const Category = require("../models/category.model");
    const count = await Category.countDocuments();
    if (count <= 1) {
      const defaults = ["Erkaklar", "Ayollar", "Bolalar"];
      for (const name of defaults) {
        const slug = name.toLowerCase().replace("'", "");
        const exists = await Category.findOne({ slug });
        if (!exists) {
          await Category.create({ name });
          console.log(`Seeded category: ${name} ✅`);
        }
      }
    }
  } catch (err) {
    console.error("MongoDB connection error ❌", err);
    process.exit(1);
  }
};

module.exports = connectDB;
