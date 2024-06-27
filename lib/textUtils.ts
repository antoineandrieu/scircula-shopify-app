export const upperCase = (title: string) => {
  let upperCaseArray = title.toLowerCase().split(" ");
  let upperCaseString: string;
  for (let i = 0; i < upperCaseArray.length; i++) {
    upperCaseArray[i] =
      upperCaseArray[i][0].toUpperCase() + upperCaseArray[i].substr(1);
  }
  upperCaseString = upperCaseArray.join(" ");

  return upperCaseString;
};
