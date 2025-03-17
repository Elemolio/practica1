const express = require('express');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const xml2js = require('xml2js');

const app = express();
const PORT = 3000;
const XML_FILE = './server/productos.xml'; // Ruta del XML

app.use(cors());
app.use(bodyParser.json());

// 🔹 Cargar productos desde el XML
app.get('/productos', (req, res) => {
    fs.readFile(XML_FILE, (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo');

        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).send('Error al convertir XML');

            res.json(result.inventario.producto);
        });
    });
});

// 🔹 Agregar un nuevo producto
app.post('/productos', (req, res) => {
    fs.readFile(XML_FILE, (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo');

        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).send('Error al convertir XML');

            const nuevoProducto = req.body;
            result.inventario.producto.push(nuevoProducto);

            const builder = new xml2js.Builder();
            const xml = builder.buildObject(result);

            fs.writeFile(XML_FILE, xml, (err) => {
                if (err) return res.status(500).send('Error al guardar el archivo');
                res.send('Producto agregado con éxito');
            });
        });
    });
});

// 🔹 Modificar un producto
app.put('/productos/:id', (req, res) => {
    fs.readFile(XML_FILE, (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo');

        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).send('Error al convertir XML');

            const productos = result.inventario.producto;
            const id = req.params.id;
            const index = productos.findIndex(p => p.id[0] === id);

            if (index === -1) return res.status(404).send('Producto no encontrado');

            productos[index] = req.body; // Actualiza los datos

            const builder = new xml2js.Builder();
            const xml = builder.buildObject(result);

            fs.writeFile(XML_FILE, xml, (err) => {
                if (err) return res.status(500).send('Error al guardar el archivo');
                res.send('Producto actualizado con éxito');
            });
        });
    });
});

// 🔹 Eliminar un producto
app.delete('/productos/:id', (req, res) => {
    fs.readFile(XML_FILE, (err, data) => {
        if (err) return res.status(500).send('Error al leer el archivo');

        xml2js.parseString(data, (err, result) => {
            if (err) return res.status(500).send('Error al convertir XML');

            const id = req.params.id;
            result.inventario.producto = result.inventario.producto.filter(p => p.id[0] !== id);

            const builder = new xml2js.Builder();
            const xml = builder.buildObject(result);

            fs.writeFile(XML_FILE, xml, (err) => {
                if (err) return res.status(500).send('Error al guardar el archivo');
                res.send('Producto eliminado con éxito');
            });
        });
    });
});

// 🔹 Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});