import { useContext } from 'react';
import { SearchContext } from './SearchContext';

const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (context === undefined)
    throw new Error('Cannot use SearchContext outside the SearchContextProvider!');
  return context;
};

export default useSearchContext;
