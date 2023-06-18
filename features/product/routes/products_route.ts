import { Router } from "express";
import { getAllProducts, createProduct, getProductById} from "../controllers/products_controller";
import { check } from "express-validator";
import { validateFields } from "../../../middlewares/validate_fields";

const router = Router()

router.get('/', getAllProducts)
router.post('/', [
    check('id', 'id should not existe').isEmpty(),
    check('name', 'name can not be null').notEmpty(),
    check('stock', 'stock can not be null').notEmpty(),
    check('stock', 'stock must be an integer').isInt(),
    check('price', 'stock can not be null').notEmpty(),
    check('price', 'stock must be a number').isNumeric(),
    check('description', 'description can not be null').notEmpty(),
    validateFields
], createProduct)
router.get('/:id', getProductById)

export default router