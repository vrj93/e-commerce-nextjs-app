const Category = ({
  categories,
  visibleCategories,
  selectedCategories,
  toggleCategory,
  showMoreCategories,
}: any) => {
  return (
    <div className="w-full">
      <h2 className="text-lg font-medium mt-8 mb-2">Category</h2>
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
                      selectedCategories?.includes(category.slug)
                        ? true
                        : false
                    }
                    onChange={(e) => toggleCategory(e, category.slug)}
                  />
                  {category.name}
                </label>
              </li>
            ))}
      </ul>
      {categories && categories.length > visibleCategories && (
        <button onClick={showMoreCategories} className="text-blue-500">
          See More
        </button>
      )}
    </div>
  );
};

export default Category;
