import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

// getAllScho
router.get('/api/schos/:studNo', async (req, res) => {
  try {
    const schoBabies = await Ctrl.getAllSchoBabies(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched schoBabies',
      data: schoBabies
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'User has no scho babies';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.get('/api/schos', async (req, res) => {
  try {
    const baby = await Ctrl.getSchoBaby(req.body);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched schoBabies',
      data: baby
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'User not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

// add Scho Baby
router.post('/api/schos', async (req, res) => {
  if (req.body.studNo && req.body.schoBaby) {
    try {
      const id = await Ctrl.createSchoBaby(req.body);
      const schoBabies = await Ctrl.getAllSchoBabies(id);

      res.status(200).json({
        status: 200,
        message: 'Successfully created scho baby',
        data: schoBabies
      });
    } catch (status) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  } else {
    res.status(400).json({ status: 400, message: 'Bad request' });
  }
});

// removeSchoBaby
router.delete('/api/schos/:studNo', async (req, res) => {
  try {
    const studNo = await Ctrl.removeSchoBaby(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully removed scho',
      data: studNo
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Scho not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
