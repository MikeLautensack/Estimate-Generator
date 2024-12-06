import SignInForm from "@/components/forms/SignInForm";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Sign in form tests", () => {
  // beforeEach(() => {
  //   render(<SignInForm />);
  // });

  describe("input validation", () => {
    // test("Email input validates with valid email", async () => {
    //   // 2. Modify
    //   await act(async () => {
    //     userEvent.click(screen.getByRole("textbox", { name: /email/i }));
    //     userEvent.type(
    //       screen.getByRole("textbox", { name: /email/i }),
    //       "test@email.com",
    //     );
    //     userEvent.click(screen.getByText(/Sign In/));
    //   });
    //   // 3. Assert
    //   await waitFor(() => {
    //     expect(
    //       screen.queryByText(/Please enter a valid email\./),
    //     ).not.toBeInTheDocument();
    //   });
    // });

    // test("Email input renders error text when passed 'test@email'", async () => {
    //   // 2. Modify
    //   await act(async () => {
    //     userEvent.click(screen.getByRole("textbox", { name: /email/i }));
    //     userEvent.type(
    //       screen.getByRole("textbox", { name: /email/i }),
    //       "test@email",
    //     );
    //     userEvent.click(screen.getByText(/Sign In/));
    //   });
    //   // 3. Assert
    //   await waitFor(() => {
    //     expect(
    //       screen.getByText(/Please enter a valid email\./),
    //     ).toBeInTheDocument();
    //   });
    // });

    // test("Email input renders error text when passed 'test'", async () => {
    //   // 2. Modify
    //   await act(async () => {
    //     userEvent.click(screen.getByRole("textbox", { name: /email/i }));
    //     userEvent.type(screen.getByRole("textbox", { name: /email/i }), "test");
    //     userEvent.click(screen.getByText(/Sign In/));
    //   });
    //   // 3. Assert
    //   await waitFor(() => {
    //     expect(
    //       screen.getByText(/Please enter a valid email\./),
    //     ).toBeInTheDocument();
    //   });
    // });

    // test("Password input validates when passed a password between 4 and 25 chars/ 'password'", async () => {
    //   // 2. Modify
    //   await act(async () => {
    //     userEvent.click(screen.getByRole("textbox", { name: /password/i }));
    //     await userEvent.type(
    //       screen.getByRole("textbox", { name: /password/i }),
    //       "password",
    //     );
    //     userEvent.click(screen.getByText(/Sign In/));
    //   });
    //   // 3. Assert
    //   await waitFor(() => {
    //     expect(
    //       screen.queryByText(/Password must be at least 4 characters\./),
    //     ).not.toBeInTheDocument();
    //     expect(
    //       screen.queryByText(/Password must be less than 25 characters\./),
    //     ).not.toBeInTheDocument();
    //   });
    // });

    // test("Password input renders 'Password must be at least 4 characters' when passed '123'", async () => {
    //   // 2. Modify
    //   const passwordInput = screen.getByRole("textbox", { name: /password/i });
    //   await act(async () => {
    //     userEvent.click(passwordInput);
    //     userEvent.type(passwordInput, "123");
    //     const submitButton = screen.getByText(/Sign In/);
    //     userEvent.click(submitButton);
    //   });
    //   // 3. Assert
    //   await waitFor(() => {
    //     expect(
    //       screen.getByText(/Password must be at least 4 characters\./),
    //     ).toBeInTheDocument();
    //   });
    // });

    // test("Password input renders 'Password must be less than 25 characters' when passed 'passwordvalidatontestingformaxchar'", async () => {
    //   // 2. Modify
    //   const passwordInput = screen.getByRole("textbox", { name: /password/i });
    //   await act(async () => {
    //     userEvent.click(passwordInput);
    //     await userEvent.type(
    //       passwordInput,
    //       "passwordvalidatontestingformaxchar",
    //     );
    //     const submitButton = screen.getByText(/Sign In/);
    //     userEvent.click(submitButton);
    //   });
    //   // 3. Assert
    //   await waitFor(() => {
    //     expect(
    //       screen.getByText(/Password must be less than 25 characters\./),
    //     ).toBeInTheDocument();
    //   });
    // });
    test("placeholder-test", () => {});
  });
  describe("form submission", () => {});
});
