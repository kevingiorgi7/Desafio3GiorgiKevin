import express from "express";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager("Products.json");

const app = express();
app.use(express.urlencoded({ extended: true }));

async function getAllProducts() {
    const products = await manager.getProducts();
    return products
    //console.log(products);
}
// getAllProducts();

app.get('/', (req,res)=>{
    res.send('¡Hola! Escuchando al puerto: 8080')
})

app.get('/products', async (req,res)=>{
    const products = await getAllProducts()
    let limit = req.query.limit;
    let productsLimited = products.slice(0,limit);
    res.send({productsLimited})
})

app.get('/products/:pid', async (req,res)=>{
    const products = await getAllProducts()
    let id = Number(req.params.pid)
    let productId = products.find(p=>p.id===id)
    if(!productId) {
        productId = {"ERROR":"El ID ingresado no existe"}
    }
    res.send({productId})
})


app.listen(8080, ()=>{
    console.log('Escuchando al puerto: 8080');
})     