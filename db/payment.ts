import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'Participant', required: true },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch', required: true },
    paymentDate: { type: Date, default: Date.now },
    amount: { type: Number, required: true },
});

const Payment = mongoose.models.Payment ?? mongoose.model('Payment', paymentSchema);

export default Payment;
