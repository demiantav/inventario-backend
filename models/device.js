import mongoose from "mongoose";

const deviceSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['celular', 'computadora', 'tablet'],
    required: true,
    default: 'celular',
    trim: true,
  },
  model: {
    type: String,
    trim:true,
  },
  serialNumber: { type: String, unique: true, required: true},
  phoneNumber: { type: String, unique: true, sparse: true },
  googleAccount: {
    type:String,
    trim:true
  },
  assignedTo: [{
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },

    date:{
      type:Date,
      default: Date.now
    }
  }],

  conditions:{
    type: String,
    enum: ['OK', 'NOT OK'],
    default: 'OK'
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