import express from "express"
import eventosRoutes from "./routes/eventos.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";
import {noEncontrado} from "./middlewares/noEncontrado.js";
import {manejadorErrores} from "./middlewares/manejadorErrores.js";
import {logger} from "./middlewares/logger.js";

const app = express();
const PORT = 3000;

app.use(logger); // Middleware de registro de solicitudes
// Middleware incorporado por Express
app.use(express.json());

app.get('/', (req, res) => { 
    res.json({
        mensaje: 'API de Gestión de Eventos!!',
        version: '1.0'
    });
});    

app.use("/eventos", eventosRoutes);
app.use("/categorias", categoriaRoutes);

// Middleware para manejo de errores
app.use(manejadorErrores)
app.use(noEncontrado)

app.listen(PORT, () => { 
    console.log(`Servidor iniciado en puerto ${PORT}`);
});