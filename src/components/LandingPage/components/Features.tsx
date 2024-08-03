import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import DevicesRoundedIcon from '@mui/icons-material/DevicesRounded';
import EdgesensorHighRoundedIcon from '@mui/icons-material/EdgesensorHighRounded';
import ViewQuiltRoundedIcon from '@mui/icons-material/ViewQuiltRounded';
import LanguageIcon from '@mui/icons-material/Language';
import professional from '../utils/professional';
import { IconButton } from '@mui/material';
type Technologies = {
  backend: string[];
  frontend: string[];
  cicd: string[];
};
const items = [
  {
    icon: <ViewQuiltRoundedIcon />,
    title: 'Professional',
    description: 'Find more details about my professional career.',
    more: 'Currently working at ams OSRAM',
  },
  {
    icon: <EdgesensorHighRoundedIcon />,
    title: 'Personal Projects',
    description: 'Check some cool projects developed by myself.',
    more: 'Currently working on cloning Spotify App',
  },
  {
    icon: <DevicesRoundedIcon />,
    title: 'Internships and Courses',
    description:
      "I'm always looking forward to learn more to keep a fresh mindset with the best and coolest technologies.",
    more: 'Currently learning more about TypeScript',
  },
];

export default function Features() {
  const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);

  const handleItemClick = (index: number) => {
    setSelectedItemIndex(index);
  };

  const selectedFeature = items[selectedItemIndex];

  return (
    <Container id='projects' sx={{ py: { xs: 8, sm: 16 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <div>
            <Typography component='h2' variant='h4' color='text.primary'>
              Projects & Experience
            </Typography>
            <Typography
              variant='body1'
              color='text.secondary'
              sx={{ mb: { xs: 2, sm: 4 } }}
            >
              Find some details about my journey through various companies,
              collaborations, and achievements. I'm alaways looking forward to
              embrace new challenges with passion, dedication, and expertise
              across diverse projects and professional experiences.
            </Typography>
          </div>
          <Grid
            container
            item
            gap={1}
            sx={{ display: { xs: 'auto', sm: 'none' } }}
          >
            {items.map(({ title }, index) => (
              <Chip
                key={index}
                label={title}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </Grid>
          <Box
            component={Card}
            variant='outlined'
            sx={{
              display: { xs: 'auto', sm: 'none' },
              mt: 4,
            }}
          >
            <Box
              sx={{
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: 280,
              }}
            />
            <Box sx={{ px: 2, pb: 2 }}>
              <Typography
                color='text.primary'
                variant='body2'
                fontWeight='bold'
              >
                {selectedFeature.title}
              </Typography>
              <Typography
                color='text.secondary'
                variant='body2'
                sx={{ my: 0.5 }}
              >
                {selectedFeature.description}
              </Typography>
            </Box>
          </Box>
          <Stack
            direction='column'
            justifyContent='center'
            alignItems='flex-start'
            spacing={2}
            useFlexGap
            sx={{ width: '100%', display: { xs: 'none', sm: 'flex' } }}
          >
            {items.map(({ icon, title, description, more }, index) => (
              <Card
                key={index}
                variant='outlined'
                component={Button}
                onClick={() => handleItemClick(index)}
                sx={{
                  p: 3,
                  height: 'fit-content',
                  width: '100%',
                  background: 'none',
                  backgroundColor:
                    selectedItemIndex === index ? 'action.selected' : undefined,
                  borderColor: () => {
                    return selectedItemIndex === index
                      ? 'primary.dark'
                      : 'grey.800';
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    textAlign: 'left',
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: { md: 'center' },
                    gap: 2.5,
                  }}
                >
                  <Box
                    sx={{
                      color: () => {
                        return selectedItemIndex === index
                          ? 'primary.main'
                          : 'grey.700';
                      },
                    }}
                  >
                    {icon}
                  </Box>
                  <Box sx={{ textTransform: 'none' }}>
                    <Typography
                      color='text.primary'
                      variant='body2'
                      fontWeight='bold'
                    >
                      {title}
                    </Typography>
                    <Typography
                      color='text.secondary'
                      variant='body2'
                      sx={{ my: 0.5 }}
                    >
                      {description}
                    </Typography>
                    <Link
                      color='primary'
                      variant='body2'
                      fontWeight='bold'
                      sx={{
                        'display': 'inline-flex',
                        'alignItems': 'center',
                        '& > svg': { transition: '0.2s' },
                        '&:hover > svg': { transform: 'translateX(2px)' },
                      }}
                      onClick={(event) => {
                        event.stopPropagation();
                      }}
                    >
                      <span>{more}</span>
                      <ChevronRightRoundedIcon
                        fontSize='small'
                        sx={{ mt: '1px', ml: '2px' }}
                      />
                    </Link>
                  </Box>
                </Box>
              </Card>
            ))}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%' }}
        >
          <Card
            variant='outlined'
            sx={{
              height: '100%',
              width: '100%',
              display: { xs: 'none', sm: 'flex' },
            }}
          >
            <Box
              sx={{
                m: 'auto',
                width: 420,
                height: 500,
                backgroundSize: 'contain',
                overflowY: 'auto',
              }}
            >
              {selectedFeature.title === 'Professional' &&
                professional.map((pro, idx) => (
                  <div key={idx} style={{ paddingRight: 50 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div>
                        <div>Role: {pro.role}</div>
                        <div>
                          Period: {pro.period.start} - {pro.period.end}
                        </div>
                      </div>

                      <IconButton
                        onClick={() => {
                          const absoluteURL = new URL(
                            pro.web,
                            window.location.href
                          );
                          window.location.href = absoluteURL.toString();
                        }}
                      >
                        <LanguageIcon />
                      </IconButton>
                    </div>

                    <img
                      src={pro.src}
                      style={{ width: '100%', borderRadius: '10px' }}
                    />
                    {pro.description}
                    <ul>
                      {pro.activities.map((act, idxx) => (
                        <li key={idxx}>{act}</li>
                      ))}
                    </ul>
                    <hr />
                    <div>
                      {Object.keys(pro.technologies).map((tech, idxxx) => (
                        <div key={idxxx}>
                          {(
                            pro.technologies[
                              tech as keyof Technologies
                            ] as string[]
                          ).toString()}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
