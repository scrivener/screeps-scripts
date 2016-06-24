
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
  }
};
