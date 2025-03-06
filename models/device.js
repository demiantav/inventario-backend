import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['celular', 'computadora', 'tablet'],
    required: true,
  },
  model: String,
  serialNumber: { type: String, unique: true, required: true},
  phoneNumber: { type: String, unique: true, sparse: true },
  googleAccount: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  conditions:{
    type: String,
    enum: ['OK', 'NOT OK'],
  },
  
  observations: {
    type: String,
    default: "Sin detallar",
  }
},
{timestamps: true});

deviceSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Device = mongoose.model('Device', deviceSchema)

export default Device