import '@testing-library/jest-dom'
import React from 'react';
import { render, fireEvent, screen, waitFor,act } from '@testing-library/react';
import Stopwatch from '../src/StopWatch';

describe('Stopwatch', () => {
  test('initial render', () => {
    render(<Stopwatch />);
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
    expect(screen.getByText('Start')).toBeInTheDocument();
    expect(screen.getByText('Lap')).toBeInTheDocument();
    expect(screen.getByText('Reset')).toBeInTheDocument();
  });

 test('starts the stopwatch', async () => {
  render(<Stopwatch />);
    await act(async () => {
    fireEvent.click(screen.getByText('Start'));
  });
  
  // Wait for at least 1 second
  await new Promise(r => setTimeout(r, 1000));
  
  await waitFor(() => expect(screen.getByText(/(\d{2}:){2}\d{2}/)).not.toBe('00:00:00'));
});

  test('stops the stopwatch', async () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByText('Start'));
    await waitFor(() => expect(screen.getByText(/(\d{2}:){2}\d{2}/)).not.toBe('00:00:00'));
    fireEvent.click(screen.getByText('Stop'));
    const stoppedTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
    await new Promise(r => setTimeout(r, 1000));
    expect(screen.getByText(/(\d{2}:){2}\d{2}/).textContent).toBe(stoppedTime);
  });

  test('resets the stopwatch', () => {
    render(<Stopwatch />);
    fireEvent.click(screen.getByText('Reset'));
    expect(screen.getByText('00:00:00')).toBeInTheDocument();
  });

test('displays lap time on click of the lap button', async () => {
  render(<Stopwatch />);
  await act(async () => {
    fireEvent.click(screen.getByText('Start'));
  });

  await new Promise(r => setTimeout(r, 1000));
  
  await act(async () => {
    fireEvent.click(screen.getByText('Lap'));
  });

  const lapTime = screen.getByText(/(\d{2}:){2}\d{2}/).textContent;
  
  // Check that the lap time is displayed
  expect(screen.getByText(lapTime)).toBeInTheDocument();
});

test('pauses and resumes the stopwatch', async () => {
  render(<Stopwatch />);

  // Simulate a click on the 'Start' button
  fireEvent.click(screen.getByText('Start'));

  // Wait for a second to let the timer update
  await new Promise(r => setTimeout(r, 1000));

  // Simulate a click on the 'Pause' button
  fireEvent.click(screen.getByText('Pause'));

  // Store the current time
  const pausedTime = screen.getByTestId('current-timer').textContent;

  // Wait for a second to ensure the timer is paused
  await new Promise(r => setTimeout(r, 1000));

  // Check if the time is still the same
  expect(screen.getByTestId('current-timer')).toHaveTextContent(pausedTime);

  // Simulate a click on the 'Resume' button
  fireEvent.click(screen.getByText('Resume'));

  // Wait for a second to let the timer update
  await new Promise(r => setTimeout(r, 1500));

  // Check if the time has updated
  expect(screen.getByTestId('current-timer')).not.toHaveTextContent(pausedTime);
});

test('shows and hides buttons correctly', () => {
  render(<Stopwatch />);

  // Check if the 'Start' button is visible and the 'Stop' and 'Pause' buttons are not visible
expect(screen.getByText('Start')).toBeVisible();
expect(screen.queryByText('Stop')).not.toBeVisible();
expect(screen.queryByText('Pause')).not.toBeVisible();

// Simulate a click on the 'Start' button
fireEvent.click(screen.getByText('Start'));

// Check if the 'Stop' and 'Pause' buttons are visible and the 'Start' button is not visible
expect(screen.getByText('Stop')).toBeVisible();
expect(screen.getByText('Pause')).toBeVisible();
expect(screen.queryByText('Start')).not.toBeVisible();

// Simulate a click on the 'Pause' button
fireEvent.click(screen.getByText('Pause'));

// Check if the 'Resume' button is visible and the 'Pause' button is not visible
expect(screen.getByText('Resume')).toBeVisible();
expect(screen.queryByText('Pause')).not.toBeVisible();
});

});