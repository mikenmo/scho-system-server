import { Router } from 'express';
import * as Ctrl from './controller';
import * as Ctrl2 from '../schobaby/controller';

const router = Router();

router.put('/api/points/add', async (req, res) => {
  try {
    await Ctrl.addPoints({ points: req.body.points, studNo: req.body.studNo });
    const babies = await Ctrl2.getAllSchoBabies({
      studNo: req.body.schoGuardian
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully added points',
      data: babies
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
router.put('/api/points/subtract', async (req, res) => {
  try {
    await Ctrl.subtractPoints({
      points: req.body.points,
      studNo: req.body.studNo
    });
    const babies = await Ctrl2.getAllSchoBabies({
      studNo: req.body.schoGuardian
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully subtracted points',
      data: babies
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
router.put('/api/points/reset', async (req, res) => {
  try {
    await Ctrl.resetPoints({
      studNo: req.body.studNo
    });
    const babies = await Ctrl2.getAllSchoBabies({
      studNo: req.body.schoGuardian
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully reset points',
      data: babies
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
router.put('/api/points/resetAll', async (req, res) => {
  try {
    await Ctrl.resetAllPoints(req.body);
    const babies = await Ctrl2.getAllSchoBabies({
      studNo: req.body.schoGuardian
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully resetted all points',
      data: babies
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

export default router;
