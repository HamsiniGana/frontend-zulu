import { screen, render, fireEvent, within } from "@testing-library/react";
import Navbar from "../components/Navbar";

const mockedFn = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

test("Check whether UI elements are displayed", () => {
  render(<Navbar />);
  const navContainer = screen.getByRole("navigation");
  expect(navContainer).toBeInTheDocument();

  // Plant and profile icons
  const images = within(navContainer).getAllByRole("img");
  expect(images).toHaveLength(2);

  // Data, Graph, Report and profile btns
  const btns = within(navContainer).getAllByRole("button");
  expect(btns).toHaveLength(4);
});

test("Check navigation", () => {
  render(<Navbar />);
  const navContainer = screen.getByRole("navigation");

  const btns = within(navContainer).getAllByRole("button");

  for (const btn of btns) {
    fireEvent.click(btn);
    expect(mockedFn).toHaveBeenCalled();
  }
});
