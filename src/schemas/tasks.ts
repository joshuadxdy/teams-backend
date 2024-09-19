import {Schema, model, Document, Types} from 'mongoose';
import {IUser} from '@/schemas/users.ts';
import {ITeam} from '@/schemas/teams.ts';

export interface ITask extends Document {
  name: string;
  description: string;
  createdBy: Types.ObjectId | IUser;
  assignedTo?: Types.ObjectId[];
  taskStartsAt?: Date;
  taskEndsAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema: Schema<ITask> = new Schema<ITask>(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    createdBy: {type: Schema.Types.ObjectId, ref: 'User', required: true}, // References the User model
    assignedTo: [{type: Schema.Types.ObjectId, ref: 'User'}], // Array of references to User (optional)
    taskStartsAt: {type: Date},
    taskEndsAt: {type: Date},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
  },
  {timestamps: true}
);

// Export the Task model
export const Task = model('Task', taskSchema);
