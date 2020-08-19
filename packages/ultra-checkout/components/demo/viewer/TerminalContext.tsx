import { useCallback, createContext, useState } from 'react';

interface TerminalContent {
  content: any;
  updateContent: any;
  toggleOutput: any;
}
export const TerminalContext = createContext<TerminalContent>({
  content: {},
  updateContent: () => null,
  toggleOutput: () => null,
});

export const TerminalProvider = ({ children }) => {
  const [content, setContent] = useState({});
  const updateContent = useCallback(
    ({ name, isActive, output }) => {
      console.log({ name, isActive, output });
      setContent((prev) => ({
        ...prev,
        [name]:
          prev[name] && prev[name].output
            ? {
                ...prev[name],
                isActive,
                output: [...prev[name].output, output],
              }
            : { ...prev[name], isActive, output: [output] },
      }));
    },
    [setContent]
  );
  const toggleOutput = useCallback(
    ({ name, isActive }) => {
      setContent((prev) => ({
        ...prev,
        [name]: prev[name]
          ? {
              ...prev[name],
              isActive: !prev[name].isActive,
            }
          : { isActive },
      }));
    },
    [setContent]
  );
  return (
    <TerminalContext.Provider value={{ content, updateContent, toggleOutput }}>
      {children}
    </TerminalContext.Provider>
  );
};
