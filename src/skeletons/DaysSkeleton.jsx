import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function DaysSkeleton() {
  return (
    <div className="">
      <div className="mb-5  px-6 sm:px-0">
        <Skeleton height={20} width={70} className="mb-4" />
        <ul className="flex flex-col gap-2 justify-start">
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <li
                key={i}
                className="flex justify-around items-center border border-solid bg-white/10 rounded-xl border-transparent py-2"
              >
                <div className="flex flex-col  w-9">
                  <Skeleton width={30} height={16} className="mb-1" />
                  <Skeleton width={30} height={14} />
                </div>
                <div>
                  <Skeleton circle width={50} height={50} />
                </div>
                <div className="min-w-9">
                  <Skeleton width={30} height={16} className="mb-1" />
                  <Skeleton width={30} height={14} />
                </div>
                <div className="min-w-9">
                  <Skeleton width={30} height={16} className="mb-1" />
                  <Skeleton width={30} height={14} />
                </div>

                <div className="min-w-9">
                  <Skeleton width={30} height={16} className="mb-1" />
                  <Skeleton width={30} height={14} />
                </div>
                <div className="-minw-9">
                  <Skeleton width={30} height={16} className="mb-1" />
                  <Skeleton width={30} height={14} />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
