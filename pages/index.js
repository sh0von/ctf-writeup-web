import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import styled from 'styled-components';
import Header from '../components/Header';
import Footer from '../components/Footer';
import theme from '../styles/theme';
import moment from 'moment';



const HomeWrapper = styled.div`
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

const BlogList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 700px;
`;

const WriteupCard = styled.div`
  border: 1px solid #fff;
  padding: 10px;
  flex: 1;
  max-width: 300px;
`;

const ToggleButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 20px;
  left: 20px;
`;

const PopUpContent = styled.div`
  background-color: #000;
  border: 1px solid #007bff;
  position: fixed;
  bottom: 70px;
  left: 20px;
  padding: 10px;
  max-width: 300px;
  display: ${(props) => (props.isVisible ? 'block' : 'none')};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s; /* Add animation for popup */
  /* Make the content scrollable */
  max-height: 400px; /* Adjust the maximum height as needed */
  overflow: auto; /* Enable vertical scrolling if content exceeds the max height */

  /* Style the scrollbar */
  scrollbar-width: thin; /* Firefox */
  scrollbar-color: #007bff #000; /* Firefox */
  &::-webkit-scrollbar {
    width: 7px; /* Width of the scrollbar */
  }
  &::-webkit-scrollbar-thumb {
    background-color: #007bff; /* Color of the scrollbar thumb */
    border-radius: 0px; /* Rounded corners for the thumb */
  }
  ul {
    list-style: disc; /* Style for unordered lists (bulleted) */
    padding-left: 20px; /* Adjust the left padding as needed */

    li {
      margin: 5px 0; /* Adjust the margin between list items */
      color: #fff; /* Text color for list items */
    }
`;
const MinimizeButton = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  line-height: 0;
`;

const Home = ({ writeups }) => {
  const [isContentVisible, setContentVisibility] = useState(false);
  const [upcomingContests, setUpcomingContests] = useState([]);
  
  

  useEffect(() => {
    async function fetchUpcomingContests() {
      try {
        const response = await fetch('api/upcoming'); // Replace with the correct API endpoint
        if (response.ok) {
          const data = await response.json();
          setUpcomingContests(data);
        }
      } catch (error) {
        console.error('Error fetching upcoming contests:', error);
      }
    }

    fetchUpcomingContests();
  }, []);

  const toggleContentVisibility = () => {
    setContentVisibility(!isContentVisible);
  };

  return (
    <div>
      <Header />
      <HomeWrapper>
        <h1 className='text-center my-4'>Welcome to CTF Writeups</h1>
        <BlogList>
          {writeups.map((writeup) => (
            <Link key={writeup.slug} href={`/${writeup.slug}`}>
              <WriteupCard>
                <h3>{writeup.data.title}</h3>
                <p>{writeup.data.description}</p>
                <p>Author: {writeup.data.author}</p>
              </WriteupCard>
            </Link>
          ))}
        </BlogList>
      </HomeWrapper>
      <Footer />
      <ToggleButton onClick={toggleContentVisibility}>+</ToggleButton>
      <PopUpContent isVisible={isContentVisible}>
        <MinimizeButton onClick={toggleContentVisibility}>-</MinimizeButton>
        {upcomingContests.length > 0 ? (
          <div>
         <div>

  {upcomingContests.slice(0, 10).map((contest) => (
    <div key={contest.id}>
      <h5>{contest.title}</h5>
      <p>Start: {moment(contest.start).format('D MMMM YYYY')}</p>
      <p>Format: {contest.format}</p>
      <hr /> 
    </div>
   
  ))}
</div>

          </div>
        ) : (
          <p>No upcoming contests available.</p>
        )}
      </PopUpContent>
    </div>
  );
};

export async function getStaticProps() {
  const files = fs.readdirSync(path.join(process.cwd(), 'ctf-writeups'));
  const writeups = files.map((filename) => {
    const markdownWithMetadata = fs.readFileSync(
      path.join(process.cwd(), 'ctf-writeups', filename),
      'utf-8'
    );
    const { data } = matter(markdownWithMetadata);
    return {
      slug: filename.replace('.md', ''),
      data,
    };
  });
  return {
    props: {
      writeups,
    },
  };
}

export default Home;
