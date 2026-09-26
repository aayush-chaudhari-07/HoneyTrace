// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title HoneyCustody
 * @dev Immutable on-chain custody tracking for HoneyTrace batch supply chain stages.
 * Enforces sequential stage progression: beekeeper → lab → bottler → distributor → shelf.
 */
contract HoneyCustody {
    struct CustodyRecord {
        bytes32 batchId;
        string stage;
        address actor;
        bytes32 dataHash;
        uint256 timestamp;
        uint256 stageIndex;
    }

    // Mapping from batchId => list of custody records
    mapping(bytes32 => CustodyRecord[]) private batchCustodyHistory;
    // Mapping from batchId => current stage index (0=none, 1=beekeeper, 2=lab, 3=bottler, 4=distributor, 5=shelf)
    mapping(bytes32 => uint256) private batchStageIndex;

    event StageRecorded(
        bytes32 indexed batchId,
        string stage,
        address indexed actor,
        bytes32 dataHash,
        uint256 timestamp,
        uint256 stageIndex
    );

    // Helper function to map stage string to index
    function getStageIndex(string memory stage) public pure returns (uint256) {
        bytes32 sHash = keccak256(bytes(stage));
        if (sHash == keccak256(bytes("beekeeper"))) return 1;
        if (sHash == keccak256(bytes("lab"))) return 2;
        if (sHash == keccak256(bytes("bottler"))) return 3;
        if (sHash == keccak256(bytes("distributor"))) return 4;
        if (sHash == keccak256(bytes("shelf"))) return 5;
        return 0;
    }

    /**
     * @notice Records a new custody stage for a batch.
     * @dev Rejects out-of-order, duplicate, or invalid stage calls.
     */
    function recordStage(
        bytes32 batchId,
        string memory stage,
        address actor,
        bytes32 dataHash,
        uint256 timestamp
    ) external returns (uint256 recordId) {
        require(batchId != bytes32(0), "Invalid batchId");
        require(actor != address(0), "Invalid actor address");
        require(dataHash != bytes32(0), "Invalid dataHash");

        uint256 newStageIndex = getStageIndex(stage);
        require(newStageIndex > 0, "Invalid stage name");

        uint256 currentIdx = batchStageIndex[batchId];

        // Must move forward sequentially (newStageIndex == currentIdx + 1)
        require(
            newStageIndex == currentIdx + 1,
            "Invalid stage progression: Out of order or duplicate stage call"
        );

        uint256 ts = timestamp > 0 ? timestamp : block.timestamp;

        CustodyRecord memory record = CustodyRecord({
            batchId: batchId,
            stage: stage,
            actor: actor,
            dataHash: dataHash,
            timestamp: ts,
            stageIndex: newStageIndex
        });

        batchCustodyHistory[batchId].push(record);
        batchStageIndex[batchId] = newStageIndex;

        emit StageRecorded(batchId, stage, actor, dataHash, ts, newStageIndex);

        return batchCustodyHistory[batchId].length - 1;
    }

    /**
     * @notice Returns the full ordered custody history recorded on-chain for a batch.
     */
    function getCustodyHistory(bytes32 batchId) external view returns (CustodyRecord[] memory) {
        return batchCustodyHistory[batchId];
    }

    /**
     * @notice Returns the current completed stage index for a batch.
     */
    function getCurrentStageIndex(bytes32 batchId) external view returns (uint256) {
        return batchStageIndex[batchId];
    }
}
