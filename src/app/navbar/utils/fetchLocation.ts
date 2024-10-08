const fetchLocation = async () => {
  // const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/location`;
  const url = "";
  const res = await fetch(url);

  if (res.status == 200) {
    const response = await res.json();
    return response.data;
  }
};

export default fetchLocation;