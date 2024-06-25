import express from 'express'
import mongoose from 'mongoose'

import StockModel from '../models/StockModel.js'

export const getStock = async (req, res) => { 
    const { id } = req.params;

    try {
        const stock = await StockModel.findById(id);
        
        res.status(200).json(stock);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getStocks = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await StockModel.countDocuments({});
        const stocks = await StockModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: stocks, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createStock = async (req, res) => {

    const stock = req.body

    const newStock = new StockModel({...stock, createdAt: new Date().toISOString() })

    try {
        await newStock.save()
        res.status(201).json(newStock)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const updateStock = async (req, res) => {
    const { id: _id } = req.params
    const stock = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No stock with that id')

    const updatedStock = await StockModel.findByIdAndUpdate(_id, {...stock, _id}, { new: true})

    res.json(updatedStock)
}


export const deleteStock = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No stock with that id')

    await StockModel.findByIdAndRemove(id)

    res.json({message: 'Stock deleted successfully'})
}


export const getStocksByUser = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const stocks = await StockModel.find({ userId: searchQuery });

        res.json({ data: stocks });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}