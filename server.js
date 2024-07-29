const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('./database');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true, // Allow credentials
};
app.use(cors(corsOptions));
app.use(morgan('dev'));
const SECRET_KEY = 'your_secret_key';

// Admin signup
app.post('/admin/signup', (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 8);

  db.run(
    `INSERT INTO admins (firstName, lastName, email, password) VALUES (?, ?, ?, ?)`,
    [firstName, lastName, email, hashedPassword],
    function (err) {
      if (err) {
        return res.status(500).send('Error creating admin');
      }

      // Log the admins table after a new admin is created
      db.all(`SELECT * FROM admins`, [], (err, admins) => {
        if (err) {
          return console.error('Error retrieving admins:', err);
        }
        console.log('Admins table:', admins);
      });

      res.status(201).send({ id: this.lastID });
    }
  );
});

// Admin login
app.post('/admin/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT * FROM admins WHERE email = ?`,
    [email],
    (err, admin) => {
      if (err || !admin || !bcrypt.compareSync(password, admin.password)) {
        console.log("error", err)
        return res.status(401).send('Invalid email or password');
      }
      const token = jwt.sign({ id: admin.id }, SECRET_KEY);
      res.status(200).send({ token });
    }
  );
});

// Child registration
app.post('/children/register', (req, res) => {
    const { name, age, fathersName, mothersName, dateOfBirth, email, password } = req.body;
    console.log("BODY",req.body)
  
    db.run(
      `INSERT INTO children_requests (name, age, fathersName, mothersName, dateOfBirth, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, age, fathersName, mothersName, dateOfBirth, email, password],
      function (err) {
        if (err) {
            console.log("ERROR",err)
          return res.status(500).send('Error registering child');
        }
        res.status(201).send({ id: this.lastID });
      }
    );
  });
  
// Fetch all child requests
app.get('/children/requests', (req, res) => {
    db.all('SELECT * FROM children_requests', (err, rows) => {
      if (err) {
        return res.status(500).send('Error fetching child requests');
      }
      res.status(200).json(rows);
    });
  });

// Mother signup
app.post('/mother/signup', (req, res) => {
    const { firstName, lastName, email, password, phoneNumber, address } = req.body;
    // const hashedPassword = bcrypt.hashSync(password, 8);
  
    db.run(
      `INSERT INTO mothers (firstName, lastName, email, password, phoneNumber, address) VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, password, phoneNumber, address],
      function (err) {
        if (err) {
            console.log("error",err)
          return res.status(500).send('Error creating mother');
        }
        res.status(201).send({ id: this.lastID });
      }
    );
  });
  app.delete('/admin/drop-mothers-table', (req, res) => {
    db.run(`DROP TABLE IF EXISTS mothers`, function(err) {
      if (err) {
        return res.status(500).send('Error dropping mothers table');
      }
      res.status(200).send('Mothers table dropped successfully');
    });
  });

