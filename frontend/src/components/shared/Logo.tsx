import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const LogoContainer = styled.div`
  display: flex;
  margin: auto;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
  flex-direction: row;

  @media (max-width: 800px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Logo = () => {
  return (
    <LogoContainer>
      <Link to={'/'}>
        <img
          src="ChatAi.png"
          alt="logo"
          width={'100px'}
          height={'60px'}
          style={{ borderRadius: '30px' }}
        />
      </Link>
      <Typography
        sx={{
          display: 'block',
          mr: 'auto',
          fontWeight: '800',
          fontSize: '1.8rem',
        }}
      >
        Chat
        <span style={{ fontSize: '38px' }}> AI</span>
      </Typography>
    </LogoContainer>
  );
};

export default Logo;
