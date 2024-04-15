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

// Function to calculate the derivative of a given function
function derivative(func, x, h) {
  return (func(x + h) - func(x)) / h;
}

// Newton-Raphson method implementation
function newtonRaphson(func, initialGuess, epsilon, maxIterations) {
  var x = initialGuess;
  var iter = 0;
  var h = 0.0001; // Step size for derivative approximation

  while (iter < maxIterations) {
    var fx = func(x);
    var fpx = derivative(func, x, h);

    if (Math.abs(fx) < epsilon) {
      return { root: x, iterations: iter };
    }

    x = x - fx / fpx;
    iter++;
  }

  return "Newton-Raphson method fails to converge within maximum iterations.";
}

// Validate input fields
function validateInputs(funcString, initialGuess) {
  if (isEmpty(funcString) || isEmpty(initialGuess)) {
    alert("Please fill in all the fields.");
    return false;
  }

  if (!isValidFunction(funcString)) {
    alert("Please enter a valid function.");
    return false;
  }

  if (!isNumeric(initialGuess)) {
    alert("Please enter a valid numeric value for Initial Guess.");
    return false;
  }

  return true;
}

// Button click event handler
document.getElementById("btn").onclick = () => {
  var funcString = document.getElementById("func").value.trim();
  var initialGuess = document.getElementById("initialGuess").value.trim();

  if (!validateInputs(funcString, initialGuess)) {
    return;
  }

  var epsilon = 0.0001; // Tolerance
  var maxIterations = 1000; // Maximum number of iterations

  var func = new Function("x", "return " + funcString + ";");
  var result = newtonRaphson(
    func,
    parseFloat(initialGuess),
    epsilon,
    maxIterations
  );

  document.getElementById("result").textContent =
    "Root = " + result.root + ", Iterations = " + result.iterations;

  if (typeof result === "string") {
    alert(result);
  }

  console.log(result);
};

// Helper functions
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
