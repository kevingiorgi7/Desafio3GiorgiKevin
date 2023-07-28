import express from "express";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager("Products.json");

const app = express();
app.use(express.urlencoded({ extended: true }));



app.get('/', (req,res)=>{
    res.send('¡Hola! Escuchando al puerto: 8080')
})

app.get('/products', async (req,res)=>{
    try {
        const products = await manager.getProducts()
        let limit = req.query.limit;
        let productsLimited = limit? products.slice(0,limit) : products;
        res.json(productsLimited)
    } catch (error) {
        return error
    }
})

app.get('/products/:pid', async (req,res)=>{
    try {
            let id = Number(req.params.pid)
            const product= await manager.getProductsById(id)
            res.json(product)
    } catch (error) {
        return error
    }

})


app.listen(8080, ()=>{
    console.log('Escuchando al puerto: 8080');
})      