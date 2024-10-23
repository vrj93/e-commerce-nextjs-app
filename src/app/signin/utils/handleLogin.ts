import { toast } from "react-toastify";

const handleLogin = async (
  user: { phone: string | null, email: string | null },
  password: string,
  setAuthState: any,
  setUserName: any,
  dispatch: any,
  router: any
) => {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/user/login`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user,
      password,
    }),
  });
  const response = await res.json();

  if (response.flag) {
    dispatch(setAuthState(true));
    dispatch(setUserName(response.data.name));
    toast.success(response.msg);
    router.push("/");
  } else {
    toast.error("Username or Password is incorrect.");
  }
};

export default handleLogin;
