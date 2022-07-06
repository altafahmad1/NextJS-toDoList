import { Schema, model, models } from 'mongoose';

const taskSchema = new Schema({
	text: {
		type: String,
		required: true,
	},
});

const Task = models.Task || model('Task', taskSchema);

export default Task;
