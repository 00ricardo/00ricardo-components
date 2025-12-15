import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppAppBar from './components/AppBar';
import Presentation from './components/Presentation';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';
import getLPTheme from './getLPTheme';

// * Signals
export default function LandingPage() {
  const LPtheme = createTheme(getLPTheme('dark'));
  return (
    <ThemeProvider theme={LPtheme}>
      <CssBaseline />
      <AppAppBar />
      <Presentation />
      <Box sx={{ bgcolor: 'background.default' }}>
        <Experience />
        <Skills type='tech' />
        <Skills type='lang' />
        {/*<Testimonials />
        <Divider />
        <Pricing />
        <Divider />
        <FAQ />
        <Divider />*/}
        <Footer />
      </Box>
    </ThemeProvider>
  );
}
