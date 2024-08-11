"use client";
 
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronRight, Eye } from "lucide-react";
import { useContext, useState } from "react";
import { AddRecordDialog } from "./AddRecordDialog";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { categoryIcons } from "../utils/categoryIcons";
import { CategoryContext } from "../utils/context/categoryContext";
 
export const Sidebar = () => {
  const [value, setValue] = useState({
    min: 0,
    max: 100000,
    selectedValue: 100000,
  });
  const {allCategories} = useContext(CategoryContext)

  return (
    <div className="w-[23.5%] h-[calc(100vh-120px)] bg-white px-4 py-6 rounded-xl space-y-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Records</h2>
        <AddRecordDialog text="+ Add"/>
      </div>
      <Input placeholder="Search" className="h-8" />
      <div className="space-y-4">
        <p className="font-semibold -mb-3">Types</p>
        <RadioGroup defaultValue="all" className="*:text-[#1F2937] space-y-3">
          <div className="flex items-center mt-4 space-x-4">
            <RadioGroupItem value="all" id="all" />
            <Label htmlFor="all">All</Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income">Income</Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense">Expense</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="space-y-4 ">
        <div className="flex justify-between">
          <p className="font-semibold">Category</p>
          <button className="px-3 text-gray-200 ">Clear</button>
        </div>
        {/* AllCAtegories */}
        <div className="space-y-4 overflow-auto h-[calc(100vh-726px)]">
          {allCategories.map((el, i) => (
            <div key={i} className="flex items-center justify-between cursor-pointer">
              <div className="flex gap-2 px-3">
                <Eye fill="#94A3B8" color="white" size={20} />
                <p>{el.title}</p>
              </div>
              <ChevronRight size={10} />
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <p className="font-semibold">Amount Range</p>
        <div className="flex *:h-12 gap-4">
          <Input
            onChange={(e) => setValue({ ...value, min: e.target.value })}
          />
          <Input
            onChange={(e) => setValue({ ...value, max: e.target.value })}
          />
        </div>
        <div className="h-12 space-y-2">
          <Slider
            onValueChange={(v) => console.log(v)}
            defaultValue={[value.selectedValue]}
            min={value.min}
            max={value.max}
            step={100}
          />
          <div className="flex justify-between">
            <p>{value.min}</p>
            <p>{value.max}</p>
          </div>
        </div>
      </div>
    </div>
  );
};