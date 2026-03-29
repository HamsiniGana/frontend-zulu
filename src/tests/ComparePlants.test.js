import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ComparePlants from "../components/ComparePlants";
import * as axios from "axios";

const mockedFn = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

jest.mock("axios");

const mockSuccessReponse = {
  data: [
    {
      plant_name: "onion",
      life_form: "herb",
      life_span: "biennial",
      category: "vegetables, medicinals & aromatic",
      attributes: "grown on large scale",
      tavg: 18.5,
      ravg: 475,
      phavg: 6.300000000000001,
      texture: "medium, organic",
      ktmpr: null,
      ktmp: null,
      photo:
        "short day (<12 hours), neutral day (12-14 hours), long day (>14 hours)",
      cliz: "tropical wet & dry (Aw), tropical wet (Ar), steppe or semiarid (Bs), subtropical humid (Cf), subtropical dry summer (Cs), subtropical dry winter (Cw), temperate oceanic (Do), temperate continental (Dc), temperate with humid winters (Df), temperate with dry winters (Dw)",
      gavg: 130,
    },
    {
      plant_name: "tomato",
      life_form: "herb",
      life_span: "annual",
      category: "forage/pasture, vegetables, medicinals & aromatic",
      attributes: "grown on large scale",
      tavg: 23.5,
      ravg: 950,
      phavg: 6.25,
      texture: "medium, organic",
      ktmpr: null,
      ktmp: null,
      photo:
        "short day (<12 hours), neutral day (12-14 hours), long day (>14 hours)",
      cliz: "tropical wet & dry (Aw), tropical wet (Ar), steppe or semiarid (Bs), subtropical humid (Cf), subtropical dry summer (Cs), subtropical dry winter (Cw), temperate oceanic (Do), temperate continental (Dc), temperate with humid winters (Df), temperate with dry winters (Dw)",
      gavg: 110,
    },
  ],
  status: 200,
};
const mockFailResponse = {
  response: {
    data: {
      detail: "At least 2 plants must be provided",
    },
  },
  status: 400,
};

test("Check if closable tabs and compare cards are created when plants are added and whether the compare button is disaplyed when one or more plants are added", async () => {
  render(<ComparePlants />);
  const addBtn = screen.getByRole("button", { name: /\+Add/i });
  const searchBar = screen.getByPlaceholderText("Search for plants to compare");

  axios.mockResolvedValue(mockSuccessReponse);

  fireEvent.change(searchBar, { target: { value: "onion" } });
  fireEvent.click(addBtn);

  const compareBtn = screen.getByRole("button", { name: /Compare/i });

  expect(compareBtn).toBeInTheDocument();

  fireEvent.change(searchBar, { target: { value: "tomato" } });
  fireEvent.click(addBtn);

  fireEvent.click(compareBtn);
  await waitFor(() => {
    const onionCompareCard = screen.getByText("ONION");
    expect(onionCompareCard).toBeInTheDocument();
  });
  await waitFor(() => {
    const tomatoCompareCard = screen.getByText("TOMATO");
    expect(tomatoCompareCard).toBeInTheDocument();
  });
  await waitFor(() => {
    const closableTabs = screen.getAllByRole("button", { name: /Close/i });
    expect(closableTabs).toHaveLength(2);
  });

  // Clear data created by this test
  localStorage.clear();
});

test("Check if modal displays error messages", async () => {
  render(<ComparePlants />);
  const addBtn = screen.getByRole("button", { name: /\+Add/i });
  const searchBar = screen.getByPlaceholderText("Search for plants to compare");

  axios.mockRejectedValue(mockFailResponse);

  fireEvent.change(searchBar, { target: { value: "onion" } });
  fireEvent.click(addBtn);

  const compareBtn = screen.getByRole("button", { name: /Compare/i });
  fireEvent.click(compareBtn);

  await waitFor(() => {
    const modalMsg = screen.getByText("Woops!");
    expect(modalMsg).toBeInTheDocument();
  });
});

test("Check if navbar is displayed", () => {
  render(<ComparePlants />);

  const navbar = screen.getByRole("navigation");
  expect(navbar).toBeInTheDocument();

  // Clear data created by this test
  localStorage.clear();
});

test("Check if compareBtn is displayed only when one or more plants are added", () => {
  render(<ComparePlants />);
  const compareBtn = screen.queryByRole("button", { name: /Compare/i });
  expect(compareBtn).not.toBeInTheDocument();
});
