const handleProductByBrand = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/product-by-brand`;
  const res = await fetch(url);
  const response = await res.json();

  if (response.flag) {
    return response.data;
  }
};

export default handleProductByBrand;
