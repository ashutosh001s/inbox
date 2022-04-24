pragma solidity ^0.4.17;
// linter warnings (red underline) about pragma version can igonored!

// contract code will go here
contract Inbox {

    string private message;

    function Inbox(string initialMessage) public {
        message = initialMessage;
    }

    function getMessage() public view returns (string) {
        return message;
    }

    function setMessage(string newMessage) public {
        message = newMessage;
    }
}
