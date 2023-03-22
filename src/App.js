import React from 'react';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


function App() {
//set state for the fetch API json response (array of quotes) & set state to get a randomized quote and a random background color
  const [quotes, setQuotes] = useState([]);
  const [randomQuote, setRandomQuote] = useState([]);
  const [color, setColor] = useState('#000')
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

//random quote & background color setters
  const getNewQuote = () => {

    const palette =
    [
  '#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
	'#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
	'#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
	'#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
	'#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
	'#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
	'#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
	'#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
	'#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
	'#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
  ]

    let randomIndex = Math.floor(Math.random() * quotes.length);
    setRandomQuote(quotes[randomIndex]);
    let randomColor = Math.floor(Math.random()* palette.length);
    setColor(palette[randomColor])
    }

  return (
    <div style={{backgroundColor: color, minHeight: '100vh', transition: 'background-color 1s ease' }}>
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
    </div>
    )
};

export default App;
