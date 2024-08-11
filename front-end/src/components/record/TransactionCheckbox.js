import { useEffect, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import { Atom } from "lucide-react";
import * as Icons from "lucide-react";
import axios from "axios";

export const TransactionCheckbox = ({ record }) => {
  const formattedAmount = new Intl.NumberFormat().format(record.amount);
  const [category, setCategory] = useState({});
  const getCategoryById = async () => {
    const response = await axios.get(
      `http://localhost:5000/category/${record.category_id}`
    );
    console.log(response.data, "----");
    
    setCategory(response.data);
  };
  useEffect(() => {
    getCategoryById();
  }, []);
  const IconComponent = Icons[category?.img];
  return (
    <div className="flex items-center justify-between px-6 py-3 mb-3 bg-white rounded-xl">
      <div className="flex items-center gap-4">
        <Checkbox id="terms" />
        <div
          style={{ backgroundColor: category?.color }}
          className="flex items-center justify-center w-10 h-10 text-center rounded-full "
        > {IconComponent && <IconComponent color="white" size={20} />}
          
        </div>
        <div>
          <label
            htmlFor="terms"
            className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Food
          </label>
          <p className="text-xs">
            {record.date} {record.time}
          </p>
        </div>
      </div>
      <p
        style={{ color: record.type === "INC" ? "green" : "red" }}
        className={`font-semibold `}
      >
        {record.type === "EXP" ? "-" : null} {formattedAmount}₮
      </p>
    </div>
  );
};
