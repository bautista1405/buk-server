import mongoose from 'mongoose'

const providerSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    address: String,
    products: Number,
    userId: [String],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

const Provider = mongoose.model('Provider', providerSchema)

export default Provider