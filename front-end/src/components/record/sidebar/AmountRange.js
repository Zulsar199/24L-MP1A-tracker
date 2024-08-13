import { Slider } from "@/components/ui/slider";
import { useContext, useState, useEffect } from "react";
import { RecordContext } from "@/components/utils/context/recordContext";
import { Input } from "@/components/ui/input";

export const AmountRange = () => {
    const { filterOptions, setFilterOptions } = useContext(RecordContext);
    const [localMin, setLocalMin] = useState( 0);
    const [localMax, setLocalMax] = useState(100);
    const [selectedValue, setSelectedValue] = useState(localMin);

    useEffect(() => {
        setLocalMin(filterOptions?.amountRange?.min || 0);
        setLocalMax(filterOptions?.amountRange?.max || 100);
        setSelectedValue(filterOptions?.amountRange?.selectedValue || localMin);
    }, [filterOptions?.amountRange?.min, filterOptions?.amountRange?.max, filterOptions?.amountRange?.selectedValue]);

    const handleInputChange = (key, value) => {
        const newValue = parseInt(value, 10) || 0;
        setFilterOptions({
            ...filterOptions,
            amountRange: {
                ...filterOptions.amountRange,
                [key]: newValue,
            },
        });
    };

    const handleSliderChange = (value) => {
        setSelectedValue(value[0]);
        setFilterOptions({
            ...filterOptions,
            amountRange: {
                ...filterOptions.amountRange,
                selectedValue: value[0],
            },
        });
    };

    return (
        <div className="space-y-4">
            <p className="font-semibold">Amount Range</p>
            <div className="flex *:h-12 gap-4">
                <Input
                    value={localMin}
                    onChange={(e) => handleInputChange('min', e.target.value)}
                />
                <Input
                    value={localMax}
                    onChange={(e) => handleInputChange('max', e.target.value)}
                />
            </div>
            <div className="h-12 space-y-2">
                <Slider
                    value={[selectedValue]}
                    onValueChange={handleSliderChange}
                    min={localMin}
                    max={localMax}
                    step={50}
                />
                <div className="flex justify-between">
                    <p>{localMin}</p>
                    <p>{localMax}</p>
                </div>
            </div>
        </div>
    );
};
