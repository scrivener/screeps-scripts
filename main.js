var roleHarvester = require('harvester');

module.exports.loop = function () {
  for (let creep in Game.creeps) {
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
  }
}
