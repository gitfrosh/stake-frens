//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import {ISuperfluid} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol"; //"@superfluid-finance/ethereum-monorepo/packages/ethereum-contracts/contracts/interfaces/superfluid/ISuperfluid.sol";

import {IConstantFlowAgreementV1} from "@superfluid-finance/ethereum-contracts/contracts/interfaces/agreements/IConstantFlowAgreementV1.sol";

import {CFAv1Library} from "@superfluid-finance/ethereum-contracts/contracts/apps/CFAv1Library.sol";

import "hardhat/console.sol";

contract Task {
    using CFAv1Library for CFAv1Library.InitData;

    string taskName;
    // uint256 endDate = Date(2022, 5, 5);
    uint256 endDate = block.timestamp + 200000;

    struct Subtask {
        string task;
        bool isCompleted;
        address ownerAddress;
        bool isLead;
    }

    Subtask[] subtasks;

    // initialize cfaV1 variable
    CFAv1Library.InitData public cfaV1;

    constructor(ISuperfluid host) payable {
        //initialize InitData struct, and set equal to cfaV1
        cfaV1 = CFAv1Library.InitData(
            host,
            //here, we are deriving the address of the CFA using the host contract
            IConstantFlowAgreementV1(
                address(
                    host.getAgreementClass(
                        keccak256(
                            "org.superfluid-finance.agreements.ConstantFlowAgreement.v1"
                        )
                    )
                )
            )
        );

        populateSubtasks();
    }

    function populateSubtasks() private {
        subtasks.push(
            Subtask(
                "task 1",
                true,
                0x92d3578F3d9fAf59b41117Fb92CF1968554b0590,
                false
            )
        );

        subtasks.push(
            Subtask(
                "task 2",
                false,
                0x03D28Df4b4c3a4bb1eA5D0a518E4D045172a6559,
                true
            )
        );
    }

    function stateOfCompletion() public view returns (Subtask[] memory) {
        return subtasks;
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
            uint256 amountToPayBack = address(this).balance / 2;

            (bool success1, ) = (0x92d3578F3d9fAf59b41117Fb92CF1968554b0590)
                .call{value: amountToPayBack}("");
            (bool success2, ) = (0x03D28Df4b4c3a4bb1eA5D0a518E4D045172a6559)
                .call{value: amountToPayBack}("");
            require(success2, "Failed to withdraw money from contract.");
        } else {
            console.log("No money for you mooootherfuckker");
            uint256 amountToPayBack = address(this).balance;
            (bool success3, ) = (0x92d3578F3d9fAf59b41117Fb92CF1968554b0590)
                .call{value: amountToPayBack}("");
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
