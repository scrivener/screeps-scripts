var util = require('util');

module.exports = {
  run: function(creep) {
    if (creep.carry.energy === 0) {
      creep.memory.harvesting = true;
      creep.memory.dispensing = false;
    } else if (creep.carry.energy === creep.carryCapacity) {
      creep.memory.harvesting = false;
      creep.memory.dispensing = true; 
    }
    var targetSourceID = util.getSourceAssignedToCreep(creep.name);
    if (Game.time % 10 === 0) {
      creep.say(`${creep.name} h/u ${targetSourceID}`);
    }

    if (creep.memory.harvesting) {
      util.goToAndHarvest(creep, Game.getObjectById(targetSourceID));
    } else if (creep.memory.dispensing) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }
  }
}
