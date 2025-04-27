app.post('/api/compute', (req, res) => {
  const {
    scope12CO2,
    scope3CO2,
    energyIntensity,
    waterIntensity,
    wasteRecovery,
    landDisturbed,
    landRehabilitated,
    workforceDiversity,
    employeeTurnover,
    humanRightsPolicy,
    boardDiversity,
    antiBriberyPolicy,
    esgReporting
  } = req.body;

  let environmentalScore = 0;
  let socialScore = 0;
  let governanceScore = 0;

  // Environmental KPIs
  if (parseFloat(scope12CO2) <= 1.5) environmentalScore += 10;
  if (parseFloat(scope3CO2) <= 1.5) environmentalScore += 10;
  if (parseFloat(energyIntensity) <= 10) environmentalScore += 10;
  if (parseFloat(waterIntensity) <= 5) environmentalScore += 10;
  if (parseFloat(wasteRecovery) >= 90) environmentalScore += 10;
  if (parseFloat(landDisturbed) <= 0.5) environmentalScore += 10;
  if (parseFloat(landRehabilitated) >= 75) environmentalScore += 10;

  // Social KPIs
  if (parseFloat(workforceDiversity) >= 40) socialScore += 10;
  if (parseFloat(employeeTurnover) <= 10) socialScore += 10;
  if (humanRightsPolicy) socialScore += 10;

  // Governance KPIs
  if (parseFloat(boardDiversity) >= 30) governanceScore += 10;
  if (antiBriberyPolicy) governanceScore += 10;
  if (esgReporting) governanceScore += 10;

  // Environmental max points: 70
  // Social max points: 30
  // Governance max points: 30

  // Normalize to 100 scale
  const environmentalNormalized = (environmentalScore / 70) * 100;
  const socialNormalized = (socialScore / 30) * 100;
  const governanceNormalized = (governanceScore / 30) * 100;

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
