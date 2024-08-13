"use client";

import { Input } from "@/components/ui/input";
import { AddRecordDialog } from "../AddRecordDialog";
import { Types } from "./Types";
import { Categories } from "./Categories";
import { AmountRange } from "./AmountRange";

export const Sidebar = () => {
  return (
    <div className="w-[23.5%] h-[calc(100vh-120px)] bg-white px-4 py-6 rounded-xl space-y-6">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold">Records</h2>
        <AddRecordDialog text="+ Add" />
      </div>
      <Input placeholder="Search" className="h-8" />
      <Types />
      <Categories />
      <AmountRange />
    </div>
  );
};
