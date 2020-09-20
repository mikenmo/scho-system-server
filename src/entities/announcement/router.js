import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

// Put stuff here
router.get('/api/announcements', async (req, res) => {
  try {
    const announcements = await Ctrl.getAllAnnouncements();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched announcements',
      data: announcements
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

router.post('/api/announcements', async (req, res) => {
  try {
    await Ctrl.createAnnouncement(req.body);
    const announcements = await Ctrl.getAllAnnouncements();

    res.status(200).json({
      status: 200,
      message: 'Successfully created announcement',
      data: announcements
    });
  } catch (status) {
    res.status(500).json({ status: 500, message: 'Internal server error' });
  }
});

router.delete('/api/announcements/:id', async (req, res) => {
  try {
    await Ctrl.removeAnnouncement(req.params);
    const announcements = await Ctrl.getAllAnnouncements();

    res.status(200).json({
      status: 200,
      message: 'Successfully removed announcement',
      data: announcements
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Announcement not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
