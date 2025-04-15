import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['Celular', 'Computadora', 'Tablet'],
      required: true,
    },
    model: {
      type: String,
      trim: true,
      required: true,
    },
    serialNumber: { type: String, unique: true, required: true },
    phoneNumber: { type: String, unique: true, sparse: true },
    googleAccount: {
      type: String,
      trim: true,
    },
    assignedTo: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
          default: null,
        },

        assignedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    condition: {
      type: String,
      enum: ['OK', 'NOT OK'],
      default: 'OK',
    },

    observations: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ['Disponible', 'Asignado', 'Roto'],
      default: 'disponible',
    },
  },
  { timestamps: true }
);

deviceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Device = mongoose.model('Device', deviceSchema);

export default Device;
