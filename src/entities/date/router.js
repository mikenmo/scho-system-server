import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

// getAllDates
router.get('/api/dates', async (req, res) => {
  try {
    const dates = await Ctrl.getAllDates();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched dates',
      data: dates
    });
  } catch (status) {
    let message = '';

    switch (status) {
      case 500:
        message = 'Internal server error';
        break;
    }

    res.status(200).json({ status, message });
  }
});

// createDate
router.post('/api/dates', async (req, res) => {
  if (req.body.event_title && req.body.event_date) {
    try {
      const id = await Ctrl.createDate(req.body);
      const dates = await Ctrl.getAllDates();

      res.status(200).json({
        status: 200,
        message: 'Successfully created date',
        data: dates
      });
    } catch (status) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  } else {
    res.status(400).json({ status: 400, message: 'Bad request' });
  }
});

// removeDate
router.delete('/api/dates/:id', async (req, res) => {
  try {
    await Ctrl.removeDate(req.params);
    const dates = await Ctrl.getAllDates();

    res.status(200).json({
      status: 200,
      message: 'Successfully removed date',
      data: dates
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Date not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
