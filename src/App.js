import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


function App() {
//set state for the fetch API json response (array of quotes) & set state to get a randomized quote
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);
//fetch data from API
  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
//use data to set a random quote into state
      setQuotes(data);
      let randomIndex = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randomIndex]);

    }
//call fetch API function
    fetchData();
  }, [])

//
  const getNewQuote = () => {
    let randomIndex = Math.floor(Math.random() * quotes.length);
      setRandomQuote(quotes[randomIndex]);
    }

  return (
      <div className="container pt-5">
        <div className='jumbotron text-center' id='quote-box'>
          <div className='card'>
            <div className='card-header'>Quotes</div>
            <div className='card-body' id='text'>
              {randomQuote ?
                (<>
                  <p className='card-text'>&quot;{randomQuote.text}&quot;</p>
                  <h5 id='author' className='card-title'>-{randomQuote.author || 'No author'}</h5>
                </>) : (<h2>Loading</h2>)
                }
              <div className='row'>
                <div className='col'>
                  <button className='btn btn-primary' id='new-quote' onClick={getNewQuote}>Next Quote</button>
                </div>
                <div className='col'>
                  <a href={`https://twitter.com/intent/tweet?text= ${randomQuote.text} ${randomQuote.author}`}
                  target='_blank'
                  rel='noreferrer'
                  className='btn btn-outline-info '
                  id="tweet-quote">
                  <FontAwesomeIcon icon={faTwitter} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
};

export default App;
