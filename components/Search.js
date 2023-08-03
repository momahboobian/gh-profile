"use client";
import { useState } from "react";

export default function Search({ search, setSearch }) {
  const handleSearchClick = () => {
    setSearch("");
  };

  const handleSearchOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <label for="search">
      <input
        id="search"
        type="search"
        value={search}
        onClick={handleSearchClick}
        onChange={handleSearchOnChange}
        class=" flex flex-start p-3 text-black rounded-md "
      />
    </label>
  );
}
