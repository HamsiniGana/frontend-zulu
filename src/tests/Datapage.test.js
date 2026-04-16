// import {
//   fireEvent,
//   render,
//   screen,
//   waitFor,
//   within,
// } from "@testing-library/react";
// import DataPage from "../components/Datapage";
// import * as axios from "axios";

// const mockedFn = jest.fn();

// jest.mock("react-router-dom", () => ({
//   useNavigate: () => mockedFn,
// }));

// jest.mock("axios");

// const mockAlert = jest.spyOn(window, "alert").mockImplementation(() => {});

// test("Check whether UI elements are displayed", () => {
//   render(<DataPage />);
//   const irrigationGuideTitle = screen.getByText("Irrigation Guide");
//   expect(irrigationGuideTitle).toBeVisible();

//   const enterAddressTitle = screen.getByText("Enter your address:");
//   expect(enterAddressTitle).toBeVisible();

//   const soilTypeTitle = screen.getByText("Select your soil type:");
//   expect(soilTypeTitle).toBeVisible();

//   const plantNameTitle = screen.getByText("Enter plant name:");
//   expect(plantNameTitle).toBeVisible();

//   const wateringGuideBtn = screen.getByRole("button", {
//     name: /Get Watering Guide/i,
//   });
//   expect(wateringGuideBtn).toBeVisible();

//   const addressInput = screen.getByPlaceholderText(/e.g. Kensington, NSW/i);
//   expect(addressInput).toBeVisible();

//   const plantNameInput = screen.getByPlaceholderText(/e.g. tomato/i);
//   expect(plantNameInput).toBeVisible();

//   const soilDropdown = screen.getByTestId("soil-dropdown");
//   expect(soilDropdown).toBeVisible();
// });
// test("Test soil dropdown", async () => {
//   render(<DataPage />);
//   const soilDropdown = screen.getByTestId("soil-dropdown");

//   await waitFor(() => {
//     expect(within(soilDropdown).getAllByRole("option")).toHaveLength(7);
//   });
// });

// test("Check irrigation guide", async () => {
//   axios.get.mockResolvedValueOnce({
//     data: [
//       {
//         lat: 51.5,
//         lon: 0.12,
//       },
//     ],
//     status: 200,
//   });

//   axios.get.mockResolvedValueOnce({
//     data: {
//       daily: {
//         time: ["2026-04-01", "2026-04-02"],
//         temperature_2m_max: [25, 28],
//         temperature_2m_min: [15, 20],
//         rain_sum: [0, 0.1],
//       },
//     },
//   });

//   axios.post.mockResolvedValueOnce({
//     data: ["2026-04-01"],
//   });

//   render(<DataPage />);
//   const plantNameInput = screen.getByPlaceholderText(/e.g. tomato/i);

//   const addressInput = screen.getByPlaceholderText(/e.g. Kensington, NSW/i);

//   const wateringGuideBtn = screen.getByRole("button", {
//     name: /Get Watering Guide/i,
//   });

//   fireEvent.change(plantNameInput, { target: { value: "tomato" } });
//   fireEvent.change(addressInput, { target: { value: "Kensington, NSW" } });
//   fireEvent.blur(addressInput);

//   const soilDropdown = screen.getByTestId("soil-dropdown");
//   fireEvent.change(soilDropdown, { target: { value: "clay" } });

//   fireEvent.click(wateringGuideBtn);

//   const wateringGuideTitle = await screen.findByText(
//     "The days you should water your plants",
//   );

//   await waitFor(() => {
//     expect(wateringGuideTitle).toBeVisible();
//   });
// });

// test("Check if location alert is displayed when location is not entered", () => {
//   render(<DataPage />);

//   const plantNameInput = screen.getByPlaceholderText(/e.g. tomato/i);
//   fireEvent.change(plantNameInput, { target: { value: "tomato" } });

//   const wateringGuideBtn = screen.getByRole("button", {
//     name: /Get Watering Guide/i,
//   });

//   const soilDropdown = screen.getByTestId("soil-dropdown");
//   fireEvent.change(soilDropdown, { target: { value: "clay" } });

//   const addressInput = screen.getByPlaceholderText(/e.g. Kensington, NSW/i);
//   fireEvent.blur(addressInput);

//   fireEvent.click(wateringGuideBtn);

//   expect(mockAlert).toHaveBeenCalledWith("Enter the location of your plant");
// });

// test("Check if plant name alert is displayed when plant name is not entered", async () => {
//   axios.get.mockResolvedValueOnce({
//     data: [
//       {
//         lat: 51.5,
//         lon: 0.12,
//       },
//     ],
//     status: 200,
//   });

//   axios.get.mockResolvedValueOnce({
//     data: {
//       daily: {
//         time: ["2026-04-01", "2026-04-02"],
//         temperature_2m_max: [25, 28],
//         temperature_2m_min: [15, 20],
//         rain_sum: [0, 0.1],
//       },
//     },
//   });

//   render(<DataPage />);

//   const wateringGuideBtn = screen.getByRole("button", {
//     name: /Get Watering Guide/i,
//   });

//   const soilDropdown = screen.getByTestId("soil-dropdown");
//   fireEvent.change(soilDropdown, { target: { value: "clay" } });

//   const addressInput = screen.getByPlaceholderText(/e.g. Kensington, NSW/i);
//   fireEvent.change(addressInput, { target: { value: "Kensington, NSW" } });
//   fireEvent.blur(addressInput);

//   fireEvent.click(wateringGuideBtn);

//   await waitFor(() => {
//     expect(mockAlert).toHaveBeenCalledWith("Enter a plant name");
//   })

//   mockAlert.mockRestore();
// });

// test("Check if navbar is displayed", () => {
//   render(<DataPage />);

//   const navbar = screen.getByRole("navigation");
//   expect(navbar).toBeVisible();

//   // Clear data created by this test
//   localStorage.clear();
// });
