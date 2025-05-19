import User from '../models/user.js';
import Device from '../models/device.js';

import fs from 'fs';

const migrateDb = async () => {
  const fileBuffer = fs.readFileSync('db.json');

  const dataJson = JSON.parse(fileBuffer);

  for (const record of dataJson) {
    const deviceToCheck = await Device.findOne({ serialNumber: record.serialNumber });
    const userToCheck = await User.findOne({ dni: record.dni });

    try {
      const deviceCreated = new Device({
        type: record.type,
        model: record.model,
        serialNumber: record.serialNumber,
        phoneNumber: record.phoneNumber,
        googleAccount: record.googleAccount,
        condition: record.condition,
        observations: record.observations,
        status: record.status,
      });
      //Si es null creamos el dispositivo
      if (deviceToCheck === null) {
        await deviceCreated.save();
        console.log('Dispositivo creado exitosamente!');
      } else {
        throw new Error('El dispositivo ya se encuentra registrado');
        continue;
      }

      if (userToCheck === null) {
        const userCreated = new User({
          name: record.name,
          dateOfEntry: record.dateOfEntry,
          dni: record.dni,
          devices: [{ device: deviceCreated._id }],
          client: record.client,
          team: record.team,
          action: record.action,
          category: record.category,
        });

        await userCreated.save();
        console.log('El usuario se registro correctamente');
      } else {
        throw new Error('usuario ya se encuentra registrado');
        continue;
      }
    } catch (error) {
      console.error(error.message);
    }
  }
};

export default migrateDb;
