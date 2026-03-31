import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import SignUpPage from "../components/SignUpPage";
import * as axios from "axios";

const mockedFn = jest.fn();

const mockedSuccessResponse = {
  data: {
    username: "Harry",
    full_name: "Harry Potter",
    email: "harry@example.com",
    disabled: false,
    hashed_password:
      "$2b$12$Wi/0LHSHG3zT0OjE1Ng1eeaz7BlD3gCDlzrF.X9FTNH8cUwcPK5Gm",
    logged_in: false,
  },
  status: 201,
};

const mockedFailResponse = {
  response: {
    data: {
      detail: "Passwords do not match",
    },
  },
  status: 400,
};

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockedFn,
}));

jest.mock("axios");

test("Check whether UI elements are rendered", async () => {
  render(<SignUpPage />);
  const heading = screen.getByText("Create your new account");
  await waitFor(() => {
    expect(heading).toBeInTheDocument();
  });

  const usernameHeading = screen.getByText("Username:");
  await waitFor(() => {
    expect(usernameHeading).toBeInTheDocument();
  });

  const fullNameHeading = screen.getByText("Full name:");
  await waitFor(() => {
    expect(fullNameHeading).toBeInTheDocument();
  });

  const emailHeading = screen.getByText("Email address:");
  await waitFor(() => {
    expect(emailHeading).toBeInTheDocument();
  });

  const passHeading = screen.getByText("Password:");
  await waitFor(() => {
    expect(passHeading).toBeInTheDocument();
  });

  const confirmPassHeading = screen.getByText("Confirm password:");
  await waitFor(() => {
    expect(confirmPassHeading).toBeInTheDocument();
  });

  const signUpBtn = screen.getByRole("button");
  await waitFor(() => {
    expect(signUpBtn).toBeInTheDocument();
  });

  const arrowLeft = screen.getAllByRole("img")[0];
  await waitFor(() => {
    expect(arrowLeft).toBeInTheDocument();
  });

  const plantImg = screen.getAllByRole("img")[1];
  await waitFor(() => {
    expect(plantImg).toBeInTheDocument();
  });

  const alreadyHaveAnAccountStr = screen.getByText("Already have an account?");
  await waitFor(() => {
    expect(alreadyHaveAnAccountStr).toBeInTheDocument();
  });

  const loginTag = screen.getByText("Login");
  await waitFor(() => {
    expect(loginTag).toBeInTheDocument();
  });
});

test("Check redirection to login page", async () => {
  render(<SignUpPage />);

  const loginTag = screen.getByText("Login");

  fireEvent.click(loginTag);

  await await waitFor(() => {
    expect(mockedFn).toHaveBeenCalled();
  });
});

test("Check successful sign up", async () => {
  render(<SignUpPage />);
  axios.mockResolvedValue(mockedSuccessResponse);
  const username = screen.getByPlaceholderText("Username");

  fireEvent.change(username, { target: { value: "Harry" } });

  const fullName = screen.getByPlaceholderText("Full name");
  fireEvent.change(fullName, { target: { value: "Harry Potter" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "harry@gmail.com" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "Harry123@@" } });

  const confirmPassword = screen.getByPlaceholderText("Confirm password");
  fireEvent.change(confirmPassword, { target: { value: "Harry123@@" } });

  const signUpBtn = screen.getByRole("button");
  await waitFor(() => {
    expect(signUpBtn).toBeInTheDocument();
  });

  fireEvent.click(signUpBtn);

  // Check if modal pops up
  const modalMsg = await screen.findByText(
    "Created account successfully! Now login 😃",
  );
  await waitFor(() => {
    expect(modalMsg).toBeInTheDocument();
  });
});

test("Check modal popup after Unsuccessful sign up", async () => {
  render(<SignUpPage />);

  axios.mockRejectedValue(mockedFailResponse);
  const username = screen.getByPlaceholderText("Username");
  fireEvent.change(username, { target: { value: "Harry" } });

  const fullName = screen.getByPlaceholderText("Full name");
  fireEvent.change(fullName, { target: { value: "Harry Potter" } });

  const email = screen.getByPlaceholderText("Email");
  fireEvent.change(email, { target: { value: "harry@gmail.com" } });

  const password = screen.getByPlaceholderText("Password");
  fireEvent.change(password, { target: { value: "Harry123@@" } });

  const confirmPassword = screen.getByPlaceholderText("Confirm password");
  fireEvent.change(confirmPassword, { target: { value: "Harry123@@@" } });

  const signUpBtn = screen.getByRole("button");
  await waitFor(() => {
    expect(signUpBtn).toBeInTheDocument();
  });

  fireEvent.click(signUpBtn);

  const modalMsg = await screen.findByText("Passwords do not match");
  await waitFor(() => {
    expect(modalMsg).toBeInTheDocument();
  });
});
