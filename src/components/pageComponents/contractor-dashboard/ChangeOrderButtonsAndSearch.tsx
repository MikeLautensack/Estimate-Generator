"use client";

import React from "react";
import { Button } from "../../ui/button";
import SearchForm from "../../misc/SearchForm";

const ChangeOrderButtonsAndSearch = () => {
  return (
    <div
      id="buttons-and-search"
      className="flex flex-col-reverse tablet:flex-row justify-center tablet:justify-between"
    >
      <div id="buttons" className="flex gap-2">
        <Button id="new-change-order-button" className="" variant={"outline"}>
          New Change Order
        </Button>
        <Button id="filter-button" className="" variant={"outline"}>
          Filter
        </Button>
        <Button id="" className="" variant={"outline"}>
          Sort
        </Button>
      </div>
      <SearchForm />
    </div>
  );
};

export default ChangeOrderButtonsAndSearch;
