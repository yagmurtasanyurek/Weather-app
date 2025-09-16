import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function MainWeatherSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-y-10 items-center mb-20">
      {/* Current temperature */}
      <div className="flex items-center shrink-0 ">
        <Skeleton
          circle
          width={256}
          height={256}
          className="md:w-64 md:h-64 w-48 h-48 "
        />

        <div className="ml-4">
          <Skeleton width={120} height={70} className="mb-2" />
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
