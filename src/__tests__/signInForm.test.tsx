import SignInForm from "@/components/forms/SignInForm";
import { act, render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Sign in form tests", () => {
  test("Email input validates correctly when passed a valid email", async () => {
    // 1. Render
    render(<SignInForm />);

    // 2. Modify
    userEvent.click(screen.getByRole("textbox", { name: /email/i }));
    userEvent.type(
      screen.getByRole("textbox", { name: /email/i }),
      "test@email.com",
    );

    userEvent.click(screen.getByText(/Sign In/));

    // 3. Assert
    await waitFor(() =>
      expect(
        screen.queryByText(/Please enter a valid email\./),
      ).not.toBeInTheDocument(),
    );
  });

  test("Email input renders error text when passed an invalid email x1", async () => {
    // 1. Render
    render(<SignInForm />);

    // 2. Modify
    userEvent.click(screen.getByRole("textbox", { name: /email/i }));
    userEvent.type(
      screen.getByRole("textbox", { name: /email/i }),
      "test@email",
    );

    userEvent.click(screen.getByText(/Sign In/));

    // 3. Assert
    await waitFor(() =>
      expect(
        screen.getByText(/Please enter a valid email\./),
      ).toBeInTheDocument(),
    );
  });

  test("Email input renders error text when passed an invalid email x2", async () => {
    // 1. Render
    render(<SignInForm />);

    // 2. Modify
    userEvent.click(screen.getByRole("textbox", { name: /email/i }));
    userEvent.type(screen.getByRole("textbox", { name: /email/i }), "test");

    userEvent.click(screen.getByText(/Sign In/));

    // 3. Assert
    await waitFor(() =>
      expect(
        screen.getByText(/Please enter a valid email\./),
      ).toBeInTheDocument(),
    );
  });

  test("Password input validates correctly when passed a valid password", async () => {
    // 1. Render
    render(<SignInForm />);

    // 2. Modify
    userEvent.click(screen.getByRole("textbox", { name: /password/i }));
    userEvent.type(
      screen.getByRole("textbox", { name: /password/i }),
      "password",
    );

    userEvent.click(screen.getByText(/Sign In/));

    // 3. Assert
    await waitFor(
      () => (
        expect(
          screen.queryByText(/Password must be at least 4 characters\./),
        ).not.toBeInTheDocument(),
        expect(
          screen.queryByText(/Password must be less than 25 characters\./),
        ).not.toBeInTheDocument()
      ),
    );
  });

  test("Password input renders error text when passed an invalid password x1", async () => {
    // 1. Render
    render(<SignInForm />);

    // 2. Modify
    userEvent.click(screen.getByRole("textbox", { name: /password/i }));
    userEvent.type(screen.getByRole("textbox", { name: /password/i }), "pas");

    userEvent.click(screen.getByText(/Sign In/));

    // 3. Assert
    await waitFor(() =>
      expect(
        screen.getByText(/Password must be at least 4 characters\./),
      ).toBeInTheDocument(),
    );
  });

  test("Password input renders error text when passed an invalid password x2", async () => {
    // 1. Render
    render(<SignInForm />);

    // 2. Modify
    const passwordInput = screen.getByRole("textbox", { name: /password/i });
    await act(async () => {
      userEvent.click(passwordInput);
      await userEvent.type(passwordInput, "passwordmaxlengthvalidationtest");
    });

    const submitButton = screen.getByText(/Sign In/);
    await act(async () => {
      userEvent.click(submitButton);
    });
    // 3. Assert
    await waitFor(() =>
      expect(
        screen.getByText(/Password must be less than 25 characters\./),
      ).toBeInTheDocument(),
    );
  });
});
