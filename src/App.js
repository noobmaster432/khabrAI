import './App.css';
import React, {useState, useEffect} from 'react';
import wordsToNumbers from 'words-to-numbers';
import alanBtn from '@alan-ai/alan-sdk-web';
import NewsCards from './components/NewsCards';

const alanKey = '03c40cc21d00e06fed29e12a53fe68652e956eca572e1d8b807a3e2338fdd0dc/stage';

const App = () => {

  const [newsArticles, setNewsArticles] = useState([]);
  const [activeArticle, setActiveArticle] = useState(0);

  useEffect(()=>{
    alanBtn({
      key: alanKey,
      onCommand: ({ command, articles, number }) => {
        if(command === 'newHeadlines') {
          setNewsArticles(articles);
          setActiveArticle(-1);
        } else if(command === 'highlight') {
          setActiveArticle((prevActiveArticle) => prevActiveArticle + 1);
        } else if(command === 'open') { 
          const parsedNumber = number.length > 2 ? wordsToNumbers((number), { fuzzy: true }) : number;
          const article = articles[parsedNumber - 1];
          if (parsedNumber > 20) {
            alanBtn().playText('Please try that again...');
          } else if (article) {
            window.open(article.url, '_blank');
            alanBtn().playText('Opening...');
          } else {
            alanBtn().playText('Please try that again...');
          }
        }
      }
    })
  },[]);

  return (
    <div className="App">
      <div className="text-center text" style={{padding: '0 28.5%',display: 'flex',alignItems: 'center'}}>
        <h1>Welcome to AI NEWS📰 PLATFORM</h1>
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
      <div className="Footer" style={{margin: 20}}>_ </div>
    </div>
  );
}

export default App;
