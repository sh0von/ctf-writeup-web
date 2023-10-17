// pages/[slug].js
import fs from 'fs';
import path from 'path';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const WriteupWrapper = styled.div`
  background-color: #000; /* Background color for code blocks (bluish) */
  margin: 0 auto; /* Center the content horizontally */
  padding: 20px; /* Adjust the padding as needed */
  font-family: 'MonospaceFont', monospace; /* Use your preferred monospace font */
  justify-content: center; /* Center horizontally */
  max-width: 1000px; /* Limit the maximum width of the content */
`;

const Writeup = ({ content, data }) => {
  return (
    <div>
      <Header />

      <WriteupWrapper>
        <h1 className="text-center">{data.title}</h1>
        <p className="text-center">Author: {data.author}</p>
        <ReactMarkdown>{content}</ReactMarkdown>
      </WriteupWrapper>

      <Footer />
    </div>
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(path.join(process.cwd(), 'ctf-writeups'));
  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const markdownWithMetadata = fs.readFileSync(
    path.join(process.cwd(), 'ctf-writeups', slug + '.md'),
    'utf-8'
  );
  const { data, content } = matter(markdownWithMetadata);
  return {
    props: {
      content,
      data,
    },
  };
}

export default Writeup;
