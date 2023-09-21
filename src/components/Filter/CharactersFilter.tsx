import { useState } from "react";

const CharactersFilter = ({
  setFilterOptions,
}: {
  setFilterOptions: CallableFunction;
}) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [type, setType] = useState("");
  const [gender, setGender] = useState("");

  const handleApplyFilters = () => {
    setFilterOptions({
      name,
      status,
      species,
      type,
      gender,
    });
  };

  const handleResetFilters = () => {
    setName("");
    setStatus("");
    setSpecies("");
    setType("");
    setGender("");

    setFilterOptions({
      name: "",
      status: "",
      species: "",
      type: "",
      gender: "",
    });
  };

  return (
    <div className="grid grid-cols-12 items-center gap-y-2 rounded-md bg-neutral-600 p-2">
      <label className="col-span-2 sm:col-span-1">Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="col-span-9 rounded-md px-2 py-1 text-black xs:col-span-3 sm:col-span-4 md:col-span-2"
      />

      <div className="col-span-1" />

      <label className="col-span-2 sm:col-span-1">Status:</label>
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="col-span-9 rounded-md px-2 py-1 text-black xs:col-span-3 sm:col-span-4 md:col-span-2"
      >
        <option value="">All</option>
        <option value="alive">Alive</option>
        <option value="dead">Dead</option>
        <option value="unknown">Unknown</option>
      </select>

      <div className="col-span-1" />

      <label className="col-span-2 sm:col-span-1">Species:</label>
      <input
        type="text"
        value={species}
        onChange={(e) => setSpecies(e.target.value)}
        className="col-span-9 rounded-md px-2 py-1 text-black xs:col-span-3 sm:col-span-4 md:col-span-2"
      />

      <div className="col-span-1" />

      <label className="col-span-2 sm:col-span-1">Type:</label>
      <input
        type="text"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="col-span-9 rounded-md px-2 py-1 text-black xs:col-span-3 sm:col-span-4 md:col-span-2"
      />

      <div className="col-span-1" />

      <label className="col-span-2 sm:col-span-1">Gender:</label>
      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="col-span-9 rounded-md px-2 py-1 text-black xs:col-span-3 sm:col-span-4 md:col-span-2"
      >
        <option value="">All</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="genderless">Genderless</option>
        <option value="unknown">Unknown</option>
      </select>

      <div className="col-span-12 h-2" />

      <div className="col-span-12 flex items-center justify-center gap-x-2">
        <button
          onClick={handleApplyFilters}
          className="rounded-md bg-cyan-400 px-2 py-1 transition-colors duration-200 ease-in-out hover:bg-cyan-500 active:scale-95"
        >
          Apply filters
        </button>

        <button
          onClick={handleResetFilters}
          className=" px-2 py-1 transition-colors duration-200 ease-in-out hover:text-cyan-400"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
};

export default CharactersFilter;
