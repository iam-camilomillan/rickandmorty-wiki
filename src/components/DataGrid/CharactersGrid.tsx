/* Components imports */
import CharacterCard from "../Card/CharacterCard";

import { ClipLoader } from "react-spinners";

import type { CharacterType } from "types";

const CharactersGrid = ({
  data,
  isLoading,
}: {
  data: CharacterType[];
  isLoading: boolean;
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
      {isLoading ? (
        <div className="col-span-2 flex h-96 w-full items-center justify-center sm:col-span-3 md:col-span-5">
          <ClipLoader
            color="rgba(34, 211, 238, 1)"
            loading={true}
            size={256}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        data?.map((data: CharacterType, index: number) => (
          <CharacterCard key={index} data={data} />
        ))
      )}
    </div>
  );
};

export default CharactersGrid;
