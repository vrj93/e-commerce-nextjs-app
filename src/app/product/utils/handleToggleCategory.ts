const handleToggleCategory = (
  isChecked: boolean,
  category: string,
  selectedCategories: any,
  selectedBrands: any,
  selectedColors: any,
  searchText: string,
  router: any
) => {
  let categories = [...selectedCategories];
  if (isChecked) {
    categories?.push(category);
  } else {
    categories?.splice(categories.indexOf(category), 1);
  }
  const searchStr = `${
    categories && categories.length ? "categories=" + categories?.join("_") : ""
  }${
    selectedBrands && selectedBrands.length
      ? "&brands=" + selectedBrands?.join("_")
      : ""
  }${
    selectedColors && selectedColors.length
      ? "&colors=" + selectedColors?.join("_")
      : ""
  }&search=${searchText}`;
  router.push(`/product?${searchStr}`);
};

export default handleToggleCategory;
