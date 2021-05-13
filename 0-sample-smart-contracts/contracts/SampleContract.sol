// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract SampleContract {

    uint public num;

    function setNum(uint _num) external {
        num = _num;
    }

    function getNum() external view returns(uint) { 
        return num;
    }
}

