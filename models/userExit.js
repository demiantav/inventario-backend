import mongoose, { Schema } from 'mongoose';

const userExitSchema = new mongoose.Schema({
  userSnapshot: {
    name: { type: String, required: true },
    dni: { type: Number, required: true },
    team: String,
    category: { type: String, enum: ['Colaborador', 'Supervisor'] },
    dateOfEntry: Date,
  },

  dateOfExit: { type: Date, default: Date.now },

  devicesAtExit: [
    {
      device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device' },
      assignedAt: Date,
    },
  ],

  reasonForExit: { type: String, trim: true },
});
