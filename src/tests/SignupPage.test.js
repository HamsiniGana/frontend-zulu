import { fireEvent, render, screen } from "@testing-library/react";
import SignUpPage from "../components/SignUpPage";
import * as axios from "axios";


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
  useNavigate: () => jest.fn(),
}));

jest.mock("axios");

test("Check whether UI elements are rendered", () => {
  render(<SignUpPage />);
  const heading = screen.getByText("Create your new account");
  expect(heading).toBeInTheDocument();

  const usernameHeading = screen.getByText("Username:");
  expect(usernameHeading).toBeInTheDocument();

  const fullNameHeading = screen.getByText("Full name:");
  expect(fullNameHeading).toBeInTheDocument();

  const emailHeading = screen.getByText("Email address:");
  expect(emailHeading).toBeInTheDocument();

  const passHeading = screen.getByText("Password:");
  expect(passHeading).toBeInTheDocument();

  const confirmPassHeading = screen.getByText("Confirm password:");
  expect(confirmPassHeading).toBeInTheDocument();

  const signUpBtn = screen.getByRole("button");
  expect(signUpBtn).toBeInTheDocument();

  const arrowLeft = screen.getAllByRole("img")[0];
  expect(arrowLeft).toBeInTheDocument();

  const plantImg = screen.getAllByRole("img")[1];
  expect(plantImg).toBeInTheDocument();

  const alreadyHaveAnAccountStr = screen.getByText("Already have an account?");
  expect(alreadyHaveAnAccountStr).toBeInTheDocument();

  const loginTag = screen.getByText("Login");
  expect(loginTag).toBeInTheDocument();
});

test("Check redirection to login page", () => {
  render(<SignUpPage />);

  const loginTag = screen.getByText("Login");

  expect(loginTag).toHaveAttribute("href", "/login");
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
  expect(signUpBtn).toBeInTheDocument();

  fireEvent.click(signUpBtn);

  // Check if modal pops up
  const modalMsg = await screen.findByText(
    "Created account successfully! Now login 😃",
  );
  expect(modalMsg).toBeInTheDocument();
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
  expect(signUpBtn).toBeInTheDocument();

  fireEvent.click(signUpBtn);

  const modalMsg = await screen.findByText("Passwords do not match");
  expect(modalMsg).toBeInTheDocument();
});
