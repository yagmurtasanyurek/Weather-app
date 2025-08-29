import { GoX } from "react-icons/go";
import { GoAlertFill } from "react-icons/go";
import { createPortal } from "react-dom";

function Modal({ text, onClose }) {
  return createPortal(
    <div
      className="bg-neutral-200/50 fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center"
      onClick={onClose}
    >
      <div className="relative flex justify-center bg-slate-200 rounded-xl w-full min-h-[150px] max-w-sm ">
        <GoX
          onClick={onClose}
          className=" absolute right-2 top-2 hover:cursor-pointer fill-black w-6 h-6"
        />
        <div className="flex justify-center items-center flex-col gap-2 p-10 ">
          <GoAlertFill className="  fill-red-700 w-9 h-9" />
          <p className="text-red-800 font-medium ">{text}</p>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
}

export default Modal;
