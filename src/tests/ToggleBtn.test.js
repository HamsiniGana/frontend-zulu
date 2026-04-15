import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpPage from "../components/SignUpPage";
import ToggleBtn from "../components/ToggleBtn";

const mockedSetFn = jest.fn();
const mockedUseNav = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedUseNav,
}));

test("Renders with correct text", () => {
  render(<ToggleBtn list={[]} setList={mockedSetFn} stringPassed={"annual"} />);

  const text = screen.getByText("annual");
  expect(text).toBeInTheDocument();
});

test("check button UI when not clicked", () => {
  render(<ToggleBtn list={[]} setList={mockedSetFn} stringPassed={"annual"} />);

  const btn = screen.getByText("annual")
  expect(btn.className).toContain("bg-light-green/40")
  expect(mockedSetFn).not.toHaveBeenCalled()
});

test("check button UI when clicked", () => {
  const { rerender } = render(
    <ToggleBtn list={[]} setList={mockedSetFn} stringPassed={"annual"} />
  );

  const btn = screen.getByText("annual");
  fireEvent.click(btn);
  expect(mockedSetFn).toHaveBeenCalled();

  rerender(
    <ToggleBtn list={["annual"]} setList={mockedSetFn} stringPassed={"annual"} />
  );

  expect(btn.className).toContain("bg-light-green/80");
});

