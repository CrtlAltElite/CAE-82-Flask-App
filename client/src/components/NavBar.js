import React, {useContext} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalGroceryStoreTwoToneIcon from '@mui/icons-material/LocalGroceryStoreTwoTone';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import ThemeSwitch from './ThemeSwitch';
import {AppContext} from '../context/AppContext'
import getRandomInt from '../helpers/random';
import Badge from '@mui/material/Badge';
import {Link} from 'react-router-dom';
import RegLink from '@mui/material/Link';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function NavBar({children}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const {user, cart} = useContext(AppContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorElUser, setAnchorElUser] = React.useState(null);


  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };



  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: '36px',
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{mr:3}}>
            <Link to={('/')}>
            <img height='45px' className='p2' alt="logo" src="https://res.cloudinary.com/cae67/image/upload/v1645745831/rainbow-unicorn-poop-emoji-graphics-art-coffee-cup-plant-transparent-png-1177964_w6m1jf.png"/>
            </Link>

          </Box>
        
          
          <Typography sx={{ flexGrow: 1 }} variant="h5" noWrap component="div">
            Unibow
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={user?.name ?? "please login" } src={user?.icon ? `https://avatars.dicebear.com/api/big-smile/${user.icon}.svg` : `https://avatars.dicebear.com/api/big-smile/${getRandomInt(0,1000)}.svg` } />
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
             {user?.token ?
              <MenuItem  onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                <Link to='/logout' style={{textDecoration:"none"}}>
                  Logout
                </Link>
                </Typography>
              </MenuItem>
              :
             
              <MenuItem  onClick={handleCloseUserMenu}>
                <Typography textAlign="center">
                <Link to='/login' style={{textDecoration:"none"}}>
                  Login
                </Link>
                </Typography>
              </MenuItem>
              
             }
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open} >
        <Box sx={{color:"white", backgroundImage:"linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(117, 19, 93, 0.73)), url('https://res.cloudinary.com/cae67/image/upload/v1645641432/rainbowunicornbg_lb5eol.jpg')",     backgroundSize: 'cover', flexGrow: 1}}>
        <DrawerHeader>
          Paths of Enlightenment
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon style={{color:'white'}} /> : <ChevronLeftIcon style={{color:'white'}} />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {[
            {label:'Cart', path: "/cart", icon: <Badge badgeContent={cart.length} color="primary"><LocalGroceryStoreTwoToneIcon style={{color:'white'}}/></Badge>},
            {label:'Store', path:'/shop', icon:<StorefrontTwoToneIcon style={{color:'white'}}/>}
          ].map((navItem, index) => (
            <ListItem button key={navItem.label}>
              <Link to={navItem.path} style={{display:"flex",color:"inherit", textDecoration:'none'}}>
              <ListItemIcon>
                 {navItem.icon}
              </ListItemIcon>
              <ListItemText primary={navItem.label} />
              </Link>
            </ListItem>
          ))}

          <ListItem button key={"Social"}>
              <RegLink href="/index" color="inherit" underline="none" sx={{display:"flex"}}>
                <ListItemIcon>
                <ConnectWithoutContactIcon style={{color:'white'}}/>
                </ListItemIcon>
                <ListItemText primary={"Social"} />
              </RegLink>
            </ListItem>
        </List>
        {open?(

        <ListItem sx={{position:"absolute", bottom:"0px", alignContent:"center", justifyContent:"center"}}>
          <ThemeSwitch/>
        </ListItem>
        )
          :
          ''
        }

        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
        
      </Box>
    </Box>
  );
}
