import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import { ClipLoader } from "react-spinners";
import type { CharacterType, LocationType } from "types";
import CharactersGrid from "~/components/DataGrid/CharactersGrid";

const Location = () => {
  const router = useRouter();
  const locationId = router.query.id;

  const [data, setData] = useState<LocationType>();
  const [residentsData, setResidentsData] = useState<CharacterType[]>([]);

  const [residentIds, setResidentIds] = useState<number[]>([]);

  const request = api.rickAndMorty.getSingle.useQuery({
    categorie: "location",
    id: Number(locationId),
  });
  const residentsRequest = api.rickAndMorty.getMultiple.useQuery({
    categorie: "character",
    ids: residentIds,
  });

  useEffect(() => {
    if (request.data) {
      setData(request.data as LocationType);
    }
  }, [request]);

  useEffect(() => {
    if (Array.isArray(residentsRequest.data)) {
      setResidentsData(residentsRequest.data as CharacterType[]);
    }
  }, [residentsRequest]);

  useEffect(() => {
    if (data) {
      for (const resident of data.residents) {
        const separatedString = resident.split("/") ?? [""];
        const length = separatedString.length;

        residentIds.push(Number(separatedString[length - 1]));
      }
    }
  }, [data]);

  return (
    <section className="min-h-screen px-4 pb-4 pt-24">
      <div className="mx-auto max-w-5xl">
        {request.isLoading ? (
          <div className="flex items-center justify-center">
            <ClipLoader
              color="rgba(34, 211, 238, 1)"
              loading={true}
              size={256}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-baseline gap-x-4 xs:flex-row">
              <h2 className="text-2xl font-medium">{data?.name}</h2>

              <div className="h-2" />

              <div className="flex items-baseline gap-x-4">
                <p className="opacity-80">
                  Type: <span className="font-medium">{data?.type}</span>
                </p>

                <p className="opacity-80">
                  Dimension:{" "}
                  <span className="font-medium">{data?.dimension}</span>
                </p>
              </div>
            </div>

            <div className="h-8" />

            <div>
              <h2 className="text-2xl font-medium">Residents</h2>

              <div className="h-2" />

              <CharactersGrid
                data={residentsData}
                isLoading={residentsRequest.isLoading}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Location;
