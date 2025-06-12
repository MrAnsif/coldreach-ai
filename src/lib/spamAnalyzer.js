export const calculateSpamScore = (message) => {
  // Simple spam detection - expand with more sophisticated checks
  const spamIndicators = [
    { pattern: /\b(urgent|immediately|limited time)\b/gi, score: 3 },
    { pattern: /\b(guaranteed|risk-free|100%)\b/gi, score: 2 },
    { pattern: /\$\d+/g, score: 2 }, // Dollar amounts
    { pattern: /\!{2,}/g, score: 1 }, // Multiple exclamation marks
    { pattern: /\b(buy now|click here|special offer)\b/gi, score: 3 },
    { pattern: /[A-Z]{5,}/g, score: 2 } // Excessive capitalization
  ];

  let score = 0;

  spamIndicators.forEach(indicator => {
    const matches = message.match(indicator.pattern);
    if (matches) {
      score += matches.length * indicator.score;
    }
  });

  // Normalize score to 0-100
  score = Math.min(100, Math.max(0, score));

  return score
};