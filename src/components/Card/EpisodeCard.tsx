import Link from "next/link";
import type { EpisodeType } from "types";

const EpisodeCard = ({ data }: { data: EpisodeType }) => {
  return (
    <Link
      href={`/episodes/${data.id}`}
      className="rounded-md border border-neutral-600 p-2 transition duration-200 hover:scale-110 hover:border-cyan-400 active:scale-100"
    >
      <h3 className="flex items-center gap-2 text-lg font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400">
        {data.name}
      </h3>

      <div className="h-2" />

      <p className="opacity-80">
        <span className="font-medium">Episode: </span>
        {data.episode}
      </p>

      <p className="opacity-80">
        <span className="font-medium">Air date: </span>
        {data.air_date}
      </p>
    </Link>
  );
};

export default EpisodeCard;
