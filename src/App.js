import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


function App() {

  const [quotes, setQuotes] = React.useState([]);
  const [randomQuote, setRandomQuote] = React.useState([]);

  React.useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();

      setQuotes(data);
      let randomIndex = Math.floor(Math.random() * data.length);
      setRandomQuote(data[randomIndex]);

    }
    fetchData();
  }, [])

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
                  <a href={"twitter.com/intent/tweet"}
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
