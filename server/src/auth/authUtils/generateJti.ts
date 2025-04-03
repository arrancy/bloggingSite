export const generateJti = () => {
  const randomArray = crypto.getRandomValues(new Uint8Array(12));
  const cleanedRandomArray = Array.from(randomArray);
  const finalArray = cleanedRandomArray.map((byte) =>
    byte.toString(16).padStart(2, "0")
  );
  const finalString = finalArray.join("");
  return finalString;
};
