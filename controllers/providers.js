import express from 'express'
import mongoose from 'mongoose'

import ProviderModel from '../models/ProviderModel.js'

export const getProvider = async (req, res) => { 
    const { id } = req.params;

    try {
        const provider = await ProviderModel.findById(id);
        
        res.status(200).json(provider);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}


export const getProviders = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 8;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await ProviderModel.countDocuments({});
        const providers = await ProviderModel.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);

        res.json({ data: providers, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}

export const createProvider = async (req, res) => {

    const provider = req.body

    const newProvider = new ProviderModel({...provider, createdAt: new Date().toISOString() })

    try {
        await newProvider.save()
        res.status(201).json(newProvider)
    } catch (error) {
        res.status(409).json(error.message)
    }
}

export const updateProvider = async (req, res) => {
    const { id: _id } = req.params
    const provider = req.body

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No provider with that id')

    const updatedProvider = await ProviderModel.findByIdAndUpdate(_id, {...provider, _id}, { new: true})

    res.json(updatedProvider)
}


export const deleteProvider = async (req, res) => {
    const { id } = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No provider with that id')

    await ProviderModel.findByIdAndRemove(id)

    res.json({message: 'Provider deleted successfully'})
}


export const getProvidersByUser = async (req, res) => {
    const { searchQuery } = req.query;

    try {
        const providers = await ProviderModel.find({ userId: searchQuery });

        res.json({ data: providers });
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}