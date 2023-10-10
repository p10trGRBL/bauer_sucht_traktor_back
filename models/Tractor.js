import mongoose from "mongoose";

const tractorSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: [true, 'Hersteller ist erforderlich'],
        trim: true,
    },
    model: {
        type: String,
        required: [true, 'Model ist erforderlich'],
        trim: true,
    },
    productionYear: {
        type: Number,
        required: [true, 'Baujahr year ist erforderlich'],
    },
    power: {
        type: Number,
        required: [true, 'Motorleistung ist erforderlich'],
    },
    image_url: {
        type: String,
        default: 'default.jpg',
    },
    extras: {
        type: [String],
    },
    tags: {
        type: [String],
        default: 'new',
    },
    location: {
        type: String,
        required: [true, 'Sag uns wo dein Schlepper zur Verfügung steht']
    },
    availableFrom: {
        type: Date,
        required: [true, 'Das Start Datum ist erforderlich']
    },
    availableTo: {
        type: Date,
     // ask about date validation (not smaller than "availableFrom")
    },
    price: {
        type: Number,
        required: [true, 'Preis ist erforderlich'],
    },
    
    publishedDate: {
        type: Date,
        default: Date.now,
    },

});
export default mongoose.model ('Tractor', tractorSchema);