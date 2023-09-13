// Generate Random Strings for send mail
const randString = () => {
  const length = 8;
  let randStr = "";
  for (let i = 0; i < length; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);
    randStr += ch;
  }
  return randStr;
};
export default randString;
