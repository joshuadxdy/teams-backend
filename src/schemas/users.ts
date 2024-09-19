import {Schema, model, Document, Types} from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  username?: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  teams: Types.ObjectId[]; // Refers to an array of Team IDs
  leadTeam?: Types.ObjectId[]; // Refers to an array of Team IDs that the user is team lead for
}

export enum Role {
  USER = 'USER',
  PROJECTMANAGER = 'PROJECTMANAGER',
  ADMIN = 'ADMIN',
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    email: {type: String, required: true, unique: true},
    name: {type: String, required: true},
    username: {type: String},
    password: {type: String, required: true},
    role: {type: String, enum: Role, default: Role.USER},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    teams: [{type: Schema.Types.ObjectId, ref: 'Team'}],
    leadTeam: [{type: Schema.Types.ObjectId, ref: 'Team'}],
  },
  {timestamps: true}
);
export const User = model('User', userSchema);
