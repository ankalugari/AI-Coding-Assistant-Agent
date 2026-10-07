import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [language, setLanguage] = useState('javascript');

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'Hi! I am CodeMentor AI. How can I help you with coding?',
    },
  ]);

  const [currentProblem, setCurrentProblem] = useState(null);

  const [loading, setLoading] = useState(false);

  const [hintLevel, setHintLevel] = useState(1);

  const [userMemory, setUserMemory] = useState({
    level: 'Beginner',
    preferredLanguage: 'JavaScript',
    learningStyle: 'Simple Explanation',
    weakTopics: [],
    strongTopics: [],
  });

  const addMessage = (role, content) => {
    setMessages((prev) => [
      ...prev,
      {
        role,
        content,
      },
    ]);
  };

  const clearMessages = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Hi! I am CodeMentor AI. How can I help you with coding?',
      },
    ]);
  };

  const resetHint = () => {
    setHintLevel(1);
  };

  const nextHint = () => {
    if (hintLevel < 5) {
      setHintLevel(hintLevel + 1);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,

        messages,
        setMessages,
        addMessage,
        clearMessages,

        currentProblem,
        setCurrentProblem,

        loading,
        setLoading,

        hintLevel,
        setHintLevel,
        nextHint,
        resetHint,

        userMemory,
        setUserMemory,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}