import { useEffect, useState } from "react";

/* Components imports */
import CharactersFilter from "~/components/Filter/CharactersFilter";
import Pagination from "~/components/Pagination";
import CharactersGrid from "~/components/DataGrid/CharactersGrid";

import { ClipLoader } from "react-spinners";

/* Api import */
import { api } from "~/utils/api";
import type { CharacterType, InformationType, apiType } from "types";

const Characters = () => {
  const [info, setInfo] = useState<InformationType>();
  const [data, setData] = useState<CharacterType[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    name: "",
    status: "",
    species: "",
    type: "",
    gender: "",
  });

  const request = api.rickAndMorty.getFilteredCharacters.useQuery({
    page: currentPage,
    ...filterOptions,
  });

  useEffect(() => {
    if (request.data) {
      if ((request.data as apiType).results) {
        setData((request.data as apiType).results as CharacterType[]);
      }
    }

    if (request.data) {
      if ((request.data as apiType).info) {
        setInfo((request.data as apiType).info);
      }
    }
  }, [request]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filterOptions]);

  return (
    <section className="px-4 pb-4 pt-24">
      <div className="mx-auto flex max-w-5xl flex-col">
        <CharactersFilter setFilterOptions={setFilterOptions} />

        <div className="h-4" />

        {request.isLoading ? (
          <div className="flex justify-center rounded-md bg-neutral-600 py-1">
            <ClipLoader
              color="rgba(34, 211, 238, 1)"
              loading={true}
              size={32}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <Pagination
            currentPage={currentPage}
            totalPages={info?.pages ?? 1}
            onPageChange={setCurrentPage}
          />
        )}

        <div className="h-4" />

        <CharactersGrid data={data ?? []} isLoading={request.isLoading} />
      </div>
    </section>
  );
};

export default Characters;
