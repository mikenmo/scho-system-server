import db from '../../database';

// addPoints, subtractPoints, resetPoints, resetAllPoints
// addPoints + subtractPoints = 1 parameter (yung number)
// resetPoints = singular per member, no param, resetAllPoints = no param too

export const addPoints = ({ points, studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        UPDATE user 
        SET
            schoPoints=schoPoints+?
        WHERE studNo=?
      `;
    const values = [points, studNo];

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

export const subtractPoints = ({ points, studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
          UPDATE user 
          SET
              schoPoints=schoPoints-?
          WHERE studNo=?
        `;
    const values = [points, studNo];

    db.query(queryString, values, (err, res) => {
      console.log(points, studNo);
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
export const resetPoints = ({ studNo }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        UPDATE user 
        SET
            schoPoints=0
        WHERE studNo=?
      `;

    db.query(queryString, studNo, (err, res) => {
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

export const resetAllPoints = ({ schoGuardian }) => {
  return new Promise((resolve, reject) => {
    const queryString = `
        UPDATE user 
        SET
          schoPoints = 0
        WHERE
          schoGuardian = ?
      `;
    const values = [schoGuardian];

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
