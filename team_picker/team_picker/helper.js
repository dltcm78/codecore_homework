const helper = {
  // Randomizing members
  shuffle(array) {
    for (let i = 0; i < array.length; i++) {
      const random = Math.floor(Math.random() * array.length);
      [array[i], array[random]] = [array[random], array[i]];
    }
    return array;
  },

  // Getting number of members per team
  teamCount(members, quantity) {
    return Math.ceil(members.length / quantity);
  },

  // Getting number of teams
  perTeam(array, quantity) {
    return Math.ceil(array.length / quantity);
  }
}

module.exports = helper;