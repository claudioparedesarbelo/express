import express from 'express';
import {ProductManager} from '../productManager.js'

const app = express();
app.use(express.json());

const producto = new ProductManager('../productos.json')

app.get('/products', async (req, res) => {
    const products = await producto.getProduct();
    const limit = req.query.limit
    const respuesta = products.slice(0, limit)
    res.send(respuesta)
})

app.get('/products/:pid', async (req, res) => {
    const products = await producto.getProduct();
    const pid = parseInt(req.params.pid)
    const id = products.findIndex(p => p.id===pid)
    res.send(id)
})


app.listen(8080)