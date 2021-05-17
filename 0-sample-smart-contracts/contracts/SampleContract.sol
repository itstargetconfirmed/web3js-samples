// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SampleContract {

    uint public num;
    mapping(address=>uint) public balances;

    event NumSet(uint indexed num);

    function setNum(uint _num) external {
        num = _num;
        emit NumSet(num);
    }

    function getNum() external view returns(uint) { 
        return num;
    }

    function pay() external payable {
        balances[msg.sender] += msg.value;
    }

    function() external payable {
        balances[msg.sender] += msg.value;
    }

    function checkBalance(address user) external view returns(uint) {
        return balances[user];
    }
}

