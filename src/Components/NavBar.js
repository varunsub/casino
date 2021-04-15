import styled from 'styled-components';
import { Button, Container, Paper, Grid } from '@material-ui/core';
import TextLoop from 'react-text-loop';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function NavBar() {
  const [signButton, setSignButton] = useState('');

  return (
    <NavBarContainer component="div" elevation={4}>
      <img src="Cobalt.png" alt="Cobalt Logo" height="50px" />
      <ListStyling>
        <NavItem to="/">Home</NavItem>
        <NavItem to="/contactus">Contact Us</NavItem>
        <NavItem to="/services">Services</NavItem>
        <NavItem to="aboutus">About Us</NavItem>
      </ListStyling>
      <RightBar>
        <Hover>LOGIN </Hover>
        <Button
          variant="contained"
          color={signButton}
          onClick={() => setSignButton('primary')}>
          Sign Up
        </Button>
      </RightBar>
    </NavBarContainer>
  );
}
const NavBarContainer = styled(Paper)`
  width: 100vw;
  display: flex;
  flex-direction: row;
  padding: 2% 5% 2% 5%;
  justify-content: space-between;
  max-height: 5%;
  align-items: center;
`;

const ListStyling = styled.ul`
  width: 100%;
  margin: 0 3% 0 10%;
`;
const NavItem = styled(Link)`
  display: inline;
  margin: 0 4% 0 4%;
`;

const RightBar = styled.span`
  display: flex;
  flex-direction: row;
  width: 20%;
  align-items: center;
  justify-content: space-between;
`;

const Hover = styled.span`
  :hover {
    color: #3482f6;
  }
`;
