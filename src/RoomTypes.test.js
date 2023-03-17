import { render, screen } from '@testing-library/react';
import RoomTypes from './components/room-types/RoomTypes';

test('to make sure it renders', () => {
  render(<RoomTypes />);
  const linkElement = screen.getByText(/New Game/i);
  expect(linkElement).toBeInTheDocument();
});
