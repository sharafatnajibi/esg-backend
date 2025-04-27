const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory user store (for signup/login demo purposes)
const users = [];

// Signup API
app.post('/api/signup', (req, res) => {
  const { email, password } = req.body;
  if (users.find(user => user.email === email)) {
    return res.status(400).send('User already exists');
  }
  users.push({ email, password });
  res.status(200).send('Signup successful');
});

// Login API
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) {
    return res.status(401).send('Invalid credentials');
  }
  res.status(200).json({ token: 'dummy-token' });
});

// ✅ Full ESG Compute API (22 KPIs)
app.post('/api/compute', (req, res) => {
  const {
    scope12CO2,
    energyIntensity,
    waterWithdrawal,
    recyclingRate,
    landDisturbed,
    landRehabilitated,
    safetyTRIFR,
    genderDiversity,
    localEmployment,
    communityInvestment,
    collectiveBargaining,
    indigenousEngagement,
    trainingHours,
    humanRightsGrievance,
    boardIndependence,
    antiCorruptionPolicy,
    whistleblowerSystem,
    revenueTransparency,
    contractTransparency,
    beneficialOwnership,
    supplierCompliance,
    politicalEngagement
  } = req.body;

  let environmentalScore = 0;
  let socialScore = 0;
  let governanceScore = 0;

  // Environmental KPIs
  if (parseFloat(scope12CO2) <= 0.35) environmentalScore += 10;
  if (parseFloat(energyIntensity) <= 5.5) environmentalScore += 10;
  if (parseFloat(waterWithdrawal) <= 1) environmentalScore += 10;
  if (parseFloat(recyclingRate) >= 30) environmentalScore += 10;
  if (parseFloat(landDisturbed) <= 5.8) environmentalScore += 10;
  if (parseFloat(landRehabilitated) >= 40) environmentalScore += 10;

  // Social KPIs
  if (parseFloat(safetyTRIFR) <= 1.5) socialScore += 10;
  if (parseFloat(genderDiversity) >= 25) socialScore += 10;
  if (parseFloat(localEmployment) >= 65) socialScore += 10;
  if (parseFloat(communityInvestment) >= 1.5) socialScore += 10;
  if (parseFloat(collectiveBargaining) >= 54) socialScore += 10;
  if (indigenousEngagement) socialScore += 10;
  if (parseFloat(trainingHours) >= 30) socialScore += 10;
  if (humanRightsGrievance) socialScore += 10;

  // Governance KPIs
  if (parseFloat(boardIndependence) >= 65) governanceScore += 10;
  if (antiCorruptionPolicy) governanceScore += 10;
  if (whistleblowerSystem) governanceScore += 10;
  if (revenueTransparency.toLowerCase() === 'full') governanceScore += 10;
  if (contractTransparency.toLowerCase() === 'full') governanceScore += 10;
  if (beneficialOwnership) governanceScore += 10;
  if (supplierCompliance) governanceScore += 10;
  if (politicalEngagement) governanceScore += 10;

  // Max Points:
  // Environmental = 60
  // Social = 80
  // Governance = 80

  // Normalize scores to 100
  const environmentalNormalized = (environmentalScore / 60) * 100;
  const socialNormalized = (socialScore / 80) * 100;
  const governanceNormalized = (governanceScore / 80) * 100;

  const finalESGScore = (environmentalNormalized + socialNormalized + governanceNormalized) / 3;

  let rating = '';
  if (finalESGScore >= 90) rating = 'Very Strong (A+)';
  else if (finalESGScore >= 80) rating = 'Strong (A)';
  else if (finalESGScore >= 70) rating = 'Good (B)';
  else if (finalESGScore >= 60) rating = 'Low (C)';
  else rating = 'Poor (D)';

  res.json({
    environmentalScore: environmentalNormalized.toFixed(2),
    socialScore: socialNormalized.toFixed(2),
    governanceScore: governanceNormalized.toFixed(2),
    finalESGScore: finalESGScore.toFixed(2),
    rating,
  });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
