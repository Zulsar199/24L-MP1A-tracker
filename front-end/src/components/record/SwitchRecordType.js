

export const SwitchRecordType = ({selectedValue, handleChange}) => {
     return(
          <div className="relative w-[full] h-10">
          <div className="bg-[#e4e4e4] w-full h-full rounded-[20px]"></div>
          <div className="absolute top-0 left-0 z-1 w-full h-full">
            <div className="flex mb-9 overflow-hidden w-full h-full ">
              <input
                type="radio"
                id="radio-one"
                name="switchOne"
                value="EXP"
                checked={selectedValue === "EXP"}
                onChange={handleChange}
                className="absolute w-1 h-1 opacity-0"
              />
              <label
                htmlFor="radio-one"
                className={`w-1/2 font-medium text-base px-4 py-2 transition rounded-full text-center ${
                  selectedValue === "EXP"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                Expense
              </label>
              <input
                type="radio"
                id="radio-two"
                name="switchOne"
                value="INC"
                checked={selectedValue === "INC"}
                onChange={handleChange}
                className="absolute w-1 h-1 opacity-0"
              />
              <label
                htmlFor="radio-two"
                className={`w-1/2 font-medium text-base px-4 py-2 transition rounded-full text-center ${
                  selectedValue === "INC"
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 text-gray-700 "
                }`}
              >
                Income
              </label>
            </div>
          </div>
        </div>
     )
}