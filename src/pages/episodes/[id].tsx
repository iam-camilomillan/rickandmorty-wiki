import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { api } from "~/utils/api";

import { ClipLoader } from "react-spinners";
import type { CharacterType, EpisodeType } from "types";
import CharactersGrid from "~/components/DataGrid/CharactersGrid";

const Episodes = () => {
  const router = useRouter();
  const episodeId = router.query.id;

  const [data, setData] = useState<EpisodeType>();
  const [charactersData, setCharactersData] = useState<CharacterType[]>([]);

  const [characterIds, setCharacterIds] = useState<number[]>([]);

  const episodeRequest = api.rickAndMorty.getSingle.useQuery({
    categorie: "episode",
    id: Number(episodeId),
  });
  const charactersRequest = api.rickAndMorty.getMultiple.useQuery({
    categorie: "character",
    ids: characterIds,
  });

  useEffect(() => {
    if (episodeRequest.data) {
      setData(episodeRequest.data as EpisodeType);
    }
  }, [episodeRequest]);

  useEffect(() => {
    if (Array.isArray(charactersRequest.data)) {
      setCharactersData(charactersRequest.data as CharacterType[]);
    }
  }, [charactersRequest]);

  useEffect(() => {
    if (data) {
      for (const character of data.characters) {
        const separatedString = character.split("/") ?? [""];
        const length = separatedString.length;

        characterIds.push(Number(separatedString[length - 1]));
      }
    }
  }, [data]);

  return (
    <section className="min-h-screen px-4 pb-4 pt-24">
      <div className="mx-auto max-w-5xl">
        {episodeRequest.isLoading ? (
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
                  Air date:{" "}
                  <span className="font-medium">{data?.air_date}</span>
                </p>

                <p className="opacity-80">
                  Episode: <span className="font-medium">{data?.episode}</span>
                </p>
              </div>
            </div>

            <div className="h-8" />

            <div>
              <h2 className="text-2xl font-medium">
                Characters in the episode
              </h2>

              <div className="h-2" />

              <CharactersGrid
                data={charactersData}
                isLoading={charactersRequest.isLoading}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Episodes;
