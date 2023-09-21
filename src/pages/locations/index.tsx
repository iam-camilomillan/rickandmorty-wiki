import { useEffect, useState } from "react";

/* Components imports */
import LocationsFilter from "~/components/Filter/LocationsFilter";
import Pagination from "~/components/Pagination";
import LocationsGrid from "~/components/DataGrid/LocationsGrid";

import { ClipLoader } from "react-spinners";

/* Api import */
import { api } from "~/utils/api";
import type { InformationType, LocationType, apiType } from "types";

const Locations = () => {
  const [info, setInfo] = useState<InformationType>();
  const [data, setData] = useState<LocationType[]>();

  const [currentPage, setCurrentPage] = useState(1);
  const [filterOptions, setFilterOptions] = useState({
    name: "",
    type: "",
    dimension: "",
  });

  const request = api.rickAndMorty.getFilteredLocations.useQuery({
    page: currentPage,
    ...filterOptions,
  });

  useEffect(() => {
    if (request.data) {
      if ((request.data as apiType).results) {
        setData((request.data as apiType).results as LocationType[]);
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
        <LocationsFilter setFilterOptions={setFilterOptions} />

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

        <LocationsGrid data={data ?? []} isLoading={request.isLoading} />
      </div>
    </section>
  );
};

export default Locations;
