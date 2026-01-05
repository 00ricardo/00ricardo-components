import { useState } from 'react';
import { alpha } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import me from '../assets/me.png';
import Typewriter from 'typewriter-effect';
import CV from '../assets/RicardoBriceñoCV.pdf';
export default function Presentation() {
  const [showBtn, setShowBtn] = useState(false);
  const showDownloadBtn = () => {
    setShowBtn(true);
  };

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // Adjust age if current month/day is before the birth month/day
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
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
                <Button
                  variant='contained'
                  color='primary'
                  onClick={() => window.open(CV)}
                >
                  Download CV
                </Button>
              )}
            </Stack>
          </div>
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
            <Typography variant='h6'>
              Hi there, I'm Ricardo Briceño, a {calculateAge('1998-03-05')} year
              old Software Engineer, located in Funchal, Portugal with a strong
              academic background and two years of professional experience at{' '}
              <a
                target='_blank'
                href='https://ams-osram.com/'
                style={{ textDecoration: 'none', color: '#89acfa' }}
              >
                ams OSRAM
              </a>
              . I possess a Bachelor's degree in Computer Engineering from the
              University of Madeira and a Master's degree in the same field from
              the University of Coimbra. I have applied all my academic
              experience into projects in the Research Field at different
              institutes, such as:{' '}
              <a
                target='_blank'
                href='https://www.arditi.pt/pt/'
                style={{ textDecoration: 'none', color: '#89acfa' }}
              >
                ARDITI
              </a>{' '}
              and{' '}
              <a
                target='_blank'
                href='https://inesc.pt/insec/'
                style={{ textDecoration: 'none', color: '#89acfa' }}
              >
                INESC TEC
              </a>
              . All the involvement with experienced colleagues has allowed me
              to grow at a professional level.
            </Typography>
            <Typography variant='h6'>
              At ams OSRAM , I have embarked on my professional journey,
              specializing in software engineering with a Full Stack role. As
              Software Engineer, I play a pivotal role in developing data-driven
              applications, based on the Oracle stack, including Oracle APEX and
              Oracle Databases. Collaborating within an international and
              multi-disciplinary team, I am entrusted with responsibilities
              within a critical distributed system focusing on semi-conductors,
              wafers and microchips defects.
            </Typography>
          </div>
        </Box>
      </Container>
    </Box>
  );
}
