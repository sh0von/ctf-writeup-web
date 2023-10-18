import React, { useState, useEffect } from 'react';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import matter from 'gray-matter';
import styled, { ServerStyleSheet } from 'styled-components'; // Import ServerStyleSheet
import Header from '../components/Header';
import Footer from '../components/Footer';
import theme from '../styles/theme';
import UpcomingContestsPopup from '../components/UpcomingContestsPopup';
import SEO from '../components/SEO';

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


const Home = ({ writeups }) => {
  const [isContentVisible, setContentVisibility] = useState(false);
  const [upcomingContests, setUpcomingContests] = useState([]);

  useEffect(() => {
    async function fetchUpcomingContests() {
      try {
        const response = await fetch('/api/upcoming'); // Use the correct API endpoint
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
      <SEO
        title="C-Sec"
        description="C-Sec website by BYTE"
        ogImage="https://imageupload.io/ib/95X3bjGHAq8XqlK_1697642998.png"
      />

      <HomeWrapper>
        <BlogList>
          {writeups.map((writeup) => (
            <Link key={writeup.slug} href={`/${writeup.slug}`}>
              <WriteupCard>
                <h3>{writeup.data.title}</h3>   
                <p>{writeup.data.description.slice(0, 80)}</p>
                <p>Author: {writeup.data.author}</p>
              </WriteupCard>
            </Link>
          ))}
        </BlogList>
      </HomeWrapper>
      <Footer />

      <UpcomingContestsPopup
        isVisible={isContentVisible}
        upcomingContests={upcomingContests}
        toggleContentVisibility={toggleContentVisibility}
      />
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
