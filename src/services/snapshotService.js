import axios from 'axios';
import moment from 'moment';
import fs from 'fs';
import config from '../config';

class SnapshotServive {
  constructor() {
    this.errorCnt = 0;
  }

  getSnapshot() {
    axios.get(config.snapshotHost,
      {
        responseType: 'arraybuffer',
        headers: {
          'Content-Type': 'image/jpeg',
        },
      })
      .then((response) => {
        const filename = moment().format('MM_DD HH-mm-ss');
        const writer = fs.createWriteStream(`D:/snapshots/${filename}.jpg`);
        writer.write(response.data, () => {
          writer.end();
        });
      })
      .catch((error) => {
        console.log(error);
        this.errorCnt += 1;
        console.log(`===================== errorCnt : ${this.errorCnt}========================`);
      });
  }
}

const snapshotServive = new SnapshotServive();

export default snapshotServive;
