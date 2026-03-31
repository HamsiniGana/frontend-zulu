import { screen, render, waitFor } from "@testing-library/react";
import LoadingPage from "../components/LoadingPage";

const mockedFn = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

test("Check whether UI elements are displayed", () => {
  render(<LoadingPage />);

  const plantImg = screen.getByRole("img");
  expect(plantImg).toBeVisible();

  const loadingTxt = screen.getByText("Loading");
  expect(loadingTxt).toBeVisible();

  const dots = screen.getAllByText(".");
  expect(dots).toHaveLength(4);
});

test("Check navigation", async () => {
  render(<LoadingPage />);
  await waitFor(
    () => {
      expect(mockedFn).toHaveBeenCalled();
    },
    { timeout: 4000 },
  );
});

