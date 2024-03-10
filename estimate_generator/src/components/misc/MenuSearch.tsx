"use client";

import React from "react";
import { useState } from "react";
import SearchForm from "../forms/SearchForm";

const MenuSearch = ({ ...props }) => {

  const [ serachQuery, setSearchQuery ] = useState("");

  return (
    <div
       { ...props }
    >
        <SearchForm />
    </div>
  );
}

export default MenuSearch;