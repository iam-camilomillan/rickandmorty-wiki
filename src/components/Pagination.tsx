import { useEffect, useState } from "react";
import { FaChevronLeft, FaChevronRight, FaEllipsisH } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: CallableFunction;
}) => {
  const [leftOptions, setLeftOptions] = useState<number[]>([]);
  const [middleOptions, setMiddleOptions] = useState<number[]>([]);
  const [rigthOptions, setRigthOptions] = useState<number[]>([]);

  const totalOptions = Array.from(
    { length: totalPages },
    (item, index) => index + 1,
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  useEffect(() => {
    let leftLength = 3;
    let middleLength = 0;
    let rigthLength = 3;

    if (currentPage >= 3 && currentPage <= 6) {
      leftLength = currentPage + 1;
    }

    if (currentPage > 6 && currentPage < totalPages - 6) {
      middleLength = 3;
    }

    if (currentPage > totalPages - 7 && currentPage < totalPages - 1) {
      rigthLength = totalPages - currentPage + 2;
    }

    setLeftOptions(
      Array.from({ length: leftLength }, (item, index) => index + 1),
    );

    setMiddleOptions(
      Array.from(
        { length: middleLength },
        (item, index) => index + currentPage - 1,
      ),
    );

    setRigthOptions(
      Array.from(
        { length: rigthLength },
        (item, index) => index + totalPages - (rigthLength - 1),
      ),
    );
  }, [currentPage, totalPages]);

  return (
    <nav className="rounded-md bg-neutral-600 px-4 py-2">
      <div className="mx-auto flex max-w-md items-center justify-between gap-4">
        <button
          onClick={handlePrevious}
          className="transition-colors duration-200 ease-in-out hover:text-cyan-400"
        >
          <FaChevronLeft />
        </button>

        {totalPages < 10 ? (
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {totalOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => onPageChange(option) as number}
                  className={`transition-colors duration-200 ease-in-out hover:text-cyan-400 ${
                    currentPage == option ? "text-cyan-400" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              {leftOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => onPageChange(option) as number}
                  className={`transition-colors duration-200 ease-in-out hover:text-cyan-400 ${
                    currentPage == option ? "text-cyan-400" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            {middleOptions.length > 0 ? (
              <>
                <FaEllipsisH />

                <div className="flex gap-2">
                  {middleOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => onPageChange(option) as number}
                      className={`transition-colors duration-200 ease-in-out hover:text-cyan-400 ${
                        currentPage == option ? "text-cyan-400" : ""
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <FaEllipsisH />
              </>
            ) : (
              <FaEllipsisH />
            )}

            <div className="flex gap-2">
              {rigthOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => onPageChange(option) as number}
                  className={`transition-colors duration-200 ease-in-out hover:text-cyan-400 ${
                    currentPage == option ? "text-cyan-400" : ""
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleNext}
          className="transition-colors duration-200 ease-in-out hover:text-cyan-400"
        >
          <FaChevronRight />
        </button>
      </div>
    </nav>
  );
};

export default Pagination;
