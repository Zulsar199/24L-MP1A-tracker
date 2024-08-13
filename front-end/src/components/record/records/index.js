"use client";
import { useContext, useEffect } from "react";
import { RecordContext } from "@/components/utils/context/recordContext";
import { Checkbox } from "@/components/ui/checkbox";
import { isToday, isYesterday } from "date-fns";
import { DateGroupedRecords } from "./DateGroupedRecords";

export const Records = () => {
  const { filteredRecords } = useContext(RecordContext);
  const calculateBalance = (records) => {
    let totalIncome = 0;
    let totalExpenses = 0;

    records.forEach((record) => {
      if (record.type === "INC") {
        totalIncome += record.amount;
      } else if (record.type === "EXP") {
        totalExpenses += record.amount;
      }
    });

    const balance = totalIncome - totalExpenses;

    return balance;
  };

  const formattedAmount = new Intl.NumberFormat().format(
    calculateBalance(filteredRecords)
  );

  const todayRecords = filteredRecords.filter((record) => isToday(record.date));

  const yesterdayRecords = filteredRecords.filter((record) =>
    isYesterday(record.date)
  );

  const otherRecords = filteredRecords.filter(
    (record) => !isToday(record.date) && !isYesterday(record.date)
  );

  const records = [
    { record: todayRecords, text: "Today" },
    { record: yesterdayRecords, text: "Yesterday" },
    { record: otherRecords, text: "Other" },
  ];

  useEffect(() => {}, [filteredRecords]);

  return (
    <div className="w-[74.5%] h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between px-6 py-3 my-10 mb-3 bg-white rounded-xl">
        <div className="flex items-center gap-4">
          <Checkbox id="terms" />
          <p>Select all</p>
        </div>
        <p style={{ color: "gray" }} className="font-semibold">
          {formattedAmount}₮
        </p>
      </div>

      <div>
        {records?.map((el, i) => {
          return (
            <DateGroupedRecords key={i} text={el.text} records={el.record} />
          );
        })}
      </div>
    </div>
  );
};
