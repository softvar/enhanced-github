const mathUtil = {
  yesVotePercentToMergeInteger: function(voteYesTotal) {
    voteYesTotal = Number(voteYesTotal);
    const quorum = 0.5 //getRepo
    const majority = 0.5 // implicit, must be greater than
    const supply = 1_000_000 //implicit
    // majority + 1 vote.
    const yesVotesMinimumToMerge = quorum*supply*majority + 1 
    
    var yesVotePercentToMergeInteger = 100*((voteYesTotal / yesVotesMinimumToMerge))
    
    // Show 1 decimal if less than 10%. Greater, round to nearest integer.
    if (yesVotePercentToMergeInteger < 10) {
      return yesVotePercentToMergeInteger.toFixed(1)
    } else if (yesVotePercentToMergeInteger > 100) {
      return 100
    } else {
      return Math.round(yesVotePercentToMergeInteger)
    }
  }
};

module.exports = mathUtil;
