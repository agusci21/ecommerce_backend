import { Request, Response } from "express"
import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize'
import Product from "../models/product_model"

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const { filterQuery } = req.query
        let products: Product[] = [];
        if (filterQuery) {
            products = await Product.findAll(
                {
                    where: {
                        name: {
                            [Op.like]: `${filterQuery.toString().toLowerCase()}%`
                        }
                    }
                }
            )
        } else {
            products = await Product.findAll()

        }

        return res.status(200).json({
            products
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "internal server error"
        })
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const product = Product.build(req.body)
        product.id = uuidv4()
        const duplicedProductName = await Product.findOne({
            where: {
                name: product.name
            }
        })

        if (duplicedProductName) {
            return res.status(400).json({
                msg: "Product name must be unique",
                product
            })
        }

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

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                msg: "Product not found",
                id
            })
        }

        return res.status(200).json({
            product
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: "Internal server error"
        })
    }
}

export const editProductById = async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        if (req.body.id) {
            return res.status(400).json({
                msg: 'id should not exist'
            })
        }
        const { name, price, stock, description } = req.body
        const product = await Product.findByPk(id)
        if (!product) {
            return res.status(404).json({
                msg: 'Product not found'
            })
        }
        product.name = name ?? product.name;
        product.price = price ?? product.price;
        product.description = description ?? product.description;
        product.stock = stock ?? product.stock

        await product.save()
        return res.status(203).json({
            product
        })
    } catch (error) {
        console.log(error),
            res.status(500).json({
                msg: 'Internal server error'
            })
    }
}

export const createProductsMasive = async (req: Request, res: Response) => {
    try {
      const productsRawList = req.body.products;
      const productList: Product[] = [];
      const productsCreated: Product[] = [];
      const productsDuplicated: Product[] = [];
  
      for (const productMap of productsRawList) {
        const product = Product.build(productMap);
        product.id = uuidv4();
        productList.push(product);
      }
  
      for (const product of productList) {
        try {
          const existingProduct = await Product.findOne({ where: { name: product.name } });
  
          if (existingProduct) {
            productsDuplicated.push(product);
          } else {
            await product.save();
            productsCreated.push(product);
          }
        } catch (error) {
          console.log(error);
          productsDuplicated.push(product);
        }
      }
  
      const responseObj: { products_created: Product[], products_with_duplicates?: Product[] } = {
        products_created: productsCreated
      };
  
      if (productsDuplicated.length > 0) {
        responseObj.products_with_duplicates = productsDuplicated;
      }
  
      res.status(200).json(responseObj);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Internal server error",
      });
    }
  };
  
