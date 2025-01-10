import dotenv from "dotenv";
dotenv.config(); // Carga las variables del archivo .env

import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Asegurarse de que la URI de MongoDB está bien cargada
const mongoURI = process.env.MONGO_URI;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conectar a MongoDB Atlas
mongoose
  .connect(mongoURI, { // Usamos la URI cargada desde .env
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false, // Desactiva buffering
    serverSelectionTimeoutMS: 5000, // Timeout a 5 segundos
    socketTimeoutMS: 45000, // Timeout de socket
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
    process.exit(1);
  });

// Esquema de usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema, 'users'); // 'users' es el nombre de la colección

// Ruta de registro
app.post("/api/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save(); // Esto crea la colección 'users' si no existe

    res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (err) {
    console.error("Error al registrar el usuario:", err); // Esto imprimirá el error en la consola
    res.status(500).json({ message: "Error al registrar el usuario", error: err.message });
  }
});

// Ruta de login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Usuario no encontrado" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token });
  } catch (err) {
    console.error("Error al iniciar sesión:", err); // Esto imprimirá el error en la consola
    res.status(500).json({ message: "Error al iniciar sesión", error: err.message });
  }
});

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
