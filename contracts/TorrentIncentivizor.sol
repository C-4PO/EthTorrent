pragma solidity 0.5.11;

contract TorrentIncentivser {

    address public admin;

    constructor() public {
        admin = msg.sender;
    }

    struct torrent{
        string name;
        uint bountyPool;
    }

    torrent[] public torrents;

    mapping(address=>uint) public seederRewards;

    event torrentAdded(string name);
    function addTorrent(string memory _name) public{
        require(msg.sender==admin);
        torrent memory newTorrent = torrent(_name,0);
        torrents.push(newTorrent);
        emit torrentAdded(_name);
    }

    event rewarded(address seeder, uint amount);
    function rewardSeeders(uint _torrentID, address[] memory _seeders) public {
        require(msg.sender==admin);
        uint bounty = torrents[_torrentID].bountyPool*1/5; //20% of bounty gets allocated to this seeder draft

        uint seederReward = bounty/_seeders.length;

        for(uint i=0;i<_seeders.length;i++){
            seederRewards[_seeders[i]] += seederReward;
            emit rewarded(_seeders[i],seederReward);
        }
    }

    event funded(uint _torrentID,uint amount);
    function fund(uint _torrentID) external payable{
        torrents[_torrentID].bountyPool+=msg.value;
        emit funded(_torrentID,msg.value);
    }

    function getWithdrawable(address _seeder) public view returns (uint){
        return seederRewards[_seeder];
    }

    event withdrawn(address seeder, uint amount);
    function withdraw() public {
        msg.sender.transfer(seederRewards[msg.sender]);
        emit withdrawn(msg.sender,seederRewards[msg.sender]);
        seederRewards[msg.sender] = 0;
    }

    function contractBalance() public view returns(uint){
        return address(this).balance;
    }
}
