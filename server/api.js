const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const router = express.Router();

const STAGES_FILE = path.join(__dirname, '../src/assets/stages.json');

// Get all stages
router.get('/stages', async (req, res) => {
  try {
    const data = await fs.readFile(STAGES_FILE, 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading stages' });
  }
});

// Support both PUT and POST for updating stages
router.put('/stages', handleStagesUpdate);
router.post('/stages', handleStagesUpdate);

async function handleStagesUpdate(req, res) {
  try {
    const stages = req.body;
    await fs.writeFile(STAGES_FILE, JSON.stringify(stages, null, 2));
    res.json(stages);
  } catch (error) {
    res.status(500).json({ error: 'Error updating stages' });
  }
}

module.exports = router;
