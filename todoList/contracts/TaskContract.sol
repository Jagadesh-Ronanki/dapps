// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract Tasks{
    struct Task {
        uint256 taskId;
        string taskName;
        bool isDeleted;
    }

    Task[] private tasks;

    mapping(uint256 => address) public taskToOwner; 

    event AddTask(address recipient, uint256 taskId);
    event DeleteTask(uint256 taskId, bool isDeleted);

    function addTask(string memory _taskName, bool _isDeleted) external {
        uint256 _taskId = tasks.length;
        tasks.push(Task(_taskId, _taskName, _isDeleted));
        taskToOwner[_taskId] = msg.sender;
        emit AddTask(msg.sender, _taskId);
    }

    function deleteTask(uint256 _taskId, bool _isDeleted) external {
        if (taskToOwner[_taskId] == msg.sender) {
            tasks[_taskId].isDeleted = _isDeleted;
            emit DeleteTask(_taskId, _isDeleted);
        }
    }

    function getTasks() external view returns (Task[] memory) {
        Task[] memory temporary = new Task[](tasks.length);

        uint256 len = tasks.length;
        uint256 counter;
        for (uint i=0; i<len;) {
            if (!tasks[i].isDeleted){
                temporary[counter] = tasks[i];
                ++counter;
            }
            unchecked {
                ++i;
            }
        }

        Task[] memory result = new Task[](counter);
        for(uint256 i = 0; i < counter;) {
            result[i] = temporary[i];
            unchecked {
                ++i;
            }
        }
        
        return result;
    }

}

