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
    // taking user input for firstname
    let firstName = prompt("Enter first name");

    //if user cancels without giving any input, we change the "addNextEmployee" value to false and return the empty array to prevent the error when the other function tries to loop over the array
    if (!firstName) {
      addNextEmployee = false;
      return employees;
    }

    let lastName = prompt("Enter last name");
    if (!lastName) {
      addNextEmployee = false;
      return employees;
    }
    let salary = prompt("Enter the salary");
    if (!salary) {
      addNextEmployee = false;
      return employees;
    }

    //if all the values are provided, we push the "employee" object inside our "employees" array

    if (firstName && lastName && salary) {
      //converting salary to a number
      salary = Number(salary);

      //for salary we added an extra layer of validation , if the salary is not a number we defaulted it to "0"
      if (isNaN(salary)) {
        salary = 0;
      }

      //in es6 and above if the key and value has a same name, we can use just one value to store the data instead of doing   { firstName: firstName, lastName: lastName, salary: salary}

      //finally pushing the object in our array
      employees.push({
        firstName,
        lastName,
        salary,
      });
    }

    //after pushing the values, we wanna check if user wants to add more staff
    //if user confirms we keep the "addNextEmployee" value to true and loop again, else, we change it to false and exit the loop
    if (confirm("Want to add more staff?")) {
      addNextEmployee = true;
    } else {
      addNextEmployee = false;
    }
  }

  //finally returning the array of employees upon the exit of loop
  return employees;
};

// Display the average salary
const displayAverageSalary = function (employeesArray) {
  // TODO: Calculate and display the average salary

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
