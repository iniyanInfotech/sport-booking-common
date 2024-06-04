import { Document, Model, Schema } from 'mongoose';
import db from '../database/database';
import { ROLES } from '../shared/enum/user.enum';

export const USER_COLLECTION = 'user';

// Define enum for user status
export enum USER_STATUS {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    BLOCKED = 'blocked',
}

export interface IUserDocument extends Document {
    firstName?: string;
    lastName?: string;
    profilePic?: string;
    email?: string;
    password?: string;
    googleId?: string;
    mobileNumber?: string;
    countryCode?: string;
    loginType: string;
    deviceIds?: string[];
    otp?: Number;
    role?: ROLES;
    notificationSettings?: object;
    profileUpdated?: Number,
    status: USER_STATUS; // Add status field with enum type
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema<IUserDocument> = new Schema({
    firstName: {
        type: String,
        required: false,
        index: "text"
    },
    lastName: {
        type: String,
        required: false,
        index: "text"
    },
    profilePic: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: false,
        unique: true,
        index: "text",
        sparse: true
    },
    password: {
        type: String,
        required: false,
    },
    googleId: {
        type: String,
        required: false,
        unique: true,
        index: true,
        sparse: true,
    },
    mobileNumber: {
        type: String,
        required: false,
        unique: true,
        index: true,
        sparse: true
    },
    profileUpdated: {
        type: Number,
        default: 0,
    },
    countryCode: {
        type: String,
        required: false,
    },
    loginType: {
        type: String,
        required: true,
    },
    deviceIds: {
        type: [String],
        required: false,
    },
    otp: {
        type: Number,
        required: false,
    },
    role: {
        type: String,
        required: true,
        default: ROLES.USER,
    },
    notificationSettings: {
        type: Object,
        default: {},
    },
    status: {
        type: String,
        enum: Object.values(USER_STATUS), // Ensure status value is one of the enum values
        default: USER_STATUS.ACTIVE, // Set default status
        index: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        index: true
    },
});

userSchema.index({ googleId: 1, status: 1 });
userSchema.index({ email: 1, status: 1 });
userSchema.index({ mobileNumber: 1, status: 1 });
userSchema.index({ loginType: 1, status: 1 });

// Middleware to update the `updatedAt` field before saving the document
userSchema.pre<IUserDocument>('save', function(next) {
    if (this.isModified()) {
        this.updatedAt = new Date();
    }
    next();
});

const UserModel: Model<IUserDocument> = db.model(USER_COLLECTION, userSchema);

export default UserModel;
