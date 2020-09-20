import db from '../../database';

// getAllSchoBaby, addSchoBaby, removeSchoBaby

export const getAllSchoBabies = ({ studNo }) => {
  // takes the student number of a certain scho as argument
  return new Promise((resolve, reject) => {
    const queryString = `
        SELECT 
          s.studNo,
          s.schoBaby,
          u.lastName,
          u.firstName,  
          u.schoPoints,
          s.schoBaby
        FROM 
            scho s
        JOIN user u
        ON
            s.schoBaby = u.studNo 
        WHERE s.studNo = ?
      `;

    db.query(queryString, studNo, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!rows.length) {
        return reject(404);
      }

      return resolve(rows);
    });
  });
};

export const getSchoBaby = ({ studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        SELECT 
          studNo,
          lastName,
          firstName,  
          schoPoints
        FROM 
            user 
        WHERE studNo = ?
      `;

    db.query(queryString, studNo, (err, rows) => {
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

export const createSchoBaby = ({ studNo, schoBaby }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
            INSERT INTO scho
            VALUES (?,?)
        `;

    const values = [studNo, schoBaby];

    db.query(queryString, values, (err, results) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(results.insertId);
    });
  });
};

export const removeSchoBaby = ({ studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        DELETE 
          FROM scho
        WHERE 
          studNo = ?
      `;

    db.query(queryString, studNo, (err, results) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      if (!results.affectedRows) {
        return reject(404);
      }

      return resolve(studNo);
    });
  });
};
