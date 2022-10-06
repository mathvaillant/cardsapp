import React from 'react';
import { useNavigate } from 'react-router';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
import { CardActionArea } from '@mui/material';

const HomePage = () => {
  const navigator = useNavigate();

  const handleGoTo = (e: React.MouseEvent<HTMLElement>, path: string) => {
    e.preventDefault();
    navigator(path);
  };

  return (
    <Box
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
          Welcome back!
        </Typography>

        <Container sx={{ py: 8, display: 'flex', gap: 4 }} maxWidth="lg">
          <Card sx={{ width: 400 }}>
            <CardActionArea onClick={(e) => handleGoTo(e, '/cards')}>
              <CardMedia
                component="img"
                height="250"
                src="https://lirp.cdn-website.com/75294010/dms3rep/multi/opt/CARDS-c730032c-1920w.jpg"
                alt="cards"
              />
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
          <Card sx={{ width: 400 }}>
            <CardActionArea onClick={(e) => handleGoTo(e, '/collections')}>
              <CardMedia
                component="img"
                height="250"
                src="https://m.media-amazon.com/images/I/51iiEcs7FkL._AC_SY580_.jpg"
                alt="collections"
              />
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