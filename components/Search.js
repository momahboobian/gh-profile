export default function Search({ search, setSearch }) {
  const handleSearchClick = () => {
    setSearch("");
  };

  const handleSearchOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div class=" p-4 relative text-[#929597] focus-within:text-gray-400">
      <span class="absolute inset-y-0 left-0 flex items-center pl-8">
        <svg
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="w-6 h-6"
        >
          <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      </span>
      <input
        id="search"
        type="search"
        value={search}
        onClick={handleSearchClick}
        onChange={handleSearchOnChange}
        class=" p-5 pl-12  bg-[#edeaea] font-medium rounded-md w-[300px] md:w-[340px] my-[10%] text-left  text-md text-[#929597] "
      />{" "}
    </div>
  );
}
