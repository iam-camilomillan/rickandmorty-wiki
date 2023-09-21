import { useEffect, useState } from "react";
import Link from "next/link";

/* Components imports */
import CharactersGrid from "~/components/DataGrid/CharactersGrid";
import LocationsGrid from "~/components/DataGrid/LocationsGrid";
import EpisodesGrid from "~/components/DataGrid/EpisodesGrid";

/* Utils imports */
import { api } from "~/utils/api";
import { getRandomNumbers } from "~/utils/getRandomNumbers";

/* Icons imports */
import { FaArrowsRotate } from "react-icons/fa6";
import type { CharacterType, EpisodeType, LocationType } from "types";

const DataSection = ({
  categorie,
  max,
  amount,
}: {
  categorie: string;
  max: number;
  amount: number;
}) => {
  /* Data random ids */
  const [randomIds, setRandomIds] = useState<number[]>([1, 2]);
  const [data, setData] = useState<
    CharacterType[] | LocationType[] | EpisodeType[]
  >([]);

  /* Utils */
  const [reload, setReload] = useState(false);

  /* API fetch */
  const randomData = api.rickAndMorty.getMultiple.useQuery({
    categorie: categorie,
    ids: randomIds,
  });

  useEffect(() => {
    setRandomIds(getRandomNumbers(0, max, amount));
  }, [reload, amount, max]);

  useEffect(() => {
    if (randomData.data) {
      setData(
        randomData.data as CharacterType[] | LocationType[] | EpisodeType[],
      );
    }
  }, [randomData]);

  return (
    <div>
      <div className="flex items-center rounded-md bg-neutral-600 px-4 py-2">
        <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" />

        <div className="w-1" />
        <h2 className="text-xl font-medium">{`${categorie[0]?.toUpperCase()}${categorie.slice(
          1,
        )}`}</h2>

        <div className="w-2" />

        <button
          onClick={() => setReload(!reload)}
          className="opacity-80 transition duration-200 ease-in-out hover:text-cyan-400 active:rotate-90"
        >
          <FaArrowsRotate />
        </button>

        <div className="flex-grow" />

        <Link
          href={`/${categorie}s`}
          className="opacity-80 transition-colors duration-200 ease-in-out hover:text-cyan-400"
        >
          See all
        </Link>
      </div>

      <div className="h-4" />

      {categorie == "character" ? (
        <CharactersGrid
          data={data as CharacterType[]}
          isLoading={randomData.isLoading}
        />
      ) : categorie == "location" ? (
        <LocationsGrid
          data={data as LocationType[]}
          isLoading={randomData.isLoading}
        />
      ) : (
        <EpisodesGrid
          data={data as EpisodeType[]}
          isLoading={randomData.isLoading}
        />
      )}
    </div>
  );
};

export default DataSection;
