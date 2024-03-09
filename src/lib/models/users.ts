import mongoose from "mongoose";

const { Schema, model } = mongoose;
const usersSchema = new Schema({
    id: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String,
    },
    cart: [
        {
            numOfSeats: Number,
            travelId: Number,
        },
    ],
});

export const usersModel = model('Users', usersSchema);
