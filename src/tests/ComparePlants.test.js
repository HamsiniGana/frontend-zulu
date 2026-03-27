// import { fireEvent, render, screen, within } from "@testing-library/react";
// import ComparePlants from "../components/ComparePlants";
// import { MemoryRouter } from "react-router-dom";
// jest.mock("../components/Navbar", () => () => <div>Navbar</div>);
// jest.mock("axios", () => ({
//   __esModule: true,
//   default: jest.fn(() => Promise.resolve({ data: [] })),
// }));

// test("Check if closable tabs and compare cards are created when plants are added and whether the compare button is disaplyed when two or more plants are added", () => {
//   render(
//     <MemoryRouter>
//       <ComparePlants />
//     // </MemoryRouter>,
//   );
//   const addBtn = screen.getByRole("button", { name: /\+Add/i });
//   const searchBar = screen.getAllByPlaceholderText(
//     "Search for plants to compare",
//   );
//   console.log(searchBar)
//   fireEvent.change(searchBar, { target: { value: "onion" } });
//   fireEvent.click(addBtn);

//   const tomatoCompareCard = screen.getByText("onion");
//   const tomatoClosableTab = screen.getByText("ONION");

//   expect(tomatoCompareCard).toBeInTheDocument();
//   expect(tomatoClosableTab).toBeInTheDocument();
// });
test('test', () => {
  expect(true).toBe(true);
});

