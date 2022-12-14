import React from 'react';
import NewsCard from './NewsCard';
import { Grid, Grow, Typography } from '@mui/material';

const infoCards = [
  { color: '#00838f', title: 'Latest News', text: 'Give me the latest news' },
  { color: '#1565c0', title: 'News by Categories', info: 'Business, Entertainment, General, Health, Science, Sports, Technology', text: 'Give me the latest Technology news' },
  { color: '#4527a0', title: 'News by Terms', info: 'Bitcoin, PlayStation 5, Smartphones, Donald Trump...', text: 'What\'s up with PlayStation 5' },
  { color: '#283593', title: 'News by Sources', info: 'CNN, Wired, BBC News, Time, IGN, Buzzfeed, ABC News...', text: 'Give me the news from CNN' },
];

const NewsCards = ({ articles, activeArticle }) => {

  if(!articles.length){
    return(
      <>
      <div style={{padding: '0 auto',display: 'flex',justifyContent: 'center',alignItems: 'center',width: '100%'}}>
        <img src="https://alan.app/static/mainIll.35028f97.svg" alt="Alan AI News Application" style={{height: '35vh',borderRadius: '5%',padding: '0 auto',margin: '3% 0',}} />
        <img src="https://i0.wp.com/synqqblog.wpcomstaging.com/wp-content/uploads/2019/09/voice_interfaces_blog_final.jpg?fit=1480%2C888&ssl=1" alt="Alan AI News Application" style={{height: '35vh',borderRadius: '5%',padding: '0 auto',margin: '3% 0',}} />
      </div>
      <Grow in>
        <Grid container alignItems="stretch" spacing={3} sx={{ padding: '0 5%', width: '100%', margin: 0}}>
          {infoCards.map((infoCard)=>(
            <Grid item xs={12} sm={6} md={4} lg={3} style={{ display: 'flex',flexDirection:'column' ,textAlign: 'center' }}>
              <div style={{display: 'flex', flexDirection: 'column' ,justifyContent: 'space-between',alignItems: 'center',width: '100%',padding: '10%',borderRadius: 10,color: 'white',backgroundColor: infoCard.color ,height: '65vmin',}}>
                <Typography variant="h6">{infoCard.title}</Typography>
                { infoCard.info ? (<Typography variant="subtitle1"><strong>{infoCard.title.split(' ')[2]}</strong><br/>{infoCard.info}</Typography>): null}
                <Typography variant="subtitle1">Try saying: <br/><i>{infoCard.text}</i></Typography>
              </div>
            </Grid>
          ))}
        </Grid>
      </Grow>  
      </>
    );
  }

  return (
    <Grow in>
        <Grid container alignItems="stretch" spacing={3} sx={{ padding: '0 5%', width: '100%', margin: 0}}>
            {articles.map((article, i) => (
                <Grid item xs={12} sm={6} md={5} lg={4} style={{ display: 'flex' }}>
                    <NewsCard article={article} activeArticle={activeArticle} i={i} />
                </Grid>
            ))}
        </Grid>
    </Grow>
  );
}

export default NewsCards;