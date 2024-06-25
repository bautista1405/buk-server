import express from 'express'
import {getStocks, createStock, updateStock, deleteStock, getStocksByUser} from '../controllers/stocks.js'

const router = express.Router()

router.get('/', getStocks)
router.get('/user', getStocksByUser);
router.post('/', createStock)
router.patch('/:id', updateStock)
router.delete('/:id', deleteStock)

export default router