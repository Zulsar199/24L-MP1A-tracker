import { AddRecordDialog } from "./record/AddRecordDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  return (
    <div className="w-full">
      <div className="max-w-[1200px] m-auto py-4 flex justify-between">
        <div className="flex w-[226px] justify-between">
          <button>
            <svg
              width="41"
              height="40"
              viewBox="0 0 41 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M24.8296 15.3677V6.30078H15.5651V15.3677H6.30066V24.6322H15.5651V33.6991H24.8296V24.6322H34.0941V15.3677H24.8296ZM24.8296 24.4347H15.5651V15.5666H24.8296V24.4347Z"
                fill="#0166FF"
              />
            </svg>
          </button>
          <button>Dashboard</button>
          <button>Records</button>
        </div>
        <div className="flex gap-6 items-center">
          <AddRecordDialog text="+ Record" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </div>
  );
};
