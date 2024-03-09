import mongoose from "mongoose";

const { Schema, model } = mongoose;
const productOrderSchema = {
    email: {
      type: String,
      required: true,
    },
    orders: [
      {
        numOfSeats: {
          required: true,
          type: Number,
        },
        id: {
          required: true,
          type: String,
        },
      },
    ],
  }
  
const cartSchema = new Schema({
    expireAt: {
        type: Date,
    },
    ...productOrderSchema
});

const ordersSchema = new Schema({
    ...productOrderSchema
});

cartSchema.index({ expireAt: 1 }, { expireAfterSeconds: 10 })
export const cartModel = model('Carts', cartSchema);
export const ordersModel = model('Orders', ordersSchema);
