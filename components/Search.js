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
    <label for="search" class="flex flex-start p-4  ">
      <input
        id="search"
        type="search"
        value={search}
        onClick={handleSearchClick}
        onChange={handleSearchOnChange}
        class=" p-3 text-black rounded-md w-[300px] md:w-[340px] my-[10%]"
      />
    </label>
  );
}
