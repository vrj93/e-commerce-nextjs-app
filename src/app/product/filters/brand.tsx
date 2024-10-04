const Brand = ({
  brands,
  visibleBrands,
  selectedBrands,
  toggleBrand,
  showMoreBrands,
}: any) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-medium mt-8 mb-2">Brand</h2>
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
        <button onClick={showMoreBrands} className="text-blue-500">
          See More
        </button>
      )}
    </div>
  );
};

export default Brand;
