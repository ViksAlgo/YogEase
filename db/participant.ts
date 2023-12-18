import mongoose from 'mongoose';

const participantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true, min: 18, max: 65 },
    email: { type: String, required: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    contactDetails: { type: String },
    enrollmentDate: { type: Date, default: Date.now },
    batch: { type: mongoose.Schema.Types.ObjectId, ref: 'Batch' },
});

const Participant = mongoose.models.Participant ?? mongoose.model('Participant', participantSchema);

export default Participant;
