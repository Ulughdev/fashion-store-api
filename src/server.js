// const app = require("./app");
// const connectDB = require("./config/database");
// require("dotenv").config();

// const PORT = process.env.PORT || 3000;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT} 🚀`);
//   });
// });
const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} 🚀`);
  });
});
