import db from '../../database';

export const getAllGuardians = () => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT *
      FROM user
      WHERE type = 'SCHOHEAD' OR type = 'SCHO'
      ORDER by lastName
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

export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT *
      FROM user
      WHERE type != 'ADMIN'
      ORDER by lastName
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

export const getUser = ({ studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        SELECT 
          *
        FROM 
          user
        WHERE
          studNo = ?
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

export const createUser = ({
  studNo,
  password,
  codeName,
  lastName,
  firstName,
  type,
  email,
  contactNo,
  schoGuardian
}) => {
  return new Promise((resolve, reject) => {
    const queryString = `
            INSERT INTO user
            VALUES (?,?,?,?,?,?,?,?,0,?)
        `;

    const values = [
      studNo,
      password,
      codeName,
      lastName,
      firstName,
      type,
      email,
      contactNo,
      schoGuardian
    ];

    db.query(queryString, values, (err, results) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(results.insertId);
    });
  });
};

export const removeUser = ({ studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      DELETE 
        FROM user
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

export const editUser = ({
  studNo,
  password,
  codeName,
  lastName,
  firstName,
  type,
  email,
  contactNo,
  schoGuardian
}) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      UPDATE user
      SET
        password = ?,
        codeName = ?,
        lastName = ?,
        firstName = ?,
        type = ?,
        email = ?,
        schoGuardian = ?,
        contactNo = ?
      WHERE
        studNo = ?
    `;

    const values = [
      password,
      codeName,
      lastName,
      firstName,
      type,
      email,
      schoGuardian,
      contactNo,
      studNo
    ];

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
