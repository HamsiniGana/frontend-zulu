import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import LoginPage from "../components/LoginPage";
import * as axios from "axios";

const mockedFn = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

jest.mock("axios");

const mockedFailResponse = {
  response: {
    data: {
      detail: "No account with provided username😳",
    },
  },
  status: 403,
};

const mockedSuccessResponse = {
  response: {
    data: {
      access_token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJSb25XIiwiaWF0IjoxNzc0Njk2MjYyLCJleHAiOjE3NzQ2OTgwNjJ9.wrYdJ7e6NU9wcKWkk0Lrwc7afJPhHjo-GikkzBaQj3k",
      token_type: "Bearer",
    },
  },
  status: 200,
};

test("Check whether UI elements are rendered", () => {
  render(<LoginPage />);
  const heading = screen.getByText("Login to your account");
  expect(heading).toBeInTheDocument();

  const usernameHeading = screen.getByText("Username:");
  expect(usernameHeading).toBeInTheDocument();

  const passHeading = screen.getByText("Password:");
  expect(passHeading).toBeInTheDocument();

  const loginBtn = screen.getByRole("button");
  expect(loginBtn).toBeInTheDocument();

  const arrowLeft = screen.getAllByRole("img")[0];
  expect(arrowLeft).toBeInTheDocument();

  const plantImg = screen.getAllByRole("img")[1];
  expect(plantImg).toBeInTheDocument();

  const dontHaveAnAccountStr = screen.getByText("Don't have an account?");
  expect(dontHaveAnAccountStr).toBeInTheDocument();

  const SignUpTag = screen.getByText("Sign up");
  expect(SignUpTag).toBeInTheDocument();
});

test("Check succesful login", async () => {
  render(<LoginPage />);

  axios.mockResolvedValue(mockedSuccessResponse);

  const username = screen.getByPlaceholderText("Username");
  fireEvent.change(username, { target: { value: "Harry" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "Harry123@@" } });

  const loginBtn = screen.getByRole("button");
  fireEvent.click(loginBtn);

  await waitFor(() => {
    expect(mockedFn).toHaveBeenCalledWith("/loadingPage");
  })

  // Clear data created by this test
  localStorage.clear()

});

test("Check unsuccessful login", async () => {
  render(<LoginPage />);

  axios.mockRejectedValue(mockedFailResponse);

  const username = screen.getByPlaceholderText("Username");
  fireEvent.change(username, { target: { value: "Unknown" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "Harry123@@" } });

  const loginBtn = screen.getByRole("button");
  await fireEvent.click(loginBtn);

  const modalMsg = await screen.findByText(
    "No account with provided username😳",
  );
  expect(modalMsg).toBeInTheDocument();

  // Clear data created by this test
  localStorage.clear()
});
