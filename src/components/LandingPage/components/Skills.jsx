import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SkillSphere from './SkillSphere';
import { Icon } from '@iconify-icon/react';
import { alpha } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ReactIcon from './ReactIcon';
import ReduxIcon from './ReduxIcon';
import BundlerIcon from './BundlerIcon';
import PerformanceIcon from './PerformanceIcon';
import BatchProcessingIcon from './BatchProcessingIcon';
import PortugueseIcon from './PortugueseIcon';
import EnglishIcon from './EnglishIcon';
import SpanishIcon from './SpanishIcon';
import DataModelIcon from './DataModelIcon';
import Container from '@mui/material/Container';
export default function Skills({ type }) {
  return (
    <Container id='skills' style={{ paddingTop: 50 }}>
      <div
        className='column'
        style={{ justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography component='h2' variant='h4'>
          {type === 'tech' ? 'Technical Skills' : 'Language Skills'}
        </Typography>
        <Icon icon='' />
        <div
          className={'row'}
          style={{
            flexDirection: type === 'tech' ? 'column' : 'row',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          {type === 'tech' ? (
            <Box
              sx={() => ({
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
                }}
              >
                <Typography>Back-End Experience</Typography>
                <List dense={true}>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <BatchProcessingIcon />
                    <ListItemText primary='Event driven pipelines' />
                  </ListItem>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <PerformanceIcon />
                    <ListItemText primary='Query Tuning and Performance optimizations' />
                  </ListItem>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <DataModelIcon />
                    <ListItemText primary='Model and data structure planning' />
                  </ListItem>
                </List>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  maxWidth: 'auto',
                }}
              >
                <Typography>Front-End Key Experience</Typography>
                <List dense={true}>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <ReactIcon />
                    <ListItemText
                      primary='Build large scale apps relying on good
            practices and configuration based modeling for dynamic content'
                    />
                  </ListItem>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <BundlerIcon />
                    <ListItemText
                      primary='Performance and Bundler
            size optimizations'
                    />
                  </ListItem>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <ReduxIcon />
                    <ListItemText primary='Sagas and Redux for global state managament' />
                  </ListItem>
                </List>
              </div>
            </Box>
          ) : (
            <Box
              sx={() => ({
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
                }}
              >
                <List dense={true}>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <SpanishIcon />
                    <ListItemText primary='Mother Tongue' />
                  </ListItem>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <PortugueseIcon />
                    <ListItemText primary='Fluent or native (C2)' />
                  </ListItem>
                  <ListItem style={{ display: 'flex', gap: '0.3rem' }}>
                    <EnglishIcon />
                    <ListItemText primary='Intermediate (B1/B2)' />
                  </ListItem>
                </List>
              </div>
            </Box>
          )}
          {type === 'tech' && <SkillSphere />}
        </div>
      </div>
    </Container>
  );
}
