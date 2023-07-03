import { Router } from "express";
import { createCategory, getAllCategories } from "../controller/category_controller";
import { check } from "express-validator";
import { validateFields } from "../../../middlewares/validate_fields";

const router = Router()

router.get('/',getAllCategories)
router.post('/',[
    check('id', 'id should not existe').isEmpty(),
    check('name', 'name is obligatory').notEmpty(),
    validateFields
],createCategory)

export default router