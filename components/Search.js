import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
export default function Search({ search, setSearch }) {
  const handleSearchClick = () => {
    setSearch("");
  };

  const handleSearchOnChange = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };
  return (
    <div className="relative focus-within:text-gray-400">
      <span className="absolute inset-y-0 left-0 flex items-center ">
        <FontAwesomeIcon icon={faSearch} className="text-gray-400 h-5 pl-4  " />
      </span>
      <input
        id="search"
        type="search"
        value={search}
        onClick={handleSearchClick}
        onChange={handleSearchOnChange}
        className="p-4 pl-12 bg-[#edeaea] font-medium rounded-md w-[300px] md:w-[340px] my-[10%] text-left text-md text-gray-400"
      />
    </div>
  );
}
