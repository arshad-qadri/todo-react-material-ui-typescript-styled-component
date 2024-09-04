import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { Link, useLocation } from "react-router-dom";

// Interface for navbar items
interface NavItem {
  text: string;
  link: string;
}
interface NavItemTypographyProps {
  active: boolean;
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Handle opening and closing of mobile drawer
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Navbar items
  const navItems: NavItem[] = [
    { text: "Home", link: "/" },
    { text: "About", link: "/about" },
    { text: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    console.log(location);
  }, []);
  // Mobile drawer content
  const drawer = (
    <List>
      {navItems.map((item) => (
        <ListItem key={item.text} component={"button"}>
          {/* <ListItemText primary={item.text} /> */}
          <ListItemTextStyle>{item.text}</ListItemTextStyle>
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MyTodo
          </Typography>

          {/* Desktop Menu */}
          <DesktopMenu>
            {navItems.map((item) => (
              <NavItemTypography
                key={item.text}
                active={
                  location.pathname === item.link ? true : false
                }
              >
                <StyledLink
                  to={item.link}
                >
                  {item.text}
                </StyledLink>
              </NavItemTypography>
            ))}
          </DesktopMenu>

          {/* Mobile Menu */}
          <MobileMenu>
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </MobileMenu>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }} // Better open performance on mobile.
        // sx={{width:"300px", '& .MuiDrawer-paper':{width:'300px'} }}
        sx={{ width: "250px", flexShrink: 0 }}
        PaperProps={{
          sx: { width: "250px" },
        }}
      >
        <CloseButton onClick={() => setMobileOpen(false)}>
          <CloseIcon sx={{ color: "black" }} />
        </CloseButton>
        {drawer}
      </Drawer>
    </>
  );
};

// Styled components for custom styles
const DesktopMenu = styled(Box)`
  display: flex;
  gap: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const MobileMenu = styled(Box)`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const NavItemTypography = styled(Typography)<NavItemTypographyProps>`
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: white;
  text-decoration: ${(props) => (props.active ? "underline" : "none")};
`;

const ListItemTextStyle = styled(ListItemText)`
  color: red;
`;
const CloseButton = styled(Button)`
  padding: 0;
  width: 30px;
  min-width: 30px !important;
  margin-left: auto;
  text-align: right;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;
export default Navbar;
