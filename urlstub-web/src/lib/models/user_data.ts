import mongoose, { Document } from 'mongoose';

interface IUserData extends Document {
    shortId: string;
    ip: string;
    user_agent: string;
    referer: string;
    createdAt: Date;
}

const userDataSchema = new mongoose.Schema<IUserData>({
    shortId: {
        type: String,
        required: true,
    },
    ip: {
        type: String,
        required: true,
    },
    user_agent: {
        type: String,
        required: true,
    },
    referer: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const userData = mongoose.models.userData || mongoose.model<IUserData>('URL', userDataSchema);
