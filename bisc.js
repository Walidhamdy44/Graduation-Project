let A = document.getElementById("a");
let B = document.getElementById("b");
let btn = document.getElementById("btn");
let result = document.getElementById("result");
let funcEl = document.getElementById("func");

// Define logarithmic function (base 10)
function log(x) {
  return Math.log10(x);
}

// Define trigonometric functions
function sin(x) {
  return Math.sin(x);
}

function cos(x) {
  return Math.cos(x);
}

function tan(x) {
  return Math.tan(x);
}

function isNumeric(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

function isValidFunction(funcString) {
  try {
    new Function("x", "return " + funcString + ";");
    return true;
  } catch (e) {
    return false;
  }
}

function isEmpty(value) {
  return value.trim() === "";
}

function validateInputs(a, b, funcString) {
  if (isEmpty(a) || isEmpty(b) || isEmpty(funcString)) {
    alert("Please fill in all the fields.");
    return false;
  }

  if (!isNumeric(a) || !isNumeric(b)) {
    alert("Please enter valid numeric values for A and B.");
    return false;
  }

  if (!isValidFunction(funcString)) {
    alert("Please enter a valid function.");
    return false;
  }

  return true;
}

function bisectionMethod(func, a, b, epsilon) {
  if (func(a) * func(b) > 0) {
    return "Bisection method fails. The function values at A and B must have opposite signs.";
  }

  var iter = 0;
  while (Math.abs(b - a) > epsilon) {
    var c = (a + b) / 2;
    if (func(c) === 0) {
      break;
    }
    if (func(a) * func(c) < 0) {
      b = c;
    } else {
      a = c;
    }
    iter++;
  }

  return {
    root: a,
    iterations: iter,
  };
}

btn.onclick = () => {
  var a = A.value.trim();
  var b = B.value.trim();
  var funcString = funcEl.value.trim();

  if (!validateInputs(a, b, funcString)) {
    return;
  }

  a = parseFloat(a);
  b = parseFloat(b);

  var func = new Function("x", "return " + funcString + ";");
  result.textContent =
    "Root = " +
    bisectionMethod(func, a, b, 0.000001).root +
    ", Iterations = " +
    bisectionMethod(func, a, b, 0.000001).iterations;

  if (bisectionMethod(func, a, b, 0.000001).root === undefined) {
    alert(bisectionMethod(func, a, b, 0.000001));
  }

  console.log(bisectionMethod(func, a, b, 0.000001));
};
