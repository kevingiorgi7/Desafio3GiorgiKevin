import express from "express";
import ProductManager from "./ProductManager.js";

const manager = new ProductManager("Products.json");

const app = express();

async function getAllProducts() {
    const products = await manager.getProducts();
    console.log(products);
}
getAllProducts();

app.use(express.urlencoded({ extended: true }));
