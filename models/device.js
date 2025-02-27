import mongoose from "mongoose";

const DeviceSchema = new mongoose.Schema({
    model: String,
    imei: String,
    phoneNumber: Number,
    googleAccount: String,

})

const deviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['celular', 'computadora', 'auriculares', 'tablet', 'otro'],
    required: true,
  },
  model: String,
  serialNumber: { type: String, unique: true, required: true},
  phoneNumber: { type: String, unique: true, sparse: true }, // Puede ser null o no estar presente
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null, // Permite teléfonos sin usuario asignado
  },
});