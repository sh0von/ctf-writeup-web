// components/NotFound.js
import styled from 'styled-components';
import SEO from '../components/SEO';

const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0; /* Adjust the background color */
`;

const Title = styled.h1`
  font-size: 48px;
  color: #333; /* Adjust the text color */
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 24px;
  color: #666; /* Adjust the text color */
`;

const NotFound = () => {
  return (
    <NotFoundWrapper>
          <SEO
        title="Not Found" // Dynamic title
      />

      <Title>404 - Page Not Found</Title>
      <Description>Sorry, the page you're looking for doesn't exist.</Description>
      {/* You can add a link back to the homepage or other pages here */}
    </NotFoundWrapper>
  );
};

export default NotFound;
