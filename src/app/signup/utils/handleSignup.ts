interface SignupData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  password: string;
}

export const handleSignup = async ({
  firstName,
  lastName,
  phone,
  email,
  password,
}: SignupData) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/create-account`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      phone,
      email,
      password,
    }),
  });

  return await res.json();
};
