import db from '../../database';

export const viewGrades = ({ studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT
        *
      FROM
        grade
      WHERE
        studNo = ?
        order by acadYear, semester, id
    `;

    db.query(queryString, studNo, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const viewOrgGWA = ({ semester, acadYear }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT 
        SUM (grade * units) / 
        SUM(units) 
        AS 
          orgGwa 
        FROM 
          grade 
        WHERE
          semester = ?
        AND
          acadYear = ?  
    `;
    const values = [semester, acadYear];
    db.query(queryString, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(rows);
    });
  });
};

export const viewGWA = ({ studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT 
        round(sum(grade * units) / sum(units),5) as gwa
      FROM 
        grade
      WHERE 
        studNo = ?
    `;
    db.query(queryString, studNo, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(rows[0]);
    });
  });
};


export const addGrade = ({
  studNo,
  subject,
  grade,
  units,
  acadYear,
  semester
}) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      INSERT INTO
        grade
      VALUES
        (DEFAULT, ?,?,?,?,?,?)
    `;

    const values = [studNo, subject, grade, units, acadYear, semester];

    db.query(queryString, values, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(rows.insertId);
    });
  });
};

export const removeGrade = ({ id }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT
        *
      FROM
        grade
      WHERE
        id = ?
    `;

    db.query(queryString, id, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      } else if (!rows.length) {
        return reject(404);
      }
    });

    const queryString1 = `
      DELETE FROM
        grade
      WHERE
        id = ?
    `;

    db.query(queryString1, id, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve();
    });
  });
};

export const editGrade = ({
  id,
  subject,
  grade,
  units,
  acadYear,
  semester
}) => {
  return new Promise((resolve, reject) => {
    const queryString = `
      SELECT
        *
      FROM
        grade
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
    });

    const queryString1 = `
        UPDATE
          grade
        SET
          grade = ?,
          units = ?,
          subject = ?,
          acadYear = ?,
          semester = ?
        WHERE
          id = ?
    `;

    const values1 = [grade, units, subject, acadYear, semester, id];

    db.query(queryString1, values1, (err, rows) => {
      if (err) {
        console.log(err);
        return reject(500);
      }

      return resolve(rows[0]);
    });
  });
};

