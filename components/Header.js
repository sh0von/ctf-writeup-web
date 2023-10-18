// components/Header.js
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
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <Link href="../"> 
   <h1>C-Sec</h1>
      </Link>
    </HeaderWrapper>
  );
};

export default Header;
