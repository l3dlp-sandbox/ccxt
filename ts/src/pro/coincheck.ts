
//  ---------------------------------------------------------------------------

import coincheckRest from '../coincheck.js';
import { AuthenticationError } from '../base/errors.js';
import type { Int, Market, OrderBook, Trade, Dict } from '../base/types.js';
import Client from '../base/ws/Client.js';
import { ArrayCache } from '../base/ws/Cache.js';

//  ---------------------------------------------------------------------------

export default class coincheck extends coincheckRest {
    describe (): any {
        return this.deepExtend (super.describe (), {
            'has': {
                'ws': true,
                'watchOrderBook': true,
                'watchOrders': false,
                'watchTrades': true,
                'watchTradesForSymbols': false,
                'watchOHLCV': false,
                'watchTicker': false,
                'watchTickers': false,
            },
            'urls': {
                'api': {
                    'ws': 'wss://ws-api.coincheck.com/',
                },
            },
            'options': {
                'expiresIn': '',
                'userId': '',
                'wsSessionToken': '',
                'watchOrderBook': {
                    'snapshotDelay': 6,
                    'snapshotMaxRetries': 3,
                },
                'tradesLimit': 1000,
                'OHLCVLimit': 1000,
            },
            'exceptions': {
                'exact': {
                    '4009': AuthenticationError,
                },
            },
        });
    }

    /**
     * @method
     * @name coincheck#watchOrderBook
     * @description watches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://coincheck.com/documents/exchange/api#websocket-order-book
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    async watchOrderBook (symbol: string, limit: Int = undefined, params = {}): Promise<OrderBook> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        const messageHash = 'orderbook:' + market['symbol'];
        const url = this.urls['api']['ws'];
        const request: Dict = {
            'type': 'subscribe',
            'channel': market['id'] + '-orderbook',
        };
        const message = this.extend (request, params);
        const orderbook = await this.watch (url, messageHash, message, messageHash);
        return orderbook.limit ();
    }

    handleOrderBook (client, message) {
        //
        //     [
        //         "btc_jpy",
        //         {
        //             "bids": [
        //                 [
        //                     "6288279.0",
        //                     "0"
        //                 ]
        //             ],
        //             "asks": [
        //                 [
        //                     "6290314.0",
        //                     "0"
        //                 ]
        //             ],
        //             "last_update_at": "1705396097"
        //         }
        //     ]
        //
        const symbol = this.symbol (this.safeString (message, 0));
        const data = this.safeValue (message, 1, {});
        const timestamp = this.safeTimestamp (data, 'last_update_at');
        const snapshot = this.parseOrderBook (data, symbol, timestamp);
        let orderbook = this.safeValue (this.orderbooks, symbol);
        if (orderbook === undefined) {
            orderbook = this.orderBook (snapshot);
            this.orderbooks[symbol] = orderbook;
        } else {
            orderbook = this.orderbooks[symbol];
            orderbook.reset (snapshot);
        }
        const messageHash = 'orderbook:' + symbol;
        client.resolve (orderbook, messageHash);
    }

    /**
     * @method
     * @name coincheck#watchTrades
     * @description watches information on multiple trades made in a market
     * @see https://coincheck.com/documents/exchange/api#websocket-trades
     * @param {string} symbol unified market symbol of the market trades were made in
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trade structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async watchTrades (symbol: string, since: Int = undefined, limit: Int = undefined, params = {}): Promise<Trade[]> {
        await this.loadMarkets ();
        const market = this.market (symbol);
        symbol = market['symbol'];
        const messageHash = 'trade:' + market['symbol'];
        const url = this.urls['api']['ws'];
        const request: Dict = {
            'type': 'subscribe',
            'channel': market['id'] + '-trades',
        };
        const message = this.extend (request, params);
        const trades = await this.watch (url, messageHash, message, messageHash);
        if (this.newUpdates) {
            limit = trades.getLimit (symbol, limit);
        }
        return this.filterBySinceLimit (trades, since, limit, 'timestamp', true);
    }

    handleTrades (client: Client, message) {
        //
        //     [
        //         [
        //             "1663318663", // transaction timestamp (unix time)
        //             "2357062", // transaction ID
        //             "btc_jpy", // pair
        //             "2820896.0", // transaction rate
        //             "5.0", // transaction amount
        //             "sell", // order side
        //             "1193401", // ID of the Taker
        //             "2078767" // ID of the Maker
        //         ]
        //     ]
        //
        const first = this.safeValue (message, 0, []);
        const symbol = this.symbol (this.safeString (first, 2));
        let stored = this.safeValue (this.trades, symbol);
        if (stored === undefined) {
            const limit = this.safeInteger (this.options, 'tradesLimit', 1000);
            stored = new ArrayCache (limit);
            this.trades[symbol] = stored;
        }
        for (let i = 0; i < message.length; i++) {
            const data = this.safeValue (message, i);
            const trade = this.parseWsTrade (data);
            stored.append (trade);
        }
        const messageHash = 'trade:' + symbol;
        client.resolve (stored, messageHash);
    }

    parseWsTrade (trade: Dict, market: Market = undefined): Trade {
        //
        //     [
        //         "1663318663", // transaction timestamp (unix time)
        //         "2357062", // transaction ID
        //         "btc_jpy", // pair
        //         "2820896.0", // transaction rate
        //         "5.0", // transaction amount
        //         "sell", // order side
        //         "1193401", // ID of the Taker
        //         "2078767" // ID of the Maker
        //     ]
        //
        const symbol = this.symbol (this.safeString (trade, 2));
        const timestamp = this.safeTimestamp (trade, 0);
        const side = this.safeString (trade, 5);
        const priceString = this.safeString (trade, 3);
        const amountString = this.safeString (trade, 4);
        return this.safeTrade ({
            'id': this.safeString (trade, 1),
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601 (timestamp),
            'order': undefined,
            'symbol': symbol,
            'type': undefined,
            'side': side,
            'takerOrMaker': undefined,
            'price': priceString,
            'amount': amountString,
            'cost': undefined,
            'fee': undefined,
        }, market);
    }

    handleMessage (client: Client, message) {
        const data = this.safeValue (message, 0);
        if (!Array.isArray (data)) {
            this.handleOrderBook (client, message);
        } else {
            this.handleTrades (client, message);
        }
    }
}
