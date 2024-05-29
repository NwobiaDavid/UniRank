import mongoose, { Schema, models } from 'mongoose';

const userSChema = new Schema({
  userName: { type: String , required: true},
  email: { type: String, required: true },
  university: { type: String },
  image: { type: String, required: true, default: 'https://res.cloudinary.com/geekysrm/image/upload/v1542221619/default-user.png', },
  score: { type: Number, default: 0 },
  numtry: { type: Number, default: 0 },
});

const userModal = models.user || mongoose.model('user', userSChema);

export default userModal;
