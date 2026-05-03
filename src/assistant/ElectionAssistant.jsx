import React, { useState, useRef, useEffect } from 'react';
import { Send, CheckCircle, AlertTriangle, ShieldCheck, HelpCircle, Layers } from 'lucide-react';
import { analyzeIntent, getContextualSuggestions } from './intentEngine';
import { QuizMode, FlashcardsMode } from './LearningMode';
import './Assistant.css';

const SetupFlow = ({ onComplete }) => {
  // ... (keep existing SetupFlow as is, I will replace the main component)
  const [step, setStep] = useState(0);
  const [state, setState] = useState({
    isEligible: false,
    isRegistered: false,
    hasVoterId: false
  });

  const handleAge = (is18Plus) => {
    if (!is18Plus) {
      onComplete({ isEligible: false, isRegistered: false, hasVoterId: false });
    } else {
      setState(s => ({ ...s, isEligible: true }));
      setStep(1);
    }
  };

  const handleReg = (isReg) => {
    setState(s => ({ ...s, isRegistered: isReg }));
    if (!isReg) {
      onComplete({ ...state, isRegistered: false, hasVoterId: false });
    } else {
      setStep(2);
    }
  };

  const handleId = (hasId) => {
    onComplete({ ...state, hasVoterId: hasId });
  };

  return (
    <div className="setup-overlay">
      <div className="setup-card">
        {step === 0 && (
          <>
            <h2>Are you 18 years or older and a citizen?</h2>
            <div className="setup-options">
              <button className="setup-btn" onClick={() => handleAge(true)}>Yes, I am 18+ and a citizen</button>
              <button className="setup-btn" onClick={() => handleAge(false)}>No, I am not</button>
            </div>
          </>
        )}
        {step === 1 && (
          <>
            <h2>Are you registered to vote?</h2>
            <div className="setup-options">
              <button className="setup-btn" onClick={() => handleReg(true)}>Yes, I am registered</button>
              <button className="setup-btn" onClick={() => handleReg(false)}>No / I don't know</button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Do you currently have your Voter ID card?</h2>
            <div className="setup-options">
              <button className="setup-btn" onClick={() => handleId(true)}>Yes, I have it</button>
              <button className="setup-btn" onClick={() => handleId(false)}>No, I lost it or haven't received it</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ElectionAssistant = () => {
  const [userState, setUserState] = useState(null); // null means needs setup
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [activeMode, setActiveMode] = useState(null); // 'quiz' or 'flashcards'
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text, sender, knowledgeData = null) => {
    setMessages(prev => [...prev, { id: Date.now(), text, sender, knowledgeData }]);
  };

  const handleSetupComplete = (state) => {
    setUserState(state);
    
    // Initial contextual greeting
    let greeting = "Hello! I'm your personal Election Advisor.";
    if (!state.isEligible) {
      greeting += " Since you are not yet 18 or a citizen, you cannot vote right now, but I can still explain the process to you!";
    } else if (!state.isRegistered) {
      greeting += " I see you are not registered yet. The first step is to get you on the voter list. How can I help you with that?";
    } else if (!state.hasVoterId) {
      greeting += " You're registered but don't have your Voter ID. Would you like to know how to get a replacement or check your status?";
    } else {
      greeting += " You are fully registered and have your ID! Are you ready for voting day, or do you need to make any corrections?";
    }

    addMessage(greeting, 'assistant');
  };

  const handleSend = (queryOverride = null) => {
    const text = queryOverride || inputValue.trim();
    if (!text) return;

    addMessage(text, 'user');
    setInputValue('');

    // Process intent
    setTimeout(() => {
      const intentData = analyzeIntent(text, userState);
      
      if (intentData) {
        let responseText = `Here is what you need to know about: **${intentData.title}**`;
        addMessage(responseText, 'assistant', intentData);
      } else {
        addMessage("I'm sorry, I didn't quite catch that. I am focused specifically on the election process (registration, missing names, voting day, etc.). Could you try rephrasing your question?", 'assistant');
      }
    }, 500);
  };

  if (!userState) {
    return <SetupFlow onComplete={handleSetupComplete} />;
  }

  const suggestions = getContextualSuggestions(userState);

  return (
    <div className="assistant-container">
      {activeMode === 'quiz' && <QuizMode onClose={() => setActiveMode(null)} />}
      {activeMode === 'flashcards' && <FlashcardsMode onClose={() => setActiveMode(null)} />}

      <header className="assistant-header">
        <div className="header-title">
          <h1>CivicFlow AI</h1>
          <p className="header-subtitle">Your Personal Election Advisor</p>
        </div>
        <div className="profile-summary">
          {userState.isRegistered ? (
            <span className="profile-badge"><CheckCircle size={14} style={{display:'inline', marginBottom:'-2px', marginRight:'4px'}}/> Registered</span>
          ) : (
            <span className="profile-badge warning"><AlertTriangle size={14} style={{display:'inline', marginBottom:'-2px', marginRight:'4px'}}/> Not Registered</span>
          )}
          {userState.hasVoterId ? (
            <span className="profile-badge"><ShieldCheck size={14} style={{display:'inline', marginBottom:'-2px', marginRight:'4px'}}/> Has Voter ID</span>
          ) : null}
        </div>
      </header>

      <main className="chat-area">
        {messages.map((msg) => (
          <div key={msg.id} className={`message-bubble ${msg.sender}`}>
            {msg.sender === 'assistant' ? (
              <div>
                <p style={{margin: 0}}>{msg.text}</p>
                {msg.knowledgeData && (
                  <div className="info-card">
                    <h3>{msg.knowledgeData.title}</h3>
                    <p style={{fontSize: '0.9rem', color: '#cbd5e1', marginBottom: '1rem'}}>{msg.knowledgeData.description}</p>
                    
                    <h4>Step-by-step Instructions:</h4>
                    <ul>
                      {msg.knowledgeData.steps.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ul>

                    {msg.knowledgeData.documents && msg.knowledgeData.documents.length > 0 && (
                      <>
                        <h4>Required Documents:</h4>
                        <ul>
                          {msg.knowledgeData.documents.map((doc, idx) => (
                            <li key={idx}>{doc}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <div className="action-highlight">
                      <strong>Next Step:</strong> {msg.knowledgeData.nextAction}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              msg.text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </main>

      <footer className="input-area">
        <div className="learning-triggers" style={{display: 'flex', gap: '1rem', marginBottom: '1rem'}}>
          <button className="suggestion-chip" style={{borderColor: '#10b981', color: '#10b981'}} onClick={() => setActiveMode('quiz')}>
            <HelpCircle size={14} style={{display:'inline', marginBottom:'-2px', marginRight:'4px'}}/> Take a Quiz
          </button>
          <button className="suggestion-chip" style={{borderColor: '#8b5cf6', color: '#8b5cf6'}} onClick={() => setActiveMode('flashcards')}>
            <Layers size={14} style={{display:'inline', marginBottom:'-2px', marginRight:'4px'}}/> View Flashcards
          </button>
        </div>
        <div className="suggestions">
          {suggestions.map((sug, idx) => (
            <button 
              key={idx} 
              className="suggestion-chip"
              onClick={() => handleSend(sug.query)}
            >
              {sug.label}
            </button>
          ))}
        </div>
        
        <div className="input-box">
          <input 
            type="text" 
            placeholder="Ask me anything about the election process..." 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          />
          <button className="send-button" onClick={() => handleSend()}>
            <Send size={20} />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ElectionAssistant;
