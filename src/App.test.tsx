import React from "react";
import { render, screen } from "@testing-library/react";
import { Navbar } from "./components/navbar";

test("renders navbar", () => {
  render(<Navbar />);
  const linkElement = screen.getByText("Bawahan");
  expect(linkElement).toBeInTheDocument();
});
