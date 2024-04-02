"use client";

import React from "react";
import { FAQProps } from "../../types/types";
import { FaChevronDown } from "react-icons/fa";
import { Button } from "../ui/button";

const FAQ = ({ _id, question, answer, opened, dispatch }: FAQProps) => {
  const click = () => {
    dispatch({ type: "action", payload: _id });
  };

  return (
    <div className="flex flex-col max-w-full bg-primary200 rounded">
      <div className="flex justify-between items-center p-2 border rounded border-primary800 max-w-full">
        <h6 className="text-[18px] font-bold text-primary500">{question}</h6>
        <Button className="" onClick={click}>
          <FaChevronDown className="text-primary500" />
        </Button>
      </div>
      {opened && (
        <div className="flex flex-col justify-start items-start gap-2 border-l border-r border-b border-primary800 p-2 max-w-full">
          <h6 className="underline text-xl text-primary500 font-medium">
            Answer
          </h6>
          <p className="text-base text-primary500 font-normal">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default FAQ;
