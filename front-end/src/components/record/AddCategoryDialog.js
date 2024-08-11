import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { categoryIcons } from "../utils/categoryIcons";
import * as Icons from "lucide-react";
import { useContext, useState } from "react";
import { CategoryContext } from "../utils/context/categoryContext";

export const AddCategoryDialog = () => {
  const colors = [
    "purple",
    "blue",
    "green",
    "yellow",
    "orange",
    "red",
    "black",
  ];
  const [newCategory, setNewCategory] = useState({
    title: "",
    img: categoryIcons[0],
    color: "black",
  });
  const { createCategory } = useContext(CategoryContext);
  const capitalizeFirstLetter = (str) => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  const disabled = newCategory.title === "";
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex space-x-3 p-4 cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center">
            <Plus color="white" size={15} />
          </div>
          <p>Add category</p>
        </div>
      </DialogTrigger>

      <DialogContent className="w-[494px]">
        <DialogHeader>
          <DialogTitle>Add category</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-3 mb-3 w-full pt-5 border-t ">
          <Select
            defaultValue={categoryIcons[0]}
            onValueChange={(value) =>
              setNewCategory({ ...newCategory, img: value })
            }
            className="h-12"
          >
            <SelectTrigger className="w-[20%]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="grid grid-cols-6">
                {categoryIcons.map((el, i) => {
                  const IconComponent = Icons[el];
                  return (
                    <SelectItem key={i} className="p-4" value={el}>
                      <IconComponent
                        size={20}
                        color={
                          newCategory.img === el ? newCategory.color : "black"
                        }
                      />
                    </SelectItem>
                  );
                })}
              </SelectGroup>
              <div className="flex justify-between p-4 items-center">
                {colors.map((el, i) => (
                  <div
                    key={i}
                    style={{
                      backgroundColor: el,
                      width: newCategory.color === el ? "32px" : "24px",
                      height: newCategory.color === el ? "32px" : "24px",
                    }}
                    className="rounded-full cursor-pointer"
                    onClick={() =>
                      setNewCategory({ ...newCategory, color: el })
                    }
                  ></div>
                ))}
              </div>
            </SelectContent>
          </Select>
          <Input
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setNewCategory({
                ...newCategory,
                title: capitalizeFirstLetter(e.target.value),
              });
            }}
          />
        </div>
        <DialogFooter className="sm:justify-start w-full">
          <DialogClose asChild>
            <Button
              type="button"
              disabled={disabled}
              onClick={() => createCategory(newCategory)}
              className="w-full bg-green-500 text-white hover:bg-green-400"
            >
              Add
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
