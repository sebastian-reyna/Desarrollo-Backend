import {crearError} from "../utils/errores.js"

const categorias = [
  {categoria: "Conferencia", id: 1, metodo: "presencial"},
  {categoria: "Taller", id: 2, metodo: "presencial"},
  {categoria: "Seminario", id: 3, metodo: "virtual"},
  {categoria: "Curso", id: 4, metodo: "virtual"}
] 



export const obtenerCategoria = (req, res) => {
  res.json(categorias)
}

export const obtenerCategoriaporID = (req, res, next) => {
  const id = parseInt(req.params.id);

    const categoria = categorias.find(
        c => c.id === id
    );

    if (!categoria) {
        return next(crearError("La categoria no existe.", 404));
    } 

    res.json(categoria);
}

export const crearCategoria = (req, res, next) => {
    if (!req.body.categoria || !req.body.metodo) {
        return next(crearError("Los campos 'categoria' y 'metodo' son obligatorios.", 400));
    }

    const nuevaCategoria = {
        id: categorias.length + 1,
        categoria: req.body.categoria,
        metodo: req.body.metodo
    };

    categorias.push(nuevaCategoria);

    res.status(201).json(nuevaCategoria);
};

export const actualizarCategoria = (req, res, next) => {
    const idCategoria = parseInt(req.params.id);

    const categoria = categorias.find(
        c => c.id === idCategoria
    );

    if (!categoria) {
        return next(crearError("La categoria no existe.", 404));
    }

    if (!req.body.categoria || !req.body.metodo) {
        return next(crearError("Los campos 'categoria' y 'metodo' son obligatorios.", 400));
    }
        
    categoria.categoria = req.body.categoria;
    categoria.metodo = req.body.metodo;

    res.json(categoria);
};

export const eliminarCategoria = (req, res, next) => {
    const idCategoria = parseInt(req.params.id);

    const indice = categorias.findIndex(
        c => c.id === idCategoria
    );

    if (indice === -1) {
        return next(crearError("La categoria no existe.", 404));
    }

    categorias.splice(indice, 1);

    res.status(204).send();
};