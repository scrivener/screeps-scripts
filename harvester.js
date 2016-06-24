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

    if (creep.memory.harvesting) {
      var sources = Game.spawns.Spawn1.room.find(FIND_SOURCES);
      util.goToAndHarvest(creep, sources[0]);
    } else if (creep.memory.dispensing) {
      var target = creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: function(structure){
          return (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)  && structure.energy < structure.energyCapacity;
        }
      });
      util.goToAndTransfer(creep, target, RESOURCE_ENERGY);
    }
    
  }
}
