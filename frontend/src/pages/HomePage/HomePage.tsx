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
import { getStateUserIsAdmin, getStateUserUsername } from "../../selectors/users";

const mainPages = ['cards', 'collections', 'users'];

const HomePage = () => {
  const navigator = useNavigate();
  const username = useAppSelector(getStateUserUsername);
  const isAdmin = useAppSelector(getStateUserIsAdmin);

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
      <Container maxWidth="lg">
        <Typography
          component="h1"
          variant="h4"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Welcome back, {username}!
        </Typography>

        <Container 
          sx={{ 
            py: 8, 
            display: 'flex', 
            gap: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }} 
          maxWidth="lg"
        >
          {mainPages.map((page: string) => {
            if(!isAdmin && page === 'users') return null;

            return (
              <Card elevation={6} sx={{ width: 'auto' }} className='option'>
                <CardActionArea onClick={(e) => handleGoTo(e, `/${page}`)}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {page.toUpperCase()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      All {page.toUpperCase()}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            )
          })}
        </Container>
      </Container>
    </Box>
  )
}

export default HomePage;