import { useCallback, createContext, useState } from 'react';

interface TerminalContent {
  content: any;
  updateContent: any;
}
export const TerminalContext = createContext<TerminalContent>({
  content: {},
  updateContent: () => null,
});

export const TerminalProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const updateContent = useCallback(
    ({ name, output }) => {
      setContent((prev) => ({
        ...prev,
        [name]:
          prev[name] && prev[name].output
            ? [...prev[name].output, output]
            : [output],
      }));
    },
    [setContent]
  );
  return (
    <TerminalContext.Provider value={{ content, updateContent }}>
      {children}
    </TerminalContext.Provider>
  );
};
