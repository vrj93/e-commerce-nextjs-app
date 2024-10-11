const isValidPhone = (phone: string) => {
  if (phone !== '' && !isNaN(Number(phone))) {
    const numberString = String(phone);
    return numberString.length === 10;
  } else {
    return false;
  }
};

export default isValidPhone;