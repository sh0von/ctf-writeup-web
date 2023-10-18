// pages/[slug].js
import fs from 'fs'
import path from 'path'
import React, { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styled from 'styled-components'
import SEO from '../components/SEO'
import UpcomingContestsPopup from '../components/UpcomingContestsPopup'

const WriteupWrapper = styled.div`
  background-color: #000; /* Background color for code blocks (bluish) */
  margin: 0 auto; /* Center the content horizontally */
  padding: 20px; /* Adjust the padding as needed */
  font-family: 'MonospaceFont', monospace; /* Use your preferred monospace font */
  justify-content: center; /* Center horizontally */
  max-width: 700px; /* Limit the maximum width of the content */
`

const Writeup = ({ content, data }) => {
  const [isContentVisible, setContentVisibility] = useState(false)
  const [upcomingContests, setUpcomingContests] = useState([])

  useEffect(() => {
    async function fetchUpcomingContests () {
      try {
        const response = await fetch('api/upcoming') // Replace with the correct API endpoint
        if (response.ok) {
          const data = await response.json()
          setUpcomingContests(data)
        }
      } catch (error) {
        console.error('Error fetching upcoming contests:', error)
      }
    }

    fetchUpcomingContests()
  }, [])

  const toggleContentVisibility = () => {
    setContentVisibility(!isContentVisible)
  }

  return (
    <div>
      <Header />
      <SEO
        title={data.title} // Dynamic title
        description={data.description} // Dynamic description
        ogImage="https://imageupload.io/ib/95X3bjGHAq8XqlK_1697642998.png"
      />

      <WriteupWrapper>
        <h1 className="text-center">{data.title}</h1>
        <p className="text-center">{data.tags.join(', ')}</p>

        <p className="text-center">Author: {data.author}</p>

        <ReactMarkdown>{content}</ReactMarkdown>
      </WriteupWrapper>

      <Footer />
      <UpcomingContestsPopup
        isVisible={isContentVisible}
        upcomingContests={upcomingContests}
        toggleContentVisibility={toggleContentVisibility}
      />
    </div>
  )
}

export async function getStaticPaths () {
  const files = fs.readdirSync(path.join(process.cwd(), 'ctf-writeups'))
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', '')
    }
  }))
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps ({ params }) {
  const { slug } = params
  const markdownWithMetadata = fs.readFileSync(
    path.join(process.cwd(), 'ctf-writeups', slug + '.md'),
    'utf-8'
  )
  const { data, content } = matter(markdownWithMetadata)
  return {
    props: {
      content,
      data
    }
  }
}

export default Writeup
