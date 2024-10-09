const handleToggleColor = (
  isChecked: boolean,
  color: string,
  selectedColors: any,
  selectedCategories: any,
  selectedBrands: any,
  searchText: string,
  router: any
) => {
  let colors = [...selectedColors];
  if (isChecked) {
    colors?.push(color);
  } else {
    colors?.splice(colors.indexOf(color), 1);
  }
  const searchStr = `${
    selectedCategories && selectedCategories.length
      ? "categories=" + selectedCategories?.join("_")
      : ""
  }${
    selectedBrands && selectedBrands.length
      ? "&brands=" + selectedBrands?.join("_")
      : ""
  }${
    colors && colors.length ? "&colors=" + colors?.join("_") : ""
  }&search=${searchText}`;
  router.push(`/product?${searchStr}`);
};

export default handleToggleColor;
