'use strict';

var exmo$1 = require('./abstract/exmo.js');
var errors = require('./base/errors.js');
var Precise = require('./base/Precise.js');
var number = require('./base/functions/number.js');
var sha512 = require('./static_dependencies/noble-hashes/sha512.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class exmo
 * @augments Exchange
 */
class exmo extends exmo$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'exmo',
            'name': 'EXMO',
            'countries': ['LT'],
            'rateLimit': 100,
            'version': 'v1.1',
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': true,
                'swap': false,
                'future': false,
                'option': false,
                'addMargin': true,
                'cancelOrder': true,
                'cancelOrders': false,
                'createDepositAddress': false,
                'createMarketBuyOrder': true,
                'createMarketBuyOrderWithCost': true,
                'createMarketOrderWithCost': true,
                'createOrder': true,
                'createStopLimitOrder': true,
                'createStopMarketOrder': true,
                'createStopOrder': true,
                'editOrder': true,
                'fetchAccounts': false,
                'fetchBalance': true,
                'fetchCanceledOrders': true,
                'fetchCurrencies': true,
                'fetchDeposit': true,
                'fetchDepositAddress': true,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': false,
                'fetchDeposits': true,
                'fetchDepositsWithdrawals': true,
                'fetchDepositWithdrawFee': 'emulated',
                'fetchDepositWithdrawFees': true,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchMarginMode': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOrder': 'emulated',
                'fetchOrderBook': true,
                'fetchOrderBooks': true,
                'fetchOrderTrades': true,
                'fetchPosition': false,
                'fetchPositionHistory': false,
                'fetchPositionMode': false,
                'fetchPositions': false,
                'fetchPositionsHistory': false,
                'fetchPositionsRisk': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTrades': true,
                'fetchTradingFee': false,
                'fetchTradingFees': true,
                'fetchTransactionFees': true,
                'fetchTransactions': 'emulated',
                'fetchTransfer': false,
                'fetchTransfers': false,
                'fetchWithdrawal': true,
                'fetchWithdrawals': true,
                'reduceMargin': true,
                'setMargin': false,
                'transfer': false,
                'withdraw': true,
            },
            'timeframes': {
                '1m': '1',
                '5m': '5',
                '15m': '15',
                '30m': '30',
                '45m': '45',
                '1h': '60',
                '2h': '120',
                '3h': '180',
                '4h': '240',
                '1d': 'D',
                '1w': 'W',
                '1M': 'M',
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/1294454/27766491-1b0ea956-5eda-11e7-9225-40d67b481b8d.jpg',
                'api': {
                    'public': 'https://api.exmo.com',
                    'private': 'https://api.exmo.com',
                    'web': 'https://exmo.me',
                },
                'www': 'https://exmo.me',
                'referral': 'https://exmo.me/?ref=131685',
                'doc': [
                    'https://exmo.me/en/api_doc?ref=131685',
                ],
                'fees': 'https://exmo.com/en/docs/fees',
            },
            'api': {
                'web': {
                    'get': [
                        'ctrl/feesAndLimits',
                        'en/docs/fees',
                    ],
                },
                'public': {
                    'get': [
                        'currency',
                        'currency/list/extended',
                        'order_book',
                        'pair_settings',
                        'ticker',
                        'trades',
                        'candles_history',
                        'required_amount',
                        'payments/providers/crypto/list',
                    ],
                },
                'private': {
                    'post': [
                        'user_info',
                        'order_create',
                        'order_cancel',
                        'stop_market_order_create',
                        'stop_market_order_cancel',
                        'user_open_orders',
                        'user_trades',
                        'user_cancelled_orders',
                        'order_trades',
                        'deposit_address',
                        'withdraw_crypt',
                        'withdraw_get_txid',
                        'excode_create',
                        'excode_load',
                        'code_check',
                        'wallet_history',
                        'wallet_operations',
                        'margin/user/order/create',
                        'margin/user/order/update',
                        'margin/user/order/cancel',
                        'margin/user/position/close',
                        'margin/user/position/margin_add',
                        'margin/user/position/margin_remove',
                        'margin/currency/list',
                        'margin/pair/list',
                        'margin/settings',
                        'margin/funding/list',
                        'margin/user/info',
                        'margin/user/order/list',
                        'margin/user/order/history',
                        'margin/user/order/trades',
                        'margin/user/order/max_quantity',
                        'margin/user/position/list',
                        'margin/user/position/margin_remove_info',
                        'margin/user/position/margin_add_info',
                        'margin/user/wallet/list',
                        'margin/user/wallet/history',
                        'margin/user/trade/list',
                        'margin/trades',
                        'margin/liquidation/feed',
                    ],
                },
            },
            'fees': {
                'trading': {
                    'feeSide': 'get',
                    'tierBased': true,
                    'percentage': true,
                    'maker': this.parseNumber('0.004'),
                    'taker': this.parseNumber('0.004'),
                },
                'transaction': {
                    'tierBased': false,
                    'percentage': false, // fixed transaction fees for crypto, see fetchDepositWithdrawFees below
                },
            },
            'options': {
                'networks': {
                    'ETH': 'ERC20',
                    'TRX': 'TRC20',
                },
                'fetchTradingFees': {
                    'method': 'fetchPrivateTradingFees', // or 'fetchPublicTradingFees'
                },
                'margin': {
                    'fillResponseFromRequest': true,
                },
            },
            'features': {
                'spot': {
                    'sandbox': false,
                    'createOrder': {
                        'marginMode': true,
                        'triggerPrice': true,
                        'triggerPriceType': undefined,
                        'triggerDirection': false,
                        'stopLossPrice': false,
                        'takeProfitPrice': false,
                        'attachedStopLossTakeProfit': undefined,
                        'timeInForce': {
                            'IOC': true,
                            'FOK': true,
                            'PO': true,
                            'GTD': true,
                        },
                        'hedged': false,
                        'selfTradePrevention': false,
                        'trailing': false,
                        'leverage': true,
                        'marketBuyByCost': true,
                        'marketBuyRequiresPrice': false,
                        'iceberg': false,
                    },
                    'createOrders': undefined,
                    'fetchMyTrades': {
                        'marginMode': true,
                        'limit': 100,
                        'daysBack': undefined,
                        'untilDays': undefined,
                        'symbolRequired': true,
                    },
                    'fetchOrder': {
                        'marginMode': false,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOpenOrders': {
                        'marginMode': false,
                        'limit': undefined,
                        'trigger': false,
                        'trailing': false,
                        'symbolRequired': false,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': undefined,
                    'fetchOHLCV': {
                        'limit': 1000, // todo, not in request
                    },
                },
                'swap': {
                    'linear': undefined,
                    'inverse': undefined,
                },
                'future': {
                    'linear': undefined,
                    'inverse': undefined,
                },
            },
            'commonCurrencies': {
                'GMT': 'GMT Token',
            },
            'precisionMode': number.TICK_SIZE,
            'exceptions': {
                'exact': {
                    '140333': errors.InvalidOrder,
                    '140434': errors.BadRequest,
                    '40005': errors.AuthenticationError,
                    '40009': errors.InvalidNonce,
                    '40015': errors.ExchangeError,
                    '40016': errors.OnMaintenance,
                    '40017': errors.AuthenticationError,
                    '40032': errors.PermissionDenied,
                    '40033': errors.PermissionDenied,
                    '40034': errors.RateLimitExceeded,
                    '50052': errors.InsufficientFunds,
                    '50054': errors.InsufficientFunds,
                    '50304': errors.OrderNotFound,
                    '50173': errors.OrderNotFound,
                    '50277': errors.InvalidOrder,
                    '50319': errors.InvalidOrder,
                    '50321': errors.InvalidOrder,
                    '50381': errors.InvalidOrder, // {"result":false,"error":"Error 50381: More than 2 decimal places are not permitted for pair BTC_USD"}
                },
                'broad': {
                    'range period is too long': errors.BadRequest,
                    'invalid syntax': errors.BadRequest,
                    'API rate limit exceeded': errors.RateLimitExceeded, // {"result":false,"error":"API rate limit exceeded for x.x.x.x. Retry after 60 sec.","history":[],"begin":1579392000,"end":1579478400}
                },
            },
        });
    }
    async modifyMarginHelper(symbol, amount, type, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'position_id': market['id'],
            'quantity': amount,
        };
        let response = undefined;
        if (type === 'add') {
            response = await this.privatePostMarginUserPositionMarginAdd(this.extend(request, params));
        }
        else if (type === 'reduce') {
            response = await this.privatePostMarginUserPositionMarginRemove(this.extend(request, params));
        }
        //
        //      {}
        //
        const margin = this.parseMarginModification(response, market);
        const options = this.safeValue(this.options, 'margin', {});
        const fillResponseFromRequest = this.safeBool(options, 'fillResponseFromRequest', true);
        if (fillResponseFromRequest) {
            margin['type'] = type;
            margin['amount'] = amount;
        }
        return margin;
    }
    parseMarginModification(data, market = undefined) {
        //
        //      {}
        //
        return {
            'info': data,
            'symbol': this.safeSymbol(undefined, market),
            'type': undefined,
            'marginMode': 'isolated',
            'amount': undefined,
            'total': undefined,
            'code': this.safeValue(market, 'quote'),
            'status': 'ok',
            'timestamp': undefined,
            'datetime': undefined,
        };
    }
    /**
     * @method
     * @name exmo#reduceMargin
     * @description remove margin from a position
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#eebf9f25-0289-4946-9482-89872c738449
     * @param {string} symbol unified market symbol
     * @param {float} amount the amount of margin to remove
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [margin structure]{@link https://docs.ccxt.com/#/?id=reduce-margin-structure}
     */
    async reduceMargin(symbol, amount, params = {}) {
        return await this.modifyMarginHelper(symbol, amount, 'reduce', params);
    }
    /**
     * @method
     * @name exmo#addMargin
     * @description add margin
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#143ef808-79ca-4e49-9e79-a60ea4d8c0e3
     * @param {string} symbol unified market symbol
     * @param {float} amount amount of margin to add
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [margin structure]{@link https://docs.ccxt.com/#/?id=add-margin-structure}
     */
    async addMargin(symbol, amount, params = {}) {
        return await this.modifyMarginHelper(symbol, amount, 'add', params);
    }
    /**
     * @method
     * @name exmo#fetchTradingFees
     * @description fetch the trading fees for multiple markets
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#90927062-256c-4b03-900f-2b99131f9a54
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#7de7e75c-5833-45a8-b937-c2276d235aaa
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure} indexed by market symbols
     */
    async fetchTradingFees(params = {}) {
        const options = this.safeValue(this.options, 'fetchTradingFees', {});
        const defaultMethod = this.safeString(options, 'method', 'fetchPrivateTradingFees');
        const method = this.safeString(params, 'method', defaultMethod);
        params = this.omit(params, 'method');
        if (method === 'fetchPrivateTradingFees') {
            return await this.fetchPrivateTradingFees(params);
        }
        else {
            return await this.fetchPublicTradingFees(params);
        }
    }
    async fetchPrivateTradingFees(params = {}) {
        await this.loadMarkets();
        const response = await this.privatePostMarginPairList(params);
        //
        //     {
        //         "pairs": [{
        //             "name": "EXM_USD",
        //             "buy_price": "0.02728391",
        //             "sell_price": "0.0276",
        //             "last_trade_price": "0.0276",
        //             "ticker_updated": "1646956050056696046",
        //             "is_fair_price": true,
        //             "max_price_precision": "8",
        //             "min_order_quantity": "1",
        //             "max_order_quantity": "50000",
        //             "min_order_price": "0.00000001",
        //             "max_order_price": "1000",
        //             "max_position_quantity": "50000",
        //             "trade_taker_fee": "0.05",
        //             "trade_maker_fee": "0",
        //             "liquidation_fee": "0.5",
        //             "max_leverage": "3",
        //             "default_leverage": "3",
        //             "liquidation_level": "5",
        //             "margin_call_level": "7.5",
        //             "position": "1",
        //             "updated": "1638976144797807397"
        //         }
        //         ...
        //         ]
        //     }
        //
        const pairs = this.safeValue(response, 'pairs', []);
        const result = {};
        for (let i = 0; i < pairs.length; i++) {
            const pair = pairs[i];
            const marketId = this.safeString(pair, 'name');
            const symbol = this.safeSymbol(marketId, undefined, '_');
            const makerString = this.safeString(pair, 'trade_maker_fee');
            const takerString = this.safeString(pair, 'trade_taker_fee');
            const maker = this.parseNumber(Precise["default"].stringDiv(makerString, '100'));
            const taker = this.parseNumber(Precise["default"].stringDiv(takerString, '100'));
            result[symbol] = {
                'info': pair,
                'symbol': symbol,
                'maker': maker,
                'taker': taker,
                'percentage': true,
                'tierBased': true,
            };
        }
        return result;
    }
    async fetchPublicTradingFees(params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetPairSettings(params);
        //
        //     {
        //         "BTC_USD": {
        //             "min_quantity": "0.00002",
        //             "max_quantity": "1000",
        //             "min_price": "1",
        //             "max_price": "150000",
        //             "max_amount": "500000",
        //             "min_amount": "1",
        //             "price_precision": "2",
        //             "commission_taker_percent": "0.3",
        //             "commission_maker_percent": "0.3"
        //         },
        //     }
        //
        const result = {};
        for (let i = 0; i < this.symbols.length; i++) {
            const symbol = this.symbols[i];
            const market = this.market(symbol);
            const fee = this.safeValue(response, market['id'], {});
            const makerString = this.safeString(fee, 'commission_maker_percent');
            const takerString = this.safeString(fee, 'commission_taker_percent');
            const maker = this.parseNumber(Precise["default"].stringDiv(makerString, '100'));
            const taker = this.parseNumber(Precise["default"].stringDiv(takerString, '100'));
            result[symbol] = {
                'info': fee,
                'symbol': symbol,
                'maker': maker,
                'taker': taker,
                'percentage': true,
                'tierBased': true,
            };
        }
        return result;
    }
    parseFixedFloatValue(input) {
        if ((input === undefined) || (input === '-')) {
            return undefined;
        }
        if (input === '') {
            return 0;
        }
        const isPercentage = (input.indexOf('%') >= 0);
        const parts = input.split(' ');
        const value = parts[0].replace('%', '');
        const result = parseFloat(value);
        if ((result > 0) && isPercentage) {
            throw new errors.ExchangeError(this.id + ' parseFixedFloatValue() detected an unsupported non-zero percentage-based fee ' + input);
        }
        return result;
    }
    /**
     * @method
     * @name exmo#fetchTransactionFees
     * @deprecated
     * @description please use fetchDepositWithdrawFees instead
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#4190035d-24b1-453d-833b-37e0a52f88e2
     * @param {string[]|undefined} codes list of unified currency codes
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [transaction fees structures]{@link https://docs.ccxt.com/#/?id=fees-structure}
     */
    async fetchTransactionFees(codes = undefined, params = {}) {
        await this.loadMarkets();
        const cryptoList = await this.publicGetPaymentsProvidersCryptoList(params);
        //
        //     {
        //         "BTC":[
        //             { "type":"deposit", "name":"BTC", "currency_name":"BTC", "min":"0.001", "max":"0", "enabled":true,"comment":"Minimum deposit amount is 0.001 BTC. We do not support BSC and BEP20 network, please consider this when sending funds", "commission_desc":"0%", "currency_confirmations":1 },
        //             { "type":"withdraw", "name":"BTC", "currency_name":"BTC", "min":"0.001", "max":"350", "enabled":true,"comment":"Do not withdraw directly to the Crowdfunding or ICO address as your account will not be credited with tokens from such sales.", "commission_desc":"0.0005 BTC", "currency_confirmations":6 }
        //         ],
        //         "ETH":[
        //             { "type":"withdraw", "name":"ETH", "currency_name":"ETH", "min":"0.01", "max":"500", "enabled":true,"comment":"Do not withdraw directly to the Crowdfunding or ICO address as your account will not be credited with tokens from such sales.", "commission_desc":"0.004 ETH", "currency_confirmations":4 },
        //             { "type":"deposit", "name":"ETH", "currency_name":"ETH", "min":"0.01", "max":"0", "enabled":true,"comment":"Minimum deposit amount is 0.01 ETH. We do not support BSC and BEP20 network, please consider this when sending funds", "commission_desc":"0%", "currency_confirmations":1 }
        //         ],
        //         "USDT":[
        //             { "type":"deposit", "name":"USDT (OMNI)", "currency_name":"USDT", "min":"10", "max":"0", "enabled":false,"comment":"Minimum deposit amount is 10 USDT", "commission_desc":"0%", "currency_confirmations":2 },
        //             { "type":"withdraw", "name":"USDT (OMNI)", "currency_name":"USDT", "min":"10", "max":"100000", "enabled":false,"comment":"Do not withdraw directly to the Crowdfunding or ICO address as your account will not be credited with tokens from such sales.", "commission_desc":"5 USDT", "currency_confirmations":6 },
        //             { "type":"deposit", "name":"USDT (ERC20)", "currency_name":"USDT", "min":"10", "max":"0", "enabled":true,"comment":"Minimum deposit amount is 10 USDT", "commission_desc":"0%", "currency_confirmations":2 },
        //             {
        //                 "type":"withdraw",
        //                 "name":"USDT (ERC20)",
        //                 "currency_name":"USDT",
        //                 "min":"55",
        //                 "max":"200000",
        //                 "enabled":true,
        //                 "comment":"Caution! Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales. Recommendation: Due to the high load of ERC20 network, using TRC20 address for withdrawal is recommended.",
        //                 "commission_desc":"10 USDT",
        //                 "currency_confirmations":6
        //             },
        //             { "type":"deposit", "name":"USDT (TRC20)", "currency_name":"USDT", "min":"10", "max":"100000", "enabled":true,"comment":"Minimum deposit amount is 10 USDT. Only TRON main network supported", "commission_desc":"0%", "currency_confirmations":2 },
        //             { "type":"withdraw", "name":"USDT (TRC20)", "currency_name":"USDT", "min":"10", "max":"150000", "enabled":true,"comment":"Caution! Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales. Only TRON main network supported.", "commission_desc":"1 USDT", "currency_confirmations":6 }
        //         ],
        //         "XLM":[
        //             { "type":"deposit", "name":"XLM", "currency_name":"XLM", "min":"1", "max":"1000000", "enabled":true,"comment":"Attention! A deposit without memo(invoice) will not be credited. Minimum deposit amount is 1 XLM. We do not support BSC and BEP20 network, please consider this when sending funds", "commission_desc":"0%", "currency_confirmations":1 },
        //             { "type":"withdraw", "name":"XLM", "currency_name":"XLM", "min":"21", "max":"1000000", "enabled":true,"comment":"Caution! Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales.", "commission_desc":"0.01 XLM", "currency_confirmations":1 }
        //         ],
        //     }
        //
        const result = {};
        const cryptoListKeys = Object.keys(cryptoList);
        for (let i = 0; i < cryptoListKeys.length; i++) {
            const code = cryptoListKeys[i];
            if (codes !== undefined && !this.inArray(code, codes)) {
                continue;
            }
            result[code] = {
                'deposit': undefined,
                'withdraw': undefined,
            };
            const currency = this.currency(code);
            const currencyId = this.safeString(currency, 'id');
            const providers = this.safeValue(cryptoList, currencyId, []);
            for (let j = 0; j < providers.length; j++) {
                const provider = providers[j];
                const typeInner = this.safeString(provider, 'type');
                const commissionDesc = this.safeString(provider, 'commission_desc');
                const fee = this.parseFixedFloatValue(commissionDesc);
                result[code][typeInner] = fee;
            }
            result[code]['info'] = providers;
        }
        // cache them for later use
        this.options['transactionFees'] = result;
        return result;
    }
    /**
     * @method
     * @name exmo#fetchDepositWithdrawFees
     * @description fetch deposit and withdraw fees
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#4190035d-24b1-453d-833b-37e0a52f88e2
     * @param {string[]|undefined} codes list of unified currency codes
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [transaction fees structures]{@link https://docs.ccxt.com/#/?id=fees-structure}
     */
    async fetchDepositWithdrawFees(codes = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetPaymentsProvidersCryptoList(params);
        //
        //    {
        //        "USDT": [
        //            {
        //                "type": "deposit", // or "withdraw"
        //                "name": "USDT (ERC20)",
        //                "currency_name": "USDT",
        //                "min": "10",
        //                "max": "0",
        //                "enabled": true,
        //                "comment": "Minimum deposit amount is 10 USDT",
        //                "commission_desc": "0%",
        //                "currency_confirmations": 2
        //            },
        //            ...
        //        ],
        //        ...
        //    }
        //
        const result = this.parseDepositWithdrawFees(response, codes);
        // cache them for later use
        this.options['transactionFees'] = result;
        return result;
    }
    parseDepositWithdrawFee(fee, currency = undefined) {
        //
        //    [
        //        {
        //            "type": "deposit", // or "withdraw"
        //            "name": "BTC",
        //            "currency_name": "BTC",
        //            "min": "0.001",
        //            "max": "0",
        //            "enabled": true,
        //            "comment": "Minimum deposit amount is 0.001 BTC. We do not support BSC and BEP20 network, please consider this when sending funds",
        //            "commission_desc": "0%",
        //            "currency_confirmations": 1
        //        },
        //        ...
        //    ]
        //
        const result = this.depositWithdrawFee(fee);
        for (let i = 0; i < fee.length; i++) {
            const provider = fee[i];
            const type = this.safeString(provider, 'type');
            const networkId = this.safeString(provider, 'name');
            const networkCode = this.networkIdToCode(networkId, this.safeString(currency, 'code'));
            const commissionDesc = this.safeString(provider, 'commission_desc');
            let splitCommissionDesc = [];
            let percentage = undefined;
            if (commissionDesc !== undefined) {
                splitCommissionDesc = commissionDesc.split('%');
                const splitCommissionDescLength = splitCommissionDesc.length;
                percentage = splitCommissionDescLength >= 2;
            }
            const network = this.safeValue(result['networks'], networkCode);
            if (network === undefined) {
                result['networks'][networkCode] = {
                    'withdraw': {
                        'fee': undefined,
                        'percentage': undefined,
                    },
                    'deposit': {
                        'fee': undefined,
                        'percentage': undefined,
                    },
                };
            }
            result['networks'][networkCode][type] = {
                'fee': this.parseFixedFloatValue(this.safeString(splitCommissionDesc, 0)),
                'percentage': percentage,
            };
        }
        return this.assignDefaultDepositWithdrawFees(result);
    }
    /**
     * @method
     * @name exmo#fetchCurrencies
     * @description fetches all available currencies on an exchange
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#7cdf0ca8-9ff6-4cf3-aa33-bcec83155c49
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#4190035d-24b1-453d-833b-37e0a52f88e2
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an associative dictionary of currencies
     */
    async fetchCurrencies(params = {}) {
        const promises = [];
        //
        promises.push(this.publicGetCurrencyListExtended(params));
        //
        //     [
        //         {"name":"VLX","description":"Velas"},
        //         {"name":"RUB","description":"Russian Ruble"},
        //         {"name":"BTC","description":"Bitcoin"},
        //         {"name":"USD","description":"US Dollar"}
        //     ]
        //
        promises.push(this.publicGetPaymentsProvidersCryptoList(params));
        //
        //     {
        //         "BTC":[
        //             { "type":"deposit", "name":"BTC", "currency_name":"BTC", "min":"0.001", "max":"0", "enabled":true,"comment":"Minimum deposit amount is 0.001 BTC. We do not support BSC and BEP20 network, please consider this when sending funds", "commission_desc":"0%", "currency_confirmations":1 },
        //             { "type":"withdraw", "name":"BTC", "currency_name":"BTC", "min":"0.001", "max":"350", "enabled":true,"comment":"Do not withdraw directly to the Crowdfunding or ICO address as your account will not be credited with tokens from such sales.", "commission_desc":"0.0005 BTC", "currency_confirmations":6 }
        //         ],
        //         "ETH":[
        //             { "type":"withdraw", "name":"ETH", "currency_name":"ETH", "min":"0.01", "max":"500", "enabled":true,"comment":"Do not withdraw directly to the Crowdfunding or ICO address as your account will not be credited with tokens from such sales.", "commission_desc":"0.004 ETH", "currency_confirmations":4 },
        //             { "type":"deposit", "name":"ETH", "currency_name":"ETH", "min":"0.01", "max":"0", "enabled":true,"comment":"Minimum deposit amount is 0.01 ETH. We do not support BSC and BEP20 network, please consider this when sending funds", "commission_desc":"0%", "currency_confirmations":1 }
        //         ],
        //         "USDT":[
        //             { "type":"deposit", "name":"USDT (OMNI)", "currency_name":"USDT", "min":"10", "max":"0", "enabled":false,"comment":"Minimum deposit amount is 10 USDT", "commission_desc":"0%", "currency_confirmations":2 },
        //             { "type":"withdraw", "name":"USDT (OMNI)", "currency_name":"USDT", "min":"10", "max":"100000", "enabled":false,"comment":"Do not withdraw directly to the Crowdfunding or ICO address as your account will not be credited with tokens from such sales.", "commission_desc":"5 USDT", "currency_confirmations":6 },
        //             { "type":"deposit", "name":"USDT (ERC20)", "currency_name":"USDT", "min":"10", "max":"0", "enabled":true,"comment":"Minimum deposit amount is 10 USDT", "commission_desc":"0%", "currency_confirmations":2 },
        //             { "type":"withdraw", "name":"USDT (ERC20)", "currency_name":"USDT", "min":"55", "max":"200000", "enabled":true, "comment":"Caution! Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales. Recommendation: Due to the high load of ERC20 network, using TRC20 address for withdrawal is recommended.",  "commission_desc":"10 USDT", "currency_confirmations":6 },
        //             { "type":"deposit", "name":"USDT (TRC20)", "currency_name":"USDT", "min":"10", "max":"100000", "enabled":true,"comment":"Minimum deposit amount is 10 USDT. Only TRON main network supported", "commission_desc":"0%", "currency_confirmations":2 },
        //             { "type":"withdraw", "name":"USDT (TRC20)", "currency_name":"USDT", "min":"10", "max":"150000", "enabled":true,"comment":"Caution! Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales. Only TRON main network supported.", "commission_desc":"1 USDT", "currency_confirmations":6 }
        //         ],
        //         "XLM":[
        //             { "type":"deposit", "name":"XLM", "currency_name":"XLM", "min":"1", "max":"1000000", "enabled":true,"comment":"Attention! A deposit without memo(invoice) will not be credited. Minimum deposit amount is 1 XLM. We do not support BSC and BEP20 network, please consider this when sending funds", "commission_desc":"0%", "currency_confirmations":1 },
        //             { "type":"withdraw", "name":"XLM", "currency_name":"XLM", "min":"21", "max":"1000000", "enabled":true,"comment":"Caution! Do not withdraw directly to a crowdfund or ICO address, as your account will not be credited with tokens from such sales.", "commission_desc":"0.01 XLM", "currency_confirmations":1 }
        //         ],
        //     }
        //
        const responses = await Promise.all(promises);
        const currencyList = responses[0];
        const cryptoList = responses[1];
        const result = {};
        for (let i = 0; i < currencyList.length; i++) {
            const currency = currencyList[i];
            const currencyId = this.safeString(currency, 'name');
            const code = this.safeCurrencyCode(currencyId);
            let type = 'crypto';
            const networks = {};
            const providers = this.safeList(cryptoList, currencyId);
            if (providers === undefined) {
                type = 'fiat';
            }
            else {
                for (let j = 0; j < providers.length; j++) {
                    const provider = providers[j];
                    const name = this.safeString(provider, 'name');
                    // get network-id by removing extra things
                    let networkId = name.replace(currencyId + ' ', '');
                    networkId = networkId.replace('(', '');
                    const replaceChar = ')'; // transpiler trick
                    networkId = networkId.replace(replaceChar, '');
                    const networkCode = this.networkIdToCode(networkId);
                    if (!(networkCode in networks)) {
                        networks[networkCode] = {
                            'id': networkId,
                            'network': networkCode,
                            'active': undefined,
                            'deposit': undefined,
                            'withdraw': undefined,
                            'fee': undefined,
                            'limits': {
                                'withdraw': {
                                    'min': undefined,
                                    'max': undefined,
                                },
                                'deposit': {
                                    'min': undefined,
                                    'max': undefined,
                                },
                            },
                            'info': [], // set as array, because of multiple network sub-entries
                        };
                    }
                    const typeInner = this.safeString(provider, 'type');
                    const minValue = this.safeString(provider, 'min');
                    const maxValue = this.safeString(provider, 'max');
                    const activeProvider = this.safeBool(provider, 'enabled');
                    const networkEntry = networks[networkCode];
                    if (typeInner === 'deposit') {
                        networkEntry['deposit'] = activeProvider;
                        networkEntry['limits']['deposit']['min'] = minValue;
                        networkEntry['limits']['deposit']['max'] = maxValue;
                    }
                    else if (typeInner === 'withdraw') {
                        networkEntry['withdraw'] = activeProvider;
                        networkEntry['limits']['withdraw']['min'] = minValue;
                        networkEntry['limits']['withdraw']['max'] = maxValue;
                    }
                    const info = this.safeList(networkEntry, 'info');
                    info.push(provider);
                    networkEntry['info'] = info;
                    networks[networkCode] = networkEntry;
                }
            }
            result[code] = this.safeCurrencyStructure({
                'id': currencyId,
                'code': code,
                'name': this.safeString(currency, 'description'),
                'type': type,
                'active': undefined,
                'deposit': undefined,
                'withdraw': undefined,
                'fee': undefined,
                'precision': this.parseNumber('1e-8'),
                'limits': {
                    'withdraw': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'deposit': {
                        'min': undefined,
                        'max': undefined,
                    },
                },
                'info': {
                    'currency': currency,
                    'providers': providers,
                },
                'networks': networks,
            });
        }
        return result;
    }
    /**
     * @method
     * @name exmo#fetchMarkets
     * @description retrieves data on all markets for exmo
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#7de7e75c-5833-45a8-b937-c2276d235aaa
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchMarkets(params = {}) {
        const promises = [];
        promises.push(this.publicGetPairSettings(params));
        //
        //     {
        //         "BTC_USD":{
        //             "min_quantity":"0.0001",
        //             "max_quantity":"1000",
        //             "min_price":"1",
        //             "max_price":"30000",
        //             "max_amount":"500000",
        //             "min_amount":"1",
        //             "price_precision":8,
        //             "commission_taker_percent":"0.4",
        //             "commission_maker_percent":"0.4"
        //         },
        //     }
        //
        let marginPairsDict = {};
        const fetchMargin = this.checkRequiredCredentials(false);
        if (fetchMargin) {
            promises.push(this.privatePostMarginPairList(params));
            //
            //    {
            //        "pairs": [
            //            {
            //                "buy_price": "55978.85",
            //                "default_leverage": "3",
            //                "is_fair_price": true,
            //                "last_trade_price": "55999.23",
            //                "liquidation_fee": "2",
            //                "liquidation_level": "10",
            //                "margin_call_level": "15",
            //                "max_leverage": "3",
            //                "max_order_price": "150000",
            //                "max_order_quantity": "1",
            //                "max_position_quantity": "1",
            //                "max_price_precision": 2,
            //                "min_order_price": "1",
            //                "min_order_quantity": "0.00002",
            //                "name": "BTC_USD",
            //                "position": 1,
            //                "sell_price": "55985.51",
            //                "ticker_updated": "1619019818936107989",
            //                "trade_maker_fee": "0",
            //                "trade_taker_fee": "0.05",
            //                "updated": "1619008608955599013"
            //            }
            //        ]
            //    }
            //
        }
        const responses = await Promise.all(promises);
        const spotResponse = responses[0];
        if (fetchMargin) {
            const marginPairs = responses[1];
            const pairs = this.safeList(marginPairs, 'pairs');
            marginPairsDict = this.indexBy(pairs, 'name');
        }
        const keys = Object.keys(spotResponse);
        const result = [];
        for (let i = 0; i < keys.length; i++) {
            const id = keys[i];
            const market = spotResponse[id];
            const marginMarket = this.safeDict(marginPairsDict, id);
            const symbol = id.replace('_', '/');
            const [baseId, quoteId] = symbol.split('/');
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            const takerString = this.safeString(market, 'commission_taker_percent');
            const makerString = this.safeString(market, 'commission_maker_percent');
            const maxQuantity = this.safeString(market, 'max_quantity');
            const marginMaxQuantity = this.safeString(marginMarket, 'max_order_quantity');
            result.push({
                'id': id,
                'symbol': symbol,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': marginMarket !== undefined,
                'swap': false,
                'future': false,
                'option': false,
                'active': undefined,
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'taker': this.parseNumber(Precise["default"].stringDiv(takerString, '100')),
                'maker': this.parseNumber(Precise["default"].stringDiv(makerString, '100')),
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.parseNumber('1e-8'),
                    'price': this.parseNumber(this.parsePrecision(this.safeString(market, 'price_precision'))),
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': this.safeNumber(market, 'leverage'),
                    },
                    'amount': {
                        'min': this.safeNumber(market, 'min_quantity'),
                        'max': this.parseNumber(Precise["default"].stringMax(maxQuantity, marginMaxQuantity)),
                    },
                    'price': {
                        'min': this.safeNumber(market, 'min_price'),
                        'max': this.safeNumber(market, 'max_price'),
                    },
                    'cost': {
                        'min': this.safeNumber(market, 'min_amount'),
                        'max': this.safeNumber(market, 'max_amount'),
                    },
                },
                'created': undefined,
                'info': market,
            });
        }
        return result;
    }
    /**
     * @method
     * @name exmo#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#65eeb949-74e5-4631-9184-c38387fe53e8
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] timestamp in ms of the latest candle to fetch
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const until = this.safeIntegerProduct(params, 'until', 0.001);
        const untilIsDefined = (until !== undefined);
        const request = {
            'symbol': market['id'],
            'resolution': this.safeString(this.timeframes, timeframe, timeframe),
        };
        const maxLimit = 3000;
        const duration = this.parseTimeframe(timeframe);
        const now = this.parseToInt(this.milliseconds() / 1000);
        if (since === undefined) {
            const to = untilIsDefined ? Math.min(until, now) : now;
            if (limit === undefined) {
                limit = 1000; // cap default at generous amount
            }
            else {
                limit = Math.min(limit, maxLimit);
            }
            request['from'] = to - (limit * duration) - 1;
            request['to'] = to;
        }
        else {
            request['from'] = this.parseToInt(since / 1000);
            if (untilIsDefined) {
                request['to'] = Math.min(until, now);
            }
            else {
                if (limit === undefined) {
                    limit = maxLimit;
                }
                else {
                    limit = Math.min(limit, maxLimit);
                }
                const to = this.sum(since, limit * duration);
                request['to'] = Math.min(to, now);
            }
        }
        params = this.omit(params, 'until');
        const response = await this.publicGetCandlesHistory(this.extend(request, params));
        //
        //     {
        //         "candles":[
        //             {"t":1584057600000,"o":0.02235144,"c":0.02400233,"h":0.025171,"l":0.02221,"v":5988.34031761},
        //             {"t":1584144000000,"o":0.0240373,"c":0.02367413,"h":0.024399,"l":0.0235,"v":2027.82522329},
        //             {"t":1584230400000,"o":0.02363458,"c":0.02319242,"h":0.0237948,"l":0.02223196,"v":1707.96944997},
        //         ]
        //     }
        //
        const candles = this.safeList(response, 'candles', []);
        return this.parseOHLCVs(candles, market, timeframe, since, limit);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //     {
        //         "t":1584057600000,
        //         "o":0.02235144,
        //         "c":0.02400233,
        //         "h":0.025171,
        //         "l":0.02221,
        //         "v":5988.34031761
        //     }
        //
        return [
            this.safeInteger(ohlcv, 't'),
            this.safeNumber(ohlcv, 'o'),
            this.safeNumber(ohlcv, 'h'),
            this.safeNumber(ohlcv, 'l'),
            this.safeNumber(ohlcv, 'c'),
            this.safeNumber(ohlcv, 'v'),
        ];
    }
    parseBalance(response) {
        const result = { 'info': response };
        const wallets = this.safeValue(response, 'wallets');
        if (wallets !== undefined) {
            const currencyIds = Object.keys(wallets);
            for (let i = 0; i < currencyIds.length; i++) {
                const currencyId = currencyIds[i];
                const item = wallets[currencyId];
                const currency = this.safeCurrencyCode(currencyId);
                const account = this.account();
                account['used'] = this.safeString(item, 'used');
                account['free'] = this.safeString(item, 'free');
                account['total'] = this.safeString(item, 'balance');
                result[currency] = account;
            }
        }
        else {
            const free = this.safeValue(response, 'balances', {});
            const used = this.safeValue(response, 'reserved', {});
            const currencyIds = Object.keys(free);
            for (let i = 0; i < currencyIds.length; i++) {
                const currencyId = currencyIds[i];
                const code = this.safeCurrencyCode(currencyId);
                const account = this.account();
                if (currencyId in free) {
                    account['free'] = this.safeString(free, currencyId);
                }
                if (currencyId in used) {
                    account['used'] = this.safeString(used, currencyId);
                }
                result[code] = account;
            }
        }
        return this.safeBalance(result);
    }
    /**
     * @method
     * @name exmo#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#59c5160f-27a1-4d9a-8cfb-7979c7ffaac6
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#c8388df7-1f9f-4d41-81c4-5a387d171dc6
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.marginMode] *isolated* fetches the isolated margin balance
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance(params = {}) {
        await this.loadMarkets();
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchBalance', params);
        if (marginMode === 'cross') {
            throw new errors.BadRequest(this.id + ' does not support cross margin');
        }
        let response = undefined;
        if (marginMode === 'isolated') {
            response = await this.privatePostMarginUserWalletList(params);
            //
            //    {
            //        "wallets": {
            //            "USD": {
            //                "balance": "1000",
            //                "free": "600",
            //                "used": "400"
            //            }
            //        }
            //    }
            //
        }
        else {
            response = await this.privatePostUserInfo(params);
            //
            //     {
            //         "uid":131685,
            //         "server_date":1628999600,
            //         "balances":{
            //             "EXM":"0",
            //             "USD":"0",
            //             "EUR":"0",
            //             "GBP":"0",
            //         },
            //     }
            //
        }
        return this.parseBalance(response);
    }
    /**
     * @method
     * @name exmo#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#c60c51a8-e683-4f45-a000-820723d37871
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'pair': market['id'],
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.publicGetOrderBook(this.extend(request, params));
        const result = this.safeDict(response, market['id']);
        return this.parseOrderBook(result, market['symbol'], undefined, 'bid', 'ask');
    }
    /**
     * @method
     * @name exmo#fetchOrderBooks
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data for multiple markets
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#c60c51a8-e683-4f45-a000-820723d37871
     * @param {string[]|undefined} symbols list of unified market symbols, all symbols fetched if undefined, default is undefined
     * @param {int} [limit] max number of entries per orderbook to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbol
     */
    async fetchOrderBooks(symbols = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let ids = undefined;
        if (symbols === undefined) {
            ids = this.ids.join(',');
            // max URL length is 2083 symbols, including http schema, hostname, tld, etc...
            if (ids.length > 2048) {
                const numIds = this.ids.length;
                throw new errors.ExchangeError(this.id + ' fetchOrderBooks() has ' + numIds.toString() + ' symbols exceeding max URL length, you are required to specify a list of symbols in the first argument to fetchOrderBooks');
            }
        }
        else {
            ids = this.marketIds(symbols);
            ids = ids.join(',');
        }
        const request = {
            'pair': ids,
        };
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const response = await this.publicGetOrderBook(this.extend(request, params));
        const result = {};
        const marketIds = Object.keys(response);
        for (let i = 0; i < marketIds.length; i++) {
            const marketId = marketIds[i];
            const symbol = this.safeSymbol(marketId);
            result[symbol] = this.parseOrderBook(response[marketId], symbol, undefined, 'bid', 'ask');
        }
        return result;
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "buy_price":"0.00002996",
        //         "sell_price":"0.00003002",
        //         "last_trade":"0.00002992",
        //         "high":"0.00003028",
        //         "low":"0.00002935",
        //         "avg":"0.00002963",
        //         "vol":"1196546.3163222",
        //         "vol_curr":"35.80066578",
        //         "updated":1642291733
        //     }
        //
        const timestamp = this.safeTimestamp(ticker, 'updated');
        market = this.safeMarket(undefined, market);
        const last = this.safeString(ticker, 'last_trade');
        return this.safeTicker({
            'symbol': market['symbol'],
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeString(ticker, 'high'),
            'low': this.safeString(ticker, 'low'),
            'bid': this.safeString(ticker, 'buy_price'),
            'bidVolume': undefined,
            'ask': this.safeString(ticker, 'sell_price'),
            'askVolume': undefined,
            'vwap': undefined,
            'open': undefined,
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': undefined,
            'percentage': undefined,
            'average': this.safeString(ticker, 'avg'),
            'baseVolume': this.safeString(ticker, 'vol'),
            'quoteVolume': this.safeString(ticker, 'vol_curr'),
            'info': ticker,
        }, market);
    }
    /**
     * @method
     * @name exmo#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#4c8e6459-3503-4361-b012-c34bb9f7e385
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols);
        const response = await this.publicGetTicker(params);
        //
        //     {
        //         "ADA_BTC":{
        //             "buy_price":"0.00002996",
        //             "sell_price":"0.00003002",
        //             "last_trade":"0.00002992",
        //             "high":"0.00003028",
        //             "low":"0.00002935",
        //             "avg":"0.00002963",
        //             "vol":"1196546.3163222",
        //             "vol_curr":"35.80066578",
        //             "updated":1642291733
        //         }
        //     }
        //
        const result = {};
        const marketIds = Object.keys(response);
        for (let i = 0; i < marketIds.length; i++) {
            const marketId = marketIds[i];
            const market = this.safeMarket(marketId, undefined, '_');
            const symbol = market['symbol'];
            const ticker = this.safeValue(response, marketId);
            result[symbol] = this.parseTicker(ticker, market);
        }
        return this.filterByArrayTickers(result, 'symbol', symbols);
    }
    /**
     * @method
     * @name exmo#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#4c8e6459-3503-4361-b012-c34bb9f7e385
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTicker(symbol, params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetTicker(params);
        const market = this.market(symbol);
        return this.parseTicker(response[market['id']], market);
    }
    parseTrade(trade, market = undefined) {
        //
        // fetchTrades (public)
        //
        //     {
        //         "trade_id":165087520,
        //         "date":1587470005,
        //         "type":"buy",
        //         "quantity":"1.004",
        //         "price":"0.02491461",
        //         "amount":"0.02501426"
        //     },
        //
        // fetchMyTrades, fetchOrderTrades
        //
        //     {
        //         "trade_id": 3,
        //         "date": 1435488248,
        //         "type": "buy",
        //         "pair": "BTC_USD",
        //         "order_id": 12345,
        //         "quantity": 1,
        //         "price": 100,
        //         "amount": 100,
        //         "exec_type": "taker",
        //         "commission_amount": "0.02",
        //         "commission_currency": "BTC",
        //         "commission_percent": "0.2"
        //     }
        //
        // fetchMyTrades (margin)
        //
        //    {
        //        "trade_id": "692861757015952517",
        //        "trade_dt": "1693951853197811824",
        //        "trade_type": "buy",
        //        "pair": "ADA_USDT",
        //        "quantity": "1.96607879",
        //        "price": "0.2568",
        //        "amount": "0.50488903"
        //    }
        //
        const timestamp = this.safeTimestamp(trade, 'date');
        const id = this.safeString(trade, 'trade_id');
        const orderId = this.safeString(trade, 'order_id');
        const priceString = this.safeString(trade, 'price');
        const amountString = this.safeString(trade, 'quantity');
        const costString = this.safeString(trade, 'amount');
        const side = this.safeString2(trade, 'type', 'trade_type');
        const type = undefined;
        const marketId = this.safeString(trade, 'pair');
        market = this.safeMarket(marketId, market, '_');
        const symbol = market['symbol'];
        const isMaker = this.safeValue(trade, 'is_maker');
        let takerOrMakerDefault = undefined;
        if (isMaker !== undefined) {
            takerOrMakerDefault = isMaker ? 'maker' : 'taker';
        }
        const takerOrMaker = this.safeString(trade, 'exec_type', takerOrMakerDefault);
        let fee = undefined;
        const feeCostString = this.safeString(trade, 'commission_amount');
        if (feeCostString !== undefined) {
            const feeCurrencyId = this.safeString(trade, 'commission_currency');
            const feeCurrencyCode = this.safeCurrencyCode(feeCurrencyId);
            let feeRateString = this.safeString(trade, 'commission_percent');
            if (feeRateString !== undefined) {
                feeRateString = Precise["default"].stringDiv(feeRateString, '1000', 18);
            }
            fee = {
                'cost': feeCostString,
                'currency': feeCurrencyCode,
                'rate': feeRateString,
            };
        }
        return this.safeTrade({
            'id': id,
            'info': trade,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'symbol': symbol,
            'order': orderId,
            'type': type,
            'side': side,
            'takerOrMaker': takerOrMaker,
            'price': priceString,
            'amount': amountString,
            'cost': costString,
            'fee': fee,
        }, market);
    }
    /**
     * @method
     * @name exmo#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#5a5a9c0d-cf17-47f6-9d62-6d4404ebd5ac
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
            'pair': market['id'],
        };
        const response = await this.publicGetTrades(this.extend(request, params));
        //
        //     {
        //         "ETH_BTC":[
        //             {
        //                 "trade_id":165087520,
        //                 "date":1587470005,
        //                 "type":"buy",
        //                 "quantity":"1.004",
        //                 "price":"0.02491461",
        //                 "amount":"0.02501426"
        //             },
        //             {
        //                 "trade_id":165087369,
        //                 "date":1587469938,
        //                 "type":"buy",
        //                 "quantity":"0.94",
        //                 "price":"0.02492348",
        //                 "amount":"0.02342807"
        //             }
        //         ]
        //     }
        //
        const data = this.safeList(response, market['id'], []);
        return this.parseTrades(data, market, since, limit);
    }
    /**
     * @method
     * @name exmo#fetchMyTrades
     * @description fetch all trades made by the user
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#b8d8d9af-4f46-46a1-939b-ad261d79f452  // spot
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#f4b1aaf8-399f-403b-ab5e-4926d967a106  // margin
     * @param {string} symbol a symbol is required but it can be a single string, or a non-empty array
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] *required for margin orders* the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     *
     * EXCHANGE SPECIFIC PARAMETERS
     * @param {int} [params.offset] last deal offset, default = 0
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        if (symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchMyTrades() requires a symbol argument');
        }
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchMyTrades', params);
        if (marginMode === 'cross') {
            throw new errors.BadRequest(this.id + ' only isolated margin is supported');
        }
        await this.loadMarkets();
        const market = this.market(symbol);
        const pair = market['id'];
        const isSpot = marginMode !== 'isolated';
        if (limit === undefined) {
            limit = 100;
        }
        const request = {};
        if (isSpot) {
            request['pair'] = pair;
        }
        else {
            request['pair_name'] = pair;
        }
        if (limit !== undefined) {
            request['limit'] = limit;
        }
        const offset = this.safeInteger(params, 'offset', 0);
        request['offset'] = offset;
        let response = undefined;
        if (isSpot) {
            response = await this.privatePostUserTrades(this.extend(request, params));
            //
            //    {
            //        "BTC_USD": [
            //            {
            //                "trade_id": 20056872,
            //                "client_id": 100500,
            //                "date": 1435488248,
            //                "type": "buy",
            //                "pair": "BTC_USD",
            //                "quantity": "1",
            //                "price": "100",
            //                "amount": "100",
            //                "order_id": 7,
            //                "parent_order_id": 117684023830293,
            //                "exec_type": "taker",
            //                "commission_amount": "0.02",
            //                "commission_currency": "BTC",
            //                "commission_percent": "0.2"
            //            }
            //        ],
            //        ...
            //    }
            //
        }
        else {
            const responseFromExchange = await this.privatePostMarginTrades(this.extend(request, params));
            //
            //    {
            //        "trades": {
            //            "ADA_USDT": [
            //                {
            //                    "trade_id": "692861757015952517",
            //                    "trade_dt": "1693951853197811824",
            //                    "trade_type": "buy",
            //                    "pair": "ADA_USDT",
            //                    "quantity": "1.96607879",
            //                    "price": "0.2568",
            //                    "amount": "0.50488903"
            //                },
            //            ]
            //            ...
            //        }
            //    }
            //
            response = this.safeValue(responseFromExchange, 'trades');
        }
        let result = [];
        const marketIdsInner = Object.keys(response);
        for (let i = 0; i < marketIdsInner.length; i++) {
            const marketId = marketIdsInner[i];
            const resultMarket = this.safeMarket(marketId, undefined, '_');
            const items = response[marketId];
            const trades = this.parseTrades(items, resultMarket, since, limit);
            result = this.arrayConcat(result, trades);
        }
        return this.filterBySinceLimit(result, since, limit);
    }
    /**
     * @method
     * @name exmo#createMarketOrderWithCost
     * @description create a market order by providing the symbol, side and cost
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#80daa469-ec59-4d0a-b229-6a311d8dd1cd
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} side 'buy' or 'sell'
     * @param {float} cost how much you want to trade in units of the quote currency
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createMarketOrderWithCost(symbol, side, cost, params = {}) {
        await this.loadMarkets();
        params = this.extend(params, { 'cost': cost });
        return await this.createOrder(symbol, 'market', side, cost, undefined, params);
    }
    /**
     * @method
     * @name exmo#createMarketBuyOrderWithCost
     * @description create a market buy order by providing the symbol and cost
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#80daa469-ec59-4d0a-b229-6a311d8dd1cd
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {float} cost how much you want to trade in units of the quote currency
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createMarketBuyOrderWithCost(symbol, cost, params = {}) {
        await this.loadMarkets();
        params = this.extend(params, { 'cost': cost });
        return await this.createOrder(symbol, 'market', 'buy', cost, undefined, params);
    }
    /**
     * @method
     * @name exmo#createMarketSellOrderWithCost
     * @description create a market sell order by providing the symbol and cost
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#80daa469-ec59-4d0a-b229-6a311d8dd1cd
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {float} cost how much you want to trade in units of the quote currency
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createMarketSellOrderWithCost(symbol, cost, params = {}) {
        await this.loadMarkets();
        params = this.extend(params, { 'cost': cost });
        return await this.createOrder(symbol, 'market', 'sell', cost, undefined, params);
    }
    /**
     * @method
     * @name exmo#createOrder
     * @description create a trade order
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#80daa469-ec59-4d0a-b229-6a311d8dd1cd
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#de6f4321-eeac-468c-87f7-c4ad7062e265  // stop market
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#3561b86c-9ff1-436e-8e68-ac926b7eb523  // margin
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} type 'market' or 'limit'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount how much of currency you want to trade in units of base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {float} [params.triggerPrice] the price at which a trigger order is triggered at
     * @param {string} [params.timeInForce] *spot only* 'fok', 'ioc' or 'post_only'
     * @param {boolean} [params.postOnly] *spot only* true for post only orders
     * @param {float} [params.cost] *spot only* *market orders only* the cost of the order in the quote currency for market orders
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const isMarket = (type === 'market') && (price === undefined);
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('createOrder', params);
        if (marginMode === 'cross') {
            throw new errors.BadRequest(this.id + ' only supports isolated margin');
        }
        const isSpot = (marginMode !== 'isolated');
        const triggerPrice = this.safeStringN(params, ['triggerPrice', 'stopPrice', 'stop_price']);
        const cost = this.safeString(params, 'cost');
        const request = {
            'pair': market['id'],
            // 'leverage': 2,
            // 'quantity': this.amountToPrecision (market['symbol'], amount),
            // spot - buy, sell, market_buy, market_sell, market_buy_total, market_sell_total
            // margin - limit_buy, limit_sell, market_buy, market_sell, stop_buy, stop_sell, stop_limit_buy, stop_limit_sell, trailing_stop_buy, trailing_stop_sell
            // 'stop_price': this.priceToPrecision (symbol, stopPrice),
            // 'distance': 0, // distance for trailing stop orders
            // 'expire': 0, // expiration timestamp in UTC timezone for the order, unless expire is 0
            // 'client_id': 123, // optional, must be a positive integer
            // 'comment': '', // up to 50 latin symbols, whitespaces, underscores
        };
        if (cost === undefined) {
            request['quantity'] = this.amountToPrecision(market['symbol'], amount);
        }
        else {
            request['quantity'] = this.costToPrecision(market['symbol'], cost);
        }
        let clientOrderId = this.safeValue2(params, 'client_id', 'clientOrderId');
        if (clientOrderId !== undefined) {
            clientOrderId = this.safeInteger2(params, 'client_id', 'clientOrderId');
            if (clientOrderId === undefined) {
                throw new errors.BadRequest(this.id + ' createOrder() client order id must be an integer / numeric literal');
            }
            else {
                request['client_id'] = clientOrderId;
            }
        }
        const leverage = this.safeNumber(params, 'leverage');
        if (!isSpot && (leverage === undefined)) {
            throw new errors.ArgumentsRequired(this.id + ' createOrder requires an extra param params["leverage"] for margin orders');
        }
        params = this.omit(params, ['stopPrice', 'stop_price', 'triggerPrice', 'timeInForce', 'client_id', 'clientOrderId', 'cost']);
        if (price !== undefined) {
            request['price'] = this.priceToPrecision(market['symbol'], price);
        }
        let response = undefined;
        if (isSpot) {
            if (triggerPrice !== undefined) {
                if (type === 'limit') {
                    throw new errors.BadRequest(this.id + ' createOrder () cannot create stop limit orders for spot, only stop market');
                }
                else {
                    request['type'] = side;
                    request['trigger_price'] = this.priceToPrecision(symbol, triggerPrice);
                }
                response = await this.privatePostStopMarketOrderCreate(this.extend(request, params));
            }
            else {
                const execType = this.safeString(params, 'exec_type');
                let isPostOnly = undefined;
                [isPostOnly, params] = this.handlePostOnly(type === 'market', execType === 'post_only', params);
                const timeInForce = this.safeString(params, 'timeInForce');
                request['price'] = isMarket ? 0 : this.priceToPrecision(market['symbol'], price);
                if (type === 'limit') {
                    request['type'] = side;
                }
                else if (type === 'market') {
                    const marketSuffix = (cost !== undefined) ? '_total' : '';
                    request['type'] = 'market_' + side + marketSuffix;
                }
                if (isPostOnly) {
                    request['exec_type'] = 'post_only';
                }
                else if (timeInForce !== undefined) {
                    request['exec_type'] = timeInForce;
                }
                response = await this.privatePostOrderCreate(this.extend(request, params));
            }
        }
        else {
            if (triggerPrice !== undefined) {
                request['stop_price'] = this.priceToPrecision(symbol, triggerPrice);
                if (type === 'limit') {
                    request['type'] = 'stop_limit_' + side;
                }
                else if (type === 'market') {
                    request['type'] = 'stop_' + side;
                }
                else {
                    request['type'] = type;
                }
            }
            else {
                if (type === 'limit' || type === 'market') {
                    request['type'] = type + '_' + side;
                }
                else {
                    request['type'] = type;
                }
            }
            response = await this.privatePostMarginUserOrderCreate(this.extend(request, params));
        }
        return this.parseOrder(response, market);
    }
    /**
     * @method
     * @name exmo#cancelOrder
     * @description cancels an open order
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#1f710d4b-75bc-4b65-ad68-006f863a3f26
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#a4d0aae8-28f7-41ac-94fd-c4030130453d  // stop market
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#705dfec5-2b35-4667-862b-faf54eca6209  // margin
     * @param {string} id order id
     * @param {string} symbol not used by exmo cancelOrder ()
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.trigger] true to cancel a trigger order
     * @param {string} [params.marginMode] set to 'cross' or 'isolated' to cancel a margin order
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async cancelOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        const trigger = this.safeValue2(params, 'trigger', 'stop');
        params = this.omit(params, ['trigger', 'stop']);
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('cancelOrder', params);
        if (marginMode === 'cross') {
            throw new errors.BadRequest(this.id + ' only supports isolated margin');
        }
        let response = undefined;
        if ((marginMode === 'isolated')) {
            request['order_id'] = id;
            response = await this.privatePostMarginUserOrderCancel(this.extend(request, params));
            //
            //    {}
            //
        }
        else {
            if (trigger) {
                request['parent_order_id'] = id;
                response = await this.privatePostStopMarketOrderCancel(this.extend(request, params));
                //
                //    {}
                //
            }
            else {
                request['order_id'] = id;
                response = await this.privatePostOrderCancel(this.extend(request, params));
                //
                //    {
                //        "error": '',
                //        "result": True
                //    }
                //
            }
        }
        return this.parseOrder(response);
    }
    /**
     * @method
     * @name exmo#fetchOrder
     * @description *spot only* fetches information on an order made by the user
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#cf27781e-28e5-4b39-a52d-3110f5d22459  // spot
     * @param {string} id order id
     * @param {string} symbol not used by exmo fetchOrder
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {
            'order_id': id.toString(),
        };
        const response = await this.privatePostOrderTrades(this.extend(request, params));
        //
        //     {
        //         "type": "buy",
        //         "in_currency": "BTC",
        //         "in_amount": "1",
        //         "out_currency": "USD",
        //         "out_amount": "100",
        //         "trades": [
        //             {
        //                 "trade_id": 3,
        //                 "date": 1435488248,
        //                 "type": "buy",
        //                 "pair": "BTC_USD",
        //                 "order_id": 12345,
        //                 "quantity": 1,
        //                 "price": 100,
        //                 "amount": 100
        //             }
        //         ]
        //     }
        //
        const order = this.parseOrder(response);
        order['id'] = id.toString();
        return order;
    }
    /**
     * @method
     * @name exmo#fetchOrderTrades
     * @description fetch all the trades made from a single order
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#cf27781e-28e5-4b39-a52d-3110f5d22459  // spot
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#00810661-9119-46c5-aec5-55abe9cb42c7  // margin
     * @param {string} id order id
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.marginMode] set to "isolated" to fetch trades for a margin order
     * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchOrderTrades(id, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchOrderTrades', params);
        if (marginMode === 'cross') {
            throw new errors.BadRequest(this.id + ' only supports isolated margin');
        }
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        const request = {
            'order_id': id.toString(),
        };
        let response = undefined;
        if (marginMode === 'isolated') {
            response = await this.privatePostMarginUserOrderTrades(this.extend(request, params));
            //
            //    {
            //        "trades": [
            //            {
            //                "is_maker": false,
            //                "order_id": "123",
            //                "pair": "BTC_USD",
            //                "price": "54122.25",
            //                "quantity": "0.00069994",
            //                "trade_dt": "1619069561718824428",
            //                "trade_id": "692842802860135010",
            //                "type": "sell"
            //            }
            //        ]
            //    }
            //
        }
        else {
            response = await this.privatePostOrderTrades(this.extend(request, params));
            //
            //     {
            //         "type": "buy",
            //         "in_currency": "BTC",
            //         "in_amount": "1",
            //         "out_currency": "USD",
            //         "out_amount": "100",
            //         "trades": [
            //             {
            //                 "trade_id": 3,
            //                 "date": 1435488248,
            //                 "type": "buy",
            //                 "pair": "BTC_USD",
            //                 "order_id": 12345,
            //                 "quantity": 1,
            //                 "price": 100,
            //                 "amount": 100,
            //                 "exec_type": "taker",
            //                 "commission_amount": "0.02",
            //                 "commission_currency": "BTC",
            //                 "commission_percent": "0.2"
            //             }
            //         ]
            //     }
            //
        }
        const trades = this.safeList(response, 'trades');
        return this.parseTrades(trades, market, since, limit);
    }
    /**
     * @method
     * @name exmo#fetchOpenOrders
     * @description fetch all unfilled currently open orders
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#0e135370-daa4-4689-8acd-b6876dee9ba1  // spot open orders
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#a7cfd4f0-476e-4675-b33f-22a46902f245  // margin
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of  open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.marginMode] set to "isolated" for margin orders
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            symbol = market['symbol'];
        }
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchOpenOrders', params);
        const isMargin = ((marginMode === 'cross') || (marginMode === 'isolated'));
        let response = undefined;
        let orders = [];
        if (isMargin) {
            response = await this.privatePostMarginUserOrderList(params);
            //
            //    {
            //        "orders": [
            //            {
            //                "client_id": "0",
            //                "comment": "",
            //                "created": "1619068707985325495",
            //                "distance": "0",
            //                "expire": 0,
            //                "funding_currency": "BTC",
            //                "funding_quantity": "0.01",
            //                "funding_rate": "0.02",
            //                "leverage": "2",
            //                "order_id": "123",
            //                "pair": "BTC_USD",
            //                "previous_type": "limit_sell",
            //                "price": "58000",
            //                "quantity": "0.01",
            //                "src": 0,
            //                "stop_price": "0",
            //                "trigger_price": "58000",
            //                "type": "limit_sell",
            //                "updated": 1619068707989411800
            //            }
            //        ]
            //    }
            //
            params = this.extend(params, {
                'status': 'open',
            });
            const responseOrders = this.safeValue(response, 'orders');
            orders = this.parseOrders(responseOrders, market, since, limit, params);
        }
        else {
            response = await this.privatePostUserOpenOrders(params);
            //
            //    {
            //        "USDT_USD": [
            //            {
            //                "parent_order_id": "507061384740151010",
            //                "client_id": "100500",
            //                "created": "1589547391",
            //                "type": "stop_market_buy",
            //                "pair": "USDT_USD",
            //                "quantity": "1",
            //                "trigger_price": "5",
            //                "amount": "5"
            //            }
            //        ],
            //        ...
            //    }
            //
            const marketIds = Object.keys(response);
            for (let i = 0; i < marketIds.length; i++) {
                const marketId = marketIds[i];
                const marketInner = this.safeMarket(marketId);
                params = this.extend(params, {
                    'status': 'open',
                });
                const parsedOrders = this.parseOrders(response[marketId], marketInner, since, limit, params);
                orders = this.arrayConcat(orders, parsedOrders);
            }
        }
        return orders;
    }
    parseStatus(status) {
        if (status === undefined) {
            return undefined;
        }
        const statuses = {
            'cancel_started': 'canceled',
        };
        if (status.indexOf('cancel') >= 0) {
            status = 'canceled';
        }
        return this.safeString(statuses, status, status);
    }
    parseSide(orderType) {
        const side = {
            'limit_buy': 'buy',
            'limit_sell': 'sell',
            'market_buy': 'buy',
            'market_sell': 'sell',
            'stop_buy': 'buy',
            'stop_sell': 'sell',
            'stop_limit_buy': 'buy',
            'stop_limit_sell': 'sell',
            'trailing_stop_buy': 'buy',
            'trailing_stop_sell': 'sell',
            'stop_market_sell': 'sell',
            'stop_market_buy': 'buy',
            'buy': 'buy',
            'sell': 'sell',
        };
        return this.safeString(side, orderType, orderType);
    }
    parseOrder(order, market = undefined) {
        //
        // fetchOrders, fetchOpenOrders, fetchClosedOrders, fetchCanceledOrders
        //
        //     {
        //         "order_id": "14",
        //         "created": "1435517311",
        //         "type": "buy",
        //         "pair": "BTC_USD",
        //         "price": "100",
        //         "quantity": "1",
        //         "amount": "100"
        //     }
        //
        // fetchOrder
        //
        //     {
        //         "type": "buy",
        //         "in_currency": "BTC",
        //         "in_amount": "1",
        //         "out_currency": "USD",
        //         "out_amount": "100",
        //         "trades": [
        //             {
        //                 "trade_id": 3,
        //                 "date": 1435488248,
        //                 "type": "buy",
        //                 "pair": "BTC_USD",
        //                 "order_id": 12345,
        //                 "quantity": 1,
        //                 "price": 100,
        //                 "amount": 100
        //             }
        //         ]
        //     }
        //
        // Margin fetchOpenOrders
        //
        //    {
        //        "client_id": "0",
        //        "comment": "",
        //        "created": "1619068707985325495",
        //        "distance": "0",
        //        "expire": 0,
        //        "funding_currency": "BTC",
        //        "funding_quantity": "0.01",
        //        "funding_rate": "0.02",
        //        "leverage": "2",
        //        "order_id": "123",
        //        "pair": "BTC_USD",
        //        "previous_type": "limit_sell",
        //        "price": "58000",
        //        "quantity": "0.01",
        //        "src": 0,
        //        "stop_price": "0",
        //        "trigger_price": "58000",
        //        "type": "limit_sell",
        //        "updated": 1619068707989411800
        //    }
        //
        // Margin fetchClosedOrders
        //
        //    {
        //        "distance": "0",
        //        "event_id": "692842802860022508",
        //        "event_time": "1619069531190173720",
        //        "event_type": "OrderCancelStarted",
        //        "order_id": "123",
        //        "order_status": "cancel_started",
        //        "order_type": "limit_sell",
        //        "pair": "BTC_USD",
        //        "price": "54115",
        //        "quantity": "0.001",
        //        "stop_price": "0",
        //        "trade_id": "0",
        //        "trade_price": "0",
        //        "trade_quantity": "0",
        //        "trade_type": ""
        //    },
        //
        const id = this.safeString2(order, 'order_id', 'parent_order_id');
        const eventTime = this.safeIntegerProduct2(order, 'event_time', 'created', 0.000001);
        const timestamp = this.safeTimestamp(order, 'created', eventTime);
        const orderType = this.safeString2(order, 'type', 'order_type');
        const side = this.parseSide(orderType);
        let marketId = undefined;
        if ('pair' in order) {
            marketId = order['pair'];
        }
        else if (('in_currency' in order) && ('out_currency' in order)) {
            if (side === 'buy') {
                marketId = order['in_currency'] + '_' + order['out_currency'];
            }
            else {
                marketId = order['out_currency'] + '_' + order['in_currency'];
            }
        }
        market = this.safeMarket(marketId, market);
        const symbol = market['symbol'];
        let amount = this.safeString(order, 'quantity');
        if (amount === undefined) {
            const amountField = (side === 'buy') ? 'in_amount' : 'out_amount';
            amount = this.safeString(order, amountField);
        }
        const price = this.safeString(order, 'price');
        const cost = this.safeString(order, 'amount');
        const transactions = this.safeValue(order, 'trades', []);
        const clientOrderId = this.safeInteger(order, 'client_id');
        let triggerPrice = this.safeString(order, 'stop_price');
        if (triggerPrice === '0') {
            triggerPrice = undefined;
        }
        let type = undefined;
        if ((orderType !== 'buy') && (orderType !== 'sell')) {
            type = orderType;
        }
        return this.safeOrder({
            'id': id,
            'clientOrderId': clientOrderId,
            'datetime': this.iso8601(timestamp),
            'timestamp': timestamp,
            'lastTradeTimestamp': this.safeIntegerProduct(order, 'updated', 0.000001),
            'status': this.parseStatus(this.safeString(order, 'order_status')),
            'symbol': symbol,
            'type': type,
            'timeInForce': undefined,
            'postOnly': undefined,
            'side': side,
            'price': price,
            'triggerPrice': triggerPrice,
            'cost': cost,
            'amount': amount,
            'filled': undefined,
            'remaining': undefined,
            'average': undefined,
            'trades': transactions,
            'fee': undefined,
            'info': order,
        }, market);
    }
    /**
     * @method
     * @name exmo#fetchCanceledOrders
     * @description fetches information on multiple canceled orders made by the user
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#1d2524dd-ae6d-403a-a067-77b50d13fbe5  // margin
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#a51be1d0-af5f-44e4-99d7-f7b04c6067d0  // spot canceled orders
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] timestamp in ms of the earliest order, default is undefined
     * @param {int} [limit] max number of orders to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.marginMode] set to "isolated" for margin orders
     * @returns {object} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchCanceledOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchOrders', params);
        if (marginMode === 'cross') {
            throw new errors.BadRequest(this.id + ' only supports isolated margin');
        }
        if (limit === undefined) {
            limit = 100;
        }
        const isSpot = (marginMode !== 'isolated');
        if (symbol !== undefined) {
            const marketInner = this.market(symbol);
            symbol = marketInner['symbol'];
        }
        const request = {
            'limit': limit,
        };
        request['offset'] = (since !== undefined) ? limit : 0;
        request['limit'] = limit;
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        let response = undefined;
        if (isSpot) {
            response = await this.privatePostUserCancelledOrders(this.extend(request, params));
            //
            //    [
            //        {
            //            "order_id": "27056153840",
            //            "client_id": "0",
            //            "created": "1653428646",
            //            "type": "buy",
            //            "pair": "BTC_USDT",
            //            "quantity": "0.1",
            //            "price": "10",
            //            "amount": "1"
            //        }
            //    ]
            //
            params = this.extend(params, {
                'status': 'canceled',
            });
            return this.parseOrders(response, market, since, limit, params);
        }
        else {
            const responseSwap = await this.privatePostMarginUserOrderHistory(this.extend(request, params));
            //
            //    {
            //        "items": [
            //            {
            //                "event_id": "692862104574106858",
            //                "event_time": "1694116400173489405",
            //                "event_type": "OrderCancelStarted",
            //                "order_id": "692862104561289319",
            //                "order_type": "stop_limit_sell",
            //                "order_status": "cancel_started",
            //                "trade_id": "0",
            //                "trade_type":"",
            //                "trade_quantity": "0",
            //                "trade_price": "0",
            //                "pair": "ADA_USDT",
            //                "quantity": "12",
            //                "price": "0.23",
            //                "stop_price": "0.22",
            //                "distance": "0"
            //            }
            //            ...
            //        ]
            //    }
            //
            const items = this.safeValue(responseSwap, 'items');
            const orders = this.parseOrders(items, market, since, limit, params);
            const result = [];
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                if (order['status'] === 'canceled') {
                    result.push(order);
                }
            }
            return result;
        }
    }
    /**
     * @method
     * @name exmo#editOrder
     * @description *margin only* edit a trade order
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#f27ee040-c75f-4b59-b608-d05bd45b7899  // margin
     * @param {string} id order id
     * @param {string} symbol unified CCXT market symbol
     * @param {string} type not used by exmo editOrder
     * @param {string} side not used by exmo editOrder
     * @param {float} [amount] how much of the currency you want to trade in units of the base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {float} [params.triggerPrice] stop price for stop-market and stop-limit orders
     * @param {string} params.marginMode must be set to isolated
     *
     * EXCHANGE SPECIFIC PARAMETERS
     * @param {int} [params.distance] distance for trailing stop orders
     * @param {int} [params.expire] expiration timestamp in UTC timezone for the order. order will not be expired if expire is 0
     * @param {string} [params.comment] optional comment for order. up to 50 latin symbols, whitespaces, underscores
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async editOrder(id, symbol, type, side, amount = undefined, price = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('editOrder', params);
        if (marginMode !== 'isolated') {
            throw new errors.BadRequest(this.id + ' editOrder() can only be used for isolated margin orders');
        }
        const triggerPrice = this.safeNumberN(params, ['triggerPrice', 'stopPrice', 'stop_price']);
        params = this.omit(params, ['triggerPrice', 'stopPrice']);
        const request = {
            'order_id': id, // id of the open order
        };
        if (amount !== undefined) {
            request['quantity'] = amount;
        }
        if (price !== undefined) {
            request['price'] = this.priceToPrecision(market['symbol'], price);
        }
        if (triggerPrice !== undefined) {
            request['stop_price'] = this.priceToPrecision(market['symbol'], triggerPrice);
        }
        const response = await this.privatePostMarginUserOrderUpdate(this.extend(request, params));
        return this.parseOrder(response);
    }
    /**
     * @method
     * @name exmo#fetchDepositAddress
     * @description fetch the deposit address for a currency associated with this account
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#c8f9ced9-7ab6-4383-a6a4-bc54469ba60e
     * @param {string} code unified currency code
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
     */
    async fetchDepositAddress(code, params = {}) {
        await this.loadMarkets();
        const response = await this.privatePostDepositAddress(params);
        //
        //     {
        //         "TRX":"TBnwrf4ZdoYXE3C8L2KMs7YPSL3fg6q6V9",
        //         "USDTTRC20":"TBnwrf4ZdoYXE3C8L2KMs7YPSL3fg6q6V9"
        //     }
        //
        const depositAddress = this.safeString(response, code);
        let address = undefined;
        let tag = undefined;
        if (depositAddress) {
            const addressAndTag = depositAddress.split(',');
            address = addressAndTag[0];
            const numParts = addressAndTag.length;
            if (numParts > 1) {
                tag = addressAndTag[1];
            }
        }
        this.checkAddress(address);
        return {
            'info': response,
            'currency': code,
            'network': undefined,
            'address': address,
            'tag': tag,
        };
    }
    getMarketFromTrades(trades) {
        const tradesBySymbol = this.indexBy(trades, 'pair');
        const symbols = Object.keys(tradesBySymbol);
        const numSymbols = symbols.length;
        if (numSymbols === 1) {
            return this.markets[symbols[0]];
        }
        return undefined;
    }
    /**
     * @method
     * @name exmo#withdraw
     * @description make a withdrawal
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#3ab9c34d-ad58-4f87-9c57-2e2ea88a8325
     * @param {string} code unified currency code
     * @param {float} amount the amount to withdraw
     * @param {string} address the address to withdraw to
     * @param {string} tag
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async withdraw(code, amount, address, tag = undefined, params = {}) {
        [tag, params] = this.handleWithdrawTagAndParams(tag, params);
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'amount': amount,
            'currency': currency['id'],
            'address': address,
        };
        if (tag !== undefined) {
            request['invoice'] = tag;
        }
        const networks = this.safeValue(this.options, 'networks', {});
        let network = this.safeStringUpper(params, 'network'); // this line allows the user to specify either ERC20 or ETH
        network = this.safeString(networks, network, network); // handle ERC20>ETH alias
        if (network !== undefined) {
            request['transport'] = network;
            params = this.omit(params, 'network');
        }
        const response = await this.privatePostWithdrawCrypt(this.extend(request, params));
        return this.parseTransaction(response, currency);
    }
    parseTransactionStatus(status) {
        const statuses = {
            'transferred': 'ok',
            'paid': 'ok',
            'pending': 'pending',
            'processing': 'pending',
            'verifying': 'pending',
        };
        return this.safeString(statuses, status, status);
    }
    parseTransaction(transaction, currency = undefined) {
        //
        // fetchDepositsWithdrawals
        //
        //    {
        //        "dt": 1461841192,
        //        "type": "deposit",
        //        "curr": "RUB",
        //        "status": "processing",
        //        "provider": "Qiwi (LA) [12345]",
        //        "amount": "1",
        //        "account": "",
        //        "txid": "ec46f784ad976fd7f7539089d1a129fe46...",
        //    }
        //
        // fetchWithdrawals
        //
        //    {
        //        "operation_id": 47412538520634344,
        //        "created": 1573760013,
        //        "updated": 1573760013,
        //        "type": "withdraw",
        //        "currency": "DOGE",
        //        "status": "Paid",
        //        "amount": "300",
        //        "provider": "DOGE",
        //        "commission": "0",
        //        "account": "DOGE: DBVy8pF1f8yxaCVEHqHeR7kkcHecLQ8nRS",
        //        "order_id": 69670170,
        //        "provider_type": "crypto",
        //        "crypto_address": "DBVy8pF1f8yxaCVEHqHeR7kkcHecLQ8nRS",
        //        "card_number": "",
        //        "wallet_address": "",
        //        "email": "",
        //        "phone": "",
        //        "extra": {
        //            "txid": "f2b66259ae1580f371d38dd27e31a23fff8c04122b65ee3ab5a3f612d579c792",
        //            "confirmations": null,
        //            "excode": "",
        //            "invoice": ""
        //        },
        //        "error": ""
        //    }
        //
        // withdraw
        //
        //    {
        //        "result": true,
        //        "error": "",
        //        "task_id": 11775077
        //    }
        //
        const timestamp = this.safeTimestamp2(transaction, 'dt', 'created');
        let amountString = this.safeString(transaction, 'amount');
        if (amountString !== undefined) {
            amountString = Precise["default"].stringAbs(amountString);
        }
        let txid = this.safeString(transaction, 'txid');
        if (txid === undefined) {
            const extra = this.safeValue(transaction, 'extra', {});
            const extraTxid = this.safeString(extra, 'txid');
            if (extraTxid !== '') {
                txid = extraTxid;
            }
        }
        const type = this.safeString(transaction, 'type');
        const currencyId = this.safeString2(transaction, 'curr', 'currency');
        const code = this.safeCurrencyCode(currencyId, currency);
        let address = undefined;
        let comment = undefined;
        const account = this.safeString(transaction, 'account');
        if (type === 'deposit') {
            comment = account;
        }
        else if (type === 'withdrawal') {
            address = account;
            if (address !== undefined) {
                const parts = address.split(':');
                const numParts = parts.length;
                if (numParts === 2) {
                    address = this.safeString(parts, 1);
                    address = address.replace(' ', '');
                }
            }
        }
        const fee = {
            'currency': undefined,
            'cost': undefined,
            'rate': undefined,
        };
        // fixed funding fees only (for now)
        if (!this.fees['transaction']['percentage']) {
            const key = (type === 'withdrawal') ? 'withdraw' : 'deposit';
            let feeCost = this.safeString(transaction, 'commission');
            if (feeCost === undefined) {
                const transactionFees = this.safeValue(this.options, 'transactionFees', {});
                const codeFees = this.safeValue(transactionFees, code, {});
                feeCost = this.safeString(codeFees, key);
            }
            // users don't pay for cashbacks, no fees for that
            const provider = this.safeString(transaction, 'provider');
            if (provider === 'cashback') {
                feeCost = '0';
            }
            if (feeCost !== undefined) {
                // withdrawal amount includes the fee
                if (type === 'withdrawal') {
                    amountString = Precise["default"].stringSub(amountString, feeCost);
                }
                fee['cost'] = this.parseNumber(feeCost);
                fee['currency'] = code;
            }
        }
        return {
            'info': transaction,
            'id': this.safeString2(transaction, 'order_id', 'task_id'),
            'txid': txid,
            'type': type,
            'currency': code,
            'network': this.safeString(transaction, 'provider'),
            'amount': this.parseNumber(amountString),
            'status': this.parseTransactionStatus(this.safeStringLower(transaction, 'status')),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'address': address,
            'addressFrom': undefined,
            'addressTo': address,
            'tag': undefined,
            'tagFrom': undefined,
            'tagTo': undefined,
            'updated': this.safeTimestamp(transaction, 'updated'),
            'comment': comment,
            'internal': undefined,
            'fee': fee,
        };
    }
    /**
     * @method
     * @name exmo#fetchDepositsWithdrawals
     * @description fetch history of deposits and withdrawals
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#31e69a33-4849-4e6a-b4b4-6d574238f6a7
     * @param {string} [code] unified currency code for the currency of the deposit/withdrawals, default is undefined
     * @param {int} [since] timestamp in ms of the earliest deposit/withdrawal, default is undefined
     * @param {int} [limit] max number of deposit/withdrawals to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDepositsWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        if (since !== undefined) {
            request['date'] = this.parseToInt(since / 1000);
        }
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
        }
        const response = await this.privatePostWalletHistory(this.extend(request, params));
        //
        //     {
        //       "result": true,
        //       "error": "",
        //       "begin": "1493942400",
        //       "end": "1494028800",
        //       "history": [
        //          {
        //            "dt": 1461841192,
        //            "type": "deposit",
        //            "curr": "RUB",
        //            "status": "processing",
        //            "provider": "Qiwi (LA) [12345]",
        //            "amount": "1",
        //            "account": "",
        //            "txid": "ec46f784ad976fd7f7539089d1a129fe46...",
        //          },
        //          {
        //            "dt": 1463414785,
        //            "type": "withdrawal",
        //            "curr": "USD",
        //            "status": "paid",
        //            "provider": "EXCODE",
        //            "amount": "-1",
        //            "account": "EX-CODE_19371_USDda...",
        //            "txid": "",
        //          },
        //       ],
        //     }
        //
        return this.parseTransactions(response['history'], currency, since, limit);
    }
    /**
     * @method
     * @name exmo#fetchWithdrawals
     * @description fetch all withdrawals made from an account
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#97f1becd-7aad-4e0e-babe-7bbe09e33706
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch withdrawals for
     * @param {int} [limit] the maximum number of withdrawals structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let currency = undefined;
        const request = {
            'type': 'withdraw',
        };
        if (limit !== undefined) {
            request['limit'] = limit; // default: 100, maximum: 100
        }
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        const response = await this.privatePostWalletOperations(this.extend(request, params));
        //
        //     {
        //         "items": [
        //         {
        //             "operation_id": 47412538520634344,
        //             "created": 1573760013,
        //             "updated": 1573760013,
        //             "type": "withdraw",
        //             "currency": "DOGE",
        //             "status": "Paid",
        //             "amount": "300",
        //             "provider": "DOGE",
        //             "commission": "0",
        //             "account": "DOGE: DBVy8pF1f8yxaCVEHqHeR7kkcHecLQ8nRS",
        //             "order_id": 69670170,
        //             "extra": {
        //                 "txid": "f2b66259ae1580f371d38dd27e31a23fff8c04122b65ee3ab5a3f612d579c792",
        //                 "excode": "",
        //                 "invoice": ""
        //             },
        //             "error": ""
        //         },
        //     ],
        //         "count": 23
        //     }
        //
        const items = this.safeList(response, 'items', []);
        return this.parseTransactions(items, currency, since, limit);
    }
    /**
     * @method
     * @name exmo#fetchWithdrawal
     * @description fetch data on a currency withdrawal via the withdrawal id
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#97f1becd-7aad-4e0e-babe-7bbe09e33706
     * @param {string} id withdrawal id
     * @param {string} code unified currency code of the currency withdrawn, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchWithdrawal(id, code = undefined, params = {}) {
        await this.loadMarkets();
        let currency = undefined;
        const request = {
            'order_id': id,
            'type': 'withdraw',
        };
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        const response = await this.privatePostWalletOperations(this.extend(request, params));
        //
        //     {
        //         "items": [
        //         {
        //             "operation_id": 47412538520634344,
        //             "created": 1573760013,
        //             "updated": 1573760013,
        //             "type": "deposit",
        //             "currency": "DOGE",
        //             "status": "Paid",
        //             "amount": "300",
        //             "provider": "DOGE",
        //             "commission": "0",
        //             "account": "DOGE: DBVy8pF1f8yxaCVEHqHeR7kkcHecLQ8nRS",
        //             "order_id": 69670170,
        //             "extra": {
        //                 "txid": "f2b66259ae1580f371d38dd27e31a23fff8c04122b65ee3ab5a3f612d579c792",
        //                 "excode": "",
        //                 "invoice": ""
        //             },
        //             "error": ""
        //         },
        //     ],
        //         "count": 23
        //     }
        //
        const items = this.safeValue(response, 'items', []);
        const first = this.safeDict(items, 0, {});
        return this.parseTransaction(first, currency);
    }
    /**
     * @method
     * @name exmo#fetchDeposit
     * @description fetch information on a deposit
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#97f1becd-7aad-4e0e-babe-7bbe09e33706
     * @param {string} id deposit id
     * @param {string} code unified currency code, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDeposit(id, code = undefined, params = {}) {
        await this.loadMarkets();
        let currency = undefined;
        const request = {
            'order_id': id,
            'type': 'deposit',
        };
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        const response = await this.privatePostWalletOperations(this.extend(request, params));
        //
        //     {
        //         "items": [
        //         {
        //             "operation_id": 47412538520634344,
        //             "created": 1573760013,
        //             "updated": 1573760013,
        //             "type": "deposit",
        //             "currency": "DOGE",
        //             "status": "Paid",
        //             "amount": "300",
        //             "provider": "DOGE",
        //             "commission": "0",
        //             "account": "DOGE: DBVy8pF1f8yxaCVEHqHeR7kkcHecLQ8nRS",
        //             "order_id": 69670170,
        //             "extra": {
        //                 "txid": "f2b66259ae1580f371d38dd27e31a23fff8c04122b65ee3ab5a3f612d579c792",
        //                 "excode": "",
        //                 "invoice": ""
        //             },
        //             "error": ""
        //         },
        //     ],
        //         "count": 23
        //     }
        //
        const items = this.safeValue(response, 'items', []);
        const first = this.safeDict(items, 0, {});
        return this.parseTransaction(first, currency);
    }
    /**
     * @method
     * @name exmo#fetchDeposits
     * @description fetch all deposits made to an account
     * @see https://documenter.getpostman.com/view/10287440/SzYXWKPi#97f1becd-7aad-4e0e-babe-7bbe09e33706
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch deposits for
     * @param {int} [limit] the maximum number of deposits structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDeposits(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let currency = undefined;
        const request = {
            'type': 'deposit',
        };
        if (limit !== undefined) {
            request['limit'] = limit; // default: 100, maximum: 100
        }
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        const response = await this.privatePostWalletOperations(this.extend(request, params));
        //
        //     {
        //         "items": [
        //         {
        //             "operation_id": 47412538520634344,
        //             "created": 1573760013,
        //             "updated": 1573760013,
        //             "type": "deposit",
        //             "currency": "DOGE",
        //             "status": "Paid",
        //             "amount": "300",
        //             "provider": "DOGE",
        //             "commission": "0",
        //             "account": "DOGE: DBVy8pF1f8yxaCVEHqHeR7kkcHecLQ8nRS",
        //             "order_id": 69670170,
        //             "extra": {
        //                 "txid": "f2b66259ae1580f371d38dd27e31a23fff8c04122b65ee3ab5a3f612d579c792",
        //                 "excode": "",
        //                 "invoice": ""
        //             },
        //             "error": ""
        //         },
        //     ],
        //         "count": 23
        //     }
        //
        const items = this.safeList(response, 'items', []);
        return this.parseTransactions(items, currency, since, limit);
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        let url = this.urls['api'][api] + '/';
        if (api !== 'web') {
            url += this.version + '/';
        }
        url += path;
        if ((api === 'public') || (api === 'web')) {
            if (Object.keys(params).length) {
                url += '?' + this.urlencode(params);
            }
        }
        else if (api === 'private') {
            this.checkRequiredCredentials();
            const nonce = this.nonce();
            body = this.urlencode(this.extend({ 'nonce': nonce }, params));
            headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Key': this.apiKey,
                'Sign': this.hmac(this.encode(body), this.encode(this.secret), sha512.sha512),
            };
        }
        return { 'url': url, 'method': method, 'body': body, 'headers': headers };
    }
    nonce() {
        return this.milliseconds();
    }
    handleErrors(httpCode, reason, url, method, headers, body, response, requestHeaders, requestBody) {
        if (response === undefined) {
            return undefined; // fallback to default error handler
        }
        if (('error' in response) && !('result' in response)) {
            // error: {
            //     "code": "140434",
            //     "msg": "Your margin balance is not sufficient to place the order for '5 TON'. Please top up your margin wallet by "2.5 USDT"."
            // }
            //
            const errorCode = this.safeValue(response, 'error', {});
            const messageError = this.safeString(errorCode, 'msg');
            const code = this.safeString(errorCode, 'code');
            const feedback = this.id + ' ' + body;
            this.throwExactlyMatchedException(this.exceptions['exact'], code, feedback);
            this.throwBroadlyMatchedException(this.exceptions['broad'], messageError, feedback);
            throw new errors.ExchangeError(feedback);
        }
        if (('result' in response) || ('errmsg' in response)) {
            //
            //     {"result":false,"error":"Error 50052: Insufficient funds"}
            //     {"s":"error","errmsg":"strconv.ParseInt: parsing \"\": invalid syntax"}
            //
            let success = this.safeBool(response, 'result', false);
            if (typeof success === 'string') {
                if ((success === 'true') || (success === '1')) {
                    success = true;
                }
                else {
                    success = false;
                }
            }
            if (!success) {
                let code = undefined;
                const message = this.safeString2(response, 'error', 'errmsg');
                const errorParts = message.split(':');
                const numParts = errorParts.length;
                if (numParts > 1) {
                    const errorSubParts = errorParts[0].split(' ');
                    const numSubParts = errorSubParts.length;
                    code = (numSubParts > 1) ? errorSubParts[1] : errorSubParts[0];
                }
                const feedback = this.id + ' ' + body;
                this.throwExactlyMatchedException(this.exceptions['exact'], code, feedback);
                this.throwBroadlyMatchedException(this.exceptions['broad'], message, feedback);
                throw new errors.ExchangeError(feedback);
            }
        }
        return undefined;
    }
}

module.exports = exmo;
