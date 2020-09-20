import { Router } from 'express';
import * as Ctrl from './controller';

const router = Router();

// getAllBooks
router.get('/api/books', async (req, res) => {
  try {
    const books = await Ctrl.getAllBooks();
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched books',
      data: books
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

// getBook
router.get('/api/books/:id', async (req, res) => {
  try {
    const book = await Ctrl.getBook(req.params);
    res.status(200).json({
      status: 200,
      message: 'Successfully fetched book',
      data: book
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Book not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

// createBook
router.post('/api/books', async (req, res) => {
  if (
    req.body.title &&
    req.body.quantity >= 0 &&
    (req.body.status === 'Available' || req.body.status === 'Not Available')
  ) {
    try {
      const id = await Ctrl.createBook(req.body);
      const book = await Ctrl.getBook({ id: id });

      res.status(200).json({
        status: 200,
        message: 'Successfully created book',
        data: book
      });
    } catch (status) {
      res.status(500).json({ status: 500, message: 'Internal server error' });
    }
  } else {
    res.status(400).json({ status: 400, message: 'Bad request' });
  }
});

// removeBook
router.delete('/api/books/:id', async (req, res) => {
  try {
    const book = await Ctrl.getBook(req.params);
    await Ctrl.removeBook(req.params);

    res.status(200).json({
      status: 200,
      message: 'Successfully removed book',
      data: book
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Book not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

router.put('/api/books/', async (req, res) => {
  try {
    await Ctrl.editBook(req.body);
    const book = await Ctrl.getBook({ id: req.body.id });

    res.status(200).json({
      status: 200,
      message: 'Successfully edited user',
      data: book
    });
  } catch (status) {
    let message = '';
    switch (status) {
      case 404:
        message = 'Book not found';
        break;
      case 500:
        message = 'Internal server error';
        break;
    }
    res.status(status).json({ status, message });
  }
});

export default router;
