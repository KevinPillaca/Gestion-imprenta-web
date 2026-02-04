import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import productRoutes from "./routes/productos.routes";
import clienteRoutes from "./routes/cliente.routes";

const app = express();

app.use(cors());
app.use(express.json());

// llamamos a las rutas
app.use('/api/auth', authRoutes);

app.use("/uploads", express.static("uploads"));
app.use("/api/productos", productRoutes)

app.use("/clientes", clienteRoutes);



export default app;