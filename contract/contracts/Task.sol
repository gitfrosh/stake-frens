//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

import "hardhat/console.sol";

contract Task {
    // using CFAv1Library for CFAv1Library.InitData;

    string taskName;
    // uint256 endDate = Date(2022, 5, 5);
    uint256 endDate = block.timestamp + 200000;

    struct Subtask {
        string task;
        bool isCompleted;
        address ownerAddress;
    }

    Subtask[] subtasks;

    //initialize cfaV1 variable
    // CFAv1Library.InitData public cfaV1;

    constructor() payable {
        populateSubtasks();
        allTasksCompleted();
    }

    // constructor(ISuperfluid host) {
    //     populateSubtasks();
    //     //initialize InitData struct, and set equal to cfaV1
    //     cfaV1 = CFAv1Library.InitData(
    //         host,
    //         //here, we are deriving the address of the CFA using the host contract
    //         IConstantFlowAgreementV1(
    //             address(
    //                 host.getAgreementClass(
    //                     keccak256(
    //                         "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
    //                     )
    //                 )
    //             )
    //         )
    //     );

    // }

    function populateSubtasks() private {
        subtasks.push(Subtask("task 1", true, msg.sender));

        subtasks.push(Subtask("task 2", false, msg.sender));
    }

    function allTasksCompleted() public {
        uint256 nameZero = 0;
        for (uint256 i = 0; i < subtasks.length; i++) {
            if (subtasks[i].isCompleted == true) {
                nameZero += 1;
            }
        }

        if (nameZero == subtasks.length) {
            console.log("send money back");
        } else {
            console.log("No money for you mooootherfuckker");
        }
    }

    function finishedTask(address addressToUpdate) public {
        for (uint256 i = 0; i < subtasks.length; i++) {
            if (subtasks[i].ownerAddress == addressToUpdate) {
                subtasks[i].isCompleted = true;
                console.log("true");
            }
        }

        // cfaV1.deleteFlow(addressToUpdate, receiver, token);

        // call deleteFlow if task finished
    }
}
