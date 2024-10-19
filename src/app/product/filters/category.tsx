import { useRouter } from "next/navigation";
import { useContext } from "react";
import { FilterContext } from "../context/filterContext";
import handleToggleCategory from "../utils/handleToggleCategory";

const Category = () => {
  const router = useRouter();
  const {
    categories,
    visibleCategories,
    selectedCategories,
    selectedBrands,
    selectedColors,
    searchText,
    setVisibleCategories,
  } = useContext(FilterContext);

  const toggleCategory = async (e: any, category: string) => {
    handleToggleCategory(
      e.target.checked,
      category,
      selectedCategories,
      selectedBrands,
      selectedColors,
      searchText,
      router
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-1">Category</h2>
      <ul>
        {categories &&
          categories
            .slice(0, visibleCategories)
            .map((category: any, index: number) => (
              <li key={index}>
                <label>
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={
                      selectedCategories?.includes(category.slug) ? true : false
                    }
                    onChange={(e) => toggleCategory(e, category.slug)}
                  />
                  {category.name}
                </label>
              </li>
            ))}
      </ul>
      {categories && categories.length > visibleCategories && (
        <button
          onClick={() => setVisibleCategories(categories.length)}
          className="text-blue-500"
        >
          See More
        </button>
      )}
    </div>
  );
};

export default Category;
