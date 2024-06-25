import mongoose from 'mongoose'

const stockSchema = mongoose.Schema({
    name: String,
    details: String,
    provider: String,
    price: Number,
    quantity: Number,
    userId: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Stock = mongoose.model('Stock', stockSchema)

export default Stock