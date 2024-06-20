import express from 'express'
import {getProviders, createProvider, updateProvider, deleteProvider, getProvidersByUser} from '../controllers/providers.js'

const router = express.Router()

router.get('/', getProviders)
router.get('/user', getProvidersByUser);
router.post('/', createProvider)
router.patch('/:id', updateProvider)
router.delete('/:id', deleteProvider)

export default router