const productBrands = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/brand`;
  const res = await fetch(url);
  const response = await res.json();
  return response.data;
};

export default productBrands;
