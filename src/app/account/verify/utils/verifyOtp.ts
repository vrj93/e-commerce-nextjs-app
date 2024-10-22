export const processPhoneVerification = async (id: number, otp: number) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/verify-phone`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, otp }),
  });

  return await res.json();
};
