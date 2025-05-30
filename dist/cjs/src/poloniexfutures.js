'use strict';

var Precise = require('./base/Precise.js');
var poloniexfutures$1 = require('./abstract/poloniexfutures.js');
var number = require('./base/functions/number.js');
var errors = require('./base/errors.js');
var sha256 = require('./static_dependencies/noble-hashes/sha256.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class poloniexfutures
 * @augments Exchange
 */
class poloniexfutures extends poloniexfutures$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'poloniexfutures',
            'name': 'Poloniex Futures',
            'countries': ['US'],
            // 30 requests per second
            'rateLimit': 33.3,
            'certified': false,
            'pro': true,
            'version': 'v1',
            'has': {
                'CORS': undefined,
                'spot': false,
                'margin': true,
                'swap': true,
                'future': false,
                'option': undefined,
                'createOrder': true,
                'createStopOrder': true,
                'createTriggerOrder': true,
                'fetchBalance': true,
                'fetchClosedOrders': true,
                'fetchCurrencies': false,
                'fetchDepositAddress': false,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchFundingInterval': true,
                'fetchFundingIntervals': false,
                'fetchFundingRate': true,
                'fetchFundingRateHistory': false,
                'fetchL3OrderBook': true,
                'fetchMarkets': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrdersByStatus': true,
                'fetchPositions': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'setMarginMode': true,
            },
            'timeframes': {
                '1m': 1,
                '5m': 5,
                '15m': 15,
                '30m': 30,
                '1h': 60,
                '2h': 120,
                '4h': 480,
                '12h': 720,
                '1d': 1440,
                '1w': 10080,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766817-e9456312-5ee6-11e7-9b3c-b628ca5626a5.jpg',
                'api': {
                    'public': 'https://futures-api.poloniex.com',
                    'private': 'https://futures-api.poloniex.com',
                },
                'www': 'https://www.poloniex.com',
                'doc': 'https://api-docs.poloniex.com/futures/',
                'fees': 'https://poloniex.com/fee-schedule',
                'referral': 'https://poloniex.com/signup?c=UBFZJRPJ',
            },
            'api': {
                'public': {
                    'get': {
                        'contracts/active': 10,
                        'contracts/{symbol}': 10,
                        'ticker': 10,
                        'tickers': 10,
                        'level2/snapshot': 180.002,
                        'level2/depth': 180.002,
                        'level2/message/query': 180.002,
                        'level3/snapshot': 180.002,
                        'trade/history': 10,
                        'interest/query': 10,
                        'index/query': 10,
                        'mark-price/{symbol}/current': 10,
                        'premium/query': 10,
                        'funding-rate/{symbol}/current': 10,
                        'timestamp': 10,
                        'status': 10,
                        'kline/query': 10,
                    },
                    'post': {
                        'bullet-public': 10,
                    },
                },
                'private': {
                    'get': {
                        'account-overview': 1,
                        'transaction-history': 1,
                        'maxActiveOrders': 1,
                        'maxRiskLimit': 1,
                        'userFeeRate': 1,
                        'marginType/query': 1,
                        'orders': 1,
                        'stopOrders': 1,
                        'recentDoneOrders': 1,
                        'orders/{order-id}': 1,
                        'clientOrderId/{clientOid}': 1,
                        'fills': 1,
                        'openOrderStatistics': 1,
                        'position': 1.5,
                        'positions': 1.5,
                        'funding-history': 1,
                    },
                    'post': {
                        'orders': 1.5,
                        'batchOrders': 1.5,
                        'position/margin/auto-deposit-status': 1.5,
                        'position/margin/deposit-margin': 1.5,
                        'position/margin/withdraw-margin': 1.5,
                        'bullet-private': 1,
                        'marginType/change': 1,
                    },
                    'delete': {
                        'orders/{order-id}': 1.5,
                        'orders': 150.016,
                        'stopOrders': 150.016,
                    },
                },
            },
            'precisionMode': number.TICK_SIZE,
            'fees': {
                'trading': {
                    'tierBased': false,
                    'percentage': true,
                    'taker': this.parseNumber('0.00075'),
                    'maker': this.parseNumber('0.0001'),
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {},
                    'deposit': {},
                },
            },
            'commonCurrencies': {},
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'password': true,
            },
            'options': {
                'networks': {
                    'OMNI': 'omni',
                    'ERC20': 'eth',
                    'TRC20': 'trx',
                },
                'versions': {
                    'public': {
                        'GET': {
                            'ticker': 'v2',
                            'tickers': 'v2',
                            'level3/snapshot': 'v2',
                        },
                    },
                },
            },
            'features': {
                'default': {
                    'sandbox': false,
                    'createOrder': {
                        'marginMode': false,
                        'triggerPrice': true,
                        // todo implementation
                        'triggerPriceType': {
                            'last': true,
                            'mark': true,
                            'index': true,
                        },
                        'triggerDirection': true,
                        'stopLossPrice': false,
                        'takeProfitPrice': false,
                        'attachedStopLossTakeProfit': undefined,
                        'timeInForce': {
                            'IOC': true,
                            'FOK': false,
                            'PO': true,
                            'GTD': false,
                        },
                        'hedged': false,
                        'leverage': true,
                        'marketBuyByCost': true,
                        'marketBuyRequiresPrice': false,
                        'selfTradePrevention': false,
                        'trailing': false,
                        'iceberg': true, // deprecated?
                    },
                    'createOrders': undefined,
                    'fetchMyTrades': {
                        'marginMode': false,
                        'limit': undefined,
                        'daysBack': 100000,
                        'untilDays': 7,
                        'symbolRequired': false,
                    },
                    'fetchOrder': {
                        'marginMode': false,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOpenOrders': {
                        'marginMode': true,
                        'limit': undefined,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': {
                        'marginMode': false,
                        'limit': 100,
                        'daysBack': 100000,
                        'daysBackCanceled': 1,
                        'untilDays': 100000,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOHLCV': {
                        'limit': 200, // todo implement
                    },
                },
                'spot': undefined,
                'swap': {
                    'linear': {
                        'extends': 'default',
                    },
                    'inverse': undefined,
                },
                'future': {
                    'linear': undefined,
                    'inverse': undefined,
                },
            },
            'exceptions': {
                'exact': {
                    '400': errors.BadRequest,
                    '401': errors.AuthenticationError,
                    '403': errors.NotSupported,
                    '404': errors.NotSupported,
                    '405': errors.NotSupported,
                    '415': errors.BadRequest,
                    '429': errors.RateLimitExceeded,
                    '500': errors.ExchangeNotAvailable,
                    '503': errors.ExchangeNotAvailable,
                    '400001': errors.AuthenticationError,
                    '400002': errors.InvalidNonce,
                    '400003': errors.AuthenticationError,
                    '400004': errors.AuthenticationError,
                    '400005': errors.AuthenticationError,
                    '400006': errors.AuthenticationError,
                    '400007': errors.AuthenticationError,
                    '404000': errors.NotSupported,
                    '400100': errors.BadRequest,
                    '411100': errors.AccountSuspended,
                    '500000': errors.ExchangeNotAvailable, // Internal Server Error -- We had a problem with our server. Try again later.
                },
                'broad': {
                    'Position does not exist': errors.OrderNotFound, // { "code":"200000", "msg":"Position does not exist" }
                },
            },
        });
    }
    /**
     * @method
     * @name poloniexfutures#fetchMarkets
     * @description retrieves data on all markets for poloniexfutures
     * @see https://api-docs.poloniex.com/futures/api/symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchMarkets(params = {}) {
        const response = await this.publicGetContractsActive(params);
        //
        // {
        //  "code": "200000",
        //  "data": [
        //     {
        //       "symbol": "APTUSDTPERP",
        //       "takerFixFee": "0E-10",
        //       "nextFundingRateTime": "20145603",
        //       "makerFixFee": "0E-10",
        //       "type": "FFWCSX",
        //       "predictedFundingFeeRate": "0.000000",
        //       "turnoverOf24h": "386037.46704292",
        //       "initialMargin": "0.05",
        //       "isDeleverage": true,
        //       "createdAt": "1666681959000",
        //       "fundingBaseSymbol": ".APTINT8H",
        //       "lowPriceOf24h": "4.34499979019165",
        //       "lastTradePrice": "4.4090000000",
        //       "indexPriceTickSize": "0.001",
        //       "fairMethod": "FundingRate",
        //       "takerFeeRate": "0.00040",
        //       "order": "102",
        //       "updatedAt": "1671076377000",
        //       "displaySettleCurrency": "USDT",
        //       "indexPrice": "4.418",
        //       "multiplier": "1.0",
        //       "maxLeverage": "20",
        //       "fundingQuoteSymbol": ".USDTINT8H",
        //       "quoteCurrency": "USDT",
        //       "maxOrderQty": "1000000",
        //       "maxPrice": "1000000.0000000000",
        //       "maintainMargin": "0.025",
        //       "status": "Open",
        //       "displayNameMap": [Object],
        //       "openInterest": "2367",
        //       "highPriceOf24h": "4.763999938964844",
        //       "fundingFeeRate": "0.000000",
        //       "volumeOf24h": "83540.00000000",
        //       "riskStep": "500000",
        //       "isQuanto": true,
        //       "maxRiskLimit": "20000",
        //       "rootSymbol": "USDT",
        //       "baseCurrency": "APT",
        //       "firstOpenDate": "1666701000000",
        //       "tickSize": "0.001",
        //       "markMethod": "FairPrice",
        //       "indexSymbol": ".PAPTUSDT",
        //       "markPrice": "4.418",
        //       "minRiskLimit": "1000000",
        //       "settlementFixFee": "0E-10",
        //       "settlementSymbol": '',
        //       "priceChgPctOf24h": "-0.0704",
        //       "fundingRateSymbol": ".APTUSDTPERPFPI8H",
        //       "makerFeeRate": "0.00010",
        //       "isInverse": false,
        //       "lotSize": "1",
        //       "settleCurrency": "USDT",
        //       "settlementFeeRate": "0.0"
        //     },
        //   ]
        // }
        //
        const data = this.safeValue(response, 'data', []);
        return this.parseMarkets(data);
    }
    parseMarket(market) {
        const id = this.safeString(market, 'symbol');
        const baseId = this.safeString(market, 'baseCurrency');
        const quoteId = this.safeString(market, 'quoteCurrency');
        const settleId = this.safeString(market, 'rootSymbol');
        const base = this.safeCurrencyCode(baseId);
        const quote = this.safeCurrencyCode(quoteId);
        const settle = this.safeCurrencyCode(settleId);
        const symbol = base + '/' + quote + ':' + settle;
        const inverse = this.safeValue(market, 'isInverse');
        const status = this.safeString(market, 'status');
        const multiplier = this.safeString(market, 'multiplier');
        const tickSize = this.safeNumber(market, 'indexPriceTickSize');
        const lotSize = this.safeNumber(market, 'lotSize');
        const limitAmountMax = this.safeNumber(market, 'maxOrderQty');
        const limitPriceMax = this.safeNumber(market, 'maxPrice');
        return {
            'id': id,
            'symbol': symbol,
            'base': base,
            'quote': quote,
            'settle': settle,
            'baseId': baseId,
            'quoteId': quoteId,
            'settleId': settleId,
            'type': 'swap',
            'spot': false,
            'margin': false,
            'swap': true,
            'future': false,
            'option': false,
            'active': (status === 'Open'),
            'contract': true,
            'linear': !inverse,
            'inverse': inverse,
            'taker': this.safeNumber(market, 'takerFeeRate'),
            'maker': this.safeNumber(market, 'makerFeeRate'),
            'contractSize': this.parseNumber(Precise["default"].stringAbs(multiplier)),
            'expiry': undefined,
            'expiryDatetime': undefined,
            'strike': undefined,
            'optionType': undefined,
            'precision': {
                'amount': lotSize,
                'price': tickSize,
            },
            'limits': {
                'leverage': {
                    'min': this.parseNumber('1'),
                    'max': this.safeNumber(market, 'maxLeverage'),
                },
                'amount': {
                    'min': lotSize,
                    'max': limitAmountMax,
                },
                'price': {
                    'min': tickSize,
                    'max': limitPriceMax,
                },
                'cost': {
                    'min': undefined,
                    'max': undefined,
                },
            },
            'created': this.safeInteger(market, 'firstOpenDate'),
            'info': market,
        };
    }
    parseTicker(ticker, market = undefined) {
        //
        //    {
        //        "symbol": "BTCUSDTPERP",                   // Market of the symbol
        //        "sequence": 45,                            // Sequence number which is used to judge the continuity of the pushed messages
        //        "side": "sell",                            // Transaction side of the last traded taker order
        //        "price": 3600.00,                          // Filled price
        //        "size": 16,                                // Filled quantity
        //        "tradeId": "5c9dcf4170744d6f5a3d32fb",     // Order ID
        //        "bestBidSize": 795,                        // Best bid size
        //        "bestBidPrice": 3200.00,                   // Best bid
        //        "bestAskPrice": 3600.00,                   // Best ask size
        //        "bestAskSize": 284,                        // Best ask
        //        "ts": 1553846081210004941                  // Filled time - nanosecond
        //    }
        //
        //    {
        //        "volume": 30449670,            //24h Volume
        //        "turnover": 845169919063,      //24h Turnover
        //        "lastPrice": 3551,           //Last price
        //        "priceChgPct": 0.0043,         //24h Change
        //        "ts": 1547697294838004923      //Snapshot time (nanosecond)
        //    }
        //
        const marketId = this.safeString(ticker, 'symbol');
        const symbol = this.safeSymbol(marketId, market);
        const timestampString = this.safeString(ticker, 'ts');
        let multiplier = undefined;
        if (timestampString.length === 16) {
            // 16 digits: https://app.travis-ci.com/github/ccxt/ccxt/builds/270587157#L5454
            multiplier = 0.001;
        }
        else if (timestampString.length === 17) {
            // 17 digits: https://app.travis-ci.com/github/ccxt/ccxt/builds/269959181#L4011
            multiplier = 0.0001;
        }
        else if (timestampString.length === 18) {
            multiplier = 0.00001;
        }
        else {
            // 19 length default
            multiplier = 0.000001;
        }
        const timestamp = this.safeIntegerProduct(ticker, 'ts', multiplier);
        const last = this.safeString2(ticker, 'price', 'lastPrice');
        const percentage = Precise["default"].stringMul(this.safeString(ticker, 'priceChgPct'), '100');
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': undefined,
            'low': undefined,
            'bid': this.safeString(ticker, 'bestBidPrice'),
            'bidVolume': this.safeString(ticker, 'bestBidSize'),
            'ask': this.safeString(ticker, 'bestAskPrice'),
            'askVolume': this.safeString(ticker, 'bestAskSize'),
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': percentage,
            'average': undefined,
            'baseVolume': this.safeString2(ticker, 'size', 'volume'),
            'quoteVolume': this.safeString(ticker, 'turnover'),
            'info': ticker,
        }, market);
    }
    /**
     * @method
     * @name poloniexfutures#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://api-docs.poloniex.com/futures/api/ticker#get-real-time-ticker-20
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTicker(symbol, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetTicker(this.extend(request, params));
        //
        // {
        //     "code": "200000",
        //     "data": {
        //       "sequence": "11574719",
        //       "symbol": "BTCUSDTPERP",
        //       "side": "sell",
        //       "size": "1",
        //       "price": "16990.1",
        //       "bestBidSize": "3",
        //       "bestBidPrice": "16990.1",
        //       "bestAskPrice": "16991.0",
        //       "tradeId": "639c8a529fd7cf0001af4157",
        //       "bestAskSize": "505",
        //       "ts": "1671203410721232337"
        //     }
        // }
        //
        return this.parseTicker(this.safeValue(response, 'data', {}), market);
    }
    /**
     * @method
     * @name poloniexfutures#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://api-docs.poloniex.com/futures/api/ticker#get-real-time-ticker-of-all-symbols
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetTickers(params);
        const data = this.safeList(response, 'data', []);
        return this.parseTickers(data, symbols);
    }
    /**
     * @method
     * @name poloniexfuturesfutures#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://api-docs.poloniex.com/futures/api/orderbook#get-full-order-book---level-2
     * @see https://api-docs.poloniex.com/futures/api/orderbook#get-full-order-book--level-3
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const level = this.safeNumber(params, 'level');
        params = this.omit(params, 'level');
        if (level !== undefined && level !== 2 && level !== 3) {
            throw new errors.BadRequest(this.id + ' fetchOrderBook() can only return level 2 & 3');
        }
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        let response = undefined;
        if (level === 3) {
            response = await this.publicGetLevel3Snapshot(this.extend(request, params));
        }
        else {
            response = await this.publicGetLevel2Snapshot(this.extend(request, params));
        }
        // L2
        //
        // {
        //     "code": "200000",
        //     "data": {
        //     "symbol": "BTCUSDTPERP",
        //     "sequence": 1669149851334,
        //     "asks": [
        //         [
        //             16952,
        //             12
        //         ],
        //     ],
        //     "bids": [
        //         [
        //             16951.9,
        //             13
        //         ],
        //     ],
        // }
        //
        // L3
        //
        // {
        //     "code": "200000",
        //     "data": {
        //     "symbol": "BTCUSDTPERP",
        //     "sequence": 1669149851334,
        //     "asks": [
        //         [
        //             "639c95388cba5100084eabce",
        //             "16952.0",
        //             "1",
        //             1671206200542484700
        //         ],
        //     ],
        //     "bids": [
        //         [
        //             "626659d83385c200072e690b",
        //             "17.0",
        //             "1000",
        //             1650874840161291000
        //         ],
        //     ],
        // }
        //
        const data = this.safeValue(response, 'data', {});
        const timestamp = this.safeIntegerProduct(data, 'ts', 0.000001);
        let orderbook = undefined;
        if (level === 3) {
            orderbook = this.parseOrderBook(data, market['symbol'], timestamp, 'bids', 'asks', 1, 2);
        }
        else {
            orderbook = this.parseOrderBook(data, market['symbol'], timestamp, 'bids', 'asks', 0, 1);
        }
        orderbook['nonce'] = this.safeInteger(data, 'sequence');
        return orderbook;
    }
    /**
     * @method
     * @name poloniexfutures#fetchL3OrderBook
     * @description fetches level 3 information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://api-docs.poloniex.com/futures/api/orderbook#get-full-order-book--level-3
     * @param {string} symbol unified market symbol
     * @param {int} [limit] max number of orders to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order book structure]{@link https://docs.ccxt.com/#/?id=order-book-structure}
     */
    async fetchL3OrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        return this.fetchOrderBook(market['id'], undefined, { 'level': 3 });
    }
    parseTrade(trade, market = undefined) {
        //
        // fetchTrades (public)
        //
        //     {
        //         "sequence": 11827985,
        //         "side": "buy",
        //         "size": 101,
        //         "price": "16864.0000000000",
        //         "takerOrderId": "639c986f0ac2470007be75ee",
        //         "makerOrderId": "639c986fa69d280007b76111",
        //         "tradeId": "639c986f9fd7cf0001afd7ee",
        //         "ts": 1671207023485924400
        //     }
        //
        // fetchMyTrades
        //
        //   {
        //       "symbol": "BTCUSDTPERP",  //Ticker symbol of the contract
        //       "tradeId": "5ce24c1f0c19fc3c58edc47c",  //Trade ID
        //       "orderId": "5ce24c16b210233c36ee321d",  // Order ID
        //       "side": "sell",  //Transaction side
        //       "liquidity": "taker",  //Liquidity- taker or maker
        //       "price": "8302",  //Filled price
        //       "size": 10,  //Filled amount
        //       "value": "0.001204529",  //Order value
        //       "feeRate": "0.0005",  //Floating fees
        //       "fixFee": "0.00000006",  //Fixed fees
        //       "feeCurrency": "XBT",  //Charging currency
        //       "stop": "",  //A mark to the stop order type
        //       "fee": "0.0000012022",  //Transaction fee
        //       "orderType": "limit",  //Order type
        //       "tradeType": "trade",  //Trade type (trade, liquidation, ADL or settlement)
        //       "createdAt": 1558334496000,  //Time the order created
        //       "settleCurrency": "XBT", //settlement currency
        //       "tradeTime": 1558334496000000000 //trade time in nanosecond
        //   }
        //
        const marketId = this.safeString(trade, 'symbol');
        market = this.safeMarket(marketId, market, '-');
        const id = this.safeString(trade, 'tradeId');
        const orderId = this.safeString(trade, 'orderId');
        const takerOrMaker = this.safeString(trade, 'liquidity');
        let timestamp = this.safeInteger(trade, 'ts');
        if (timestamp !== undefined) {
            timestamp = this.parseToInt(timestamp / 1000000);
        }
        else {
            timestamp = this.safeInteger(trade, 'createdAt');
            // if it's a historical v1 trade, the exchange returns timestamp in seconds
            if (('dealValue' in trade) && (timestamp !== undefined)) {
                timestamp = timestamp * 1000;
            }
        }
        const priceString = this.safeString(trade, 'price');
        const amountString = this.safeString(trade, 'size');
        const side = this.safeString(trade, 'side');
        let fee = undefined;
        const feeCostString = this.safeString(trade, 'fee');
        if (feeCostString !== undefined) {
            const feeCurrencyId = this.safeString(trade, 'feeCurrency');
            let feeCurrency = this.safeCurrencyCode(feeCurrencyId);
            if (feeCurrency === undefined) {
                feeCurrency = (side === 'sell') ? market['quote'] : market['base'];
            }
            fee = {
                'cost': feeCostString,
                'currency': feeCurrency,
                'rate': this.safeString(trade, 'feeRate'),
            };
        }
        let type = this.safeString(trade, 'orderType');
        if (type === 'match') {
            type = undefined;
        }
        const costString = this.safeString(trade, 'value');
        return this.safeTrade({
            'info': trade,
            'id': id,
            'order': orderId,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': market['symbol'],
            'type': type,
            'takerOrMaker': takerOrMaker,
            'side': side,
            'price': priceString,
            'amount': amountString,
            'cost': costString,
            'fee': fee,
        }, market);
    }
    /**
     * @method
     * @name poloniexfutures#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://api-docs.poloniex.com/futures/api/historical#transaction-history
     * @param {string} symbol unified symbol of the market to fetch trades for
     * @param {int} [since] timestamp in ms of the earliest trade to fetch
     * @param {int} [limit] the maximum amount of trades to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
     */
    async fetchTrades(symbol, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetTradeHistory(this.extend(request, params));
        //
        //    {
        //        "code": "200000",
        //        "data": [
        //        {
        //          "sequence": 11827985,
        //          "side": "buy",
        //          "size": 101,
        //          "price": "16864.0000000000",
        //          "takerOrderId": "639c986f0ac2470007be75ee",
        //          "makerOrderId": "639c986fa69d280007b76111",
        //          "tradeId": "639c986f9fd7cf0001afd7ee",
        //          "ts": 1671207023485924400
        //        },
        //    }
        //
        const trades = this.safeList(response, 'data', []);
        return this.parseTrades(trades, market, since, limit);
    }
    /**
     * @method
     * @name poloniexfutures#fetchTime
     * @description fetches the current integer timestamp in milliseconds from the poloniexfutures server
     * @see https://api-docs.poloniex.com/futures/api/time#server-time
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int} the current integer timestamp in milliseconds from the poloniexfutures server
     */
    async fetchTime(params = {}) {
        const response = await this.publicGetTimestamp(params);
        //
        // {
        //     "code":"200000",
        //     "msg":"success",
        //     "data":1546837113087
        // }
        //
        return this.safeInteger(response, 'data');
    }
    /**
     * @method
     * @name poloniexfutures#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @see https://api-docs.poloniex.com/futures/api/kline#get-k-line-data-of-contract
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const marketId = market['id'];
        const parsedTimeframe = this.safeInteger(this.timeframes, timeframe);
        const request = {
            'symbol': marketId,
        };
        if (parsedTimeframe !== undefined) {
            request['granularity'] = parsedTimeframe;
        }
        else {
            request['granularity'] = timeframe;
        }
        const duration = this.parseTimeframe(timeframe) * 1000;
        let endAt = this.milliseconds();
        if (since !== undefined) {
            request['from'] = since;
            if (limit === undefined) {
                limit = this.safeInteger(this.options, 'fetchOHLCVLimit', 200);
            }
            endAt = this.sum(since, limit * duration);
            request['to'] = endAt;
        }
        else if (limit !== undefined) {
            since = endAt - limit * duration;
            request['from'] = since;
        }
        const response = await this.publicGetKlineQuery(this.extend(request, params));
        //
        //    {
        //        "code": "200000",
        //        "data": [
        //            [1636459200000, 4779.3, 4792.1, 4768.7, 4770.3, 78051],
        //            [1636460100000, 4770.25, 4778.55, 4757.55, 4777.25, 80164],
        //            [1636461000000, 4777.25, 4791.45, 4774.5, 4791.3, 51555]
        //        ]
        //    }
        //
        const data = this.safeList(response, 'data', []);
        return this.parseOHLCVs(data, market, timeframe, since, limit);
    }
    parseBalance(response) {
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        const data = this.safeValue(response, 'data');
        const currencyId = this.safeString(data, 'currency');
        const code = this.safeCurrencyCode(currencyId);
        const account = this.account();
        account['free'] = this.safeString(data, 'availableBalance');
        account['total'] = this.safeString(data, 'accountEquity');
        result[code] = account;
        return this.safeBalance(result);
    }
    /**
     * @method
     * @name poloniexfutures#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @see https://api-docs.poloniex.com/futures/api/account#get-account-overview
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance(params = {}) {
        await this.loadMarkets();
        const currencyId = this.safeString(params, 'currency');
        let request = {};
        if (currencyId !== undefined) {
            const currency = this.currency(currencyId);
            request = {
                'currency': currency['id'],
            };
        }
        const response = await this.privateGetAccountOverview(this.extend(request, params));
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "accountEquity": 0.00005,
        //             "unrealisedPNL": 0,
        //             "marginBalance": 0.00005,
        //             "positionMargin": 0,
        //             "orderMargin": 0,
        //             "frozenFunds": 0,
        //             "availableBalance": 0.00005,
        //             "currency": "XBT"
        //         }
        //     }
        //
        return this.parseBalance(response);
    }
    /**
     * @method
     * @name poloniexfutures#createOrder
     * @description Create an order on the exchange
     * @see https://api-docs.poloniex.com/futures/api/orders#place-an-order
     * @param {string} symbol Unified CCXT market symbol
     * @param {string} type 'limit' or 'market'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount the amount of currency to trade
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params]  extra parameters specific to the exchange API endpoint
     * @param {float} [params.leverage] Leverage size of the order
     * @param {float} [params.triggerPrice] The price at which a trigger order is triggered at
     * @param {bool} [params.reduceOnly] A mark to reduce the position size only. Set to false by default. Need to set the position size when reduceOnly is true.
     * @param {string} [params.timeInForce] GTC, GTT, IOC, or FOK, default is GTC, limit orders only
     * @param {string} [params.postOnly] Post only flag, invalid when timeInForce is IOC or FOK
     * @param {string} [params.clientOid] client order id, defaults to uuid if not passed
     * @param {string} [params.remark] remark for the order, length cannot exceed 100 utf8 characters
     * @param {string} [params.stop] 'up' or 'down', defaults to 'up' if side is sell and 'down' if side is buy, requires stopPrice
     * @param {string} [params.stopPriceType]  TP, IP or MP, defaults to TP
     * @param {bool} [params.closeOrder] set to true to close position
     * @param {bool} [params.forceHold] A mark to forcely hold the funds for an order, even though it's an order to reduce the position size. This helps the order stay on the order book and not get canceled when the position size changes. Set to false by default.
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        // required param, cannot be used twice
        const clientOrderId = this.safeString2(params, 'clientOid', 'clientOrderId', this.uuid());
        params = this.omit(params, ['clientOid', 'clientOrderId']);
        if (amount < 1) {
            throw new errors.InvalidOrder(this.id + ' createOrder() minimum contract order amount is 1');
        }
        const preciseAmount = parseInt(this.amountToPrecision(symbol, amount));
        const request = {
            'clientOid': clientOrderId,
            'side': side,
            'symbol': market['id'],
            'type': type,
            'size': preciseAmount,
            'leverage': 1,
        };
        const triggerPrice = this.safeValue2(params, 'triggerPrice', 'stopPrice');
        if (triggerPrice) {
            request['stop'] = (side === 'buy') ? 'up' : 'down';
            const stopPriceType = this.safeString(params, 'stopPriceType', 'TP');
            request['stopPriceType'] = stopPriceType;
            request['stopPrice'] = this.priceToPrecision(symbol, triggerPrice);
        }
        const timeInForce = this.safeStringUpper(params, 'timeInForce');
        if (type === 'limit') {
            if (price === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' createOrder() requires a price argument for limit orders');
            }
            else {
                request['price'] = this.priceToPrecision(symbol, price);
            }
            if (timeInForce !== undefined) {
                request['timeInForce'] = timeInForce;
            }
        }
        const postOnly = this.safeBool(params, 'postOnly', false);
        const hidden = this.safeValue(params, 'hidden');
        if (postOnly && (hidden !== undefined)) {
            throw new errors.BadRequest(this.id + ' createOrder() does not support the postOnly parameter together with a hidden parameter');
        }
        const iceberg = this.safeValue(params, 'iceberg');
        if (iceberg) {
            const visibleSize = this.safeValue(params, 'visibleSize');
            if (visibleSize === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' createOrder() requires a visibleSize parameter for iceberg orders');
            }
        }
        params = this.omit(params, ['timeInForce', 'stopPrice', 'triggerPrice']); // Time in force only valid for limit orders, exchange error when gtc for market orders
        const response = await this.privatePostOrders(this.extend(request, params));
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //            "orderId": "619717484f1d010001510cde",
        //        },
        //    }
        //
        const data = this.safeValue(response, 'data', {});
        return this.safeOrder({
            'id': this.safeString(data, 'orderId'),
            'clientOrderId': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'lastTradeTimestamp': undefined,
            'symbol': undefined,
            'type': undefined,
            'side': undefined,
            'price': undefined,
            'amount': undefined,
            'cost': undefined,
            'average': undefined,
            'filled': undefined,
            'remaining': undefined,
            'status': undefined,
            'fee': undefined,
            'trades': undefined,
            'timeInForce': undefined,
            'postOnly': undefined,
            'triggerPrice': undefined,
            'info': response,
        }, market);
    }
    /**
     * @method
     * @name poloniexfutures#cancelOrder
     * @description cancels an open order
     * @see https://api-docs.poloniex.com/futures/api/orders#cancel-an-order
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {
            'order-id': id,
        };
        const response = await this.privateDeleteOrdersOrderId(this.extend(request, params));
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //            "cancelledOrderIds": [
        //                "619714b8b6353000014c505a",
        //            ],
        //            "cancelFailedOrders": [
        //                {
        //                    "orderId": "63a9c5c2b9e7d70007eb0cd5",
        //                    "orderState": "2"
        //                }
        //            ],
        //        },
        //    }
        //
        const data = this.safeValue(response, 'data');
        const cancelledOrderIds = this.safeValue(data, 'cancelledOrderIds');
        const cancelledOrderIdsLength = cancelledOrderIds.length;
        if (cancelledOrderIdsLength === 0) {
            throw new errors.InvalidOrder(this.id + ' cancelOrder() order already cancelled');
        }
        return this.parseOrder(data);
    }
    /**
     * @method
     * @name poloniexfutures#fetchPositions
     * @description fetch all open positions
     * @see https://api-docs.poloniex.com/futures/api/positions#get-position-list
     * @param {string[]|undefined} symbols list of unified market symbols
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
     */
    async fetchPositions(symbols = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.privateGetPositions(params);
        //
        //    {
        //        "code": "200000",
        //        "data": [
        //            {
        //                "id": "615ba79f83a3410001cde321",
        //                "symbol": "ETHUSDTM",
        //                "autoDeposit": false,
        //                "maintMarginReq": 0.005,
        //                "riskLimit": 1000000,
        //                "realLeverage": 18.61,
        //                "crossMode": false,
        //                "delevPercentage": 0.86,
        //                "openingTimestamp": 1638563515618,
        //                "currentTimestamp": 1638576872774,
        //                "currentQty": 2,
        //                "currentCost": 83.64200000,
        //                "currentComm": 0.05018520,
        //                "unrealisedCost": 83.64200000,
        //                "realisedGrossCost": 0.00000000,
        //                "realisedCost": 0.05018520,
        //                "isOpen": true,
        //                "markPrice": 4225.01,
        //                "markValue": 84.50020000,
        //                "posCost": 83.64200000,
        //                "posCross": 0.0000000000,
        //                "posInit": 3.63660870,
        //                "posComm": 0.05236717,
        //                "posLoss": 0.00000000,
        //                "posMargin": 3.68897586,
        //                "posMaint": 0.50637594,
        //                "maintMargin": 4.54717586,
        //                "realisedGrossPnl": 0.00000000,
        //                "realisedPnl": -0.05018520,
        //                "unrealisedPnl": 0.85820000,
        //                "unrealisedPnlPcnt": 0.0103,
        //                "unrealisedRoePcnt": 0.2360,
        //                "avgEntryPrice": 4182.10,
        //                "liquidationPrice": 4023.00,
        //                "bankruptPrice": 4000.25,
        //                "settleCurrency": "USDT",
        //                "isInverse": false
        //            }
        //        ]
        //    }
        //
        const data = this.safeList(response, 'data');
        return this.parsePositions(data, symbols);
    }
    parsePosition(position, market = undefined) {
        //
        //    {
        //        "code": "200000",
        //        "data": [
        //            {
        //                "id": "615ba79f83a3410001cde321",         // Position ID
        //                "symbol": "ETHUSDTM",                     // Symbol
        //                "autoDeposit": false,                     // Auto deposit margin or not
        //                "maintMarginReq": 0.005,                  // Maintenance margin requirement
        //                "riskLimit": 1000000,                     // Risk limit
        //                "realLeverage": 25.92,                    // Leverage of the order
        //                "crossMode": false,                       // Cross mode or not
        //                "delevPercentage": 0.76,                  // ADL ranking percentile
        //                "openingTimestamp": 1638578546031,        // Open time
        //                "currentTimestamp": 1638578563580,        // Current timestamp
        //                "currentQty": 2,                          // Current postion quantity
        //                "currentCost": 83.787,                    // Current postion value
        //                "currentComm": 0.0167574,                 // Current commission
        //                "unrealisedCost": 83.787,                 // Unrealised value
        //                "realisedGrossCost": 0.0,                 // Accumulated realised gross profit value
        //                "realisedCost": 0.0167574,                // Current realised position value
        //                "isOpen": true,                           // Opened position or not
        //                "markPrice": 4183.38,                     // Mark price
        //                "markValue": 83.6676,                     // Mark value
        //                "posCost": 83.787,                        // Position value
        //                "posCross": 0.0,                          // added margin
        //                "posInit": 3.35148,                       // Leverage margin
        //                "posComm": 0.05228309,                    // Bankruptcy cost
        //                "posLoss": 0.0,                           // Funding fees paid out
        //                "posMargin": 3.40376309,                  // Position margin
        //                "posMaint": 0.50707892,                   // Maintenance margin
        //                "maintMargin": 3.28436309,                // Position margin
        //                "realisedGrossPnl": 0.0,                  // Accumulated realised gross profit value
        //                "realisedPnl": -0.0167574,                // Realised profit and loss
        //                "unrealisedPnl": -0.1194,                 // Unrealised profit and loss
        //                "unrealisedPnlPcnt": -0.0014,             // Profit-loss ratio of the position
        //                "unrealisedRoePcnt": -0.0356,             // Rate of return on investment
        //                "avgEntryPrice": 4189.35,                 // Average entry price
        //                "liquidationPrice": 4044.55,              // Liquidation price
        //                "bankruptPrice": 4021.75,                 // Bankruptcy price
        //                "settleCurrency": "USDT",                 // Currency used to clear and settle the trades
        //                "isInverse": false
        //            }
        //        ]
        //    }
        //
        const symbol = this.safeString(position, 'symbol');
        market = this.safeMarket(symbol, market);
        const timestamp = this.safeInteger(position, 'currentTimestamp');
        const size = this.safeString(position, 'currentQty');
        let side;
        if (Precise["default"].stringGt(size, '0')) {
            side = 'long';
        }
        else if (Precise["default"].stringLt(size, '0')) {
            side = 'short';
        }
        const notional = Precise["default"].stringAbs(this.safeString(position, 'posCost'));
        const initialMargin = this.safeString(position, 'posInit');
        const initialMarginPercentage = Precise["default"].stringDiv(initialMargin, notional);
        // const marginRatio = Precise.stringDiv (maintenanceRate, collateral);
        const unrealisedPnl = this.safeString(position, 'unrealisedPnl');
        const crossMode = this.safeValue(position, 'crossMode');
        // currently crossMode is always set to false and only isolated positions are supported
        const marginMode = crossMode ? 'cross' : 'isolated';
        return {
            'info': position,
            'id': undefined,
            'symbol': this.safeString(market, 'symbol'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'initialMargin': this.parseNumber(initialMargin),
            'initialMarginPercentage': this.parseNumber(initialMarginPercentage),
            'maintenanceMargin': this.safeNumber(position, 'posMaint'),
            'maintenanceMarginPercentage': this.safeNumber(position, 'maintMarginReq'),
            'entryPrice': this.safeNumber(position, 'avgEntryPrice'),
            'notional': this.parseNumber(notional),
            'leverage': this.safeNumber(position, 'realLeverage'),
            'unrealizedPnl': this.parseNumber(unrealisedPnl),
            'contracts': this.parseNumber(Precise["default"].stringAbs(size)),
            'contractSize': this.safeValue(market, 'contractSize'),
            'marginRatio': undefined,
            'liquidationPrice': this.safeNumber(position, 'liquidationPrice'),
            'markPrice': this.safeNumber(position, 'markPrice'),
            'collateral': this.safeNumber(position, 'maintMargin'),
            'marginMode': marginMode,
            'side': side,
            'percentage': this.parseNumber(Precise["default"].stringDiv(unrealisedPnl, initialMargin)),
            'stopLossPrice': undefined,
            'takeProfitPrice': undefined,
        };
    }
    /**
     * @method
     * @name poloniexfutures#fetchFundingHistory
     * @description fetch the history of funding payments paid and received on this account
     * @see https://api-docs.poloniex.com/futures/api/funding-fees#get-funding-history
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch funding history for
     * @param {int} [limit] the maximum number of funding history structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [funding history structure]{@link https://docs.ccxt.com/#/?id=funding-history-structure}
     */
    async fetchFundingHistory(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchFundingHistory() requires a symbol argument');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        if (since !== undefined) {
            request['startAt'] = since;
        }
        if (limit !== undefined) {
            // * Since is ignored if limit is defined
            request['maxCount'] = limit;
        }
        const response = await this.privateGetFundingHistory(this.extend(request, params));
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //            "dataList": [
        //                {
        //                    "id": 239471298749817,
        //                    "symbol": "ETHUSDTM",
        //                    "timePoint": 1638532800000,
        //                    "fundingRate": 0.000100,
        //                    "markPrice": 4612.8300000000,
        //                    "positionQty": 12,
        //                    "positionCost": 553.5396000000,
        //                    "funding": -0.0553539600,
        //                    "settleCurrency": "USDT"
        //                },
        //                ...
        //            ],
        //            "hasMore": true
        //        }
        //    }
        //
        const data = this.safeValue(response, 'data');
        const dataList = this.safeValue(data, 'dataList', []);
        const dataListLength = dataList.length;
        const fees = [];
        for (let i = 0; i < dataListLength; i++) {
            const listItem = dataList[i];
            const timestamp = this.safeInteger(listItem, 'timePoint');
            fees.push({
                'info': listItem,
                'symbol': symbol,
                'code': this.safeCurrencyCode(this.safeString(listItem, 'settleCurrency')),
                'timestamp': timestamp,
                'datetime': this.iso8601(timestamp),
                'id': this.safeNumber(listItem, 'id'),
                'amount': this.safeNumber(listItem, 'funding'),
                'fundingRate': this.safeNumber(listItem, 'fundingRate'),
                'markPrice': this.safeNumber(listItem, 'markPrice'),
                'positionQty': this.safeNumber(listItem, 'positionQty'),
                'positionCost': this.safeNumber(listItem, 'positionCost'),
            });
        }
        return fees;
    }
    /**
     * @method
     * @name poloniexfutures#cancelAllOrders
     * @description cancel all open orders
     * @param {string} symbol unified market symbol, only orders in the market of this symbol are cancelled when symbol is not undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {object} [params.trigger] When true, all the trigger orders will be cancelled
     * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelAllOrders(symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        if (symbol !== undefined) {
            request['symbol'] = this.marketId(symbol);
        }
        const trigger = this.safeValue2(params, 'stop', 'trigger');
        params = this.omit(params, ['stop', 'trigger']);
        let response = undefined;
        if (trigger) {
            response = await this.privateDeleteStopOrders(this.extend(request, params));
        }
        else {
            response = await this.privateDeleteOrders(this.extend(request, params));
        }
        //
        //   {
        //       "code": "200000",
        //       "data": {
        //           "cancelledOrderIds": [
        //                "619714b8b6353000014c505a",
        //           ],
        //       },
        //   }
        //
        const data = this.safeValue(response, 'data');
        const result = [];
        const cancelledOrderIds = this.safeValue(data, 'cancelledOrderIds');
        const cancelledOrderIdsLength = cancelledOrderIds.length;
        for (let i = 0; i < cancelledOrderIdsLength; i++) {
            const cancelledOrderId = this.safeString(cancelledOrderIds, i);
            result.push(this.safeOrder({
                'id': cancelledOrderId,
                'clientOrderId': undefined,
                'timestamp': undefined,
                'datetime': undefined,
                'lastTradeTimestamp': undefined,
                'symbol': undefined,
                'type': undefined,
                'side': undefined,
                'price': undefined,
                'amount': undefined,
                'cost': undefined,
                'average': undefined,
                'filled': undefined,
                'remaining': undefined,
                'status': undefined,
                'fee': undefined,
                'trades': undefined,
                'timeInForce': undefined,
                'postOnly': undefined,
                'triggerPrice': undefined,
                'info': response,
            }));
        }
        return result;
    }
    /**
     * @method
     * @name poloniexfutures#fetchOrdersByStatus
     * @description fetches a list of orders placed on the exchange
     * @see https://api-docs.poloniex.com/futures/api/orders#get-order-listdeprecated
     * @see https://api-docs.poloniex.com/futures/api/orders#get-untriggered-stop-order-list
     * @param {string} status 'active' or 'closed', only 'active' is valid for stop orders
     * @param {string} symbol unified symbol for the market to retrieve orders from
     * @param {int} [since] timestamp in ms of the earliest order to retrieve
     * @param {int} [limit] The maximum number of orders to retrieve
     * @param {object} [params] exchange specific parameters
     * @param {bool} [params.stop] set to true to retrieve untriggered stop orders
     * @param {int} [params.until] End time in ms
     * @param {string} [params.side] buy or sell
     * @param {string} [params.type] limit or market
     * @returns An [array of order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrdersByStatus(status, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const trigger = this.safeValue2(params, 'stop', 'trigger');
        const until = this.safeInteger(params, 'until');
        params = this.omit(params, ['trigger', 'stop', 'until']);
        if (status === 'closed') {
            status = 'done';
        }
        const request = {};
        if (!trigger) {
            request['status'] = (status === 'open') ? 'active' : 'done';
        }
        else if (status !== 'open') {
            throw new errors.BadRequest(this.id + ' fetchOrdersByStatus() can only fetch untriggered stop orders');
        }
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        if (since !== undefined) {
            request['startAt'] = since;
        }
        if (until !== undefined) {
            request['endAt'] = until;
        }
        let response = undefined;
        if (trigger) {
            response = await this.privateGetStopOrders(this.extend(request, params));
        }
        else {
            response = await this.privateGetOrders(this.extend(request, params));
        }
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //            "totalNum": 1,
        //            "totalPage": 1,
        //            "pageSize": 50,
        //            "currentPage": 1,
        //            "items": [
        //                {
        //                    "symbol": "ADAUSDTPERP",
        //                    "leverage": "1",
        //                    "hidden": false,
        //                    "forceHold": false,
        //                    "closeOrder": false,
        //                    "type": "limit",
        //                    "isActive": true,
        //                    "createdAt": 1678936920000,
        //                    "orderTime": 1678936920480905922,
        //                    "price": "0.3",
        //                    "iceberg": false,
        //                    "stopTriggered": false,
        //                    "id": "64128b582cc0710007a3c840",
        //                    "value": "3",
        //                    "timeInForce": "GTC",
        //                    "updatedAt": 1678936920000,
        //                    "side": "buy",
        //                    "stopPriceType": "",
        //                    "dealValue": "0",
        //                    "dealSize": 0,
        //                    "settleCurrency": "USDT",
        //                    "stp": "",
        //                    "filledValue": "0",
        //                    "postOnly": false,
        //                    "size": 1,
        //                    "stop": "",
        //                    "filledSize": 0,
        //                    "reduceOnly": false,
        //                    "marginType": 1,
        //                    "cancelExist": false,
        //                    "clientOid": "ba669f39-dfcc-4664-9801-a42d06e59c2e",
        //                    "status": "open"
        //                }
        //            ]
        //        }
        //    }
        //
        const responseData = this.safeValue(response, 'data', {});
        const orders = this.safeValue(responseData, 'items', []);
        const ordersLength = orders.length;
        const result = [];
        for (let i = 0; i < ordersLength; i++) {
            const order = orders[i];
            const orderStatus = this.safeString(order, 'status');
            if (status === orderStatus) {
                result.push(orders[i]);
            }
        }
        return this.parseOrders(result, market, since, limit);
    }
    /**
     * @method
     * @name poloniexfutures#fetchOpenOrders
     * @description fetch all unfilled currently open orders
     * @see https://api-docs.poloniex.com/futures/api/orders#get-order-listdeprecated
     * @see https://api-docs.poloniex.com/futures/api/orders#get-untriggered-stop-order-list
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of  open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] end time in ms
     * @param {string} [params.side] buy or sell
     * @param {string} [params.type] limit, or market
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        return await this.fetchOrdersByStatus('open', symbol, since, limit, params);
    }
    /**
     * @method
     * @name poloniexfutures#fetchClosedOrders
     * @description fetches information on multiple closed orders made by the user
     * @see https://api-docs.poloniex.com/futures/api/orders#get-order-listdeprecated
     * @see https://api-docs.poloniex.com/futures/api/orders#get-untriggered-stop-order-list
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of order structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] end time in ms
     * @param {string} [params.side] buy or sell
     * @param {string} [params.type] limit, or market
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        return await this.fetchOrdersByStatus('closed', symbol, since, limit, params);
    }
    /**
     * @method
     * @name poloniexfutures#fetchOrder
     * @description fetches information on an order made by the user
     * @see https://api-docs.poloniex.com/futures/api/orders#get-details-of-a-single-order
     * @see https://api-docs.poloniex.com/futures/api/orders#get-single-order-by-clientoid
     * @param {string} id the order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        let response = undefined;
        if (id === undefined) {
            const clientOrderId = this.safeString2(params, 'clientOid', 'clientOrderId');
            if (clientOrderId === undefined) {
                throw new errors.InvalidOrder(this.id + ' fetchOrder() requires parameter id or params.clientOid');
            }
            request['clientOid'] = clientOrderId;
            params = this.omit(params, ['clientOid', 'clientOrderId']);
            response = await this.privateGetClientOrderIdClientOid(this.extend(request, params));
        }
        else {
            request['order-id'] = id;
            response = await this.privateGetOrdersOrderId(this.extend(request, params));
        }
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //            "symbol": "ADAUSDTPERP",
        //            "leverage": "1",
        //            "hidden": false,
        //            "forceHold": false,
        //            "closeOrder": false,
        //            "type": "market",
        //            "isActive": false,
        //            "createdAt": 1678929587000,
        //            "orderTime": 1678929587248115582,
        //            "iceberg": false,
        //            "stopTriggered": false,
        //            "id": "64126eb38c6919000737dcdc",
        //            "value": "3.1783",
        //            "timeInForce": "GTC",
        //            "updatedAt": 1678929587000,
        //            "side": "buy",
        //            "stopPriceType": "",
        //            "dealValue": "3.1783",
        //            "dealSize": 1,
        //            "settleCurrency": "USDT",
        //            "trades": [
        //                {
        //                    "feePay": "0.00158915",
        //                    "tradeId": "64126eb36803eb0001ff99bc"
        //                }
        //            ],
        //            "endAt": 1678929587000,
        //            "stp": "",
        //            "filledValue": "3.1783",
        //            "postOnly": false,
        //            "size": 1,
        //            "stop": "",
        //            "filledSize": 1,
        //            "reduceOnly": false,
        //            "marginType": 1,
        //            "cancelExist": false,
        //            "clientOid": "d19e8fcb-2df4-44bc-afd4-67dd42048246",
        //            "status": "done"
        //        }
        //    }
        //
        const market = (symbol !== undefined) ? this.market(symbol) : undefined;
        const responseData = this.safeDict(response, 'data');
        return this.parseOrder(responseData, market);
    }
    parseOrder(order, market = undefined) {
        //
        // createOrder
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //            "orderId": "619717484f1d010001510cde",
        //        },
        //    }
        //
        // fetchOrder
        //
        //    {
        //        "symbol": "ADAUSDTPERP",
        //        "leverage": "1",
        //        "hidden": false,
        //        "forceHold": false,
        //        "closeOrder": false,
        //        "type": "market",
        //        "isActive": false,
        //        "createdAt": 1678929587000,
        //        "orderTime": 1678929587248115582,
        //        "iceberg": false,
        //        "stopTriggered": false,
        //        "id": "64126eb38c6919000737dcdc",
        //        "value": "3.1783",
        //        "timeInForce": "GTC",
        //        "updatedAt": 1678929587000,
        //        "side": "buy",
        //        "stopPriceType": "",
        //        "dealValue": "3.1783",
        //        "dealSize": 1,
        //        "settleCurrency": "USDT",
        //        "trades": [
        //            {
        //                "feePay": "0.00158915",
        //                "tradeId": "64126eb36803eb0001ff99bc"
        //            }
        //        ],
        //        "endAt": 1678929587000,
        //        "stp": "",
        //        "filledValue": "3.1783",
        //        "postOnly": false,
        //        "size": 1,
        //        "stop": "",
        //        "filledSize": 1,
        //        "reduceOnly": false,
        //        "marginType": 1,
        //        "cancelExist": false,
        //        "clientOid": "d19e8fcb-2df4-44bc-afd4-67dd42048246",
        //        "status": "done"
        //    }
        //
        // cancelOrder
        //
        //    {
        //        "cancelledOrderIds": [
        //            "619714b8b6353000014c505a",
        //        ],
        //        "cancelFailedOrders": [
        //            {
        //                "orderId": "63a9c5c2b9e7d70007eb0cd5",
        //                "orderState": "2"
        //            }
        //        ],
        //    },
        //
        const marketId = this.safeString(order, 'symbol');
        market = this.safeMarket(marketId, market);
        const timestamp = this.safeInteger(order, 'createdAt');
        // price is zero for market order
        // omitZero is called in safeOrder2
        const feeCurrencyId = this.safeString(order, 'feeCurrency');
        const filled = this.safeString(order, 'dealSize');
        const rawCost = this.safeString2(order, 'dealFunds', 'filledValue');
        let average = undefined;
        if (Precise["default"].stringGt(filled, '0')) {
            const contractSize = this.safeString(market, 'contractSize');
            if (market['linear']) {
                average = Precise["default"].stringDiv(rawCost, Precise["default"].stringMul(contractSize, filled));
            }
            else {
                average = Precise["default"].stringDiv(Precise["default"].stringMul(contractSize, filled), rawCost);
            }
        }
        // precision reported by their api is 8 d.p.
        // const average = Precise.stringDiv (rawCost, Precise.stringMul (filled, market['contractSize']));
        // bool
        const isActive = this.safeBool(order, 'isActive', false);
        const cancelExist = this.safeBool(order, 'cancelExist', false);
        const status = isActive ? 'open' : 'closed';
        let id = this.safeString(order, 'id');
        if ('cancelledOrderIds' in order) {
            const cancelledOrderIds = this.safeValue(order, 'cancelledOrderIds');
            id = this.safeString(cancelledOrderIds, 0);
        }
        return this.safeOrder({
            'info': order,
            'id': id,
            'clientOrderId': this.safeString(order, 'clientOid'),
            'symbol': this.safeString(market, 'symbol'),
            'type': this.safeString(order, 'type'),
            'timeInForce': this.safeString(order, 'timeInForce'),
            'postOnly': this.safeValue(order, 'postOnly'),
            'side': this.safeString(order, 'side'),
            'amount': this.safeString(order, 'size'),
            'price': this.safeString(order, 'price'),
            'triggerPrice': this.safeString(order, 'stopPrice'),
            'cost': this.safeString(order, 'dealValue'),
            'filled': filled,
            'remaining': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'fee': {
                'currency': this.safeCurrencyCode(feeCurrencyId),
                'cost': this.safeString(order, 'fee'),
            },
            'status': cancelExist ? 'canceled' : status,
            'lastTradeTimestamp': undefined,
            'average': average,
            'trades': undefined,
        }, market);
    }
    /**
     * @method
     * @name poloniexfutures#fetchFundingRate
     * @description fetch the current funding rate
     * @see https://api-docs.poloniex.com/futures/api/futures-index#get-premium-index
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [funding rate structure]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
     */
    async fetchFundingRate(symbol, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetFundingRateSymbolCurrent(this.extend(request, params));
        //
        //    {
        //        "symbol": ".BTCUSDTPERPFPI8H",
        //        "granularity": 28800000,
        //        "timePoint": 1558000800000,
        //        "value": 0.00375,
        //        "predictedValue": 0.00375
        //    }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseFundingRate(data, market);
    }
    /**
     * @method
     * @name poloniexfutures#fetchFundingInterval
     * @description fetch the current funding rate interval
     * @see https://api-docs.poloniex.com/futures/api/futures-index#get-premium-index
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [funding rate structure]{@link https://docs.ccxt.com/#/?id=funding-rate-structure}
     */
    async fetchFundingInterval(symbol, params = {}) {
        return await this.fetchFundingRate(symbol, params);
    }
    parseFundingRate(data, market = undefined) {
        //
        //     {
        //         "symbol": ".ETHUSDTMFPI8H",
        //         "granularity": 28800000,
        //         "timePoint": 1637380800000,
        //         "value": 0.0001,
        //         "predictedValue": 0.0001,
        //     }
        //
        const fundingTimestamp = this.safeInteger(data, 'timePoint');
        const marketId = this.safeString(data, 'symbol');
        return {
            'info': data,
            'symbol': this.safeSymbol(marketId, market, undefined, 'contract'),
            'markPrice': undefined,
            'indexPrice': undefined,
            'interestRate': undefined,
            'estimatedSettlePrice': undefined,
            'timestamp': undefined,
            'datetime': undefined,
            'fundingRate': this.safeNumber(data, 'value'),
            'fundingTimestamp': fundingTimestamp,
            'fundingDatetime': this.iso8601(fundingTimestamp),
            'nextFundingRate': this.safeNumber(data, 'predictedValue'),
            'nextFundingTimestamp': undefined,
            'nextFundingDatetime': undefined,
            'previousFundingRate': undefined,
            'previousFundingTimestamp': undefined,
            'previousFundingDatetime': undefined,
            'interval': this.parseFundingInterval(this.safeString(data, 'granularity')),
        };
    }
    parseFundingInterval(interval) {
        const intervals = {
            '3600000': '1h',
            '14400000': '4h',
            '28800000': '8h',
            '57600000': '16h',
            '86400000': '24h',
        };
        return this.safeString(intervals, interval, interval);
    }
    /**
     * @method
     * @name poloniexfutures#fetchMyTrades
     * @description fetch all trades made by the user
     * @see https://api-docs.poloniex.com/futures/api/fills#get-fillsdeprecated
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.orderIdFills] filles for a specific order (other parameters can be ignored if specified)
     * @param {string} [params.side] buy or sell
     * @param {string} [params.type]  limit, market, limit_stop or market_stop
     * @param {int} [params.endAt] end time (milisecond)
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        if (since !== undefined) {
            request['startAt'] = since;
        }
        const response = await this.privateGetFills(this.extend(request, params));
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //          "currentPage":1,
        //          "pageSize":1,
        //          "totalNum":251915,
        //          "totalPage":251915,
        //          "items":[
        //              {
        //                "symbol": "BTCUSDTPERP",  //Ticker symbol of the contract
        //                "tradeId": "5ce24c1f0c19fc3c58edc47c",  //Trade ID
        //                "orderId": "5ce24c16b210233c36ee321d",  // Order ID
        //                "side": "sell",  //Transaction side
        //                "liquidity": "taker",  //Liquidity- taker or maker
        //                "price": "8302",  //Filled price
        //                "size": 10,  //Filled amount
        //                "value": "0.001204529",  //Order value
        //                "feeRate": "0.0005",  //Floating fees
        //                "fixFee": "0.00000006",  //Fixed fees
        //                "feeCurrency": "XBT",  //Charging currency
        //                "stop": "",  //A mark to the stop order type
        //                "fee": "0.0000012022",  //Transaction fee
        //                "orderType": "limit",  //Order type
        //                "tradeType": "trade",  //Trade type (trade, liquidation, ADL or settlement)
        //                "createdAt": 1558334496000,  //Time the order created
        //                "settleCurrency": "XBT", //settlement currency
        //                "tradeTime": 1558334496000000000 //trade time in nanosecond
        //              }
        //          ]
        //        }
        //    }
        //
        const data = this.safeValue(response, 'data', {});
        const trades = this.safeList(data, 'items', []);
        return this.parseTrades(trades, market, since, limit);
    }
    /**
     * @method
     * @name poloniexfutures#setMarginMode
     * @description set margin mode to 'cross' or 'isolated'
     * @see https://api-docs.poloniex.com/futures/api/margin-mode#change-margin-mode
     * @param {string} marginMode "0" (isolated) or "1" (cross)
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} response from the exchange
     */
    async setMarginMode(marginMode, symbol = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setMarginMode() requires a symbol argument');
        }
        if ((marginMode !== '0') && (marginMode !== '1') && (marginMode !== 'isolated') && (marginMode !== 'cross')) {
            throw new errors.ArgumentsRequired(this.id + ' setMarginMode() marginMode must be 0/isolated or 1/cross');
        }
        await this.loadMarkets();
        if (marginMode === 'isolated') {
            marginMode = '0';
        }
        if (marginMode === 'cross') {
            marginMode = '1';
        }
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
            'marginType': this.parseToInt(marginMode),
        };
        return await this.privatePostMarginTypeChange(request);
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = this.urls['api'][api];
        const versions = this.safeValue(this.options, 'versions', {});
        const apiVersions = this.safeValue(versions, api, {});
        const methodVersions = this.safeValue(apiVersions, method, {});
        const defaultVersion = this.safeString(methodVersions, path, this.version);
        const version = this.safeString(params, 'version', defaultVersion);
        const tail = '/api/' + version + '/' + this.implodeParams(path, params);
        url += tail;
        const query = this.omit(params, this.extractParams(path));
        const queryLength = Object.keys(query).length;
        if (api === 'public') {
            if (queryLength) {
                url += '?' + this.urlencode(query);
            }
        }
        else {
            this.checkRequiredCredentials();
            let endpoint = '/api/v1/' + this.implodeParams(path, params);
            const bodyEncoded = this.urlencode(query);
            if (method !== 'GET' && method !== 'HEAD') {
                body = query;
            }
            else {
                if (queryLength && bodyEncoded !== '') {
                    url += '?' + bodyEncoded;
                    endpoint += '?' + bodyEncoded;
                }
            }
            const now = this.milliseconds().toString();
            let endpart = '';
            if (body !== undefined) {
                body = this.json(query);
                endpart = body;
            }
            const payload = now + method + endpoint + endpart;
            const signature = this.hmac(this.encode(payload), this.encode(this.secret), sha256.sha256, 'base64');
            headers = {
                'PF-API-SIGN': signature,
                'PF-API-TIMESTAMP': now,
                'PF-API-KEY': this.apiKey,
                'PF-API-PASSPHRASE': this.password,
            };
            headers['Content-Type'] = 'application/json';
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    handleErrors(code, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (!response) {
            this.throwBroadlyMatchedException(this.exceptions['broad'], body, body);
            return undefined;
        }
        //
        // bad
        //     { "code": "400100", "msg": "validation.createOrder.clientOidIsRequired" }
        // good
        //     { code: "200000", data: { ... }}
        //
        const errorCode = this.safeString(response, 'code');
        const message = this.safeString(response, 'msg', '');
        const feedback = this.id + ' ' + message;
        this.throwExactlyMatchedException(this.exceptions['exact'], message, feedback);
        this.throwExactlyMatchedException(this.exceptions['exact'], errorCode, feedback);
        this.throwBroadlyMatchedException(this.exceptions['broad'], body, feedback);
        return undefined;
    }
}

module.exports = poloniexfutures;
