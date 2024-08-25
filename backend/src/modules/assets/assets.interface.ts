// src/assets/assets.interface.ts
import { Document } from 'mongoose';

export interface Assets extends Document {
  filename: string;
  url: string;
  fileType: string;
  category: string;
  uploadedAt: Date;
  title: string
}
