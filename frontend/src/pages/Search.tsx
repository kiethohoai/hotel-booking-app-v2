import useSearchContext from '../contexts/SearchContext/useSearchContext';

const Search = () => {
  const search = useSearchContext();
  console.log(`🚀CHECK > search:`, search);

  return <div>Search Page</div>;
};

export default Search;
