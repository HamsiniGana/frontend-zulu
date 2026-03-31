import { fireEvent, render, screen, waitFor } from "@testing-library/react";
// import ComparePlants from "../components/ComparePlants";
import * as axios from "axios";
import PlantInfo from "../components/PlantInfoPage";

const mockedFn = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

jest.mock("axios");

const mockSuccessReponse = {
  data: {
    attributes: "grow on large scale",
    category: "vegetables",
    cliz: "tropical wet & dry",
    life_form: "herb",
    life_span: "biennial",
    gmax: 175,
    gmin: 85,
    phmax: 8.3,
    phmin: 4.3,
    ropmn: 350,
    ropmx: 600,
    topmn: 12,
    topmx: 25,
    photo: "short day",
    texture: "medium",
    plant_name: "onion",
  },
  status: 200,
};

const mockSuccessReponse2 = {
  data: {
    attributes: "grow on large scale",
    category: "vegetables",
    cliz: "tropical wet & dry",
    life_form: "herb",
    life_span: "annual",
    gmax: 150,
    gmin: 70,
    phmax: 7.5,
    phmin: 5,
    ropmn: 600,
    ropmx: 1300,
    topmn: 20,
    topmx: 27,
    photo: "short day",
    texture: "medium",
    plant_name: "tomato",
  },
  status: 200,
};

const mockFailResponse = {
  response: {
    data: {
      detail: "Plant does not exist",
    },
  },
  status: 400,
};

test("Check if plant info card is created when plant is added", async () => {
  render(<PlantInfo />);
  const addBtn = screen.getByRole("button", { name: /\+Add/i });
  const searchBar = screen.getByPlaceholderText("Search for plant");

  axios.mockResolvedValue(mockSuccessReponse);

  fireEvent.change(searchBar, { target: { value: "onion" } });
  fireEvent.click(addBtn);

  fireEvent.click(addBtn);
  await waitFor(() => {
    const onionCompareCard = screen.getByText("ONION");
    expect(onionCompareCard).toBeVisible();
  });

  // Clear data created by this test
  localStorage.clear();
});

test("Check if plant info card changes when a different plant is added", async () => {
  render(<PlantInfo />);
  const addBtn = screen.getByRole("button", { name: /\+Add/i });
  const searchBar = screen.getByPlaceholderText("Search for plant");

  axios.mockResolvedValue(mockSuccessReponse);

  fireEvent.change(searchBar, { target: { value: "onion" } });
  fireEvent.click(addBtn);

  fireEvent.click(addBtn);
  await waitFor(() => {
    const onionCompareCard = screen.getByText("ONION");
    expect(onionCompareCard).toBeVisible();
  });

  axios.mockResolvedValue(mockSuccessReponse2);

  fireEvent.change(searchBar, { target: { value: "tomato" } });
  fireEvent.click(addBtn);

  fireEvent.click(addBtn);
  await waitFor(() => {
    const onionCompareCard = screen.getByText("TOMATO");
    expect(onionCompareCard).toBeVisible();
  });

  // Clear data created by this test
  localStorage.clear();
});

test("Check if modal displays error messages", async () => {
  render(<PlantInfo />);
  const addBtn = screen.getByRole("button", { name: /\+Add/i });
  const searchBar = screen.getByPlaceholderText("Search for plant");

  axios.mockRejectedValue(mockFailResponse);

  fireEvent.change(searchBar, { target: { value: "on" } });
  fireEvent.click(addBtn);

  await waitFor(() => {
    const modalMsg = screen.getByText("Plant does not exist");
    expect(modalMsg).toBeVisible();
  });
});

test("Check if navbar is displayed", () => {
  render(<PlantInfo />);

  const navbar = screen.getByRole("navigation");
  expect(navbar).toBeVisible();

  // Clear data created by this test
  localStorage.clear();
});
