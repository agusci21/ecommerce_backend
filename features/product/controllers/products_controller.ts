import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
import Product from "../models/product_model"

export const getAllProducts  = async (req : Request, res: Response) => {
    try {
        const products = await Product.findAll()
        return res.status(200).json({
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
} 

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = Product.build(req.body)
        product.id = uuidv4()
        await product.save();
        return res.status(201).json({
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error interno del servidor"
        })
    }
}