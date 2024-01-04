const mongoose = require('mongoose');
const { Schema } = mongoose;
const Product = require('./product')

const farmSchema = new Schema({ 
    name: {
        type: String,
        required: [true, 'Farm muset have a name!']
    },
    city: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Email required']
    },
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Product'
        }
    ]
})

farmSchema.post('findOneAndDelete', async function (farm) {
    if (farm.products.length) {
        await Product.deleteMany({ _id: { $in: farm.products }})
    }
})

const Farm = mongoose.model('Farm', farmSchema);

module.exports = Farm;