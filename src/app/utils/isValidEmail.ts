const isValidEmail = (email: string, isSignup: boolean) => {
  if (email !== '') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  } else if (isSignup) {
    return true;
  } else {
    return false;
  }
};

export default isValidEmail;