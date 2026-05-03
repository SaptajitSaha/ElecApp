export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the minimum age to be eligible to vote in India?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctAnswer: 1,
    explanation: "You must be at least 18 years old on or before the qualifying date (usually January 1st of the election year) to vote.",
    difficulty: "easy"
  },
  {
    id: 2,
    question: "Which form must be filled to register as a new voter?",
    options: ["Form 6", "Form 7", "Form 8", "Form 8A"],
    correctAnswer: 0,
    explanation: "Form 6 is used for first-time voter registration or shifting residence to a new constituency.",
    difficulty: "easy"
  },
  {
    id: 3,
    question: "What does VVPAT stand for?",
    options: [
      "Voter Verification Paper Audit Trail",
      "Voter Verified Paper Audit Trail",
      "Voting Verification Printed Audit Trail",
      "Valid Vote Paper Audit Trail"
    ],
    correctAnswer: 1,
    explanation: "VVPAT stands for Voter Verified Paper Audit Trail. It allows voters to verify that their vote was cast correctly.",
    difficulty: "medium"
  },
  {
    id: 4,
    question: "If you want to correct the spelling of your name on your Voter ID, which form should you use?",
    options: ["Form 6", "Form 7", "Form 8", "Form 6B"],
    correctAnswer: 2,
    explanation: "Form 8 is used for correcting entries (name, photo, address, etc.) in the electoral roll.",
    difficulty: "medium"
  },
  {
    id: 5,
    question: "What is the primary portal for online voter services in India?",
    options: ["IRCTC", "NVSP", "UIDAI", "EPFO"],
    correctAnswer: 1,
    explanation: "The National Voter's Service Portal (NVSP) is the official website for voter registration and services.",
    difficulty: "easy"
  },
  {
    id: 6,
    question: "If you have a Voter ID card but your name is NOT on the electoral roll, can you vote?",
    options: ["Yes, the card is enough", "No, your name must be on the list", "Yes, with a special permission slip", "Only if you bring your Aadhaar card"],
    correctAnswer: 1,
    explanation: "No. Even if you have a Voter ID card, your name must be present on the current electoral roll to cast a vote.",
    difficulty: "hard"
  }
];

export const FLASHCARDS = [
  {
    id: 1,
    front: "What is an EVM?",
    back: "Electronic Voting Machine. Used to record votes electronically instead of paper ballots."
  },
  {
    id: 2,
    front: "What is Form 6 used for?",
    back: "It is the application form for new voters to register or for shifting residence to a new constituency."
  },
  {
    id: 3,
    front: "What is Form 8 used for?",
    back: "It is used for correcting mistakes on your Voter ID, like name, photo, or address changes."
  },
  {
    id: 4,
    front: "What does VVPAT do?",
    back: "It provides a paper slip visible for 7 seconds, allowing you to verify that your vote went to the correct candidate."
  },
  {
    id: 5,
    front: "Can I vote with an Aadhaar Card instead of a Voter ID?",
    back: "Yes, IF your name is already on the voter list. Aadhaar is one of the accepted alternative identity documents."
  },
  {
    id: 6,
    front: "What is EPIC?",
    back: "Elector's Photo Identity Card. This is the official name for your Voter ID card."
  }
];
