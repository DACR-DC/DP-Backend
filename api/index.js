const express = require("express");
const mongoose = require("mongoose");
const usuarioRoutes = require("../routes/usuarioRoutes.js");
const prodRoutes = require("../routes/prodRoutes.js");
const zonadispRoutes = require("../routes/zonadispRoutes.js");
const ordenRoutes = require("../routes/ordenRoutes.js");
const ventasRoutes = require("../routes/ventasRoutes.js");
const ventasPorMes = require("../routes/ventasPorMesRoutes.js");
const tokenRoutes = require("../routes/tokenRoutes.js");
const cors = require("cors");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


const upload = multer({ limits: { fileSize: 100 * 1024 * 1024 } });

const connectToDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/DulcePlacer_GT", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Conexión establecida");
  } catch (error) {
    console.error("Error al conectar:", error.message);
    process.exit(1);
  }
};

connectToDatabase();

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(upload.any());


app.get('/', (req, res) => {
  res.send('Backend...');
});

app.use("/api", usuarioRoutes);
app.use("/api", prodRoutes);
app.use("/api", zonadispRoutes);
app.use("/api", ordenRoutes);
app.use("/api", ventasRoutes);
app.use("/api", ventasPorMes);
app.use("/api", tokenRoutes);

app
  .listen(PORT, () => {
    console.log(`Servidor backend corriendo en el puerto ${PORT}`);
  })
  .on("error", (error) => {
    console.error("Error al iniciar el servidor:", error.message);
    process.exit(1);
  });

  module.exports = app;