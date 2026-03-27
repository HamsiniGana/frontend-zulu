import { screen, render, fireEvent } from "@testing-library/react";
import ConfirmModal from "../components/ConfirmModal";

const mockSetShowLogoutModal = jest.fn();
const mockFnPassed = jest.fn();

test("Check if confirm modal is displayed with correct title, msg and buttons", () => {
  render(
    <ConfirmModal
      showLogoutModal={true}
      title={"Woops!"}
      msg={"Plant with given name not found"}
      setShowLogoutModal={mockSetShowLogoutModal}
      fnPassed={mockFnPassed}
    />,
  );
  const title = screen.getByText("Woops!");
  expect(title).toBeInTheDocument();

  const msg = screen.getByText("Plant with given name not found");
  expect(msg).toBeInTheDocument();

  const cancelBtn = screen.getByRole("button", { name: /Cancel/i });
  const yesBtn = screen.getByRole("button", { name: /Yes/i });
  const closeBtn = screen.getByRole("button", { name: /Close/i });

  // fireEvent.click(cancelBtn)
  expect(cancelBtn).toBeInTheDocument();
  expect(yesBtn).toBeInTheDocument();
  expect(closeBtn).toBeInTheDocument();
});

test("Check confirm modal behaviour after yes is clicked", () => {
  render(
    <ConfirmModal
      showLogoutModal={true}
      title={"Woops!"}
      msg={"Plant with given name not found"}
      setShowLogoutModal={mockSetShowLogoutModal}
      fnPassed={mockFnPassed}
    />,
  );

  const yesBtn = screen.getByRole("button", { name: /Yes/i });

  fireEvent.click(yesBtn);
  expect(mockFnPassed).toHaveBeenCalled();
  expect(mockSetShowLogoutModal).toHaveBeenCalled();
});

test("Check confirm modal behaviour after the close btn is clicked", () => {
  render(
    <ConfirmModal
      showLogoutModal={true}
      title={"Woops!"}
      msg={"Plant with given name not found"}
      setShowLogoutModal={mockSetShowLogoutModal}
      fnPassed={mockFnPassed}
    />,
  );

  const closeBtn = screen.getByRole("button", { name: /Close/i });

  fireEvent.click(closeBtn);
  expect(mockSetShowLogoutModal).toHaveBeenCalled();
  expect(mockFnPassed).not.toHaveBeenCalled();
});

test("Check confirm modal behaviour after the cancel btn is clicked", () => {
  render(
    <ConfirmModal
      showLogoutModal={true}
      title={"Woops!"}
      msg={"Plant with given name not found"}
      setShowLogoutModal={mockSetShowLogoutModal}
      fnPassed={mockFnPassed}
    />,
  );

  const cancelBtn = screen.getByRole("button", { name: /Cancel/i });

  fireEvent.click(cancelBtn);
  expect(mockSetShowLogoutModal).toHaveBeenCalled();
  expect(mockFnPassed).not.toHaveBeenCalled();
});
