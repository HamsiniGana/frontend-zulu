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
  expect(heading).toBeVisible();

  const usernameHeading = screen.getByText("Username:");
  expect(usernameHeading).toBeVisible();

  const passHeading = screen.getByText("Password:");
  expect(passHeading).toBeVisible();

  const loginBtn = screen.getByRole("button");
  expect(loginBtn).toBeVisible();

  const arrowLeft = screen.getAllByRole("img")[0];
  expect(arrowLeft).toBeVisible();

  const plantImg = screen.getAllByRole("img")[1];
  expect(plantImg).toBeVisible();

  const dontHaveAnAccountStr = screen.getByText("Don't have an account?");
  expect(dontHaveAnAccountStr).toBeVisible();

  const SignUpTag = screen.getByText("Sign up");
  expect(SignUpTag).toBeVisible();
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
    expect(mockedFn).toHaveBeenCalled();
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

test("Check redirection to sign up page", async () => {
  render(<LoginPage />);

  const signUpTag = screen.getByText("Sign up");

  fireEvent.click(signUpTag);

  await waitFor(() => {
    expect(mockedFn).toHaveBeenCalled();
  });
});
