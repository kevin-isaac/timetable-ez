import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import './Header.css';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import { useUser } from '../UserContext';
import Container from '@mui/material/Container';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
 

const pages = [  ];
const settings = [ 'Logout'];

const Header = () => {
  const [anchorElNav, setAnchorElNav] = React.useState (null);
  const [anchorElUser, setAnchorElUser] = React.useState (null);
  const { user } = useUser();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    
  };
  const handleLogout = () => {
    navigate("/login");
    
  };
  

  const navigate = useNavigate();

    return(
       
        <div className="dark:bg-gray-900 w-full  ">
          {/*<div className="max-w-screen-xl flex items-center justify-center mx-auto p-4 w-full m-0">
            <div className="block w-auto items-center" id="divbar-default">
              <div className="flex items-center flex-shrink-0 text-white m-3 mr-5">
                
                <img src={logo}  alt="logo" />

              </div>

            </div>
          </div>*/}
          
          <AppBar position="static" sx={{ backgroundColor: '#111827' }}>
      <Container maxWidth="xl" sx={{ backgroundColor: '#111827' }}>
        <Toolbar disableGutters sx={{ backgroundColor: '#111827' }}>
          <img className="w-24 m-5" alt="Logo" src={logo} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          UWI STA
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
    
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
          
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open Profile Menu">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 4 ,margin:"1rem",height:"38px", borderRadius:"0%" }}>
                <AccountCircle sx={{ marginRight:"5px" }}  /> {user.name}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem >
                  <Typography sx={{ textAlign: 'center' }}  className="disabled text-gray-400">Profile</Typography>
                </MenuItem>
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleLogout}>
                  <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>









        </div>
       

    );

}

export default Header;