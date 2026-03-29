import { screen, render, fireEvent } from "@testing-library/react";
import LandingPage from "../components/LandingPage";

const mockedFn = jest.fn()
jest.mock("react-router-dom", () => ({
    useNavigate: () => mockedFn
}))

test("Check whether UI elements are displayed", () => {
  render(<LandingPage />);
  const btns = screen.getAllByRole("button");
  const title = screen.getByText("Welcome to Zulu!");
  const description = screen.getByText(
    "Aligning your garden’s needs with the day’s forecast",
  );
  const plantImg = screen.getByRole("img");

  expect(btns).toHaveLength(2);
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
  expect(plantImg).toBeInTheDocument();
});

test('Check login navigation', () => {
    render(<LandingPage/>)
    const loginBtn = screen.getByRole("button", {name: /Login/i})
    fireEvent.click(loginBtn)
    expect(mockedFn).toHaveBeenCalled()
})

test('Check sign up navigation', () => {
    render(<LandingPage/>)
    const signUpBtn = screen.getByRole("button", {name: /Sign up/i})
    fireEvent.click(signUpBtn)
    expect(mockedFn).toHaveBeenCalled()
})