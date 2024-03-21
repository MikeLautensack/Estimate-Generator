import React from "react";
import { Button } from "../../ui/button";
import SearchForm from "../../misc/SearchForm";

export default function EmailsButtonAndSearch() {
  return (
    <div id="email-button-and-search" className="">
      <div id="buttons">
        <Button id="" className="">
          Filter
        </Button>
        <Button id="email-sort-button" className="">
          Sort
        </Button>
      </div>
      <SearchForm />
    </div>
  );
}
