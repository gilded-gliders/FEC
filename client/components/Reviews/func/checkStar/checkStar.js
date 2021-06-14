export default function checkStar(index, rate) {
  if (index + 1 <= rate) {
    return 'fullStar';
  } if (index + 0.75 <= rate) {
    return 'qThreeStar';
  } if (index + 0.5 <= rate) {
    return 'qTwoStar';
  } if (index + 0.25 <= rate) {
    return 'qOneStar';
  }
  return 'emptyStar';
}
