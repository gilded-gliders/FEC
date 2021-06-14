export default function booleanCheck(obj) {
  const {
    boolean,
    value = 0,
    trueFunc = () => {},
    falseFunc = () => {},
  } = obj;
  console.log(boolean, value)
  if (boolean) {
    trueFunc(value);
  } else {
    falseFunc(value);
  }
}
