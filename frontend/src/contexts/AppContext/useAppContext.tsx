import { useContext } from 'react';
import { AppContext } from './AppContext';

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined)
    throw new Error(`Can't use AppContext outside AppContextProvider`);
  return context;
};
