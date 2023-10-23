import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';
import React from 'react';

import Header from '../components/Header'; // Import the Header component
import Footer from '../components/Footer'; // Import the Footer component
import Rankings from '../components/Rankings';

// Create a function to read the CSV file and return the data as a promise
const readCSVData = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};

const RankingsPage = ({ rankingsData }) => {
  return (
    <div>
            <SEO
        title="C-Sec Rankings"
        description="C-Sec website by BYTE"
        ogImage="https://imageupload.io/ib/95X3bjGHAq8XqlK_1697642998.png"
      />
      <Header /> {/* Include the Header component */}
      <Rankings rankings={rankingsData} />
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), 'public', 'rankings.csv');
  const rankingsData = await readCSVData(filePath);

  return {
    props: {
      rankingsData,
    },
  };
}

export default RankingsPage;
