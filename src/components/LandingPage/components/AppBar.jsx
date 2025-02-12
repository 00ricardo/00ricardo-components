import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import logo from '../assets/logo.png';

import { open } from '../../../signals/LandingPage';
import { useSignals } from '@preact/signals-react/runtime';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
function AppAppBar() {
  useSignals();
  const toggleDrawer = (newOpen) => () => {
    open.value = newOpen;
  };
  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: 'smooth' });
      window.scrollTo({
        top: targetScroll,
        behavior: 'smooth',
      });
      open.value = false;
    }
  };

  return (
    <Box
      id='about'
      sx={() => ({
        width: '100%',
      })}
    >
      <AppBar
        position='fixed'
        sx={{
          boxShadow: 0,
          bgcolor: 'transparent',
          backgroundImage: 'none',
          mt: 2,
        }}
      >
        <Toolbar
          variant='regular'
          sx={() => ({
            padding: '0px 16px',
            margin: '0px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexShrink: 0,
            borderRadius: '999px',
            bgcolor: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(24px)',
            maxHeight: 40,
            border: '1px solid',
            borderColor: 'divider',
            boxShadow:
              '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
          })}
        >
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              ml: '0px',
              px: 0,
              justifyContent: 'space-between',
            }}
          >
            <a href='./' style={{ height: '62px' }}>
              <img
                src={logo}
                style={{ width: '62px', height: 'auto' }}
                alt='Ricardo Briceño'
              />
            </a>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <MenuItem
                onClick={() => scrollToSection('about')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant='body2' color='text.primary'>
                  About me
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection('projects')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant='body2' color='text.primary'>
                  Projects and Experience
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection('skills')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant='body2' color='text.primary'>
                  Skills
                </Typography>
              </MenuItem>
              <MenuItem
                onClick={() => scrollToSection('contact')}
                sx={{ py: '6px', px: '12px' }}
              >
                <Typography variant='body2' color='text.primary'>
                  Contact
                </Typography>
              </MenuItem>
            </Box>

            <Box sx={{ display: { sm: 'flex', md: 'none' } }}>
              <Button
                variant='text'
                color='primary'
                aria-label='menu'
                onClick={toggleDrawer(true)}
                sx={{ minWidth: '30px', p: '4px' }}
              >
                <MenuIcon />
              </Button>
              <Drawer
                anchor='right'
                open={open.value}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    minWidth: '40dvw',
                    p: 2,
                    backgroundColor: 'background.paper',
                    flexGrow: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'end',
                      flexGrow: 1,
                    }}
                  ></Box>
                  <MenuItem onClick={() => scrollToSection('about')}>
                    About me
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('skills')}>
                    Skills
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('projects')}>
                    Projects
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection('contact')}>
                    Contact
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default AppAppBar;
