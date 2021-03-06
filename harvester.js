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
      creep.say(`${creep.name} h/s ${targetSourceID}`);
    }

    if (creep.memory.harvesting) {
      util.goToAndHarvest(creep, Game.getObjectById(targetSourceID));
    } else if (creep.memory.dispensing) {
      var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: function(structure){
          return (structure.structureType == STRUCTURE_SPAWN || 
                  structure.structureType == STRUCTURE_EXTENSION)  
                  && structure.energy < structure.energyCapacity;
        }
      });
      util.goToAndTransfer(creep, target, RESOURCE_ENERGY);
    }
  }
}
