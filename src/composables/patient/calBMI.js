export default function calBMI(weight, height) {
  const bmi = (weight / ((height / 100) * (height / 100))).toFixed(2);

  let messageBMI = "";
  let statusBMI = false;

  if (bmi < 18.5) {
    messageBMI = "Thiếu cân";
    statusBMI = false;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    messageBMI = "Khỏe mạnh";
    statusBMI = true;
  } else if (bmi >= 25 && bmi <= 29) {
    messageBMI = "Thừa cân";
    statusBMI = true;
  } else {
    messageBMI = "Béo phì";
    statusBMI = false;
  }

  return { bmi, messageBMI, statusBMI };
}
