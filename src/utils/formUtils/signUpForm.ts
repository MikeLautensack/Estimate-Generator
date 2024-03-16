import { RegisterFormValues } from "@/types/types";
import { SubmitHandler } from "react-hook-form";

const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
  const res = await fetch("http://localhost:3000/api/users/create", {
      method: "POST",
      body: JSON.stringify({
          name: data.name,
          email: data.email,
          password: data.password,
          role: "contractor"
      }),
  });
}

export {
    onSubmit
}