const mathUtil = {
  votePercentToMergeInteger: function(voteYesTotal) {
    voteYesTotal = Number(voteYesTotal);
    const quorum = 0.5 //getRepo
    const majority = 0.5 // implicit, must be greater than
    const supply = 1_000_000 //implicit
    // majority + 1 vote.
    const yesVotesMinimumToMerge = quorum*supply*majority + 1 
    
    var votePercentToMergeInteger = 100*((voteYesTotal / yesVotesMinimumToMerge))
    
    // Show 1 decimal if less than 10%. Greater, round to nearest integer.
    if (votePercentToMergeInteger < 10) {
      return votePercentToMergeInteger.toFixed(1)
     // So it doesn't say "100%" when it's actually 99.9% or something.
    // Untested
    } else if (votePercentToMergeInteger > 99 && votePercentToMergeInteger < 100) {
      return votePercentToMergeInteger.toFixed(1)
    } else if (votePercentToMergeInteger > 100) {
      return 100
    } else {
      // Logically, only if exactly 100.
      return Math.round(votePercentToMergeInteger)
    }
  }
};

module.exports = mathUtil;
