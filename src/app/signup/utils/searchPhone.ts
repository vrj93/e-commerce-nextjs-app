const searchPhone = async (phone: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/search-phone/${phone}`;
  const res = await fetch(url);
  
  if (res.status == 400) {
    alert("Phone already registered");
    return;
  }
};

export default searchPhone;
