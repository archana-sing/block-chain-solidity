// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CRUD {
    struct employee {
        string name;
        string email;
        uint256 age;
        address walletAddress;
    }

    employee[] public employees;
    uint256 public totalEmployees;

    constructor() {
        totalEmployees = 0;
    }

    // function to create employee
    function create(
        string memory name,
        string memory email,
        uint256 age,
        address walletAddress
    ) public returns (uint256 _totalEmployee) {
        employee memory newEmployee = employee(name, email, age, walletAddress);
        employees.push(newEmployee);
        totalEmployees++;
        return totalEmployees;
    }

    // function to update an employee
    function updateEmployee(string memory name, string memory email) external returns(bool){
        for(uint i = 0; i < totalEmployees; i++){
            if(comapreStrings(employees[i].email, email)){
                employees[i].name = name;
                return true;
            }
        }
        return false;
    }

    // function to delete employee;
    function deleteEmployee(string memory email) external returns(bool){
        require(totalEmployees > 0, "Employee list is empty");
        for(uint i = 0; i < totalEmployees; i++){
            if(comapreStrings(employees[i].email, email)){
                employees[i] = employees[totalEmployees - 1];
                delete employees[totalEmployees - 1];
                totalEmployees--;
                return true;
            }
        }
        return false;
    }

    // function to compare strings
    function comapreStrings(string memory a, string memory b) internal pure returns(bool){
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }
}