import {Schema, model, Document, Types} from 'mongoose';
import {ITask} from '@/schemas/tasks.ts';
import {IUser} from '@/schemas/users.ts';

export interface IProject extends Document {
  name: string;
  description: string;
  tasks: Types.ObjectId[] | ITask[];
  manager?: Types.ObjectId | IUser;
  members: Types.ObjectId[];
  createdBy: Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

// Mongoose schema for Project
const projectSchema: Schema<IProject> = new Schema<IProject>(
  {
    name: {type: String, required: true},
    description: {type: String, required: true},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
    manager: {type: Schema.Types.ObjectId, ref: 'User'},
    members: [{type: Schema.Types.ObjectId, ref: 'User'}],
    createdBy: {type: String, required: true},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
  },
  {timestamps: true}
);

// Export the Project model
export const Project = model('Project', projectSchema);
