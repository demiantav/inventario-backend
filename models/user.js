import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  dateOfEntry: {
    type: Date,
    default: Date.now,
  },

  dni: {
    type: Number,
    unique: true,
    min: [1000000, 'El DNI debe ser mayor a 1.000.000'],
    max: [99999999, 'El DNI debe ser menor a 99.999.999'],
  },

  devices: [
    {
      device: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Device',
      },
      assignedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],

  client: String,
  team: String,
  category: {
    type: String,
    enum: ['Colaborador', 'Supervisor'],
  },
});

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const User = mongoose.model('User', userSchema);

export default User;
