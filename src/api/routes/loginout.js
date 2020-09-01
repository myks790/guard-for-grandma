import express from 'express';

const route = express.Router();

export default (router) => {
  router.use(route);

  route.get('/logout', async (req, res) => {
    console.log('logout!!!!!!!');
    req.logout();
    req.session.save(() => {
      res.json({ message: 'logout success' });
    });
  });

  route.post('/login', async (req, res) => {
    console.log('login!!!!!!!!');
    res.json({ message: 'login success' });
  });
};
