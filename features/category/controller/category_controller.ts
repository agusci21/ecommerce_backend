import { Request, Response } from "express"
import Category from "../models/category"
import { v4 as uuid } from 'uuid';

export const getAllCategories = async (_: Request, res: Response) => {
    try {

        const categories = await Category.findAll()
        res.status(200).json({
            categories
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}
export const createCategory = async (req: Request, res: Response) => {
    const { name } = req.body
    try {
        const category = await Category.findOne({
            where: { name: name }
        });
        if (category) {
            return res.status(400).json({
                msg: "this category already exist", category
            })
        }
        const newCategory = Category.build({ name })
        newCategory.id = uuid()
        await newCategory.save()
        res.status(200).json({
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Internal Server Error"
        })
    }
} 