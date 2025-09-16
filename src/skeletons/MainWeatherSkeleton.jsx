import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function MainWeatherSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-y-10 items-center mb-20 z-0">
      {/* Current temperature */}
      <div className=" flex flex-col sm:flex-row items-center shrink-0 mb-2 ">
        <Skeleton circle className="w-40 h-40 md:w-64 md:h-64 mb-2" />

        <div className="">
          <Skeleton width={110} height={60} className="mb-2" />
          <Skeleton width={100} height={20} />
        </div>
      </div>
      {/* Current stats div */}
      <div className="grid grid-cols-3 grid-rows-2 gap-7 px-4 md:px-10 text-xl sm:text-base max-w-md text-center my-8">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i}>
              <Skeleton width={40} height={20} className="mb-1" />
              <Skeleton width={50} height={20} />
            </div>
          ))}
      </div>
    </div>
  );
}
