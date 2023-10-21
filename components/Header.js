import React, { useState } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  background-color: #000;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Logo = styled.div`
  font-family: 'PixelFont', monospace;
  font-size: 24px;
  color: #fff;
  text-rendering: optimizeSpeed;
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid transparent;
  display: flex;
  align-items: center; /* Center horizontally */
  cursor: pointer;

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

const Menu = styled.div`
  @media (max-width: 768px) {
    display: ${props => props.open ? 'block' : 'none'};
    background-color: #000;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;

const MenuItem = styled.a`
  color: #fff;
  text-decoration: none;
  margin: 0 20px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
  
  @media (max-width: 768px) {
    display: block;
    margin: 10px 0;
  }
`;

const MobileMenuButton = styled.div`
  display: none;
  cursor: pointer;
  font-size: 24px;
  color: #fff;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <HeaderWrapper>
      <Link href="/">
        <Logo>C-Sec</Logo>
      </Link>
      <MobileMenuButton onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </MobileMenuButton>
      <Menu open={menuOpen}>
        <Link href="/demo1">
          <MenuItem>Demo 1</MenuItem>
        </Link>
        <Link href="/demo2">
          <MenuItem>Demo 2</MenuItem>
        </Link>
      </Menu>
    </HeaderWrapper>
  );
};

export default Header;
