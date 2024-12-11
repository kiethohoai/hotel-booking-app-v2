export type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

function Pagination({ page, pages, onPageChange }: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center">
      <ul className="flex border bg-slate-200">
        {pageNumbers.map((number, i) => (
          <li
            key={`pagination-${i}`}
            className={`px-2 py-1 ${page === number ? 'bg-blue-200' : ''}`}
          >
            <button onClick={() => onPageChange(number)} className="">
              {number}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Pagination;
