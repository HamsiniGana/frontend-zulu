import {
  screen,
  render,
  fireEvent,
  within,
  waitFor,
} from "@testing-library/react";
import Navbar from "../components/Navbar";

const mockedFn = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

test("Check whether UI elements are displayed", async () => {
  render(<Navbar />);
  const navContainer = screen.getByRole("navigation");

  await waitFor(() => {
    expect(navContainer).toBeInTheDocument();
  });

  // Plant and profile icons
  const images = within(navContainer).getAllByRole("img");
  await waitFor(() => {
    expect(images).toHaveLength(2);
  });

  // Data, Graph, Report and profile btns
  const btns = within(navContainer).getAllByRole("button");
  await waitFor(() => {
    expect(btns).toHaveLength(4);
  });
});

test("Check navigation", async () => {
  render(<Navbar />);
  const navContainer = screen.getByRole("navigation");

  const btns = within(navContainer).getAllByRole("button");

  for (const btn of btns) {
    fireEvent.click(btn);
    await waitFor(() => {
      expect(mockedFn).toHaveBeenCalled();
    });
  }
});
