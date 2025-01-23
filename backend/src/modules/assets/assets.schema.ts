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
      'Carousel Image',
      'Wedding',
      'Pre-Wedding',
      'Birthday',
      'Maternity',
      'Outdoor',
      'Model',
      'Wedding Cover',
      'Pre-Wedding Cover',
      'Birthday Cover',
      'Maternity Cover',
      'Outdoor Cover',
      'Model Cover',
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
