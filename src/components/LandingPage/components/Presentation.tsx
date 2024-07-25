import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';
import Hidden from '@mui/material/Hidden';
import vui_lottie from '../assets/vui-lottie.json';
import me from '../assets/me.png';
import Typewriter from 'typewriter-effect';
import { useState } from 'react';
export default function Presentation() {
  const [showBtn, setShowBtn] = useState(false);
  const showDownloadBtn = () => {
    setShowBtn(true);
  };
  return (
    <Box
      id='about'
      sx={() => ({
        width: '100%',
        backgroundImage: `linear-gradient(#007a8c, ${alpha('#090E10', 0.0)})`,
        backgroundSize: '100% 45%',
        backgroundRepeat: 'no-repeat',
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={2}
          useFlexGap
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    `<h1 style="display:flex; justify-content:center; text-align: center; font-size: clamp(3.5rem, 10vw, 4rem);">Hi, I'm Ricardo Briceño!</h1>`
                  )
                  .pauseFor(500)
                  .typeString(
                    '<p style="display:flex; justify-content:center; text-align: center; font-size: clamp(3.5rem, 10vw, 4rem);">Software Engineer</p>'
                  )
                  .callFunction(showDownloadBtn)
                  .start();
              }}
            />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignSelf='center'
              spacing={1}
              sx={{ width: 'auto' }}
            >
              {showBtn && (
                <Button variant='contained' color='primary' onClick={() => {}}>
                  Download CV
                </Button>
              )}
            </Stack>
          </div>
          <Hidden only={['xs', 'sm', 'md']}>
            <img
              style={{
                filter: 'drop-shadow(0px 0px 35px rgba(255, 255, 255, 0.25))',
                width: '35%',
                height: '35%',
                borderRadius: '50%',
              }}
              src={me}
              alt={'Ricardo Briceño'}
              loading='lazy'
            />
          </Hidden>
        </Stack>
        <Box
          sx={() => ({
            mt: { xs: 8, sm: 10 },
            alignSelf: 'center',
            height: 'fit-content',
            width: '100%',
            borderRadius: '10px',
            outline: '1px solid',
            outlineColor: alpha('#9CCCFC', 0.1),
            boxShadow: `0 0 24px 12px ${alpha('#033363', 0.2)}`,
            padding: '35px',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            justifyContent: 'space-between',
          })}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: 'auto',
              gap: '1rem',
            }}
          >
            <Typography
              variant='h6'
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignSelf: 'center',
                textAlign: 'justify',
              }}
            >
              Hi there, I'm a Junior Web Developer, located in Funchal, Portugal
              with a strong academic background and two years of professional
              experience at ams OSRAM. Possessing a Bachelor's degree in
              Computer Engineering from the University of Madeira and a Master's
              degree in the same field from the University of Coimbra, I have
              applied all my academic experience into projects in the Research
              Field at different institutes, such as: ITI and INESC. All the
              involvement with experienced colleagues has allowed me to grow at
              a professional level. After 5 years, I decided to launch my
              professional career.
            </Typography>
            <Typography
              className='text'
              variant='h6'
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignSelf: 'center',
                textAlign: 'justify',
              }}
            >
              At ams OSRAM, I have embarked on my professional journey,
              specializing in software engineering. As Software Engineer, I play
              a pivotal role in developing data-driven applications, based on
              the Oracle stack, including Oracle APEX and Oracle Databases.
              Collaborating within an international and multi-disciplinary team,
              I am entrusted with responsibilities within a critical distributed
              system, underscoring my ability to handle complex tasks with
              professionalism.
            </Typography>
          </div>
          <Lottie
            style={{ height: '400px', minWidth: '40%' }}
            animationData={vui_lottie}
            loop={true}
          />

          <small
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignSelf: 'center',
              textAlign: 'justify',
            }}
          >
            “Everything is connected.” ━ Dark
          </small>
        </Box>
      </Container>
    </Box>
  );
}
