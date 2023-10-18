import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: #000;
  padding: 10px;
  display: flex;
  justify-content: center; /* Center elements horizontally */
  align-items: center;
`;

const Logo = styled.div`
  font-family: 'PixelFont', monospace; /* Use your pixelated font family */
  font-size: 24px; /* Adjust the font size as needed */
  color: #fff; /* Text color */
  text-rendering: optimizeSpeed; /* Ensure pixelation in modern browsers */
  white-space: nowrap; /* Prevent line breaks in the animation */
  overflow: hidden; /* Hide overflowing text */
  border-right: 2px solid transparent; /* Create a blinking cursor */

  /* Animation styles */
  animation: typing 1.5s steps(20, end), blink-caret 0.75s step-end infinite;
  @keyframes typing {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
  @keyframes blink-caret {
    from,
    to {
      border-color: transparent;
    }
    50% {
      border-color: #fff;
    }
  }
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Link href="../">
        <Logo>C-Sec</Logo>
      </Link>
    </HeaderWrapper>
  );
};

export default Header;
