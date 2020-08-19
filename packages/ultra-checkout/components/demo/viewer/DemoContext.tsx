import { createContext, useState, useCallback } from 'react';

interface ComponentRecord {
  name: string;
  isActive: boolean;
  output?: any;
}
interface DemoContent {
  components: Array<ComponentRecord>;
  toggleComponents: any;
}

export const DemoContext = createContext<DemoContent>({
  components: [],
  toggleComponents: () => {},
});

const setup = [
  {
    name: 'guest',
    isActive: true,
  },
  {
    name: 'auth',
    isActive: true,
  },
  {
    name: 'mix',
    isActive: true,
  },
  {
    name: 'swap',
    isActive: false,
  },
  {
    name: 'terminal',
    isActive: true,
  },
];
export const DemoProvider = ({ children }) => {
  const [components, setComponents] = useState(setup);
  const toggleComponents = useCallback(
    ({ name }) => {
      const newList = components.map((component) =>
        component.name === name
          ? { ...component, isActive: !component.isActive }
          : component
      );
      setComponents(newList);
    },
    [components]
  );
  return (
    <DemoContext.Provider value={{ components, toggleComponents }}>
      {children}
    </DemoContext.Provider>
  );
};
