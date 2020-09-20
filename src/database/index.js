import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'schosys',
  password: 'kyahsum',
  db: 'schosys',
  dateStrings: true
});

db.connect(err => {
  if (err) {
    console.log('Error in connecting to database');
    console.log(err);
  } else {
    console.log('Success in connecting to database');
  }
});

db.query('USE schosys');

export default db;