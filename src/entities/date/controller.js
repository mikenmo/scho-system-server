import db from '../../database';

// createDate , getAllDates, removeDate

export const getAllDates = () => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT *
      FROM important_date
      ORDER by id DESC
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

export const createDate = ({ event_title, event_date }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
            INSERT INTO important_date
            VALUES (DEFAULT, ?, ?)
        `;

    const values = [event_title, event_date.slice(0, 10)];

    db.query(queryString, values, (err, results) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(results.insertId);
    });
  });
};

export const removeDate = ({ id }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      DELETE 
        FROM important_date
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

      return resolve(id);
    });
  });
};
