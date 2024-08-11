"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
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
import { Label } from "@/components/ui/label";
import { AddCategoryDialog } from "./AddCategoryDialog";
import { useContext, useState } from "react";
import { SwitchRecordType } from "./SwitchRecordType";
import { Textarea } from "../ui/textarea";
import * as Icons from "lucide-react";
import { CategoryContext } from "../utils/context/categoryContext";
import { recordSchema } from "../utils/validationSchema";
import { RecordContext } from "../utils/context/recordContext";

export function AddRecordDialog({text}) {
  const [selectedValue, setSelectedValue] = useState("EXP");
  const [dialogOpen, setDialogOpen] = useState(false);
  const { allCategories } = useContext(CategoryContext);
  const { createRecord } = useContext(RecordContext);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      type: "EXP",
      amount: "",
      category_id: "",
      date: "",
      time: "",
      payee: "",
      note: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
    createRecord(values);
    console.log("++++");

    setDialogOpen(false);
  };

  const handleTypeChange = (event) => {
    setSelectedValue(event.target.value);
    setValue("type", event.target.value);
  };

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={setDialogOpen}
      className="min-w-[792px]"
    >
      <DialogTrigger asChild>
        <Button className="w-full h-8" onClick={() => setDialogOpen(true)}>
          {text}
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[792px]">
        <DialogHeader>
          <DialogTitle>Add record</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex *:w-1/2 h-full">
            <div className="pr-6 h-full flex flex-col justify-between">
              <SwitchRecordType
                selectedValue={selectedValue}
                handleChange={handleTypeChange}
              />
              <div className="grid w-full max-w-sm items-center gap-1.5 border bg-[#F3F4F6] px-4 py-3 rounded-lg">
                <Label htmlFor="amount">Amount</Label>
                <Controller
                  control={control}
                  name="amount"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="₮ 000.00"
                      onChange={(e) => {
                        field.onChange(parseFloat(e.target.value));
                      }}
                      className="border-none p-0 h-fit"
                    />
                  )}
                />
              </div>
              {errors.amount && (
                <div className="text-sm text-red-500">
                  {errors.amount.message}
                </div>
              )}
              <div>
                <Label htmlFor="category">Category</Label>
                <Controller
                  control={control}
                  name="category_id"
                  render={({ field }) => (
                    <Select
                      {...field}
                      onValueChange={(value) => setValue("category_id", value)}
                    >
                      <SelectTrigger className="w-[348px]">
                        <SelectValue placeholder="Find or choose category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <AddCategoryDialog />
                          {allCategories?.map((el) => {
                            const IconComponent = Icons[el.img];
                            return (
                              <SelectItem
                                key={el.id}
                                value={el.id}
                                className="p-4"
                              >
                                <div className="flex gap-3">
                                  <IconComponent size={24} color={el.color} />
                                  <p className="text-base">{el.title}</p>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.category_id && (
                  <div className="text-sm text-red-500">
                    {errors.category_id.message}
                  </div>
                )}
              </div>
              <div className="flex gap-3">
                <div>
                  <Label>Date</Label>
                  <Controller
                    control={control}
                    name="date"
                    render={({ field }) => <Input type="date" {...field} />}
                  />
                  {errors.date && (
                    <div className="text-sm text-red-500">
                      {errors.date.message}
                    </div>
                  )}
                </div>
                <div>
                  <Label>Time</Label>
                  <Controller
                    control={control}
                    name="time"
                    render={({ field }) => <Input type="time" {...field} />}
                  />
                  {errors.time && (
                    <div className="text-sm text-red-500">
                      {errors.time.message}
                    </div>
                  )}
                </div>
              </div>
              {/* <DialogClose asChild> */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className={`w-full text-base mt-4 ${
                  selectedValue === "EXP"
                    ? "bg-[#0166FF] hover:bg-blue-400"
                    : "bg-[#16A34A] hover:bg-green-400"
                }`}
              >
                Add record
              </Button>
              {/* </DialogClose> */}
            </div>
            <div className="pl-6 h-full flex flex-col justify-between">
              <Label htmlFor="payee">Payee</Label>
              <Controller
                control={control}
                name="payee"
                render={({ field }) => (
                  <Input
                    id="payee"
                    type="text"
                    placeholder="Write here"
                    {...field}
                  />
                )}
              />
              {errors.payee && (
                <div className="text-sm text-red-500">
                  {errors.payee.message}
                </div>
              )}
              <Label htmlFor="note" className="mt-5">
                Note
              </Label>
              <Controller
                control={control}
                name="note"
                render={({ field }) => (
                  <Textarea
                    id="note"
                    className="h-[280px]"
                    placeholder="Write here"
                    {...field}
                  />
                )}
              />
              {errors.note && (
                <div className="text-sm text-red-500">
                  {errors.note.message}
                </div>
              )}
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
