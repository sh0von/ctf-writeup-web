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
  transition: border-right 0.5s ease; /* Add a transition effect */

  &:hover {
    border-right: 2px solid #fff; /* Change border on hover */
  }
`;

const Menu = styled.div`
  @media (max-width: 768px) {
    display: ${props => (props.open ? 'block' : 'none')};
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
        <Link href="/rankings">
          <MenuItem>Rankings</MenuItem>
        </Link>
        <Link href="/group">
          <MenuItem>FB Group</MenuItem>
        </Link>
      </Menu>
    </HeaderWrapper>
  );
};

export default Header;
