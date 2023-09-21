import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

/* Icons imports */
import { FaRegDizzy, FaRegQuestionCircle, FaRegSmile } from "react-icons/fa";

import { ClipLoader } from "react-spinners";

import { api } from "~/utils/api";
import type { CharacterType, EpisodeType } from "types";
import EpisodesGrid from "~/components/DataGrid/EpisodesGrid";

const Character = () => {
  const router = useRouter();
  const characterId = router.query.id ?? 0;

  const [data, setData] = useState<CharacterType>();
  const [episodesData, setEpisodesData] = useState<EpisodeType[]>([]);

  const [originId, setOriginId] = useState("");
  const [locationId, setLocationId] = useState("");
  const [episodeIds, setEpisodeIds] = useState<number[]>([]);

  const [isLoadingImage, setIsLoadingImage] = useState(true);

  const characterRequest = api.rickAndMorty.getSingle.useQuery({
    categorie: "character",
    id: Number(characterId),
  });
  const episodesRequest = api.rickAndMorty.getMultiple.useQuery({
    categorie: "episode",
    ids: episodeIds,
  });

  useEffect(() => {
    if (characterRequest.data) {
      setData(characterRequest.data as CharacterType);
    }
  }, [characterRequest]);

  useEffect(() => {
    if (Array.isArray(episodesRequest.data)) {
      setEpisodesData(episodesRequest.data as EpisodeType[]);
    }
  }, [episodesRequest]);

  useEffect(() => {
    if (data) {
      const originUrl = data.origin.url.split("/");
      const originUrlLength = originUrl.length;

      setOriginId(originUrl[originUrlLength - 1] ?? "");

      const locationUrl = data.location.url.split("/");
      const locationUrlLength = locationUrl.length;

      setLocationId(locationUrl[locationUrlLength - 1] ?? "");

      for (const episode of data.episode) {
        const separatedString = episode.split("/") ?? [""];
        const length = separatedString.length;

        episodeIds.push(Number(separatedString[length - 1]));
      }
    }
  }, [data]);

  return (
    <section className="min-h-screen px-4 pb-4 pt-24">
      <div className="mx-auto max-w-5xl">
        {characterRequest.isLoading ? (
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
            <div className="flex flex-col gap-4 xs:flex-row">
              {/* Character image */}
              <div className="relative mx-auto  overflow-hidden rounded-md xs:mx-0">
                <Image
                  src={data?.image ?? ""}
                  alt={`${data?.name} image.`}
                  width={300}
                  height={300}
                  onLoadingComplete={() => setIsLoadingImage(false)}
                  priority
                />

                {isLoadingImage ? (
                  <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-neutral-900">
                    <ClipLoader
                      color="rgba(34, 211, 238, 1)"
                      loading={true}
                      size={128}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>
                ) : null}
              </div>

              <div>
                <h2 className="text-2xl font-medium">{data?.name}</h2>

                <div className="h-2" />

                <p className="flex items-center gap-2 opacity-80">
                  Status:{" "}
                  <span className="flex items-center gap-1 font-medium">
                    {data?.status}{" "}
                    {data?.status == "Alive" ? (
                      <FaRegSmile className="text-lg text-green-400" />
                    ) : data?.status == "Dead" ? (
                      <FaRegDizzy className="text-lg text-red-400" />
                    ) : (
                      <FaRegQuestionCircle className="text-lg" />
                    )}
                  </span>
                </p>

                <p className="flex items-center gap-2 opacity-80">
                  Species:{" "}
                  <span className="flex items-center gap-1 font-medium">
                    {" "}
                    {data?.species}
                    {data?.type ? <span>&#40;{data?.type}&#41;</span> : ""}
                  </span>
                </p>

                <p className="flex items-center gap-2 opacity-80">
                  Gender:{" "}
                  <span className="flex items-center gap-1 font-medium">
                    {data?.gender}
                  </span>
                </p>

                <p className="flex items-center gap-2 opacity-80">
                  Origin:{" "}
                  <Link
                    href={`/locations/${originId}`}
                    className="font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400"
                  >
                    {data?.origin.name}
                  </Link>
                </p>

                <p className="flex items-center gap-2 opacity-80">
                  Last location:{" "}
                  <Link
                    href={`/locations/${locationId}`}
                    className="font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400"
                  >
                    {data?.location.name}
                  </Link>
                </p>
              </div>
            </div>

            <div className="h-8" />

            <div>
              <h2 className="text-2xl font-medium">Episodes appeared in</h2>

              <div className="h-2" />

              <EpisodesGrid
                data={episodesData}
                isLoading={episodesRequest.isLoading}
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Character;
