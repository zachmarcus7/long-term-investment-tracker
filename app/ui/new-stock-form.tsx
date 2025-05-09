"use client";

import { useState, useMemo } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { FixedSizeList as List } from 'react-window';
import PrimaryButton from "@/app/ui/primary-button";
import { StockSymbol } from '@/app/lib/definitions';

export default function NewStockForm({
  data,
  onNewStockSubmit,
  pendingAdd
}: { 
  data: StockSymbol[],
  onNewStockSubmit: (selectedStock: StockSymbol) => void,
  pendingAdd: boolean;
}) {
  const [selectedStock, setSelectedStock] = useState<StockSymbol | null>(null);
  const [query, setQuery] = useState('');

  /**
   * Filters the list of stock symbols based on the current search query.
   * It matches the query against both the symbol and the description fields.
   */
  const filteredStocks = useMemo(() => {
    const lower = query.toLowerCase();
    return query === ''
      ? data
      : data.filter(
          (stock) =>
            stock.symbol.toLowerCase().includes(lower) ||
            stock.description.toLowerCase().includes(lower)
        );
  }, [query, data]);

  /**
   * A single row renderer for the virtualized list of filtered stock options.
   * Used in conjunction with react-window to efficiently render only the visible rows 
   * in the headless UI dropdown.
   * 
   * @param param0 - Props containing the current row index and computed style.
   * @returns - JSX for a selectable stock option.
   */
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const stock = filteredStocks[index];
    return (
      <ComboboxOption key={stock.symbol} value={stock} style={style}>
        <div className="p-2 hover:bg-greyish-300/20 cursor-pointer">
          <strong className="text-blueish-600 font-bold text-hb">{stock.symbol}</strong> <span className="text-greyish-300"> - {stock.description}</span>
        </div>
      </ComboboxOption>
    );
  };

  return (
    <div className="h-40 flex flex-col justify-between">

      <div>

        <h6 className="text-greyish-400 pb-2">Available Stocks</h6>

        <Combobox value={selectedStock} onChange={setSelectedStock} onClose={() => setQuery('')}>

          <ComboboxInput
            aria-label="Stock Symbol"
            displayValue={(stock: StockSymbol) => stock?.symbol}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full p-2 rounded placeholder-greyish-300 bg-greyish-300/15 focus:outline-none text-blueish-600"
            placeholder="Type Stock Name Here..."
          />

          {filteredStocks.length > 0 && (
            <ComboboxOptions className="absolute mt-1 bg-white rounded-xl shadow-2xl z-10">
              <List
                height={250}
                width={436}
                itemCount={filteredStocks.length}
                itemSize={45}
              >
                {Row}
              </List>
            </ComboboxOptions>
          )}
        </Combobox>

      </div>

      <PrimaryButton
        text="Track Stock"
        showPlusIcon={true}
        disabled={selectedStock === null}
        loading={pendingAdd}
        onClick={() => {onNewStockSubmit(selectedStock!)}}
      />
  
    </div>
  );
}