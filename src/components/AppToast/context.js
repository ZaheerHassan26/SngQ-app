import { createContext } from 'react';

export const AppToastContext = createContext({
  hideAll: () => {},
  show: () => () => {},
});
