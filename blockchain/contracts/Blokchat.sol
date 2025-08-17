// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title Blokchat
 * @author Your Name
 * @notice This contract manages chat rooms and message hashes for a decentralized chat application.
 */
contract Blokchat {
    // A struct to define the structure of a message stored on-chain.
    struct Message {
        uint256 id;
        string ipfsHash; // The hash from IPFS where the encrypted message is stored
        address sender;
        uint256 timestamp;
    }

    // A struct to define the structure of a chat room.
    struct Room {
        uint256 id;
        string name;
        address admin;
        address[] members;
        Message[] messages;
    }

    // State Variables
    Room[] public rooms; // An array to store all created rooms.
    uint256 public nextRoomId; // A counter to ensure each new room gets a unique ID.

    // Mapping to check if a user is a member of a specific room.
    // mapping(roomId => mapping(userAddress => bool))
    mapping(uint256 => mapping(address => bool)) public isRoomMember;

    // Events
    // The contract emits this event whenever a new message is sent.
    // Your React frontend will listen for this event to update the UI in real-time.
    event NewMessage(
        uint256 indexed roomId,
        uint256 messageId,
        string ipfsHash,
        address sender,
        uint256 timestamp
    );

    /**
     * @notice Creates a new chat room.
     * @param _name The desired name for the new chat room.
     */
    function createRoom(string memory _name) public {
        // The person creating the room automatically becomes the admin and a member.
        address creator = msg.sender;

        address[] memory initialMembers = new address[](1);
        initialMembers[0] = creator;

        // Create the new room in memory
        Room memory newRoom = Room({
            id: nextRoomId,
            name: _name,
            admin: creator,
            members: initialMembers,
            messages: new Message[](0) // Start with an empty message array
        });

        // Push the new room to the `rooms` array in storage.
        rooms.push(newRoom);
        isRoomMember[nextRoomId][creator] = true;

        // Increment the ID for the next room.
        nextRoomId++;
    }
// Add this new function inside your Blokchat.sol contract

/**
 * @notice Allows a user to join an existing chat room.
 * @param _roomId The ID of the room to join.
 */
function joinRoom(uint256 _roomId) public {
    // Check if the room exists.
    require(_roomId < rooms.length, "Room does not exist.");
    // Check that the user is not already a member.
    require(!isRoomMember[_roomId][msg.sender], "You are already a member of this room.");

    // Add the user to the members list and update the mapping.
    rooms[_roomId].members.push(msg.sender);
    isRoomMember[_roomId][msg.sender] = true;
}
    /**
     * @notice Sends a message hash to a specific room.
     * @param _roomId The ID of the room to send the message to.
     * @param _ipfsHash The IPFS hash of the encrypted message content.
     */
    function sendMessage(uint256 _roomId, string memory _ipfsHash) public {
        // Check if the room exists.
        require(_roomId < rooms.length, "Room does not exist.");
        // Check if the sender is a member of the room.
        require(isRoomMember[_roomId][msg.sender], "You are not a member of this room.");

        // Get a reference to the room in storage.
        Room storage room = rooms[_roomId];

        uint256 messageId = room.messages.length;

        // Create and add the new message to the room's message array.
        room.messages.push(Message({
            id: messageId,
            ipfsHash: _ipfsHash,
            sender: msg.sender,
            timestamp: block.timestamp
        }));

        // Emit the NewMessage event so the frontend can see it.
        emit NewMessage(
            _roomId,
            messageId,
            _ipfsHash,
            msg.sender,
            block.timestamp
        );
    }
    // Add this new function to Blokchat.sol

/**
 * @notice Verifies if a given IPFS hash matches the one stored on-chain for a specific message.
 * @param _roomId The ID of the room.
 * @param _messageId The ID of the message within the room.
 * @param _expectedIpfsHash The IPFS hash to check against.
 * @return A boolean indicating if the hashes match.
 */
function verifyMessage(
    uint256 _roomId,
    uint256 _messageId,
    string memory _expectedIpfsHash
) public view returns (bool) {
    require(_roomId < rooms.length, "Room does not exist.");
    require(_messageId < rooms[_roomId].messages.length, "Message does not exist.");

    Message memory message = rooms[_roomId].messages[_messageId];
    // The keccak256 hash of two strings must be compared to check for equality
    return keccak256(abi.encodePacked(message.ipfsHash)) == keccak256(abi.encodePacked(_expectedIpfsHash));
}
}