import { useContext } from "react";
import { CategoryContext } from "@/components/utils/context/categoryContext";
import { RecordContext } from "@/components/utils/context/recordContext";
import { ChevronRight, Eye, EyeOff } from "lucide-react";

export const Categories = () => {
  const { allCategories } = useContext(CategoryContext);
  const { filterOptions, setFilterOptions } = useContext(RecordContext);
  
  const handleClickIcon = (id) => {
    const isIdInArray = filterOptions?.hiddenCategoryId.includes(id);

    setFilterOptions((prevOptions) => {
      const updatedHiddenCategoryId = isIdInArray
        ? prevOptions.hiddenCategoryId.filter((el) => el !== id)
        : [...prevOptions.hiddenCategoryId, id];

      return {
        ...prevOptions,
        hiddenCategoryId: updatedHiddenCategoryId,
      };
    });
  };

  const handleClear = () => {
    setFilterOptions({ ...filterOptions, hiddenCategoryId: [] });
  };
  
  return (
    <div className="space-y-4 ">
      <div className="flex justify-between">
        <p className="font-semibold">Category</p>
        <button onClick={handleClear} className="px-3 text-gray-200 ">
          Clear
        </button>
      </div>
      {/* AllCAtegories */}
      <div className="space-y-4 overflow-auto h-[calc(100vh-700px)]">
        {allCategories.map((el, i) => (
          <div
            key={i}
            onClick={() => handleClickIcon(el.id)}
            className="flex items-center justify-between cursor-pointer"
          >
            <div className="flex gap-2 px-3">
              {filterOptions?.hiddenCategoryId.includes(el.id) ? (
                <EyeOff fill="white" color="#94A3B8" size={20} />
              ) : (
                <Eye fill="white" color="#94A3B8" size={20} />
              )}
              <p>{el.title}</p>
            </div>
            <ChevronRight size={10} />
          </div>
        ))}
      </div>
    </div>
  );
};
