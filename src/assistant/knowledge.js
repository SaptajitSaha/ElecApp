export const ELECTION_KNOWLEDGE = {
  registration: {
    title: "Voter Registration (Form 6)",
    description: "How to register as a new voter in India.",
    steps: [
      "Visit the NVSP portal (voters.eci.gov.in) or download the Voter Helpline App.",
      "Select 'New Voter Registration' and fill out Form 6.",
      "Upload required documents (Age proof, Address proof, Passport-size photo).",
      "Submit the form and save your Reference ID to track status."
    ],
    documents: ["Aadhaar Card / PAN / Birth Certificate (Age)", "Aadhaar / Utility Bill / Passport (Address)", "Recent Photograph"],
    nextAction: "Track your application status on NVSP using the Reference ID."
  },
  correction: {
    title: "Correction or Address Change (Form 8)",
    description: "Update details like name, photo, or address on your Voter ID.",
    steps: [
      "Go to voters.eci.gov.in or the Voter Helpline App.",
      "Select 'Shifting of residence/Correction of entries' (Form 8).",
      "Choose whether you are shifting within the same constituency or outside.",
      "Enter your EPIC (Voter ID) number and update the necessary details.",
      "Upload supporting proof (e.g., new address proof or correct ID)."
    ],
    documents: ["Existing Voter ID (EPIC number)", "Proof for the correction (e.g., utility bill for new address, PAN for name change)"],
    nextAction: "Wait for BLO verification. You will receive an updated Voter ID by post."
  },
  missing_name: {
    title: "Name Missing from Voter List",
    description: "What to do if you have a Voter ID but your name isn't on the electoral roll.",
    steps: [
      "Verify your name on electoral search portal (electoralsearch.eci.gov.in) using your EPIC number.",
      "If it says 'No Record Found', your name has been deleted.",
      "You MUST re-register immediately by filling out Form 6 online via NVSP.",
      "Contact your local Booth Level Officer (BLO) for assistance."
    ],
    documents: ["Previous Voter ID", "Standard Registration Documents (Age/Address Proof)"],
    nextAction: "File Form 6 immediately as you cannot vote without your name on the list."
  },
  lost_id: {
    title: "Lost or Damaged Voter ID",
    description: "Get a replacement Voter ID card.",
    steps: [
      "File an FIR or police complaint online stating the loss of your Voter ID (required in some states).",
      "Visit voters.eci.gov.in and select 'Replacement of EPIC' (Form 8).",
      "Select the reason as 'Lost' or 'Destroyed'.",
      "Pay the nominal fee (if applicable) and submit."
    ],
    documents: ["Copy of FIR/Police Complaint", "Your EPIC number (if remembered)"],
    nextAction: "A duplicate Voter ID will be sent via post."
  },
  voting_day: {
    title: "Voting Day Process",
    description: "What happens at the polling booth.",
    steps: [
      "Find your polling booth location via the Voter Helpline App.",
      "Stand in the queue and present your Voter ID (or approved alternative ID) to the Polling Officer.",
      "The officer will check your name on the list and mark your finger with indelible ink.",
      "Proceed to the voting compartment.",
      "Press the blue button on the EVM next to your chosen candidate. Wait for the red light and the long beep.",
      "Check the VVPAT slip through the glass window for 7 seconds to verify your vote."
    ],
    documents: ["Voter ID Card OR Aadhaar/PAN/Driving License", "Voter Information Slip"],
    nextAction: "Encourage others to vote!"
  }
};
