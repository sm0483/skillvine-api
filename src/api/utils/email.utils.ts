export const permission = (email: string) => {
  const array = [
    'alvin19official@gmail.com',
    'sm048314916@gmail.com',
    '20br13468@rit.ac.in',
    '20br13697@rit.ac.in',
    '20br13360@rit.ac.in',
    '20br13364@rit.ac.in',
    'vigneshcse2024@gmail.com',
  ];
  if (array.includes(email)) return true;
  return false;
};
