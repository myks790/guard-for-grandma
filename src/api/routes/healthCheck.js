import express from 'express';
import Health from '../../models/Health';
import messageService from '../../services/messageService';

const route = express.Router();

export default (router) => {
  router.use(route);

  route.get('/clientUp', async (req, res) => {
    Health.create({ name: 'client', status: 'up' });
    messageService.sendMe('client up');
    res.json({ message: 'up' });
  });

  route.get('/clientDown', async (req, res) => {
    Health.create({ name: 'client', status: 'down' });
    messageService.sendMe('client down');
    res.json({ message: 'down' });
  });
};
