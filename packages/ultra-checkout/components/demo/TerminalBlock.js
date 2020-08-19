import { Terminal } from './viewer/Terminal';
import { useDemoComponent } from './viewer/ComponentViewer';

export function TerminalBlock({ name, ...props }) {
  const { isActive } = useDemoComponent({ name });
  if (!isActive) return null;
  return <Terminal {...props} />;
}
