import  { useState } from 'react';

const ranges = ['Last 3 months', 'Last 30 days', 'Last 7 days'];

export default function DateRangeToggleGroup() {
  const [selectedRange, setSelectedRange] = useState('Last 7 days');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="col-start-2 row-span-2 row-start-1 self-start justify-self-end">
      {/* Toggle Group (desktop view) */}
      <div
        role="group"
        aria-label="Date range toggle"
        className="group/toggle-group w-fit items-center rounded-md data-[variant=outline]:shadow-xs hidden @[767px]/card:flex"
      >
        {ranges.map((range, _) => (
          <button
            key={range}
            type="button"
            role="radio"
            aria-checked={selectedRange === range}
            data-state={selectedRange === range ? 'on' : 'off'}
            className={`inline-flex items-center justify-center gap-2 text-sm font-medium disabled:pointer-events-none disabled:opacity-50 
              data-[state=on]:bg-accent data-[state=on]:text-accent-foreground 
              border border-input bg-transparent hover:bg-accent hover:text-accent-foreground 
              h-9 px-2 min-w-0 flex-1 shrink-0 rounded-none shadow-none 
              first:rounded-l-md last:rounded-r-md focus:z-10 focus-visible:z-10 
              data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l ${
                selectedRange === range ? 'bg-accent text-accent-foreground' : ''
              }`}
            onClick={() => setSelectedRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      {/* Select dropdown (mobile view) */}
      <button
        type="button"
        role="combobox"
        aria-expanded={dropdownOpen}
        aria-controls="date-range-dropdown"
        className="border-input data-[placeholder]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 
          aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive 
          dark:bg-input/30 dark:hover:bg-input/50 items-center justify-between gap-2 rounded-md border bg-transparent 
          px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none 
          focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 
          data-[size=sm]:h-8 flex w-40 @[767px]/card:hidden"
        aria-label="Select a value"
        onClick={() => setDropdownOpen(!dropdownOpen)}
      >
        <span>{selectedRange}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-chevron-down size-4 opacity-50"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown (mobile only) */}
      {dropdownOpen && (
        <ul
          id="date-range-dropdown"
          role="listbox"
          className="absolute z-50 mt-1 w-40 bg-white dark:bg-black border border-input rounded shadow-md @[767px]/card:hidden"
        >
          {ranges.map((range) => (
            <li
              key={range}
              role="option"
              aria-selected={selectedRange === range}
              className={`px-3 py-2 cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                selectedRange === range ? 'bg-accent text-accent-foreground' : ''
              }`}
              onClick={() => {
                setSelectedRange(range);
                setDropdownOpen(false);
              }}
            >
              {range}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
