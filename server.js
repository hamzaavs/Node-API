const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/productModels");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extends: false}))

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/blog", (req, res) => {
    res.send("Hello Blog");
});

app.get("/products", async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message: message.error});
        console.log(error);
    }
});

app.get("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: message.error});
    }
});

app.post("/products", async(req, res) => {
    try {   
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error.message});
    }
});

app.put("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return req.status(404).json({message: `cannot find any product with ID ${id}`});
        } 
        const updatedProduct = await Product.findById(id)
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});        
    }
});

app.delete("/products/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return req.status(404).json({message: `cannot find any product with ID ${id}`});
        } 
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});
 
mongoose.set("strictQuery", false);
mongoose
.connect("mongodb+srv://221325008:ihamza123@nodeapi.pasjq4e.mongodb.net/Node-API?retryWrites=true&w=majority")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
        console.log("Node API running 3000 port");
    });
}).catch((error) => {
    console.log(error);
})
