import { render, screen } from "@testing-library/react";
import RoomTypes from "./components/room-types/RoomTypes";

test("Test to make sure it renders", () => {
  render(<RoomTypes />);
  const element = screen.getByText(/Room Types Page/i);

  expect(element).toBeInTheDocument();
});
