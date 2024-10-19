import { useContext } from "react";
import { FilterContext } from "../context/filterContext";
import { useRouter } from "next/navigation";
import handleToggleColor from "../utils/handleToggleColor";

const Color = () => {
  const router = useRouter();
  const {
    colors,
    selectedColors,
    visibleColors,
    selectedCategories,
    selectedBrands,
    searchText,
    setVisibleColors,
  } = useContext(FilterContext);

  const toggleColor = async (e: any, color: string) => {
    handleToggleColor(
      e.target.checked,
      color,
      selectedColors,
      selectedCategories,
      selectedBrands,
      searchText,
      router
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-1">Color</h2>
      <ul>
        {colors &&
          colors.slice(0, visibleColors).map((color: any, index: number) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedColors?.includes(color.name) ? true : false}
                  onChange={(e) => toggleColor(e, color.name)}
                />
                {color.name}
              </label>
            </li>
          ))}
      </ul>
      {colors && colors.length > visibleColors && (
        <button
          onClick={() => setVisibleColors(colors.length)}
          className="text-blue-500"
        >
          See More
        </button>
      )}
    </div>
  );
};

export default Color;
