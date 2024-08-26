//your code here
class OutOfRangeError extends Error {
  constructor(arg) {
    super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
    this.name = "OutOfRangeError";
  }
}

class InvalidExprError extends Error {
  constructor() {
    super("Expression should not have an invalid combination of expression");
    this.name = "InvalidExprError";
  }
}

function evalString(expression) {
  try {
    // Remove spaces from the expression
    expression = expression.replace(/\s/g, "");

    // Check for invalid combinations of operators
    if (
      expression.includes("++") ||
      expression.includes("--") ||
      expression.includes("/*") ||
      expression.includes("//") ||
      expression.includes("*+") ||
      expression.includes("/+") ||
      expression.includes("-+")
    ) {
      throw new InvalidExprError();
    }

    // Check for invalid starting operator
    if (
      expression.startsWith("+") ||
      expression.startsWith("/") ||
      expression.startsWith("*")
    ) {
      throw new SyntaxError("Expression should not start with invalid operator");
    }

    // Check for invalid ending operator
    if (
      expression.endsWith("+") ||
      expression.endsWith("/") ||
      expression.endsWith("*") ||
      expression.endsWith("-")
    ) {
      throw new SyntaxError("Expression should not end with invalid operator");
    }

    // Check for invalid characters
    for (let i = 0; i < expression.length; i++) {
      const char = expression[i];
      if (
        !(
          char >= "0" && char <= "9" ||
          char === "+" ||
          char === "-" ||
          char === "*" ||
          char === "/"
        )
      ) {
        throw new OutOfRangeError(char);
      }
    }

    // Evaluate the expression
    return eval(expression);
  } catch (error) {
    console.error(error);
    return error.message;
  }
}

// Example usage
try {
  const result = evalString("1 + 2 * 3");
  console.log("Result:", result);
} catch (error) {
  console.error(error);
}

try {
  const result = evalString("1 + 2 * 3 / -4");
  console.log("Result:", result);
} catch (error) {
  console.error(error);
}

try {
  const result = evalString("1 + 2 * 3 / -4 + ");
  console.log("Result:", result);
} catch (error) {
  console.error(error);
}

try {
  const result = evalString("+ 1 + 2 * 3 / -4");
  console.log("Result:", result);
} catch (error) {
  console.error(error);
}

try {
  const result = evalString("1 + 2 * 3 / -4 a");
  console.log("Result:", result);
} catch (error) {
  console.error(error);
}