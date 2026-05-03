import React, { useState, useEffect } from 'react';
import { HelpCircle, Hand, ChevronRight, Vote, MapPin, UserCheck, ShieldCheck, ArrowRight } from 'lucide-react';
import './ElectionAssistant.css';

const ELECTION_FLOW = {
  start: {
    step: 1,
    type: 'question',
    text: "Welcome to the Election Guide. Are you eligible to vote?",
    icon: <HelpCircle size={32} />,
    options: [
      { id: 'eligible_yes', text: "Yes, I am a citizen & 18+", target: 'registration' },
      { id: 'eligible_no', text: "No, or I'm not sure", target: 'eligibility_info' }
    ]
  },
  eligibility_info: {
    step: 1,
    type: 'info',
    text: "To vote, you generally must be a citizen, meet your state's residency requirements, and be 18 years old on or before Election Day.",
    icon: <UserCheck size={32} />,
    next: 'registration'
  },
  registration: {
    step: 2,
    type: 'question',
    text: "Are you registered to vote at your current address?",
    icon: <MapPin size={32} />,
    options: [
      { id: 'reg_yes', text: "Yes, I'm registered!", target: 'campaigning' },
      { id: 'reg_no', text: "No, how do I register?", target: 'registration_info' }
    ]
  },
  registration_info: {
    step: 2,
    type: 'info',
    text: "You can register online, by mail, or in person at local election offices. Deadlines vary by state (often 15-30 days before election).",
    icon: <ShieldCheck size={32} />,
    next: 'campaigning'
  },
  campaigning: {
    step: 3,
    type: 'question',
    text: "Do you know who or what is on your ballot?",
    icon: <Vote size={32} />,
    options: [
      { id: 'camp_yes', text: "Yes, I've done my research.", target: 'voting_process' },
      { id: 'camp_no', text: "No, where do I find out?", target: 'campaigning_info' }
    ]
  },
  campaigning_info: {
    step: 3,
    type: 'info',
    text: "Check your state's election website for a sample ballot. Non-partisan sites like Vote411.org also provide candidate info.",
    icon: <HelpCircle size={32} />,
    next: 'voting_process'
  },
  voting_process: {
    step: 4,
    type: 'question',
    text: "How do you plan to vote?",
    icon: <Hand size={32} />,
    options: [
      { id: 'vote_person', text: "In-person on Election Day", target: 'results' },
      { id: 'vote_mail', text: "By Mail / Absentee", target: 'results' }
    ]
  },
  results: {
    step: 5,
    type: 'results',
    text: "Awesome! After voting, election officials verify and count ballots securely. Official results take time as every valid vote is counted.",
    icon: <ShieldCheck size={32} />,
    next: null
  }
};

const TOTAL_STEPS = 5;

const ElectionAssistant = () => {
  const [currentNodeId, setCurrentNodeId] = useState('start');
  const [animating, setAnimating] = useState(false);
  
  const currentNode = ELECTION_FLOW[currentNodeId];

  const handleNavigate = (targetId) => {
    if (!targetId) return;
    
    // Trigger exit animation
    setAnimating(true);
    
    setTimeout(() => {
      setCurrentNodeId(targetId);
      // Let React render the new node, then remove animation state to trigger enter animation
      setTimeout(() => setAnimating(false), 50);
    }, 300); // Wait for exit animation
  };

  const progressPercentage = ((currentNode.step - 1) / (TOTAL_STEPS - 1)) * 100;

  return (
    <div className="assistant-container">
      {/* Background Shapes */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
      <div className="bg-shape shape-3"></div>

      <div className="title-header">
        <h1>CivicFlow</h1>
        <p>Interactive Election Guide</p>
      </div>

      <div className="assistant-content">
        <div className="progress-container">
          <span className="progress-text">Step {currentNode.step} of {TOTAL_STEPS}</span>
          <div className="progress-bar-bg">
            <div 
              className="progress-bar-fill" 
              style={{ width: `${Math.max(5, progressPercentage)}%` }}
            ></div>
          </div>
        </div>

        {/* Use a key based on node ID to force re-render and re-trigger enter animation */}
        <div key={currentNodeId} className={`card ${currentNode.type} ${animating ? 'fade-out' : ''}`}>
          <div className="card-icon">
            {currentNode.icon}
          </div>
          
          <h2 className="card-text">{currentNode.text}</h2>

          {currentNode.type === 'question' && (
            <div className="options-container">
              {currentNode.options.map(opt => (
                <button 
                  key={opt.id} 
                  className="option-button"
                  onClick={() => handleNavigate(opt.target)}
                >
                  <span>{opt.text}</span>
                  <ChevronRight size={18} opacity={0.6} />
                </button>
              ))}
            </div>
          )}

          {(currentNode.type === 'info' || currentNode.type === 'results') && currentNode.next && (
            <button 
              className="continue-button"
              onClick={() => handleNavigate(currentNode.next)}
            >
              Continue <ArrowRight size={18} />
            </button>
          )}

          {currentNode.type === 'results' && !currentNode.next && (
            <button 
              className="continue-button"
              onClick={() => {
                setCurrentNodeId('start');
              }}
            >
              Start Over
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectionAssistant;
