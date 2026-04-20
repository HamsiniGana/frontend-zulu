import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import Homepage from "../components/Homepage";

const mockedFn = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

test("Check whether UI elements are displayed", () => {
  render(<Homepage />);

  const dataContainer = screen.getByTestId("data-container");
  expect(dataContainer).toBeVisible();

  expect(within(dataContainer).getAllByRole("img")).toHaveLength(5);

  expect(within(dataContainer).getByText("Data")).toBeVisible();

  expect(within(dataContainer).getByText("Graphs")).toBeVisible();

  expect(within(dataContainer).getByText("Reports")).toBeVisible();

  expect(
    within(dataContainer).getAllByRole("button", /Get started/i),
  ).toHaveLength(4);

  const dataInfo = screen.getByText(
    "Upload or use existing datasets to analyse plant data in relation to weather data.",
  );
  expect(dataInfo).toBeVisible();

  const graphsInfo = screen.getByText("View data trends.");
  expect(graphsInfo).toBeVisible();

  const reportsInfo = screen.getByText("Harvest final intelligence.");
  expect(reportsInfo).toBeVisible();
});

test("Check navigation", async () => {
  render(<Homepage />);

  const dataContainer = screen.getByTestId("data-container");

  const dataBtn = within(dataContainer).getAllByRole("button", /Get started/i)[0];
  fireEvent.click(dataBtn);

  await waitFor(() => {
    expect(mockedFn).toHaveBeenCalled();
  });
});

test("Check if navbar is displayed", () => {
  render(<Homepage />);

  const navbar = screen.getByRole("navigation");
  expect(navbar).toBeVisible();

  // Clear data created by this test
  localStorage.clear();
});
