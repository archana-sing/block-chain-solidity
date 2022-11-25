// SPDX-License-Identifier: MIT

pragma solidity ^0.8.6;

contract FundContract {
    event Trnasfer(address indexed to, uint amount);

    function sendEther(address payable to, uint amount) external payable {
        require(address(this).balance >= amount, 'insufficient amount');
        to.transfer(amount);
        emit Trnasfer(to, amount);
    }
}