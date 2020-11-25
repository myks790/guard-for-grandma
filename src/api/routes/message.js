import express from 'express';
import messageService from '../../services/messageService';

const route = express.Router();

export default (router) => {
  router.use(route);

  route.post('/message', async (req, res) => {
    if (req.body.imgUrl) {
      messageService.sendAll('문 앞', req.body.imgUrl);
    } else if (req.body.text) {
      messageService.sendMe(req.body.text);
    }
    res.end();
  });
};
