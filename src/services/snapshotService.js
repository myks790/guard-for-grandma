import axios from 'axios';
import moment from 'moment';
import fs from 'fs';
import config from '../config';
import Health from '../models/Health';

class SnapshotServive {
  constructor() {
    this.errorCnt = 0;
    this.lock = false;
    this.basePath = 'Z:/ch-gm/snapshots';
  }

  getSnapshot() {
    if (this.lock === false) {
      this.lock = true;
      const filename = moment().format('MM_DD HH-mm-ss');
      axios.get(`${config.snapshotHost}&q=0&d=1&rand=${Math.random()}`,
        {
          responseType: 'arraybuffer',
          headers: {
            'Content-Type': 'image/jpeg',
          },
          timeout: 10000,
        })
        .then((response) => {
          this.lock = false;
          const writer = fs.createWriteStream(`${this.basePath}/${filename}.jpg`);
          writer.write(response.data, () => {
            console.log(`${filename}  writer.end`);
            writer.end();
          });
          if (this.errorCnt > 0) {
            Health.create({ name: 'nvr', status: 'up' });
            this.errorCnt = 0;
          }
        })
        .catch((error) => {
          this.lock = false;
          this.errorCnt += 1;
          console.log(`============= ${error.code} ======== errorCnt : ${this.errorCnt}========================`);
          if (this.errorCnt % 600 === 0) {
            Health.create({ name: 'nvr', status: 'down' });
          }
        });
    }
  }
}

const snapshotServive = new SnapshotServive();

export default snapshotServive;
