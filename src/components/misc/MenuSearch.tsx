"use client";

import React from "react";
import SearchForm from "../forms/SearchForm";

const MenuSearch = ({ ...props }) => {
  return (
    <div {...props}>
      <SearchForm />
    </div>
  );
};

export default MenuSearch;
