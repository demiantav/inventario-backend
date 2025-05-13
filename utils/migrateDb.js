import User from '../models/user.js';
import Device from '../models/device.js';

import fs from 'fs';

const migrateDb = () => {
  const fileBuffer = fs.readFileSync('db.json');

  const dataJson = JSON.parse(fileBuffer);

  //   console.log(dataJson);
  //   console.log(dataJson[1]);

  for (const record of dataJson) {
    console.log(record);
    try {
    } catch (error) {}
  }
};

export default migrateDb;
