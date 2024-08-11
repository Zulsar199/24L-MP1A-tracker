"use client";
import { useContext } from "react";
import { TransactionCheckbox } from "./TransactionCheckbox";
import { RecordContext } from "../utils/context/recordContext";
import { Checkbox } from "../ui/checkbox";

export const Records = () => {
  const { allRecords } = useContext(RecordContext);
  const calculateBalance = (records) => {
    let totalIncome = 0;
    let totalExpenses = 0;

    records.forEach((record) => {
      console.log(record.amount);

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
    calculateBalance(allRecords)
  );
  return (
    <div className="w-[74.5%] h-[calc(100vh-120px)]">
      <div className="flex items-center justify-between px-6 py-3 mb-3 bg-white rounded-xl my-10">
        <div className="flex items-center gap-4">
          <Checkbox id="terms" />
          <p>Select all</p>
        </div>
        <p style={{ color: "gray" }} className="font-semibold">
          {formattedAmount}₮
        </p>
      </div>

      <div>
        {allRecords?.map((record) => (
          <TransactionCheckbox key={record.id} record={record} />
        ))}
      </div>
    </div>
  );
};
