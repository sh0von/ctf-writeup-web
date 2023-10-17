// components/Footer.js
import React from 'react';
import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background-color: #000;
  color: #fff;
  padding: 20px;
  display: flex;
  justify-content: center; /* Center elements horizontally */
  align-items: center;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 10px;
  font-family: 'PixelFont', monospace; /* Use the pixel font here */
  font-size: 20px; /* Adjust the font size as needed */
`;

const SocialIcon = styled.a`
  color: #fff;
  text-decoration: none;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <div>B.Y.T.E</div>
      <SocialIcons>
        <SocialIcon href="https://twitter.com/your-twitter-profile" target="_blank">
          <i className="fab fa-twitter"></i>
        </SocialIcon>
        <SocialIcon href="https://facebook.com/your-facebook-profile" target="_blank">
          <i className="fab fa-facebook"></i>
        </SocialIcon>
        {/* Add more social icons/links as needed */}
      </SocialIcons>
    </FooterWrapper>
  );
}

export default Footer;
