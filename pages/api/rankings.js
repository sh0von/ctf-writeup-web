// pages/api/rankings.js
import fs from 'fs';
import path from 'path';

const rankingsFilePath = path.join(process.cwd(), 'public', 'rankings.csv');

export default (req, res) => {
  try {
    const rankingsData = fs.readFileSync(rankingsFilePath, 'utf-8');
    res.status(200).send(rankingsData);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching rankings data' });
  }
};
