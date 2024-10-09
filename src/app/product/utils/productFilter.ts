const productFilter = async (
  selectedCategories: any,
  selectedBrands: any,
  selectedColors: any,
  searchText: any
) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/filter`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categories: selectedCategories,
      brands: selectedBrands,
      colors: selectedColors,
      search: searchText,
    }),
  });
  const response = await res.json();
  return response.data;
};

export default productFilter;
