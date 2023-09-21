import { useEffect, useState } from "react";

/* Components imports */
import EpisodesFilter from "~/components/Filter/EpisodesFilter";
import Pagination from "~/components/Pagination";
import EpisodesGrid from "~/components/DataGrid/EpisodesGrid";

import { ClipLoader } from "react-spinners";

/* Api import */
import { api } from "~/utils/api";
import type { EpisodeType, InformationType, apiType } from "types";

const Episodes = () => {
  const [info, setInfo] = useState<InformationType>();
  const [data, setData] = useState<EpisodeType[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    name: "",
    episode: "",
  });

  const request = api.rickAndMorty.getFilteredEpisodes.useQuery({
    page: currentPage,
    ...filterOptions,
  });

  useEffect(() => {
    if (request.data) {
      if ((request.data as apiType).results) {
        setData((request.data as apiType).results as EpisodeType[]);
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
        <EpisodesFilter setFilterOptions={setFilterOptions} />

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

        <EpisodesGrid data={data ?? []} isLoading={request.isLoading} />
      </div>
    </section>
  );
};

export default Episodes;
