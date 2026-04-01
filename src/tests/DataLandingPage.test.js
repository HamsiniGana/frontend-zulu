import {
  screen,
  render,
  waitFor,
  within,
  fireEvent,
} from "@testing-library/react";
import DataLandingPage from "../components/DataLandingPage";
import { data } from "react-router-dom";
import { wait } from "@testing-library/user-event/dist/utils";

const mockedFn = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

test("Check whether UI elements are displayed", () => {
  render(<DataLandingPage />);
  const dataContainer = screen.getByTestId("data-container");
  expect(dataContainer).toBeVisible();

  expect(within(dataContainer).getAllByRole("img")).toHaveLength(3);
  expect(
    within(dataContainer).getAllByRole("button", /Get started/i),
  ).toHaveLength(3);

  const irrigationTitle = screen.getByText("Irrigation guide");
  expect(irrigationTitle).toBeVisible();

  const plantInfoTitle = screen.getByText("Plant information");
  expect(plantInfoTitle).toBeVisible();

  const comparePlantsTitle = screen.getByText("Compare plants");
  expect(comparePlantsTitle).toBeVisible();

  const irrigationDescription = screen.getByText(
    "Get information on how and when to water your plants, and how weather affects it.",
  );
  expect(irrigationDescription).toBeVisible();

  const plantInfoDescription = screen.getByText(
    "Get detailed information about a plant.",
  );
  expect(plantInfoDescription).toBeVisible();

  const comparePlantsDescription = screen.getByText(
    "Get detailed information about a plant.",
  );
  expect(comparePlantsDescription).toBeVisible();

  expect(within(dataContainer).getByText("Data")).toBeVisible();
});

test("Check navigation", async () => {
  render(<DataLandingPage />);

  const dataContainer = screen.getByTestId("data-container");

  const btns = within(dataContainer).getAllByRole("button", /Get started/i);

  for (const btn of btns) {
    fireEvent.click(btn);

    await waitFor(() => {
      expect(mockedFn).toHaveBeenCalled();
    });
  }
});

test("Check if navbar is displayed", () => {
  render(<DataLandingPage />);

  const navbar = screen.getByRole("navigation");
  expect(navbar).toBeVisible();

  // Clear data created by this test
  localStorage.clear();
});
