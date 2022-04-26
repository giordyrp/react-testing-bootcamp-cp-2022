import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import { getDate } from './utils';

beforeEach(() => render(<App />));

it('renders correctly the header, footer and main content in the app', () => {
  //header
  screen.queryByRole('heading', { name: /nasa apod/i });
  //content
  screen.getByPlaceholderText(/select date/i);
  screen.getByTestId('title');
  screen.getByAltText(/picture of the day/i);
  screen.getByTestId('explanation');
  //footer
  screen.getByText(/react testing bootcamp/i);
});

describe('shows the Picture of the Day', () => {
  let date, input;

  beforeEach(() => {
    input = screen.getByPlaceholderText(/select date/i);
  });

  it('on entering page', async () => {
    date = getDate();
    expect(input).toHaveValue(date);
    await screen.findByAltText(new RegExp(date, 'i'));
  });

  it('on change date', async () => {
    date = getDate('04/24/2022');
    fireEvent.change(input, { target: { value: date } });
    await screen.findByAltText(new RegExp(date, 'i'));
  });
});

describe('shows errors', () => {
  let input;

  beforeEach(() => {
    input = screen.getByPlaceholderText(/select date/i);
  });

  it('on invalid date', async () => {
    const date = getDate('04/24/2023');
    fireEvent.change(input, { target: { value: date } });
    await screen.findByText(/invalid date/i);
  });

  it('on server error', async () => {
    const date = getDate('01/01/2022');
    fireEvent.change(input, { target: { value: date } });
    await screen.findByText(/there was an error/i);
  });
});
