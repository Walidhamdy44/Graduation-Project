document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("interpolationForm");
  const resultDiv = document.getElementById("result");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const xValuesInput = document.getElementById("xValues");
    const yValuesInput = document.getElementById("yValues");
    const valueToInterpolateInput =
      document.getElementById("valueToInterpolate");

    const xValues = xValuesInput.value
      .split(",")
      .map((val) => parseFloat(val.trim()));
    const yValues = yValuesInput.value
      .split(",")
      .map((val) => parseFloat(val.trim()));
    const valueToInterpolate = convertToFraction(valueToInterpolateInput.value);

    const interpolatedValue = newtonForwardInterpolation(
      xValues,
      yValues,
      valueToInterpolate
    );
    resultDiv.innerHTML = `<p>Interpolated value at ${valueToInterpolate} is approximately ${interpolatedValue.toFixed(
      4
    )}</p>`;
  });
});

// Function to convert string to fraction
function convertToFraction(str) {
  // Split the string by '/'
  const parts = str.split("/");
  if (parts.length === 1) {
    // If only one part, then it's an integer
    return parseFloat(parts[0]);
  } else if (parts.length === 2) {
    // If two parts, it's a fraction
    return parseFloat(parts[0]) / parseFloat(parts[1]);
  } else {
    // Otherwise, it's invalid
    throw new Error("Invalid fraction format");
  }
}

function newtonForwardInterpolation(x, y, value) {
  // العدد المعروف من نقاط البيانات
  const n = x.length;

  // تهيئة جدول الفروقات المتقدمة
  const fwdDiffTable = [];
  for (let i = 0; i < n; i++) {
    fwdDiffTable.push(new Array(n - i).fill(0));
  }

  // إدراج قيم y في العمود الأول من الجدول
  for (let i = 0; i < n; i++) {
    fwdDiffTable[i][0] = y[i];
  }

  // حساب جدول الفروقات المتقدمة
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < n - i; j++) {
      fwdDiffTable[j][i] = fwdDiffTable[j + 1][i - 1] - fwdDiffTable[j][i - 1];
    }
  }

  // حساب القيمة باستخدام صيغة التفاضل التقدمي نيوتن
  let sum = fwdDiffTable[0][0];
  let term = 1;
  let u = (value - x[0]) / (x[1] - x[0]);
  for (let i = 1; i < n; i++) {
    term *= (u - i + 1) / i;
    sum += term * fwdDiffTable[0][i];
  }

  return sum;
}
