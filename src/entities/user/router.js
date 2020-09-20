import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

router.get('/api/guardians', async (req, res) => {
  try {
    const guardians = await Ctrl.getAllGuardians();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched scho guardians',
      data: guardians
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

// getAllUsers
router.get('/api/users', async (req, res) => {
  try {
    const users = await Ctrl.getAllUsers();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched users',
      data: users
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

// getUser
router.get('/api/users/:studNo', async (req, res) => {
  try {
    const user = await Ctrl.getUser(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched user',
      data: user
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

// createUser
router.post('/api/users', async (req, res) => {
  if (
    req.body.studNo.length == 10 &&
    req.body.studNo.match(/\d{4}-\d{5}/) &&
    req.body.password.length >= 8 &&
    req.body.codeName &&
    req.body.lastName &&
    req.body.firstName &&
    (req.body.type == 'SCHOHEAD' ||
      req.body.type == 'SCHO' ||
      req.body.type == 'NONSCHO') &&
    req.body.email &&
    req.body.contactNo
  ) {
    try {
      const id = await Ctrl.createUser(req.body);
      const users = await Ctrl.getAllUsers();

      res.status(200).json({
        status: 200,
        message: 'Successfully created user',
        data: users
      });
    } catch (status) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  } else {
    res.status(400).json({ status: 400, message: 'Bad request' });
  }
});

// removeUser
router.delete('/api/users/:studNo', async (req, res) => {
  try {
    const id = await Ctrl.removeUser(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully removed user',
      data: id
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

// editUser
router.put('/api/users/', async (req, res) => {
  try {
    await Ctrl.editUser(req.body);
    const user = await Ctrl.getUser({ studNo: req.body.studNo });

    res.status(200).json({
      status: 200,
      message: 'Successfully edited user',
      data: user
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
