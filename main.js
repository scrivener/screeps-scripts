var roleHarvester = require('harvester');

module.exports.loop = function () {
  for (let name in Game.creeps) {
    let creep = Game.creeps[name];
    if (creep.memory.role === 'harvester') {
      roleHarvester.run(creep);
    }
  }
}
