import db from '../../database';

export const getAllAnnouncements = () => {
  return new Promise((resolve, reject) => {
    const queryString = `
        SELECT a.id, a.heading, a.content, 
        a.time_created, a.studNo, u.lastName, u.firstName
        FROM announcement a JOIN user u
        WHERE u.studNo = a.studNo
        ORDER by id desc
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

export const createAnnouncement = ({ heading, content, studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        INSERT INTO announcement
        VALUES (DEFAULT, ?, ?, curdate(), ?);
    `;

    const values = [heading, content, studNo];

    db.query(queryString, values, (err, results) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(results.insertId);
    });
  });
};

export const removeAnnouncement = ({ id }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        DELETE 
          FROM announcement
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
