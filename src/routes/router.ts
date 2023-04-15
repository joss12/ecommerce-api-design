import { createUpdate, deleteUpdate, getOneUpdate, updateUpdate } from './../handlers/update';

import {Router} from 'express';
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from './middlewares';
import { createProduct, deleteProduct, getOneProduct, getProducts } from '../handlers/products';
import { getUpdates } from '../handlers/update';


const router = Router();


/**
 * Product
 */
 router.get('/product', getProducts)
 router.get('/product/:id', getOneProduct)
 router.put('/product/:id', body('name').isString(),handleInputErrors,(req, res)=>{

 });
 
 router.post('/product', body('name').isString(),handleInputErrors, createProduct)

 router.delete('/product/:id', deleteProduct)


 /**
 * Update
 */
 router.get('/update', getOneUpdate)
 router.get('/update/:id', getOneUpdate)
 router.put('/update/:id',
 body('title').optional(),
 body('body').optional(),
 body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
 body('version').optional(),
 ()=>{});

 router.post('/update',
 body('title').exists().isString(),
 body('body').exists().isString(),
 body('productId').exists().isString(),
 createUpdate)

 router.delete('/update/:id', ()=>{})


 /**
 * Update Point
 */
 router.get('/updatepoint',getUpdates)
 router.get('/updatepoint/:id', getOneUpdate)

 router.put('/updatepoint/:id', 
 body('name').optional().isString(),
 body('description').optional().isString(),
updateUpdate);

 router.post('/updatepoint', 
 body('name').optional().isString(),
 body('description').isString(),
createUpdate);

 router.delete('/updatepoint/:id', deleteUpdate);

 router.use((err, req, res, next)=>{
    console.log(err);
    res.json({message: 'in router handler'});
 })

 export default router;