// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract MoodDiary {
    string mood;

    function setMood(string memory _mood) public {
        mood = _mood;        
    }

    function getMood()  returns (string memory) {
        return mood;
    }
}