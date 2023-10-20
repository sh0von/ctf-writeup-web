import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import theme from '../styles/theme';
const RankingsWrapper = styled.div`
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  padding: 20px;
  font-family: 'PixelFont', monospace;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-height: 100vh;
`;

const RankingsTableContainer = styled.div`
  width: 100%; /* Set the desired max height for scrollability */
  overflow-x: auto; /* Enable vertical scrolling if content exceeds max height */
  scrollbar-width: thin;
  scrollbar-color: #007bff;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.colors.primary};
    border-radius: 6px;
  }
`;

const RankingsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  align-self: center;
  margin: 20px auto;
  background-color: ${theme.colors.background};
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.text};
  border-radius: 5px;
  max-width: 700px;

  th {
    background-color: ${theme.colors.primary};
    color: ${theme.colors.background};
    padding: 10px;
    text-align: center;
  }

  th, td {
    padding: 10px;
    text-align: center;
  }

  tr:nth-child(even) {
    background-color: ${theme.colors.secondary};
  }
`;
const PageSize = 10; // Number of entries per page

const Rankings = () => {
  const [rankings, setRankings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch data from the API route
    fetch('/api/rankings')
      .then((response) => response.text())
      .then((csvData) => {
        // Parse the CSV data into an array of objects
        const lines = csvData.split('\n');
        const csvRankings = [];
        for (let i = 1; i < lines.length; i++) {
          const data = lines[i].split(',');
          const ranking = {
            Name: data[0],
            Rating: data[1],
            picoCTF_Score: data[2],
            TryHackMe_Score: data[3],
          };
          csvRankings.push(ranking);
        }

        // Sort rankings by rating in descending order (from highest to lowest)
        csvRankings.sort((a, b) => b.Rating - a.Rating);
        setRankings(csvRankings);
      })
      .catch((error) => {
        console.error('Error fetching rankings data:', error);
      });
  }, []);

  const totalPages = Math.ceil(rankings.length / PageSize);
  const startIndex = (currentPage - 1) * PageSize;
  const endIndex = Math.min(startIndex + PageSize, rankings.length);
  const currentRankings = rankings.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <RankingsWrapper>
      <h1>Top 10 Rankings (Descending by Rating)</h1>
      <RankingsTableContainer>
      <RankingsTable>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Name</th>
            <th>Rating</th>
            <th>picoCTF Score</th>
            <th>TryHackMe Score</th>
          </tr>
        </thead>
        <tbody>
          {currentRankings.map((person, index) => (
            <tr key={index}>
              <td>{startIndex + index + 1}</td>
              <td>{person.Name}</td>
              <td>{person.Rating}</td>
              <td>{person.picoCTF_Score}</td>
              <td>{person.TryHackMe_Score}</td>
            </tr>
          ))}
        </tbody>
      </RankingsTable>
      </RankingsTableContainer>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </RankingsWrapper>
  );
};

export default Rankings;

// Pagination Component with Minimized Styles
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="pagination-container">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          &lt; Prev
        </button>
        <span className="pagination-text">
          {`Page ${currentPage} of ${totalPages}`}
        </span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next &gt;
        </button>
        <style jsx>{`
          .pagination-container {
            display: flex;
            align-items: center;
            justify-content: center;
          }
  
          .pagination-button {
            background-color: #007bff;
            color: #fff;
            border: none;
            padding: 5px 10px;
            margin: 0 5px;
            cursor: pointer;
            border-radius: 5px;
            font-size: 12px;
          }
  
          .pagination-button:disabled {
            background-color: #ccc;
            cursor: not-allowed;
          }
  
          .pagination-text {
            font-size: 14px;
            margin: 0 10px;
          }
        `}</style>
      </div>
    );
  };
  