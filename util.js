
module.exports = {
  goToAndHarvest: function(who, where) {
     let result = who.harvest(where);
     if (result === ERR_NOT_IN_RANGE) {
       who.moveTo(where);
     }
  },

  goToAndTransfer: function(who, where, what) {
     let result = who.transfer(where, what);
     if (result === ERR_NOT_IN_RANGE) {
       who.moveTo(where);
     } 
  },

  isWall: function(room, x, y) {
    let things = room.lookAt(x, y);
    for (let thing in things) {
      if (thing['type'] === 'terrain' && thing['terrain'] === 'wall') {
        return true;
      }
    }
    return false; 
  },

  emptySpacesAdjacent: function(room, x, y) {
    let emptySpaces = [];
    for (let i=x-1; i<=x+1; i++) {
      for (let j=y-1; j<=y+1; j++) {
        let space = room.lookForAt(LOOK_TERRAIN, i, j)[0];
        if (space === 'plain') {
          emptySpaces.push([i,j]);
        }
      }
    }
    return emptySpaces;
  },

  getCreepsAssignedToSource: function(sourceID) {
    if (Memory.sources && Memory.sources[sourceID]) {
      return Memory.sources[sourceID].assignedCreeps;
    } else {
      return [];
    }
  },

  getSourceAssignedToCreep: function(creepName) {
    for (var sourceID in Memory.sources) {
      let creeps = this.getCreepsAssignedToSource(sourceID);
      if (creeps.indexOf(creepName) != -1) {
        return sourceID;
      }
    }
    return undefined;
  }

};
