import { screen, render, fireEvent } from "@testing-library/react";
import LogoutDeleteAccountCard from "../components/LogoutDeleteAccountCard";

const mockedFn = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

test("Check whether logout dropdown id displayed when button is clicked", async () => {
  render(<LogoutDeleteAccountCard />);

  const profileBtn = screen.getAllByRole("button")[0];
  fireEvent.click(profileBtn);

  expect(profileBtn).toHaveAttribute("aria-expanded", "true");

  const logoutBtn = screen.getByText("Logout");
  const deleteAccountBtn = screen.getByText("Delete account");

  expect(logoutBtn).toBeVisible();
  expect(deleteAccountBtn).toBeVisible();

  fireEvent.click(profileBtn);
  expect(profileBtn).toHaveAttribute("aria-expanded", "false");
});

test("Check logout navigation", () => {
  render(<LogoutDeleteAccountCard />);

  const profileBtn = screen.getAllByRole("button")[0];
  fireEvent.click(profileBtn);

  const logoutBtn = screen.getByText("Logout");

  fireEvent.click(logoutBtn);

  const logoutReq = screen.getByText("Logout request");
  expect(logoutReq).toBeVisible();
});

test("Check delete account navigation", () => {
  render(<LogoutDeleteAccountCard />);

  const profileBtn = screen.getAllByRole("button")[0];
  fireEvent.click(profileBtn);

  const deleteAccountBtn = screen.getByText("Delete account");

  fireEvent.click(deleteAccountBtn);

  const deleteReq = screen.getByText("Account deletion request");
  expect(deleteReq).toBeVisible();
});
