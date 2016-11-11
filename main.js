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

  // let spaces = util.emptySpacesAdjacent(Game.creeps[creeps[0]].room, 38, 6);
  // console.log(`There are ${spaces.length} spaces`);

}