// Mother login
app.post('/mother/login', (req, res) => {
  const { email, password } = req.body;

  db.get(
    `SELECT * FROM mothers WHERE email = ?`,
    [email],
    (err, mother) => {
      if (err || !mother || password!=mother.password) {
        return res.status(401).send('Invalid email or password');
      }
      const token = jwt.sign({ id: mother.id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).send({ token });
    }
  );
});

// Admin approve child registration
app.post('/admin/approve-child', (req, res) => {
    const { childId } = req.body;
  
    if (!childId) {
      return res.status(400).send('Child ID is required');
    }
  
    // Fetch the child request
    db.get(`SELECT * FROM children_requests WHERE id = ?`, [childId], (err, childRequest) => {
      if (err) {
        console.error('Error fetching child request:', err);
        return res.status(500).send('Error fetching child request');
      }
  
      if (!childRequest) {
        return res.status(404).send('Child request not found');
      }
  
      // Insert the child into the children table
      const { name, age, fathersName, mothersName, dateOfBirth, email, password } = childRequest;
      db.run(
        `INSERT INTO children (name, age, fathersName, mothersName, dateOfBirth, email, password) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [name, age, fathersName, mothersName, dateOfBirth, email, password],
        function (err) {
          if (err) {
            console.error('Error inserting child:', err);
            return res.status(500).send('Error inserting child');
          }
  
          // Delete the child request after insertion
          db.run(`DELETE FROM children_requests WHERE id = ?`, [childId], (err) => {
            if (err) {
              console.error('Error deleting child request:', err);
              return res.status(500).send('Error deleting child request');
            }
  
            res.status(200).send({ message: 'Child approved successfully', id: this.lastID });
          });
        }
      );
    });
  });
  

// Get all users (admins, children, and mothers)
app.get('/admin/view-users', (req, res) => {
  const users = {};

  // Get all admins
  db.all(`SELECT * FROM admins`, [], (err, admins) => {
    if (err) {
      return res.status(500).send('Error retrieving admins');
    }
    users.admins = admins;

    // Get all children
    db.all(`SELECT * FROM children`, [], (err, children) => {
      if (err) {
        return res.status(500).send('Error retrieving children');
      }
      users.children = children;

      // Get all mothers
      db.all(`SELECT * FROM mothers`, [], (err, mothers) => {
        if (err) {
          return res.status(500).send('Error retrieving mothers');
        }
        users.mothers = mothers;

        res.status(200).json(users);
      });
    });
  });
});

// Children login
app.post('/children/login', (req, res) => {
    const { email, password } = req.body;
  
    db.get(
      `SELECT * FROM children WHERE email = ?`,
      [email],
      (err, child) => {
        if (err || !child) {
         console.log("ERROR",err)
          return res.status(401).send('Invalid email or password');
        }
  
        // Assuming children password is stored in the same way as the others
        if (password!=child.password) {
          return res.status(401).send('Invalid email or password');
        }
  
        const token = jwt.sign({ id: child.id }, SECRET_KEY, { expiresIn: '1h' });
        res.status(200).send({ token });
      }
    );
  });

// TimeTable 
app.get('/timetable', (req, res) => {
    db.all('SELECT * FROM timetable', (err, rows) => {
      if (err) {
        return res.status(500).send('Error fetching timetable data');
      }
      res.status(200).json(rows);
    });
  });
  
  // Update timetable data
  app.put('/timetable/:day', (req, res) => {
    const { day } = req.params;
    const { breakfast, lunch, snacks } = req.body;
  
    db.run(
      `UPDATE timetable SET breakfast = ?, lunch = ?, snacks = ? WHERE day = ?`,
      [breakfast, lunch, snacks, day],
      function (err) {
        if (err) {
          return res.status(500).send('Error updating timetable data');
        }
        res.status(200).send('Timetable updated successfully');
      }
    );
  });


//   Polio Details 
app.get('/polio', (req, res) => {
    db.all(`
      SELECT p.id, c.name, c.age, p.date 
      FROM polio p 
      JOIN children c ON p.childId = c.id
    `, (err, rows) => {
      if (err) {
        return res.status(500).send('Error fetching polio details');
      }
      res.status(200).json(rows);
    });
  });

  // Route to add a new polio entry
app.post('/polio', (req, res) => {
    const { childId, date } = req.body;
    db.run(
      `INSERT INTO polio (childId, date) VALUES (?, ?)`,
      [childId, date],
      function (err) {
        if (err) {
          return res.status(500).send('Error adding polio entry');
        }
        res.status(201).send({ id: this.lastID });
      }
    );
  });

  // Route to delete a polio entry
app.delete('/polio/:id', (req, res) => {
    const { id } = req.params;
    db.run(
      `DELETE FROM polio WHERE id = ?`,
      [id],
      function (err) {
        if (err) {
          return res.status(500).send('Error deleting polio entry');
        }
        res.status(200).send('Polio entry deleted');
      }
    );
  });

  app.get('/children', (req, res) => {
    db.all('SELECT * FROM children', (err, rows) => {
      if (err) {
        console.error('Error fetching children data:', err);
        return res.status(500).send('Error fetching children data');
      }
  
      // Log the fetched data to the console
      console.log('Children Data:', rows);
  
      // Send the fetched data as the response
      res.status(200).json(rows);
    });
  });
  

  app.get('/mothers', (req, res) => {
    db.all('SELECT * FROM mothers', (err, rows) => {
      if (err) {
        console.error('Error fetching mothers data:', err);
        return res.status(500).send('Error fetching mothers data');
      }

      console.log('Mothers Data:', rows);
      res.status(200).json(rows);
    });
  });


  // Nutrition data
const nutritionData = [
    {
      id: 1,
      category: 'Children (6-36 months)',
      foodType: 'Take Home Ration',
      energy: '500 Kcal',
      protein: '12 to 15 g'
    },
    {
      id: 2,
      category: 'Children (3-6 years)',
      foodType: 'Morning snack and Hot cooked Meal',
      energy: '500 Kcal',
      protein: '12 to 15 g'
    },
    {
      id: 3,
      category: 'Severely malnourished children (3-6 years)',
      foodType: 'Take Home Ration',
      energy: '800 Kcal',
      protein: '20 to 25 g'
    },
    {
      id: 4,
      category: 'Pregnant women & Nursing mothers',
      foodType: 'Take Home Ration',
      energy: '600 Kcal',
      protein: '18 to 20 g'
    },
    {
      id: 5,
      category: 'Out-of-School Adolescent Girls (11-14 years)',
      foodType: 'Take Home Ration',
      energy: '600 Kcal',
      protein: '18 to 20 g'
    }
  ];
  
  app.get('/nutrition', (req, res) => {
    res.status(200).json(nutritionData);
  });
  


  app.get('/attendance/all', (req, res) => {
    db.all('SELECT * FROM attendance', (err, rows) => {
      if (err) {
        console.error('Error fetching attendance records:', err);
        return res.status(500).send('Error fetching attendance records');
      }
      res.status(200).json(rows);
    });
  });
  // Get today's attendance
  app.get('/attendance', (req, res) => {
    const query = `
      SELECT c.name AS childName, a.date, a.status
      FROM attendance a
      JOIN children c ON a.childId = c.id
      ORDER BY a.date DESC
    `;
  
    db.all(query, (err, rows) => {
      if (err) {
        console.error('Error fetching attendance records:', err);
        return res.status(500).send('Error fetching attendance records');
      }
      res.status(200).json(rows);
    });
  });
  
  // Update attendance for a specific date
  
  app.post('/attendance', (req, res) => {
    const { date, childId, status } = req.body;
  
    if (!date || !childId || !status) {
      return res.status(400).send('Missing required fields');
    }
  
    // Check if the attendance record already exists
    db.get(
      `SELECT * FROM attendance WHERE childId = ? AND date = ?`,
      [childId, date],
      (err, row) => {
        if (err) {
          console.error('Error checking attendance record:', err);
          return res.status(500).send('Error checking attendance record');
        }
  
        if (row) {
          // Record exists, perform update
          db.run(
            `UPDATE attendance SET status = ? WHERE childId = ? AND date = ?`,
            [status, childId, date],
            function (err) {
              if (err) {
                console.error('Error updating attendance:', err);
                return res.status(500).send('Error updating attendance');
              }
              res.status(200).send('Attendance updated');
            }
          );
        } else {
          // Record does not exist, perform insert
          db.run(
            `INSERT INTO attendance (childId, date, status) VALUES (?, ?, ?)`,
            [childId, date, status],
            function (err) {
              if (err) {
                console.error('Error inserting attendance:', err);
                return res.status(500).send('Error inserting attendance');
              }
              res.status(200).send('Attendance recorded');
            }
          );
        }
      }
    );
  });
  

  app.delete('/children/delete-all', (req, res) => {
    db.run('DELETE FROM children', function (err) {
      if (err) {
        console.error('Error deleting all records from children table:', err);
        return res.status(500).send('Error deleting records');
      }
      res.status(200).send('All records deleted successfully');
    });
  });


  //get attendance of child
  app.get('/attendance/:childId', (req, res) => {
    const { childId } = req.params;
  
    db.all(
      `SELECT * FROM attendance WHERE childId = ? ORDER BY date DESC`,
      [childId],
      (err, rows) => {
        if (err) {
          return res.status(500).send('Error fetching attendance records');
        }
        res.status(200).json(rows);
      }
    );
  });

  // Fetch child profile details
app.get('/children/:id', (req, res) => {
    const { id } = req.params;
  
    db.get(
      `SELECT * FROM children WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) {
          return res.status(500).send('Error fetching child profile');
        }
        if (!row) {
          return res.status(404).send('Child not found');
        }
        res.status(200).json(row);
      }
    );
  });
  

  app.get('/mothers/:id', (req, res) => {
    const motherId = req.params.id;
  
    db.get(`SELECT * FROM mothers WHERE id = ?`, [motherId], (err, mother) => {
      if (err) {
        return res.status(500).send('Error fetching mother profile');
      }
      if (!mother) {
        return res.status(404).send('Mother not found');
      }
      res.status(200).json(mother);
    });
  });

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
