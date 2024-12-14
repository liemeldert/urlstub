import mongoose, { Document } from 'mongoose';

interface IURL extends Document {
  originalUrl: string;
  shortId: string;
  expiresAt: Date;
  createdAt: Date;
  displayLanding: boolean;
}

const urlSchema = new mongoose.Schema<IURL>({
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  displayLanding: {
    type: Boolean,
    default: false,
  }

});

export const URL = mongoose.models.URL || mongoose.model<IURL>('URL', urlSchema);
