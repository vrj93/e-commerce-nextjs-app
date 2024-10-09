const productCategories = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/category`;
  const res = await fetch(url);
  const response = await res.json();
  return response.data;
};

export default productCategories;
