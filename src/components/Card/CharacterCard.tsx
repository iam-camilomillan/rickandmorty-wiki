import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

/* Icons imports */
import { FaRegDizzy, FaRegQuestionCircle, FaRegSmile } from "react-icons/fa";

/* Load spinner import */
import { ClipLoader } from "react-spinners";
import type { CharacterType } from "types";

const CharacterCard = ({ data }: { data: CharacterType }) => {
  const [isLoadingImage, setIsLoadingImage] = useState(true);

  return (
    <Link
      href={`/characters/${data.id}`}
      className="relative overflow-hidden rounded-md border border-neutral-600 transition duration-200 hover:scale-110 hover:border-cyan-400 active:scale-100"
    >
      <div className="relative">
        <Image
          src={data.image}
          alt={`${data.name} image.`}
          width={300}
          height={300}
          onLoadingComplete={() => setIsLoadingImage(false)}
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

      <div className="absolute right-2 top-2 rounded-md bg-neutral-800 p-1">
        <div className="group relative flex items-center justify-center">
          {data.status == "Alive" ? (
            <FaRegSmile className="text-lg text-green-400" />
          ) : data.status == "Dead" ? (
            <FaRegDizzy className="text-lg text-red-400" />
          ) : (
            <FaRegQuestionCircle className="text-lg" />
          )}
          <span
            className={`absolute ${
              data.status == "unknown" ? "-left-20" : "-left-14"
            } hidden rounded-md bg-neutral-800 px-2 py-1 text-sm group-hover:flex`}
          >
            {data.status}
          </span>
        </div>
      </div>

      <div className="h-2" />

      <div className="p-2">
        <p className="text-lg font-medium transition-colors duration-200 ease-in-out hover:text-cyan-400">
          {data.name}
        </p>
        <span className="opacity-80">{data.species}</span>
      </div>
    </Link>
  );
};

export default CharacterCard;
