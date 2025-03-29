import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Summar heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Summar/i);
  expect(headingElement).toBeInTheDocument();
});