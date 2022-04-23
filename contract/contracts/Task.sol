//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Task {

    string taskName;
    // uint256 endDate = Date(2022, 5, 5);
    uint endDate = block.timestamp + 200000;

    struct Subtasks {
        string task;
        bool isCompleted;
        address ownerAddress;

    }

    Subtasks[] subtask;

    constructor() payable {
        console.log("Yoyo");
        populateSubtasks();
    }

    function populateSubtasks() private {
        subtask.push(
            Subtask(
                "task 1",
                false,
                msg.sender
            )
        );

        subtask.push(
            Subtask(
                "task 2",
                false,
                msg.sender
            )
        );
    }

    function allTasksCompleted(){
        // when all tasks are completed
    }

    function finishedTask() {
        // call deleteFlow if task finished
    }
}
