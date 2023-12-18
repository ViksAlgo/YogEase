import mongoose from 'mongoose';

const batchSchema = new mongoose.Schema({
    name: { type: String, required: true },
    timeSlot: { type: String, required: true },
    price: { type: Number, required: true },
});

const Batch = mongoose.models.Batch ?? mongoose.model('Batch', batchSchema);

export default Batch;
