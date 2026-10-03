const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const errorMiddleware = require("./middleware/errorMiddleware");

require("dotenv").config();

const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

connectDB();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/weather", weatherRoutes);

app.get("/", (req, res) => {
  res.send("Weather Now backend is running!");
});
app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});