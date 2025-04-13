import mongoose from "mongoose";

const paymentInfoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  paymentDetails: [
    {
      cardNo: {
        type: String,
        required: true,
      },
      expiryDate: {
        type: String,
        required: true,
      },
      cvc: {
        type: String,
        required: true,
      },
      nameOnCard: {
        type: String,
        required: true,
      },
    },
  ],
});

const paymentModel = mongoose.model("payment", paymentInfoSchema);
export default paymentModel;
