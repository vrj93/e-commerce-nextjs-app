import { useRouter } from "next/navigation";
import handleToggleBrand from "../utils/handleToggleBrand";
import { useContext } from "react";
import { FilterContext } from "../context/filterContext";

const Brand = () => {
  const router = useRouter();
  const {
    brands,
    visibleBrands,
    selectedBrands,
    selectedCategories,
    selectedColors,
    searchText,
    setVisibleBrands,
  } = useContext(FilterContext);

  const toggleBrand = async (e: any, brand: string) => {
    handleToggleBrand(
      e.target.checked,
      brand,
      selectedBrands,
      selectedCategories,
      selectedColors,
      searchText,
      router
    );
  };

  return (
    <div className="w-full">
      <h2 className="text-lg font-semibold mb-1">Brand</h2>
      <ul>
        {brands &&
          brands.slice(0, visibleBrands).map((brand: any, index: number) => (
            <li key={index}>
              <label>
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedBrands?.includes(brand.slug) ? true : false}
                  onChange={(e) => toggleBrand(e, brand.slug)}
                />
                {brand.name}
              </label>
            </li>
          ))}
      </ul>
      {brands && brands.length > visibleBrands && (
        <button
          onClick={() => setVisibleBrands(brands.length)}
          className="text-blue-500"
        >
          See More
        </button>
      )}
    </div>
  );
};

export default Brand;
