// Use this sample to create your own voice commands

intent('What does this app do?','What can I do here?',
      reply('This is a news project.'));


const API_KEY = 'ff476c00753943eab6afee78d9d4192f';
let savedArticles = [];

// News by Source
intent('Give me the news from $(source* (.*))', async(p) =>{
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}`;
    
    if(p.source.value) {
        NEWS_API_URL = `${NEWS_API_URL}&sources=${p.source.value.toLowerCase().split(" ").join('-')}`;
    }
    
    await api.axios.get(NEWS_API_URL) 
    .then((response) => {
        const { articles } = response.data;
        
        if(!articles.length) {
            p.play('Sorry, please try searching for news from a different source');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command : 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) news from ${p.source.value}`);
    })
    .catch((error) => {
        console.log(error);
        p.play('Sorry, please try searching for news from a different source');
    });
    
    p.play('Would you like me to read the headlines?');
    p.then(confirmation);
});

// News by Term
intent("What's up with $(term* (.*))", async(p) =>{
    let NEWS_API_URL = `https://newsapi.org/v2/everything?apiKey=${API_KEY}`;
    
    if(p.term.value) {
        NEWS_API_URL = `${NEWS_API_URL}&q=${p.term.value}`;
    }
    
    await api.axios.get(NEWS_API_URL) 
    .then((response) => {
        const { articles } = response.data;
        
        if(!articles.length) {
            p.play('Sorry, please try searching for something else');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command : 'newHeadlines', articles });
        p.play(`Here are the (latest|recent) articles on ${p.term.value}`);
    })
    .catch((error) => {
        console.log(error);
        p.play('Sorry, please try searching for something else');
    });
    
    p.play('Would you like me to read the headlines?');
    p.then(confirmation);
});

// News by Categories
const CATEGORIES = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
const CATEGORIES_INTENT = `${CATEGORIES.map((category) => `${category}~${category}`).join('|')}|`;

intent(`(show|what is|tell me|what's|what are|what're|read) (the|) (recent|latest|) $(N news|headlines) (in|about|on|) $(C~ ${CATEGORIES_INTENT})`,
  `(read|show|get|bring me|give me) (the|) (recent|latest) $(C~ ${CATEGORIES_INTENT}) $(N news|headlines)`, async(p) => {
   
    let NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${API_KEY}&country=in`;
    
    if(p.C.value) {
        NEWS_API_URL = `${NEWS_API_URL}&category=${p.C.value}`;
    }
    
    await api.axios.get(NEWS_API_URL) 
    .then((response) => {
        const { articles } = response.data;
        
        if(!articles.length) {
            p.play('Sorry, please try searching for something else');
            return;
        }
        
        savedArticles = articles;
        
        p.play({ command : 'newHeadlines', articles });
        
        if(p.C.value){
            p.play(`Here are the (latest|recent) articles on ${p.C.value}`);
        }
        else {
            p.play(`Here are the (latest|recent) articles.`)
        }
    })
    .catch((error) => {
        console.log(error);
        p.play('Sorry, please try searching for something else');
    });
    
    p.play('Would you like me to read the headlines?');
    p.then(confirmation);
});

const confirmation = context(() => {
    intent('yes', async (p) => {
        for(let i = 0; i < savedArticles.length; i++){
            p.play({ command: 'highlight', article: savedArticles[i]});
            p.play(`${savedArticles[i].title}`);
        }
    })
    
    intent('no', (p) => {
        p.play('Sure, sounds good to me.')
    })
})
       
intent('open (the|) (article|) (number|) $(number* (.*))', (p) => {
    if(p.number.value) {
        p.play({ command:'open', number: p.number.value, articles: savedArticles})
    }
})

intent('(go|) back', (p) => {
    p.play('Sure, going back');
    p.play({ command: 'newHeadlines', articles: []})
})       
