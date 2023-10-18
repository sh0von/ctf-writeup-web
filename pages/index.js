import React, { useState, useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import matter from 'gray-matter'
import styled from 'styled-components'
import Header from '../components/Header'
import Footer from '../components/Footer'
import theme from '../styles/theme'
import UpcomingContestsPopup from '../components/UpcomingContestsPopup' // Adjust the import path as needed
import SEO from '../components/SEO' // Adjust the import path as needed

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
`

const BlogList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  max-width: 700px;
`

const WriteupCard = styled.div`
  border: 1px solid #fff;
  padding: 10px;
  flex: 1;
  max-width: 300px;
`

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
  }

  const truncateDescription = (description) => {
    if (description.length > 100) {
      return description.substring(0, 100) + '...';
    }
    return description;
  };

  return (
    <div>
      <Header />
      <SEO
        title="C-Sec" // Dynamic title
        description="C-Sec website by BYTE" // Dynamic description
        
  ogImage="https://og-image-rest-generator.fly.dev/seo-banner?title=OG:IMAGE%20REST%20Generator%20-%20Free%20And%20Open%20Source!&author=darkterminal&head=Young%20Tyrex%20Release&writer=Punk%20Storyteller"
      />

      <HomeWrapper>
        <BlogList>
          {writeups.map((writeup) => (
            <Link key={writeup.slug} href={`/${writeup.slug}`}>
              <WriteupCard>
                <h3>{writeup.data.title}</h3>
                <p>{truncateDescription(writeup.data.description)}</p>
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
}


export async function getStaticProps () {
  const files = fs.readdirSync(path.join(process.cwd(), 'ctf-writeups'))
  const writeups = files.map((filename) => {
    const markdownWithMetadata = fs.readFileSync(
      path.join(process.cwd(), 'ctf-writeups', filename),
      'utf-8'
    )
    const { data } = matter(markdownWithMetadata)
    return {
      slug: filename.replace('.md', ''),
      data
    }
  })
  return {
    props: {
      writeups
    }
  }
}

export default Home
