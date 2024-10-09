const productColors = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/color`;
  const res = await fetch(url);
  const response = await res.json();
  return response.data;
}

export default productColors;