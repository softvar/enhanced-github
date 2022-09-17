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
     // So it doesn't say "100%" when it's actually 99.9% or something.
    // Untested
    } else if (yesVotePercentToMergeInteger > 99 && yesVotePercentToMergeInteger < 100) {
      return yesVotePercentToMergeInteger.toFixed(1)
    } else if (yesVotePercentToMergeInteger > 100) {
      return 100
    } else {
      // Logically, only if exactly 100.
      return Math.round(yesVotePercentToMergeInteger)
    }
  }
};

module.exports = mathUtil;
