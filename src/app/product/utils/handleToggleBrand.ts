const handleToggleBrand = (
  isChecked: boolean,
  brand: string,
  selectedBrands: any,
  selectedCategories: any,
  selectedColors: any,
  searchText: string,
  router: any
) => {
  let brands = [...selectedBrands];
  if (isChecked) {
    brands?.push(brand);
  } else {
    brands?.splice(brands.indexOf(brand), 1);
  }
  const searchStr = `${
    selectedCategories && selectedCategories.length
      ? "categories=" + selectedCategories?.join("_")
      : ""
  }${brands && brands.length ? "&brands=" + brands?.join("_") : ""}${
    selectedColors && selectedColors.length
      ? "&colors=" + selectedColors?.join("_")
      : ""
  }&search=${searchText}`;
  router.push(`/product?${searchStr}`);
};

export default handleToggleBrand;
