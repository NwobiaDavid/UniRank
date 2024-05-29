import mongoose, { Schema, models } from 'mongoose';

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    options: {
        type: [String],
        required: true,
    },
    answer: {
        type: Number,
        required: true,
    },
});

// export default mongoose.models.question || mongoose.model('question', questionSchema);

const questionModal = models.question || mongoose.model('question', questionSchema);

export default questionModal;
