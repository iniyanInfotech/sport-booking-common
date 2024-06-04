import mongoose, { Document, Model, Schema } from 'mongoose';
import db from '../database/database';
import { ROLES } from '../shared/enum/user.enum';

export const ADMIN_COLLECTION = 'admin';

export interface IAdminDocument extends Document {
    name?: string;
    email: string;
    password: string;
    role?: ROLES;
    profilePic?: string;
    createdAt: Date;
}

const adminSchema: Schema<IAdminDocument> = new Schema({
    name: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: ROLES.ADMIN,
    },
    profilePic: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const AdminRepoModel: Model<IAdminDocument> = db.model(ADMIN_COLLECTION, adminSchema);
export default AdminRepoModel;

