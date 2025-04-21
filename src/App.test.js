import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ensure weclome text is shown', () => {
  render(<App />);
  const linkElement = screen.getByText(/WELCOME/i);
  expect(linkElement).toBeInTheDocument();


  const handleSubmit = jest.fn();
  render(<FeedbackForm onSubmit={handleSubmit}/> );

  const rangeInput=screen.getByLabelText(/Score:/);
  const submitButton = screen.getByRole("button");
  fireEvent.click(submitButton);
  fireEvent.change(input, { target: { value: '5' } });

  
  expect(handleSubmit).not.toHaveBeenCancelled();
  expect(submitButton).toHaveAttribute("disabled");
});
