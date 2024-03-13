import mongoose from "mongoose";

const { Schema, model } = mongoose;
const travelsSchema = new Schema({
    id: {
        type: String,
    },
    price: {
        type: Number,
    },
    slug: {
        type: String,
    },
    description: {
        type: String,
    },
    startingDate: {
        type: String,
    },
    endingDate: {
        type: String,
    },
    moods: {
        nature: {
            type: Number,
        },
        relax: {
            type: Number,
        },
        history: {
            type: Number,
        },
        culture: {
            type: Number,
        },
        party: {
            type: Number,
        },
    },
});
const travelsModel = model('Travels', travelsSchema);
export default travelsModel