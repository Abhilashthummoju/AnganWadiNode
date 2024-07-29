const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Define the path to your database file
const dbPath = path.resolve(__dirname, 'database.sqlite');

// Open a connection to the database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Could not connect to the database', err);
  } else {
    console.log('Connected to the SQLite database');
  }
});

// Initialize your tables if they don't exist
db.serialize(() => {

    db.run(`CREATE TABLE IF NOT EXISTS attendance (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  childId INTEGER,
  date TEXT,
  status TEXT,
  UNIQUE(childId, date) 
)`)

    db.run(`
        CREATE TABLE IF NOT EXISTS polio (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          childId INTEGER,
          date TEXT,
          FOREIGN KEY (childId) REFERENCES children (id)
        )
      `);

  db.run(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT UNIQUE,
      password TEXT
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS children_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      age INTEGER,
      fathersName TEXT,
      mothersName TEXT,
      dateOfBirth TEXT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS children (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      fathersName TEXT NOT NULL,
      mothersName TEXT NOT NULL,
      dateOfBirth TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS mothers (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      firstName TEXT,
      lastName TEXT,
      email TEXT UNIQUE,
      password TEXT,
      phoneNumber TEXT,
      address TEXT
    )
  `);
  // Assuming you have a SQLite database connection as `db`

  // Create Vaccines table
  db.run(`
    CREATE TABLE IF NOT EXISTS Vaccines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT
    )
  `);

  // Create VaccineReceived table
  db.run(`
    CREATE TABLE IF NOT EXISTS VaccineReceived (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      childId INTEGER NOT NULL,
      vaccineId INTEGER NOT NULL,
      dateReceived DATE NOT NULL,
      FOREIGN KEY (childId) REFERENCES Children(id) ON DELETE CASCADE,
      FOREIGN KEY (vaccineId) REFERENCES Vaccines(id) ON DELETE CASCADE
    )
  `);

  // Create VaccineRequests table
  db.run(`
    CREATE TABLE IF NOT EXISTS VaccineRequests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      childId INTEGER NOT NULL,
      vaccineId INTEGER NOT NULL,
      requestDate DATE NOT NULL,
      status TEXT DEFAULT 'Pending',
      FOREIGN KEY (childId) REFERENCES Children(id) ON DELETE CASCADE,
      FOREIGN KEY (vaccineId) REFERENCES Vaccines(id) ON DELETE CASCADE
    )
  `);

  // Create indexes for VaccineReceived
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_vaccine_received_childId ON VaccineReceived (childId)
  `);
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_vaccine_received_vaccineId ON VaccineReceived (vaccineId)
  `);

  // Create indexes for VaccineRequests
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_vaccine_requests_childId ON VaccineRequests (childId)
  `);
  db.run(`
    CREATE INDEX IF NOT EXISTS idx_vaccine_requests_vaccineId ON VaccineRequests (vaccineId)
  `);


  
});

db.run(`CREATE TABLE IF NOT EXISTS timetable (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day TEXT NOT NULL,
    breakfast TEXT,
    lunch TEXT,
    snacks TEXT
  )`, (err) => {
    if (err) {
      console.error('Error creating timetable table:', err);
    } else {
      // Initialize the timetable with default values if empty
      db.all('SELECT COUNT(*) as count FROM timetable', (err, rows) => {
        if (err) {
          console.error('Error counting timetable rows:', err);
        } else if (rows[0].count === 0) {
          const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          days.forEach(day => {
            db.run(`INSERT INTO timetable (day, breakfast, lunch, snacks) VALUES (?, ?, ?, ?)`, [day, '', '', '']);
          });
        }
      });
    }
  });
  

module.exports = db;
