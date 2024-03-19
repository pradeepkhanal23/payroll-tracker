// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector("#add-employees-btn");

// Collect employee data
const collectEmployees = function () {
  // TODO: Get user input to create and return an array of employee objects

  // initially setting the addNextEmployee value to true to enter the while loop
  let addNextEmployee = true;

  //initializing the employess array to empty before we start collecting data of the employees
  let employees = [];

  while (addNextEmployee) {
    //instead of getting all the inputs first and then validating, we are using instant validation, i.e if user does gives the firstname but cancels on the lastname input prompt, we want to exit the prompt and return the array itself

    let firstName = prompt("Enter first name");
    if (!firstName) {
      return employees;
    }

    let lastName = prompt("Enter last name");
    if (!lastName) {
      return employees;
    }

    //adding extra layer of check for salary as its value can be "string" or "non=negative"

    let salary;
    while (true) {
      // Prompt for salary until a valid non-negative number is provided
      let salaryInput = prompt("Enter the salary");

      //if input is not given, we simply return
      if (!salaryInput) {
        return employees;
      }

      //if we have input, we change it to a number and check for "isNan" fucntion, if true, we can assume that we recived a non number value so we default the salary to 0
      salary = Number(salaryInput);
      if (isNaN(salary)) {
        salary = 0;
        break;
      }

      //if salary is negative, we wanna alert the user that it is a negative value and give them the chance to input the salary again and go validation check again
      if (salary < 0) {
        alert("Enter non negative number for salary");
        continue;
      }

      //if its either "non-negative" and "positive" we break out from the loop and add it to the array
      break;
    }

    //pushing the object in the array
    employees.push({
      firstName,
      lastName,
      salary,
    });

    //after pushing the object, we ask if we wanna add more
    if (confirm("Do you want to add more staff?")) {
      //if yes, we continue through the main loop of input again
      addNextEmployee = true;
    } else {
      //if no, we simply exit the main loop, turn the flag "addNextEmployee" false and return the employees array
      addNextEmployee = false;
      return employees;
    }
  }
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary

  // if the array is empty, we simply exit and dont print anything in the console as it returns an error while trying to access the undefined array
  if (employeesArray.length === 0) {
    return;
  }

  //initializing the salary to 0 to begin with
  let totalSalary = 0;

  //using for loop to access each object in the array and used dot notation to get the specific salary property from the employee object
  for (i = 0; i < employeesArray.length; i++) {
    //calculating the average by diving the total salaries of all the employess by the total number of employee(s)
    totalSalary =
      totalSalary + employeesArray[i].salary / employeesArray.length;
  }

  //printing the message in the console using template string and also, used ".toFixed()"  method to have an extra 2 digit decimal point value for better approximation
  console.log(
    `The average employee salary between our ${
      employeesArray.length
    } employee(s) is $${totalSalary.toFixed(2)}`
  );
};

// Select a random employee
const getRandomEmployee = function (employeesArray) {
  // TODO: Select and display a random employee

  //if the array is empty, we simply exit and dont print anything in the console because it tries to access the firstname and lastname property which will be undefined and results in error
  if (employeesArray.length === 0) {
    return;
  }

  //getting random value between 0(inclusive) to the length of array(exclusive), using "Math.random()" method and rounding the value down using "Math.floor() for more accuracy"
  let randomEmployeeIndex = Math.floor(Math.random() * employeesArray.length);

  //logging the firstname and lastname of the employee based on the random index in the console
  console.log(
    `Congratulations to ${employeesArray[randomEmployeeIndex].firstName} ${employeesArray[randomEmployeeIndex].lastName}, our random drawing winner!!!`
  );
};

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function (employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector("#employee-table");

  // Clear the employee table
  employeeTable.innerHTML = "";

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
};

const trackEmployeeData = function () {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log("==============================");

  getRandomEmployee(employees);

  employees.sort(function (a, b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
};

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener("click", trackEmployeeData);
