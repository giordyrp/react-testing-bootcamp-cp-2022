import axios from 'axios';
import { useEffect, useState } from 'react';
import { getDate } from './utils';

function App() {
  const [date, setDate] = useState(() => getDate());
  const [picture, setPicture] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setError(null);
    axios
      .get('https://api.nasa.gov/planetary/apod', {
        params: {
          api_key: 'VMc6vn7fWrSwYcamqeVQbKEYAdUpYrIPvuDolC7S',
          date,
        },
      })
      .then(
        ({ data }) => setPicture(data),
        ({ response }) => setError(response.data)
      );
  }, [date]);

  let errorMessage = '';
  if (error) {
    switch (error.code) {
      case 400:
        errorMessage = 'Invalid date';
        break;
      default:
        errorMessage = 'There was an error, please try again';
    }
  }

  return (
    <>
      <header>
        <h1>NASA APOD</h1>
      </header>
      <main>
        <input
          value={date}
          onChange={(evt) => setDate(evt.target.value)}
          type="date"
          placeholder="select date"
        />
        {error ? (
          <p>{errorMessage}</p>
        ) : (
          <>
            <h3 data-testid="title">{picture.title}</h3>
            <img src={picture.url} alt={`picture of the day ${picture.date}`} />
            <p data-testid="explanation">{picture.explanation}</p>
          </>
        )}
      </main>
      <footer>
        <p>Project created during Wizeline Academy React Testing Bootcamp</p>
      </footer>
    </>
  );
}

export default App;
