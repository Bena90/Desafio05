const express = require ('express')
const handlebars = require("express-handlebars")
const { engine } = require("express-handlebars");

const PORT = 8000

const app = express ()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "hbs");

// Configuración Plantilla
app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "index.hbs",
        layoutsDir: __dirname + "/views/layouts", 
        partialsDir: __dirname + "/views/partials"
    })
)

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
        "main",
        {productos,
            cargar: true
        })
})

app.get ("/productos", (req,res) => {
    res.render ("main", {
        productos,
        cargar: false
    })
})

app.post("/productos", (req, res) => {
    const { body } = req;
    productos.push(body);
    res.render("main",{
        productos,
        cargar: false
    })    
})

const srv = app.listen (PORT, () => {
    console.log ( `🖥️  Server run on port http://localhost:${PORT}`)
})

srv.on("error", (error) => console.log(`Error en servidor ${error}`));
