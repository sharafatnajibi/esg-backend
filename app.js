const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const users = [];

app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).send('User exists');
  users.push({ email, password });
  res.status(200).send('Signed up');
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).send('Invalid credentials');
  res.status(200).json({ token: 'sample-token' });
});

app.post('/api/compute', (req, res) => {
  const { co2, energy, water, recycle, land, rehab } = req.body;
  let totalScore = 0;

  // Simple logic from your Full ESG Scorecard
  if (co2 <= 1) totalScore += 15;
  if (energy <= 1) totalScore += 15;
  if (water <= 1) totalScore += 15;
  if (recycle >= 50) totalScore += 15;
  if (land <= 1) totalScore += 20;
  if (rehab >= 50) totalScore += 20;

  let rating = '';
  if (totalScore >= 90) rating = 'Very Strong (A+)';
  else if (totalScore >= 80) rating = 'Strong (A)';
  else if (totalScore >= 70) rating = 'Good (B)';
  else if (totalScore >= 60) rating = 'Low (C)';
  else rating = 'Poor (D)';

  res.json({ totalScore, rating });
});

app.listen(5000, () => console.log('Server running on port 5000'));
