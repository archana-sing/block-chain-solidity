// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MultiSignerWallet {
    address[] public owners;
    uint public threshold; // min value of persons approving trnasaction

    struct Trnasfer {
        uint id;
        uint amount;
        address payable to;
        uint approvals;
        bool sent;
    }

    Trnasfer[] public transfers;

    mapping(address => mapping(uint => bool)) public approvals;

    constructor(address[] memory _owners, uint _threshold) {
        owners = _owners;
        threshold = _threshold;
    }

    // function to get owners
    function getOwners()external view returns(address[] memory) {
        return owners;
    }

    // function to create transfer
    function createTransfer(uint amount, address payable to) external {
        transfers.push(Trnasfer(transfers.length + 1, amount, to, 0, false));

    }

    function getTransfers() external view returns(Trnasfer[] memory){
        return transfers;
    }

    function approveTransfer(uint id) external {
        require(transfers[id].sent == false, "Transfer has already been sent");
        require(approvals[msg.sender][id] == false, 'can not approve transfer twice');

        approvals[msg.sender][id] = true;
        transfers[id].approvals++;

        if(transfers[id].approvals >= threshold){
            address payable to  = transfers[id].to;
            uint amount = transfers[id].amount;
            to.transfer(amount);
            transfers[id].sent = true;
        }
    }

   function deposit() external payable{}
   // receive() external payable{}

}
