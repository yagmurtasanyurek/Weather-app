import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function HoursSkeleton() {
  return (
    <div className="mb-24  px-6 sm:px-0 ">
      <Skeleton height={20} width={100} className="mb-4" />
      <ul className="flex gap-4 justify-around overflow-x-auto ">
        {Array(8)
          .fill(0)
          .map((_, i) => (
            <li key={i} className="">
              <div className=" flex flex-col justify-center items-center min-w-[100px] h-[130px]  bg-white/10 rounded-xl p-2 ">
                <Skeleton width={40} height={20} className="mb-2" />
                <Skeleton circle width={40} height={40} className="mb-2" />
                <Skeleton width={35} height={20} />
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
