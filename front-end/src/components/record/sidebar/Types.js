import { RecordContext } from "@/components/utils/context/recordContext"
import { useContext } from "react"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export const Types = () => {
    const {filterOptions, setFilterOptions} = useContext(RecordContext)
    return(
        <div className="space-y-4">
        <p className="-mb-3 font-semibold">Types</p>
        <RadioGroup
          defaultValue="all"
          onValueChange={(value) =>
            setFilterOptions({ ...filterOptions, type: value })
          }
          className="*:text-[#1F2937] space-y-3 "
        >
          <div className="flex items-center mt-4 space-x-4">
            <RadioGroupItem value="all" id="all" />
            <Label className="m-0" htmlFor="all">
              All
            </Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="INC" id="income" />
            <Label className="m-0" htmlFor="income">
              Income
            </Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="EXP" id="expense" />
            <Label className="m-0" htmlFor="expense">
              Expense
            </Label>
          </div>
        </RadioGroup>
      </div>
    )
}