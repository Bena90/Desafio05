const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Engine
app.set("views", "./views");
app.set("view engine", "ejs");

// Productos
const productos = [
    {
        title: "Producto 1",
        price: 300,
        thumbnail: "https://picsum.photos/300/300?random=1"
    },
    {
        title: "Producto 2",
        price: 500,
        thumbnail: "https://picsum.photos/300/300?random=1"
    }
];
    
// Rutas
app.get ("/", (req, res) => {
    res.render (
    "index",
    {productos,
        cargar: true
    })
})
    
app.get ("/productos", (req,res) => {
    res.render ("index", {
        productos,
        cargar: false
    })
})

app.post("/productos", (req, res) => {
    const { body } = req;
    productos.push(body);
    res.render("index",{
        productos,
        cargar: false
    })    
})
    
// Server
const PORT = 8090
const srv = app.listen (PORT, () => {
    console.log ( `🖥️  Server run on port http://localhost:${PORT}`)
})

srv.on("error", (error) => console.log(`Error en servidor ${error}`));
