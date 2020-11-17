import React from "react";
import { render, screen } from "@testing-library/react";
import { Login } from "./pages/auth/login";

test("render login", () => {
  render(<Login />);
  const loginTitle = screen.getByText("Login");
  expect(loginTitle).toBeInTheDocument();
});
