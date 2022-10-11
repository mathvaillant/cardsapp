import React from 'react';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';
import { useAppSelector } from "../../app/hooks";
import './HomePage.scss';

const HomePage = () => {
  const navigator = useNavigate();
  const username = useAppSelector(state => state?.auth?.user?.username)

  const handleGoTo = (e: React.MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    navigator(path);
  };

  return (
    <Box 
      className="HomePage"
      sx={{
        bgcolor: 'background.paper',
        pt: 8,
        pb: 6,
      }}
    >
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Welcome back, {username}!
        </Typography>

        <Container sx={{ py: 8, display: 'flex', gap: 4 }} maxWidth="lg">
          <Card elevation={6} sx={{ width: 400 }} className='option'>
            <CardActionArea onClick={(e) => handleGoTo(e, '/cards')}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Cards
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All of your cards
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card elevation={6} sx={{ width: 400 }} className='option'>
            <CardActionArea onClick={(e) => handleGoTo(e, '/collections')}>
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Collections
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  All of your collections of cards
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Container>
      </Container>
    </Box>
  )
}

export default HomePage;