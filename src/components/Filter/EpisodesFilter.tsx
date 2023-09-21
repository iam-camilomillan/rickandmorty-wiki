import { useState } from "react";

const EpisodesFilter = ({
  setFilterOptions,
}: {
  setFilterOptions: CallableFunction;
}) => {
  const [name, setName] = useState("");
  const [episode, setEpisode] = useState("");

  const handleApplyFilters = () => {
    setFilterOptions({
      name,
      episode,
    });
  };

  const handleResetFilters = () => {
    setName("");
    setEpisode("");

    setFilterOptions({
      name: "",
      episode: "",
    });
  };

  return (
    <div className="grid grid-cols-12 items-center gap-y-2 rounded-md bg-neutral-600 p-2">
      <label className="col-span-3 xs:col-span-2 sm:col-span-1">Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="col-span-8 rounded-md px-2 py-1 text-black xs:col-span-3 sm:col-span-4"
      />

      <div className="col-span-1" />

      <label className="col-span-3 xs:col-span-2 md:col-span-1">Episode:</label>
      <input
        type="text"
        value={episode}
        onChange={(e) => setEpisode(e.target.value)}
        className="col-span-8 rounded-md px-2 py-1 text-black xs:col-span-4"
      />

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

export default EpisodesFilter;
