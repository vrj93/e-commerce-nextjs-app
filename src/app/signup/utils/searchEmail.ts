import { toast } from "react-toastify";

const searchEmail = async (email: string) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/search-email/${email}`;
  const res = await fetch(url);

  if (res.status == 400) {
    toast.error("Email already registered.");
    return;
  }
};

export default searchEmail;
