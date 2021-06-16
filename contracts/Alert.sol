pragma solidity ^0.7.0;

import "hardhat/console.sol";


contract Alert {
    struct AlertInfo {
        uint id;
        string claim;
    }

    AlertInfo alertInfo;

    event CreateAlert(address _alertAddress);

    function create(uint _id, string memory _claim)
    public returns (string memory) {
        alertInfo.id = _id;
        alertInfo.claim = _claim;
        emit CreateAlert(address(this));
        console.log("Creating an alert with message:", alertInfo.claim);
        return alertInfo.claim;
    }

    function updateClaim(string memory _claim) 
    public returns (string memory) {
        alertInfo.claim = _claim;
        return alertInfo.claim;
    }

    function getClaim() public view returns (string memory) {
        return alertInfo.claim;
    }
}