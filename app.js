const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Fake in-memory database
const users = [];

// Signup Endpoint
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  const existingUser = users.find(u => u.email === email);

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 8);
  users.push({ email, password: hashedPassword });
  res.json({ message: 'Signup successful' });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const passwordIsValid = bcrypt.compareSync(password, user.password);
  if (!passwordIsValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ email: user.email }, 'secretkey', { expiresIn: '1h' });
  res.json({ message: 'Login successful', token });
});

// ESG Scoring Endpoint
function calculateESG(data) {
  let environmental = data.energy < 100 ? 90 : 50;
  let social = data.diversity > 50 ? 85 : 60;
  let governance = data.compliance ? 95 : 50;
  let totalScore = (environmental + social + governance) / 3;
  return { environmental, social, governance, totalScore };
}

app.post('/api/compute', (req, res) => {
  const data = req.body;
  const score = calculateESG(data);
  res.json(score);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
