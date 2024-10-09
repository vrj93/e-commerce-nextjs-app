const handleFetchProduct = async (productIdDecoded: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/${productIdDecoded}`;
  const res = await fetch(url);
  const response = await res.json();
  if (response.flag) {
    return response.data;
  }
};

export default handleFetchProduct;
