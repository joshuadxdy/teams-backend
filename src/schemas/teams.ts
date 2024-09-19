import {Schema, model, Document, Types} from 'mongoose';
import {IUser} from '@/schemas/users.ts';

export interface ITeam extends Document {
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: Types.ObjectId | IUser;
  members: Types.ObjectId[]; // Refers to an array of User IDs (many-to-many)
  leader: Types.ObjectId | IUser; // One-to-one relation (with User model)
}

// Mongoose Schema for the Team model
const teamSchema: Schema<ITeam> = new Schema<ITeam>(
  {
    name: {type: String, required: true},
    description: {type: String},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    leader: [{type: Schema.Types.ObjectId, ref: 'User'}],
  },
  {timestamps: true}
);

// Export the Team model
export const Team = model('Team', teamSchema);
