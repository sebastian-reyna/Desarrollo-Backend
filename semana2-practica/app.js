import express from "express";

const app = express()
app.use(express.json())
const PORT = 3000

const libros = [
  { id: 1, titulo: 'Cien años de soledad', autor: 'Gabriel García Márquez', anio: 1967 },
  { id: 2, titulo: 'Don Quijote de la Mancha', autor: 'Miguel de Cervantes', anio: 1605 },
  { id: 3, titulo: 'La sombra del viento', autor: 'Carlos Ruiz Zafón', anio: 2001 }
]

const autores = [
  { id: 1, nombre: 'Gabriel García Márquez', nacionalidad: 'Colombiana' },
  { id: 2, nombre: 'Miguel de Cervantes', nacionalidad: 'Española' },
  { id: 3, nombre: 'Alejandro Ruiz Zafón', nacionalidad: 'Española' }
]

app.get('/libros', (req, res) => {
  const { autor, anio } = req.query

  let resultado = libros

  if (autor) {
    resultado = resultado.filter(libro => libro.autor.toLowerCase().includes(autor.toLowerCase()))
  }

  if (anio) {
    resultado = resultado.filter(libro => libro.anio === Number(anio))
  }

  res.json(resultado)
})

app.get('/libros', (req, res) => {
  res.json(libros)
})



app.get('/libros/:id', (req, res) => {
  const id = Number(req.params.id)
  const libro = libros.find(l => l.id === id)

  if(!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido' })
  }

  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' })
  }
  res.json(libro)
})

app.get("/autores", (req, res) => {
  const { orden } = req.query;

  let resultado = [...autores];

  if (orden === "asc") {
    resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
  } else if (orden === "desc") {
    resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
  }

  res.json(resultado);
})

app.get('/autores', (req, res) => {
  res.json(autores)
})

app.get('/autores/:id', (req, res) => {
  const id = Number(req.params.id)
  const autor = autores.find(a => a.id === id)

  if(!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'ID inválido' })
  } 

  if (!autor) {
    return res.status(404).json({ error: 'Autor no encontrado' })
  }
  res.json(autor)
})

app.get('/', (req, res) => {
  res.send('Esta es una API REST para la gestión de libros')
})

app.get('/info', (req, res) => {
  res.json({
    'nombre': 'API REST para gestión de libros',
    'version': '1.0.0',
    'descripcion': 'Esta API permite gestionar libros en una biblioteca'
  })
})

app.post('/libros', (req, res) => {
  const { titulo, autor, anio } = req.body

  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Faltan datos del libro' })
  }

  const nuevoId = libros.length > 0 ? Math.max(...libros.map(libro => libro.id)) + 1 : 1

  const nuevoLibro = { 
    id: nuevoId, 
    titulo, autor, 
    anio: anio ?? null 
  }

  libros.push(nuevoLibro)
  res.status(201).json(nuevoLibro)
})

app.put('/libros/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: 'El numero de ID debe ser un entero positivo' })
  }

  const libro = libros.find(l => l.id === id)

  if (!libro) {
    return res.status(404).json({ error: 'Libro no encontrado' })
  }

  const { titulo, autor, anio } = req.body

  if (!titulo || !autor) {
    return res.status(400).json({ error: 'Faltan datos del libro' })
  }

  libro.titulo = titulo
  libro.autor = autor
  libro.anio = anio ?? null

  res.json(libro)
})

app.delete('/libros/:id', (req, res) => {
  const id = Number(req.params.id)

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).send()
  }

  const indice = libros.findIndex(l => l.id === id)

  if (indice === -1) {
    return res.status(404).json({ error: 'Libro no encontrado' })
  }

  libros.splice(indice, 1)
  res.status(204).json({ message: 'Libro eliminado' })
})

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`)
})

