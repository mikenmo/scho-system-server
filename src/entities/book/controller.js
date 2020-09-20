import db from '../../database';

// createBook, removeBook, getBook, getAllBooks

export const getAllBooks = () => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT *
      FROM book
      ORDER by title
    `;

    db.query(queryString, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const getBook = ({ id }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        SELECT 
          *
        FROM 
          book
        WHERE
          id = ?
      `;

    db.query(queryString, id, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows[0]);
    });
  });
};

export const createBook = ({ title, author, publisher, quantity, status }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
            INSERT INTO book
            VALUES (DEFAULT, ?, ?, ?, ?, ?)
        `;

    const values = [title, author, publisher, quantity, status];

    db.query(queryString, values, (err, results) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(results.insertId);
    });
  });
};

export const removeBook = ({ id }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      DELETE 
        FROM book
      WHERE 
        id = ?
    `;

    db.query(queryString, id, (err, results) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!results.affectedRows) {
        return reject(404);
      }

      return resolve();
    });
  });
};

export const editBook = ({
  title,
  author,
  publisher,
  quantity,
  status,
  id
}) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      UPDATE book
      SET
        title = ?,
        author = ?,
        publisher = ?,
        quantity = ?,
        status = ?
      WHERE
        id = ?
    `;

    const values = [title, author, publisher, quantity, status, id];

    db.query(queryString, values, (err, res) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!res.affectedRows) {
        return reject(404);
      }

      return resolve();
    });
  });
};
