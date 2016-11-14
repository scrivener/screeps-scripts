var roleHarvester = require('harvester');
var roleUpgrader = require('upgrader');
var util = require('util');

module.exports.loop = function () {
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    } else if (creep.memory.role === 'upgrader') {
      roleUpgrader.run(creep);
    }
  }

  let creeps = Object.keys(Game.creeps);
  console.log(`There are ${creeps.length} creeps`);

  let roles = ['harvester', 'upgrader', 'builder'];
  Memory.targetPopulation = {
    'harvester': 2,
    'upgrader': 2,
    'builder': 1
  }

  let totalTargetPopulation = 0;
  for (let count in Object.values(Memory.targetPopulation)) {
    totalTargetPopulation += count;
  };

  if (creeps.length < totalTargetPopulation) {
    for (let i=0; i<roles.length; i++) {
      let role = roles[i];
      let creepsOfRole = util.getAllCreepsOfRole(role);
      if (creepsOfRole.length < Memory.targetPopulation[role]) {
        console.log(`Want to spawn a ${role} because we have ${creepsOfRole.length}/${Memory.targetPopulation[role]}`);
        break;
      }
    }
  }


  // let spaces = util.emptySpacesAdjacent(Game.creeps[creeps[0]].room, 38, 6);
  // console.log(`There are ${spaces.length} spaces`);

}
