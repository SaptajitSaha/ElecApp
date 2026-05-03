import { ELECTION_KNOWLEDGE } from './knowledge';

export const analyzeIntent = (query, userState) => {
  const lowerQuery = query.toLowerCase();

  // Keyword mapping to knowledge base keys
  const intentMap = [
    { keywords: ['register', 'form 6', 'new voter', 'how to vote', 'apply'], key: 'registration' },
    { keywords: ['correction', 'wrong name', 'wrong address', 'change address', 'shift', 'form 8', 'mistake'], key: 'correction' },
    { keywords: ['missing', 'not in list', 'deleted', 'name not found'], key: 'missing_name' },
    { keywords: ['lost', 'damage', 'replacement', 'duplicate', 'stolen'], key: 'lost_id' },
    { keywords: ['day', 'process', 'evm', 'vvpat', 'booth', 'polling', 'where to vote'], key: 'voting_day' }
  ];

  for (const intent of intentMap) {
    if (intent.keywords.some(kw => lowerQuery.includes(kw))) {
      return ELECTION_KNOWLEDGE[intent.key];
    }
  }

  // Fallback if no specific keyword matched, but we can use userState context to guess
  if (lowerQuery.includes('what should i do') || lowerQuery.includes('help')) {
    if (!userState.isRegistered) return ELECTION_KNOWLEDGE.registration;
    if (userState.isRegistered && !userState.hasVoterId) return ELECTION_KNOWLEDGE.lost_id; // Registered but no ID means lost or pending
    if (userState.isRegistered && userState.hasVoterId) return ELECTION_KNOWLEDGE.voting_day;
  }

  return null; // Signals need for AI fallback or default response
};

export const getContextualSuggestions = (userState) => {
  if (!userState.isEligible) {
    return [
      { label: "Am I eligible to vote?", query: "Am I eligible to vote?" }
    ];
  }

  if (!userState.isRegistered) {
    return [
      { label: "How do I register?", query: "How do I register?" },
      { label: "What documents do I need?", query: "documents for registration" }
    ];
  }

  if (!userState.hasVoterId) {
    return [
      { label: "I lost my Voter ID", query: "lost voter id" },
      { label: "Check my status", query: "check application status" }
    ];
  }

  return [
    { label: "Name missing from list?", query: "missing name in voter list" },
    { label: "Address change", query: "change address on voter id" },
    { label: "Voting day process", query: "voting day process" }
  ];
};
