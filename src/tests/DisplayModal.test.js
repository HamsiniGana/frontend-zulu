import { screen, render, fireEvent } from "@testing-library/react";
import DisplayModal from "../components/DisplayModal";

const mockSetModalMsg = jest.fn();
test("Check if display modal is displayed with correct title, msg and buttons", () => {
  render(
    <DisplayModal
        show={true}
      modalTitle={"Woops!"}
      modalMsg={"Plant with given name not found"}
      setModalMsg={mockSetModalMsg}
    />,
  );
  const title = screen.getByText("Woops!");
  expect(title).toBeInTheDocument();

  const msg = screen.getByText("Plant with given name not found");
  expect(msg).toBeInTheDocument();

  const crossBtn = screen.getAllByRole("button")[0];
  const closeBtn = screen.getAllByRole("button")[1];

  expect(closeBtn).toBeInTheDocument();
  expect(crossBtn).toBeInTheDocument();
});

test("Check confirm modal behaviour after close btn is clicked", () => {
  render(
    <DisplayModal
        show={true}
      modalTitle={"Woops!"}
      modalMsg={"Plant with given name not found"}
      setModalMsg={mockSetModalMsg}
    />,
  );

  const closeBtn = screen.getAllByRole("button")[1];

  fireEvent.click(closeBtn);
  expect(mockSetModalMsg).toHaveBeenCalled();
});

test("Check confirm modal behaviour after the cross btn is clicked", () => {
  render(
    <DisplayModal
        show={true}
      modalTitle={"Woops!"}
      modalMsg={"Plant with given name not found"}
      setModalMsg={mockSetModalMsg}
    />,
  );

  const crossBtn = screen.getAllByRole("button")[0];

  fireEvent.click(crossBtn);
  expect(mockSetModalMsg).toHaveBeenCalled();
});
