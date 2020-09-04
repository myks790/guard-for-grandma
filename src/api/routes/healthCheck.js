import express from 'express';
import moment from 'moment';
// import messageService from '../../services/messageService';

const route = express.Router();

export default (router) => {
  router.use(route);

  route.get('/clientUp', async (req, res) => {
    console.log(`up ${moment().format('MM/DD HH:mm')}`);
    res.json({ message: 'up' });
  });

  route.get('/clientDown', async (req, res) => {
    console.log(`down ${moment().format('MM/DD HH:mm')}`);
    res.json({ message: 'down' });
  });
};
