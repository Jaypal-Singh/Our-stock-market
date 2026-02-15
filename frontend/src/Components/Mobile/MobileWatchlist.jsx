import React from 'react';
import { stocks } from '../../Utils/stockData';

const MobileWatchlist = () => {
    return (
        <div className="md:hidden bg-[#0b0e14] pb-20 font-sans">
            {stocks.map((stock, index) => (
                <div
                    key={index}
                    className="flex justify-between items-center px-4 py-3 border-b border-[#2a2e39] last:border-0 hover:bg-[#1e222d] transition-colors"
                >
                    <div className="flex flex-col">
                        <span className="font-semibold text-[#d1d4dc] text-sm">{stock.name}</span>
                        <span className="text-[10px] text-[#868993] mt-0.5">
                            {stock.name === "COALINDIA" ? "COAL INDIA LTD • NSE" : // Example expansion or just use name
                                stock.name === "IOC" ? "INDIAN OIL CORP LTD • NSE" :
                                    stock.name === "ONGC" ? "OIL AND NATURAL GAS CO... • NSE" :
                                        stock.name + " • NSE"
                            }
                        </span>
                    </div>
                    <div className="text-right">
                        <div className={`font-semibold text-sm ${stock.isUp ? 'text-[#089981]' : 'text-[#f23645]'}`}>
                            {stock.price} {stock.isUp ? "▲" : "▼"}
                        </div>
                        <div className="text-[10px] text-[#868993] mt-0.5">
                            {stock.change} ({stock.percent})
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MobileWatchlist;
