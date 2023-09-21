import Link from "next/link";

/* Icons imports */
import { FaLocationDot } from "react-icons/fa6";
import type { LocationType } from "types";

const LocationCard = ({ data }: { data: LocationType }) => {
  return (
    <Link
      href={`/locations/${data.id}`}
      className="rounded-md border border-neutral-600 p-2 transition duration-200 hover:scale-110 hover:border-cyan-400 active:scale-100"
    >
      <h3 className="flex items-center gap-2 text-lg font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400">
        <FaLocationDot />
        {data.name}
      </h3>

      <div className="h-2" />

      <p className="opacity-80">
        <span className="font-medium">Type: </span>
        {data.type}
      </p>

      <p className="opacity-80">
        <span className="font-medium">Dimension: </span>
        {data.dimension}
      </p>
    </Link>
  );
};

export default LocationCard;
