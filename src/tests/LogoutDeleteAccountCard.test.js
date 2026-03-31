import { screen, render, fireEvent, waitFor } from "@testing-library/react";
import LogoutDeleteAccountCard from "../components/LogoutDeleteAccountCard";
import * as axios from "axios";

jest.mock("axios");

const mockedFn = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

const logoutRes = {
  status: 200,
};

const deleteAccRes = {
  status: 200,
};

test("Check whether logout dropdown id displayed when button is clicked", async () => {
  render(<LogoutDeleteAccountCard />);

  const profileBtn = screen.getAllByRole("button")[0];

  fireEvent.click(profileBtn);

  await waitFor(() => {
    expect(profileBtn).toHaveAttribute("aria-expanded", "true");
  });

  const logoutBtn = screen.getByText("Logout");
  const deleteAccountBtn = screen.getByText("Delete account");

  expect(logoutBtn).toBeVisible();
  expect(deleteAccountBtn).toBeVisible();

  fireEvent.click(profileBtn);

  await waitFor(() => {
    expect(profileBtn).toHaveAttribute("aria-expanded", "false");
  });
});

test("Check logout navigation", async () => {
  render(<LogoutDeleteAccountCard />);

  const profileBtn = screen.getAllByRole("button")[0];

  fireEvent.click(profileBtn);

  const logoutBtn = screen.getByText("Logout");

  axios.mockResolvedValue(logoutRes);

  fireEvent.click(logoutBtn);

  const logoutReq = screen.getByText("Logout request");
  await waitFor(() => {
    expect(logoutReq).toBeVisible();
  });

  const yesBtn = screen.getByText("Yes");

  await waitFor(() => {
    expect(yesBtn).toBeVisible();
  });

  fireEvent.click(yesBtn);

  await waitFor(() => {
    expect(mockedFn).toHaveBeenCalled();
  });
});

test("Check delete account navigation", async () => {
  render(<LogoutDeleteAccountCard />);

  const profileBtn = screen.getAllByRole("button")[0];
  fireEvent.click(profileBtn);

  const deleteAccountBtn = screen.getByText("Delete account");

  axios.mockResolvedValue(deleteAccRes);

  fireEvent.click(deleteAccountBtn);

  const deleteReq = screen.getByText("Account deletion request");
  await waitFor(() => {
    expect(deleteReq).toBeVisible();
  });

  const yesBtn = screen.getByText("Yes");

  await waitFor(() => {
    expect(yesBtn).toBeVisible();
  });
  fireEvent.click(yesBtn);

  await waitFor(() => {
    expect(mockedFn).toHaveBeenCalled();
  });
});
