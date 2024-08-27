import { Document, ObjectId } from 'mongoose';

export interface Assets {
  filename: string;
  url: string;
  fileType: string;
  category: string;
  uploadedAt: Date;
  title: string;
  status: string;
  message: string;
  assets: AssetModel;
}

interface AssetModel {
  _id: ObjectId;
  filename: string;
  url: string;
  fileType: string;
  category: string;
  title: string;
  uploadedAt: Date;
}

export interface CustomResponse {
  success: boolean;
  data?: Assets;
  message?: string;
}
