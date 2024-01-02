const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('CONNECTION OPEN!!!')
})
    .catch(err => {
        console.log('OH NO ERROR!!!')
        console.log(err)
});

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 20
    },
    price: {
        type: Number,
        require: true,
        min: [0, 'Price must be positive!']
    },
    onSale: {
        type: Boolean,
        default: false
    },
    categories: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        },
        size: {
            type: String,
            enum: ['S', 'M', 'L']
        }
    }
});


// productSchema.methods.greet = function () {
//     console.log("HELLO! HI!! HOWDY!!")
//     console.log(`- from ${this.name}`)
// }

productSchema.methods.toggleOnSale = function () {
    this.onSale = !this.onSale;
    return this.save();
}

productSchema.methods.addCategory = function (newCat) {
    this.categories.push(newCat);
    return this.save();
}


const Product = mongoose.model('Product', productSchema);


const findProduct = async () => {
    const foundProduct = await Product.findOne({ name: 'Mountain Bike' });
    console.log(foundProduct);
    await foundProduct.toggleOnSale();
    console.log(foundProduct);
    await foundProduct.addCategory('Outdoors');
    console.log(foundProduct);
}

findProduct();















// const bike = new Product({ name: 'Mountain Bike', price: 999, categories: ['cycling', 'driving'] })
// bike.save()
// .then(data => {
//     console.log("IT WORKED!");
//     console.log(data);
// })
// .catch(err => {
//     console.log("OH NO ERROR!");
//     console.log(err);
// })
