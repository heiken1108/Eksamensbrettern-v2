const ROOM_FOR_ERROR = 0.01; //Prosent

export function evaluateUserInput(
  input: string,
  correctAnswer: string
): boolean {
  const inputNumber = parseFloat(input);
  const correctAnswerNumber = parseFloat(correctAnswer);
  if (isNaN(inputNumber) || isNaN(correctAnswerNumber)) {
    return false;
  }
  const lowerbound = correctAnswerNumber * (1 - ROOM_FOR_ERROR);
  const upperbound = correctAnswerNumber * (1 + ROOM_FOR_ERROR);
  if (inputNumber < 0) {
    return inputNumber >= upperbound && inputNumber <= lowerbound;
  } else {
    return inputNumber >= lowerbound && inputNumber <= upperbound;
  }
}
