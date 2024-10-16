import mongoose, { Schema } from 'mongoose';

export const AssetsSchema = new Schema({
  filename: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  fileType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Home Screen',
      'Wedding',
      'Birthday',
      'Pre-Wedding',
      'Travel',
      'Carousel Image',
    ],
    required: true,
  },
  title: {
    type: String,
  },
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model('Assets', AssetsSchema);
