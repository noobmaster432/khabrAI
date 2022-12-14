import React, {useState, useEffect, createRef} from 'react';
import { Card, CardActions, CardActionArea, CardContent, CardMedia, Button, Typography } from '@mui/material';

const NewsCard = ({ article: { description, publishedAt, source, title, url, urlToImage }, i, activeArticle }) => {
  
  const [elRefs,setElRefs] = useState ([]) ;
  const scrollToRef = (ref) => window.scroll(0, ref.current.offsetTop - 50);

  useEffect (() => {
    setElRefs((refs)=> Array(20).fill().map((_,j) => refs[j]|| createRef())) ;
  } ,  []  );
     
  useEffect(() => {
    if (i === activeArticle && elRefs[activeArticle]) {
      scrollToRef(elRefs[activeArticle]);
    }
  }, [i, activeArticle, elRefs]);


  return (
    <div>
        <Card ref={elRefs[i]} sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',height: '100%'}} style={{borderBottom: activeArticle===i ? '10px solid #22289a': '10px solid white'}}>
          <CardActionArea href={url} target="_blank">
            <CardMedia image={urlToImage || 'https://www.lsoft.com/news/issue5-2020/darkmode_309.png' } sx={{ height: 175 }} />
            <div style={{ display: 'flex',justifyContent: 'space-between',margin: '20px',}}>
              <Typography variant="body2" color="textSecondary" component="h4">{(new Date(publishedAt)).toDateString()}</Typography>
              <Typography variant="body2" color="textSecondary" component="h4">{source.name}</Typography>
            </div>
            <Typography gutterBottom variant="h5" sx={{padding: '0 16px',}}>{title}</Typography>
            <CardContent sx={{display: 'flex',flexDirection: 'column',justifyContent: 'space-between',}}>
              <Typography variant="body2" color="textSecondary" component="p">{description}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions sx={{padding: '0 16px 8px 16px',display: 'flex',justifyContent: 'space-between',}}>
            <Button size="small" color="primary">Learn More</Button>
            <Typography variant="h6" color="textSecondary">{i + 1}</Typography>
          </CardActions>
        </Card>
    </div>
  )
}

export default NewsCard;