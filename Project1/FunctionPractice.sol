// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract Assignment1 {
    string name;
	uint age;

	constructor(string memory _name, uint _age) {
		name = _name;
        age = _age;
	}

	function getName() public view returns(string memory username) {
		return name;
	}

    function getAge() external view returns(uint doubleAge) {
        return age*2;
    }

}
