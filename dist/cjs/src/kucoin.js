'use strict';

var kucoin$1 = require('./abstract/kucoin.js');
var errors = require('./base/errors.js');
var Precise = require('./base/Precise.js');
var number = require('./base/functions/number.js');
var sha256 = require('./static_dependencies/noble-hashes/sha256.js');

// ----------------------------------------------------------------------------
//  ---------------------------------------------------------------------------
/**
 * @class kucoin
 * @augments Exchange
 */
class kucoin extends kucoin$1 {
    describe() {
        return this.deepExtend(super.describe(), {
            'id': 'kucoin',
            'name': 'KuCoin',
            'countries': ['SC'],
            'rateLimit': 10,
            'version': 'v2',
            'certified': true,
            'pro': true,
            'comment': 'Platform 2.0',
            'quoteJsonNumbers': false,
            'has': {
                'CORS': undefined,
                'spot': true,
                'margin': true,
                'swap': false,
                'future': false,
                'option': false,
                'borrowCrossMargin': true,
                'borrowIsolatedMargin': true,
                'cancelAllOrders': true,
                'cancelOrder': true,
                'closeAllPositions': false,
                'closePosition': false,
                'createDepositAddress': true,
                'createMarketBuyOrderWithCost': true,
                'createMarketOrderWithCost': true,
                'createMarketSellOrderWithCost': true,
                'createOrder': true,
                'createOrders': true,
                'createPostOnlyOrder': true,
                'createStopLimitOrder': true,
                'createStopMarketOrder': true,
                'createStopOrder': true,
                'createTriggerOrder': true,
                'editOrder': true,
                'fetchAccounts': true,
                'fetchBalance': true,
                'fetchBorrowInterest': true,
                'fetchBorrowRateHistories': true,
                'fetchBorrowRateHistory': true,
                'fetchClosedOrders': true,
                'fetchCrossBorrowRate': false,
                'fetchCrossBorrowRates': false,
                'fetchCurrencies': true,
                'fetchDepositAddress': true,
                'fetchDepositAddresses': false,
                'fetchDepositAddressesByNetwork': true,
                'fetchDeposits': true,
                'fetchDepositWithdrawFee': true,
                'fetchDepositWithdrawFees': true,
                'fetchFundingHistory': false,
                'fetchFundingRate': false,
                'fetchFundingRateHistory': false,
                'fetchFundingRates': false,
                'fetchIndexOHLCV': false,
                'fetchIsolatedBorrowRate': false,
                'fetchIsolatedBorrowRates': false,
                'fetchL3OrderBook': true,
                'fetchLedger': true,
                'fetchLeverageTiers': false,
                'fetchMarginAdjustmentHistory': false,
                'fetchMarginMode': false,
                'fetchMarketLeverageTiers': false,
                'fetchMarkets': true,
                'fetchMarkOHLCV': false,
                'fetchMarkPrice': true,
                'fetchMarkPrices': true,
                'fetchMyTrades': true,
                'fetchOHLCV': true,
                'fetchOpenInterest': false,
                'fetchOpenInterestHistory': false,
                'fetchOpenOrders': true,
                'fetchOrder': true,
                'fetchOrderBook': true,
                'fetchOrderBooks': false,
                'fetchOrdersByStatus': true,
                'fetchOrderTrades': true,
                'fetchPositionHistory': false,
                'fetchPositionMode': false,
                'fetchPositionsHistory': false,
                'fetchPremiumIndexOHLCV': false,
                'fetchStatus': true,
                'fetchTicker': true,
                'fetchTickers': true,
                'fetchTime': true,
                'fetchTrades': true,
                'fetchTradingFee': true,
                'fetchTradingFees': false,
                'fetchTransactionFee': true,
                'fetchTransfers': false,
                'fetchWithdrawals': true,
                'repayCrossMargin': true,
                'repayIsolatedMargin': true,
                'setLeverage': true,
                'setMarginMode': false,
                'setPositionMode': false,
                'signIn': false,
                'transfer': true,
                'withdraw': true,
            },
            'urls': {
                'logo': 'https://user-images.githubusercontent.com/51840849/87295558-132aaf80-c50e-11ea-9801-a2fb0c57c799.jpg',
                'referral': 'https://www.kucoin.com/ucenter/signup?rcode=E5wkqe',
                'api': {
                    'public': 'https://api.kucoin.com',
                    'private': 'https://api.kucoin.com',
                    'futuresPrivate': 'https://api-futures.kucoin.com',
                    'futuresPublic': 'https://api-futures.kucoin.com',
                    'webExchange': 'https://kucoin.com/_api',
                    'broker': 'https://api-broker.kucoin.com',
                    'earn': 'https://api.kucoin.com',
                },
                'www': 'https://www.kucoin.com',
                'doc': [
                    'https://docs.kucoin.com',
                ],
            },
            'requiredCredentials': {
                'apiKey': true,
                'secret': true,
                'password': true,
            },
            'api': {
                // level VIP0
                // Spot => 3000/30s => 100/s
                // Weight = x => 100/(100/x) = x
                // Futures Management Public => 2000/30s => 200/3/s
                // Weight = x => 100/(200/3/x) = x*1.5
                'public': {
                    'get': {
                        // spot trading
                        'currencies': 4.5,
                        'currencies/{currency}': 4.5,
                        'symbols': 6,
                        'market/orderbook/level1': 3,
                        'market/allTickers': 22.5,
                        'market/stats': 22.5,
                        'markets': 4.5,
                        'market/orderbook/level{level}_{limit}': 6,
                        'market/orderbook/level2_20': 3,
                        'market/orderbook/level2_100': 6,
                        'market/histories': 4.5,
                        'market/candles': 4.5,
                        'prices': 4.5,
                        'timestamp': 4.5,
                        'status': 4.5,
                        // margin trading
                        'mark-price/{symbol}/current': 3,
                        'mark-price/all-symbols': 3,
                        'margin/config': 25,
                        'announcements': 20, // 20W
                    },
                    'post': {
                        // ws
                        'bullet-public': 15, // 10PW
                    },
                },
                'private': {
                    'get': {
                        // account
                        'user-info': 30,
                        'accounts': 7.5,
                        'accounts/{accountId}': 7.5,
                        'accounts/ledgers': 3,
                        'hf/accounts/ledgers': 2,
                        'hf/margin/account/ledgers': 2,
                        'transaction-history': 3,
                        'sub/user': 30,
                        'sub-accounts/{subUserId}': 22.5,
                        'sub-accounts': 30,
                        'sub/api-key': 30,
                        // funding
                        'margin/account': 40,
                        'margin/accounts': 15,
                        'isolated/accounts': 15,
                        'deposit-addresses': 7.5,
                        'deposits': 7.5,
                        'hist-deposits': 7.5,
                        'withdrawals': 30,
                        'hist-withdrawals': 30,
                        'withdrawals/quotas': 30,
                        'accounts/transferable': 30,
                        'transfer-list': 30,
                        'base-fee': 3,
                        'trade-fees': 3,
                        // spot trading
                        'market/orderbook/level{level}': 3,
                        'market/orderbook/level2': 3,
                        'market/orderbook/level3': 3,
                        'hf/accounts/opened': 2,
                        'hf/orders/active': 2,
                        'hf/orders/active/symbols': 2,
                        'hf/margin/order/active/symbols': 2,
                        'hf/orders/done': 2,
                        'hf/orders/{orderId}': 2,
                        'hf/orders/client-order/{clientOid}': 2,
                        'hf/orders/dead-cancel-all/query': 2,
                        'hf/fills': 2,
                        'orders': 2,
                        'limit/orders': 3,
                        'orders/{orderId}': 2,
                        'order/client-order/{clientOid}': 3,
                        'fills': 10,
                        'limit/fills': 20,
                        'stop-order': 8,
                        'stop-order/{orderId}': 3,
                        'stop-order/queryOrderByClientOid': 3,
                        'oco/order/{orderId}': 2,
                        'oco/order/details/{orderId}': 2,
                        'oco/client-order/{clientOid}': 2,
                        'oco/orders': 2,
                        // margin trading
                        'hf/margin/orders/active': 4,
                        'hf/margin/orders/done': 10,
                        'hf/margin/orders/{orderId}': 4,
                        'hf/margin/orders/client-order/{clientOid}': 5,
                        'hf/margin/fills': 5,
                        'etf/info': 25,
                        'margin/currencies': 20,
                        'risk/limit/strategy': 20,
                        'isolated/symbols': 20,
                        'margin/symbols': 5,
                        'isolated/account/{symbol}': 50,
                        'margin/borrow': 15,
                        'margin/repay': 15,
                        'margin/interest': 20,
                        'project/list': 10,
                        'project/marketInterestRate': 7.5,
                        'redeem/orders': 10,
                        'purchase/orders': 10,
                        // broker
                        'broker/api/rebase/download': 3,
                        'migrate/user/account/status': 3,
                        // affiliate
                        'affiliate/inviter/statistics': 30,
                    },
                    'post': {
                        // account
                        'sub/user/created': 22.5,
                        'sub/api-key': 30,
                        'sub/api-key/update': 45,
                        // funding
                        'deposit-addresses': 30,
                        'withdrawals': 7.5,
                        'accounts/universal-transfer': 6,
                        'accounts/sub-transfer': 45,
                        'accounts/inner-transfer': 15,
                        'transfer-out': 30,
                        'transfer-in': 30,
                        // spot trading
                        'hf/orders': 1,
                        'hf/orders/test': 1,
                        'hf/orders/sync': 1,
                        'hf/orders/multi': 1,
                        'hf/orders/multi/sync': 1,
                        'hf/orders/alter': 3,
                        'hf/orders/dead-cancel-all': 2,
                        'orders': 2,
                        'orders/test': 2,
                        'orders/multi': 3,
                        'stop-order': 2,
                        'oco/order': 2,
                        // margin trading
                        'hf/margin/order': 5,
                        'hf/margin/order/test': 5,
                        'margin/order': 5,
                        'margin/order/test': 5,
                        'margin/borrow': 15,
                        'margin/repay': 10,
                        'purchase': 15,
                        'redeem': 15,
                        'lend/purchase/update': 10,
                        // ws
                        'bullet-private': 10,
                        'position/update-user-leverage': 5,
                        'deposit-address/create': 20,
                    },
                    'delete': {
                        // account
                        'sub/api-key': 45,
                        // funding
                        'withdrawals/{withdrawalId}': 30,
                        // spot trading
                        'hf/orders/{orderId}': 1,
                        'hf/orders/sync/{orderId}': 1,
                        'hf/orders/client-order/{clientOid}': 1,
                        'hf/orders/sync/client-order/{clientOid}': 1,
                        'hf/orders/cancel/{orderId}': 2,
                        'hf/orders': 2,
                        'hf/orders/cancelAll': 30,
                        'orders/{orderId}': 3,
                        'order/client-order/{clientOid}': 5,
                        'orders': 20,
                        'stop-order/{orderId}': 3,
                        'stop-order/cancelOrderByClientOid': 5,
                        'stop-order/cancel': 3,
                        'oco/order/{orderId}': 3,
                        'oco/client-order/{clientOid}': 3,
                        'oco/orders': 3,
                        // margin trading
                        'hf/margin/orders/{orderId}': 5,
                        'hf/margin/orders/client-order/{clientOid}': 5,
                        'hf/margin/orders': 10, // 10SW
                    },
                },
                'futuresPublic': {
                    'get': {
                        'contracts/active': 4.5,
                        'contracts/{symbol}': 4.5,
                        'ticker': 3,
                        'level2/snapshot': 4.5,
                        'level2/depth20': 7.5,
                        'level2/depth100': 15,
                        'trade/history': 7.5,
                        'kline/query': 4.5,
                        'interest/query': 7.5,
                        'index/query': 3,
                        'mark-price/{symbol}/current': 4.5,
                        'premium/query': 4.5,
                        'trade-statistics': 4.5,
                        'funding-rate/{symbol}/current': 3,
                        'contract/funding-rates': 7.5,
                        'timestamp': 3,
                        'status': 6,
                        // ?
                        'level2/message/query': 1.3953,
                    },
                    'post': {
                        // ws
                        'bullet-public': 15, // 10PW
                    },
                },
                'futuresPrivate': {
                    'get': {
                        // account
                        'transaction-history': 3,
                        // funding
                        'account-overview': 7.5,
                        'account-overview-all': 9,
                        'transfer-list': 30,
                        // futures
                        'orders': 3,
                        'stopOrders': 9,
                        'recentDoneOrders': 7.5,
                        'orders/{orderId}': 7.5,
                        'orders/byClientOid': 7.5,
                        'fills': 7.5,
                        'recentFills': 4.5,
                        'openOrderStatistics': 15,
                        'position': 3,
                        'positions': 3,
                        'margin/maxWithdrawMargin': 15,
                        'contracts/risk-limit/{symbol}': 7.5,
                        'funding-history': 7.5, // 5FW
                    },
                    'post': {
                        // funding
                        'transfer-out': 30,
                        'transfer-in': 30,
                        // futures
                        'orders': 3,
                        'orders/test': 3,
                        'orders/multi': 4.5,
                        'position/margin/auto-deposit-status': 6,
                        'margin/withdrawMargin': 15,
                        'position/margin/deposit-margin': 6,
                        'position/risk-limit-level/change': 6,
                        // ws
                        'bullet-private': 15, // 10FW
                    },
                    'delete': {
                        'orders/{orderId}': 1.5,
                        'orders/client-order/{clientOid}': 1.5,
                        'orders': 45,
                        'stopOrders': 22.5, // 15FW
                    },
                },
                'webExchange': {
                    'get': {
                        'currency/currency/chain-info': 1, // this is temporary from webApi
                    },
                },
                'broker': {
                    'get': {
                        'broker/nd/info': 2,
                        'broker/nd/account': 2,
                        'broker/nd/account/apikey': 2,
                        'broker/nd/rebase/download': 3,
                        'asset/ndbroker/deposit/list': 1,
                        'broker/nd/transfer/detail': 1,
                        'broker/nd/deposit/detail': 1,
                        'broker/nd/withdraw/detail': 1,
                    },
                    'post': {
                        'broker/nd/transfer': 1,
                        'broker/nd/account': 3,
                        'broker/nd/account/apikey': 3,
                        'broker/nd/account/update-apikey': 3,
                    },
                    'delete': {
                        'broker/nd/account/apikey': 3,
                    },
                },
                'earn': {
                    'get': {
                        'otc-loan/loan': 1,
                        'otc-loan/accounts': 1,
                        'earn/redeem-preview': 7.5,
                        'earn/saving/products': 7.5,
                        'earn/hold-assets': 7.5,
                        'earn/promotion/products': 7.5,
                        'earn/kcs-staking/products': 7.5,
                        'earn/staking/products': 7.5,
                        'earn/eth-staking/products': 7.5, // 5EW
                    },
                    'post': {
                        'earn/orders': 7.5, // 5EW
                    },
                    'delete': {
                        'earn/orders': 7.5, // 5EW
                    },
                },
            },
            'timeframes': {
                '1m': '1min',
                '3m': '3min',
                '5m': '5min',
                '15m': '15min',
                '30m': '30min',
                '1h': '1hour',
                '2h': '2hour',
                '4h': '4hour',
                '6h': '6hour',
                '8h': '8hour',
                '12h': '12hour',
                '1d': '1day',
                '1w': '1week',
                '1M': '1month',
            },
            'precisionMode': number.TICK_SIZE,
            'exceptions': {
                'exact': {
                    'The order does not exist.': errors.OrderNotFound,
                    'order not exist': errors.OrderNotFound,
                    'order not exist.': errors.OrderNotFound,
                    'order_not_exist': errors.OrderNotFound,
                    'order_not_exist_or_not_allow_to_cancel': errors.InvalidOrder,
                    'Order size below the minimum requirement.': errors.InvalidOrder,
                    'The withdrawal amount is below the minimum requirement.': errors.ExchangeError,
                    'Unsuccessful! Exceeded the max. funds out-transfer limit': errors.InsufficientFunds,
                    'The amount increment is invalid.': errors.BadRequest,
                    'The quantity is below the minimum requirement.': errors.InvalidOrder,
                    '400': errors.BadRequest,
                    '401': errors.AuthenticationError,
                    '403': errors.NotSupported,
                    '404': errors.NotSupported,
                    '405': errors.NotSupported,
                    '415': errors.NotSupported,
                    '429': errors.RateLimitExceeded,
                    '500': errors.ExchangeNotAvailable,
                    '503': errors.ExchangeNotAvailable,
                    '101030': errors.PermissionDenied,
                    '103000': errors.InvalidOrder,
                    '130101': errors.BadRequest,
                    '130102': errors.ExchangeError,
                    '130103': errors.OrderNotFound,
                    '130104': errors.ExchangeError,
                    '130105': errors.InsufficientFunds,
                    '130106': errors.NotSupported,
                    '130107': errors.ExchangeError,
                    '130108': errors.OrderNotFound,
                    '130201': errors.PermissionDenied,
                    '130202': errors.ExchangeError,
                    '130203': errors.InsufficientFunds,
                    '130204': errors.BadRequest,
                    '130301': errors.InsufficientFunds,
                    '130302': errors.PermissionDenied,
                    '130303': errors.NotSupported,
                    '130304': errors.NotSupported,
                    '130305': errors.NotSupported,
                    '130306': errors.NotSupported,
                    '130307': errors.NotSupported,
                    '130308': errors.InvalidOrder,
                    '130309': errors.InvalidOrder,
                    '130310': errors.ExchangeError,
                    '130311': errors.InvalidOrder,
                    '130312': errors.InvalidOrder,
                    '130313': errors.InvalidOrder,
                    '130314': errors.InvalidOrder,
                    '130315': errors.NotSupported,
                    '126000': errors.ExchangeError,
                    '126001': errors.NotSupported,
                    '126002': errors.ExchangeError,
                    '126003': errors.InvalidOrder,
                    '126004': errors.ExchangeError,
                    '126005': errors.PermissionDenied,
                    '126006': errors.ExchangeError,
                    '126007': errors.ExchangeError,
                    '126009': errors.ExchangeError,
                    '126010': errors.ExchangeError,
                    '126011': errors.ExchangeError,
                    '126013': errors.InsufficientFunds,
                    '126015': errors.ExchangeError,
                    '126021': errors.NotSupported,
                    '126022': errors.InvalidOrder,
                    '126027': errors.InvalidOrder,
                    '126028': errors.InvalidOrder,
                    '126029': errors.InvalidOrder,
                    '126030': errors.InvalidOrder,
                    '126033': errors.InvalidOrder,
                    '126034': errors.InvalidOrder,
                    '126036': errors.InvalidOrder,
                    '126037': errors.ExchangeError,
                    '126038': errors.ExchangeError,
                    '126039': errors.ExchangeError,
                    '126041': errors.ExchangeError,
                    '126042': errors.ExchangeError,
                    '126043': errors.OrderNotFound,
                    '126044': errors.InvalidOrder,
                    '126045': errors.NotSupported,
                    '126046': errors.NotSupported,
                    '126047': errors.PermissionDenied,
                    '126048': errors.PermissionDenied,
                    '135005': errors.ExchangeError,
                    '135018': errors.ExchangeError,
                    '200004': errors.InsufficientFunds,
                    '210014': errors.InvalidOrder,
                    '210021': errors.InsufficientFunds,
                    '230003': errors.InsufficientFunds,
                    '260000': errors.InvalidAddress,
                    '260100': errors.InsufficientFunds,
                    '300000': errors.InvalidOrder,
                    '400000': errors.BadSymbol,
                    '400001': errors.AuthenticationError,
                    '400002': errors.InvalidNonce,
                    '400003': errors.AuthenticationError,
                    '400004': errors.AuthenticationError,
                    '400005': errors.AuthenticationError,
                    '400006': errors.AuthenticationError,
                    '400007': errors.AuthenticationError,
                    '400008': errors.NotSupported,
                    '400100': errors.InsufficientFunds,
                    '400200': errors.InvalidOrder,
                    '400330': errors.InvalidOrder,
                    '400350': errors.InvalidOrder,
                    '400370': errors.InvalidOrder,
                    '400400': errors.BadRequest,
                    '400401': errors.AuthenticationError,
                    '400500': errors.InvalidOrder,
                    '400600': errors.BadSymbol,
                    '400760': errors.InvalidOrder,
                    '401000': errors.BadRequest,
                    '408000': errors.BadRequest,
                    '411100': errors.AccountSuspended,
                    '415000': errors.BadRequest,
                    '400303': errors.PermissionDenied,
                    '500000': errors.ExchangeNotAvailable,
                    '260220': errors.InvalidAddress,
                    '600100': errors.InsufficientFunds,
                    '600101': errors.InvalidOrder,
                    '900014': errors.BadRequest, // {"code":"900014","msg":"Invalid chainId"}
                },
                'broad': {
                    'Exceeded the access frequency': errors.RateLimitExceeded,
                    'require more permission': errors.PermissionDenied,
                },
            },
            'fees': {
                'trading': {
                    'tierBased': true,
                    'percentage': true,
                    'taker': this.parseNumber('0.001'),
                    'maker': this.parseNumber('0.001'),
                    'tiers': {
                        'taker': [
                            [this.parseNumber('0'), this.parseNumber('0.001')],
                            [this.parseNumber('50'), this.parseNumber('0.001')],
                            [this.parseNumber('200'), this.parseNumber('0.0009')],
                            [this.parseNumber('500'), this.parseNumber('0.0008')],
                            [this.parseNumber('1000'), this.parseNumber('0.0007')],
                            [this.parseNumber('2000'), this.parseNumber('0.0007')],
                            [this.parseNumber('4000'), this.parseNumber('0.0006')],
                            [this.parseNumber('8000'), this.parseNumber('0.0005')],
                            [this.parseNumber('15000'), this.parseNumber('0.00045')],
                            [this.parseNumber('25000'), this.parseNumber('0.0004')],
                            [this.parseNumber('40000'), this.parseNumber('0.00035')],
                            [this.parseNumber('60000'), this.parseNumber('0.0003')],
                            [this.parseNumber('80000'), this.parseNumber('0.00025')],
                        ],
                        'maker': [
                            [this.parseNumber('0'), this.parseNumber('0.001')],
                            [this.parseNumber('50'), this.parseNumber('0.0009')],
                            [this.parseNumber('200'), this.parseNumber('0.0007')],
                            [this.parseNumber('500'), this.parseNumber('0.0005')],
                            [this.parseNumber('1000'), this.parseNumber('0.0003')],
                            [this.parseNumber('2000'), this.parseNumber('0')],
                            [this.parseNumber('4000'), this.parseNumber('0')],
                            [this.parseNumber('8000'), this.parseNumber('0')],
                            [this.parseNumber('15000'), this.parseNumber('-0.00005')],
                            [this.parseNumber('25000'), this.parseNumber('-0.00005')],
                            [this.parseNumber('40000'), this.parseNumber('-0.00005')],
                            [this.parseNumber('60000'), this.parseNumber('-0.00005')],
                            [this.parseNumber('80000'), this.parseNumber('-0.00005')],
                        ],
                    },
                },
                'funding': {
                    'tierBased': false,
                    'percentage': false,
                    'withdraw': {},
                    'deposit': {},
                },
            },
            'commonCurrencies': {
                'BIFI': 'BIFIF',
                'VAI': 'VAIOT',
                'WAX': 'WAXP',
                'ALT': 'APTOSLAUNCHTOKEN',
                'KALT': 'ALT',
                'FUD': 'FTX Users\' Debt',
            },
            'options': {
                'hf': undefined,
                'version': 'v1',
                'symbolSeparator': '-',
                'fetchMyTradesMethod': 'private_get_fills',
                'timeDifference': 0,
                'adjustForTimeDifference': false,
                'fetchCurrencies': {
                    'webApiEnable': true,
                    'webApiRetries': 1,
                    'webApiMuteFailure': true,
                },
                'fetchMarkets': {
                    'fetchTickersFees': true,
                },
                'withdraw': {
                    'includeFee': false,
                },
                // endpoint versions
                'versions': {
                    'public': {
                        'GET': {
                            // spot trading
                            'currencies': 'v3',
                            'currencies/{currency}': 'v3',
                            'symbols': 'v2',
                            'mark-price/all-symbols': 'v3',
                            'announcements': 'v3',
                        },
                    },
                    'private': {
                        'GET': {
                            // account
                            'user-info': 'v2',
                            'hf/margin/account/ledgers': 'v3',
                            'sub/user': 'v2',
                            'sub-accounts': 'v2',
                            // funding
                            'margin/accounts': 'v3',
                            'isolated/accounts': 'v3',
                            // 'deposit-addresses': 'v2',
                            'deposit-addresses': 'v1',
                            // spot trading
                            'market/orderbook/level2': 'v3',
                            'market/orderbook/level3': 'v3',
                            'market/orderbook/level{level}': 'v3',
                            'oco/order/{orderId}': 'v3',
                            'oco/order/details/{orderId}': 'v3',
                            'oco/client-order/{clientOid}': 'v3',
                            'oco/orders': 'v3',
                            // margin trading
                            'hf/margin/orders/active': 'v3',
                            'hf/margin/order/active/symbols': 'v3',
                            'hf/margin/orders/done': 'v3',
                            'hf/margin/orders/{orderId}': 'v3',
                            'hf/margin/orders/client-order/{clientOid}': 'v3',
                            'hf/margin/fills': 'v3',
                            'etf/info': 'v3',
                            'margin/currencies': 'v3',
                            'margin/borrow': 'v3',
                            'margin/repay': 'v3',
                            'margin/interest': 'v3',
                            'project/list': 'v3',
                            'project/marketInterestRate': 'v3',
                            'redeem/orders': 'v3',
                            'purchase/orders': 'v3',
                            'migrate/user/account/status': 'v3',
                            'margin/symbols': 'v3',
                            'affiliate/inviter/statistics': 'v2',
                            'asset/ndbroker/deposit/list': 'v1',
                        },
                        'POST': {
                            // account
                            'sub/user/created': 'v2',
                            // funding
                            'accounts/universal-transfer': 'v3',
                            'accounts/sub-transfer': 'v2',
                            'accounts/inner-transfer': 'v2',
                            'transfer-out': 'v3',
                            'deposit-address/create': 'v3',
                            // spot trading
                            'oco/order': 'v3',
                            // margin trading
                            'hf/margin/order': 'v3',
                            'hf/margin/order/test': 'v3',
                            'margin/borrow': 'v3',
                            'margin/repay': 'v3',
                            'purchase': 'v3',
                            'redeem': 'v3',
                            'lend/purchase/update': 'v3',
                            'position/update-user-leverage': 'v3',
                            'withdrawals': 'v3',
                        },
                        'DELETE': {
                            // account
                            // funding
                            // spot trading
                            'hf/margin/orders/{orderId}': 'v3',
                            'hf/margin/orders/client-order/{clientOid}': 'v3',
                            'hf/margin/orders': 'v3',
                            'oco/order/{orderId}': 'v3',
                            'oco/client-order/{clientOid}': 'v3',
                            'oco/orders': 'v3',
                            // margin trading
                        },
                    },
                    'futuresPrivate': {
                        'POST': {
                            'transfer-out': 'v3',
                        },
                    },
                },
                'partner': {
                    // the support for spot and future exchanges as separate settings
                    'spot': {
                        'id': 'ccxt',
                        'key': '9e58cc35-5b5e-4133-92ec-166e3f077cb8',
                    },
                    'future': {
                        'id': 'ccxtfutures',
                        'key': '1b327198-f30c-4f14-a0ac-918871282f15',
                    },
                    // exchange-wide settings are also supported
                    // 'id': 'ccxt'
                    // 'key': '9e58cc35-5b5e-4133-92ec-166e3f077cb8',
                },
                'accountsByType': {
                    'spot': 'trade',
                    'margin': 'margin',
                    'cross': 'margin',
                    'isolated': 'isolated',
                    'main': 'main',
                    'funding': 'main',
                    'future': 'contract',
                    'swap': 'contract',
                    'mining': 'pool',
                    'hf': 'trade_hf',
                },
                'networks': {
                    'BRC20': 'btc',
                    'BTCNATIVESEGWIT': 'bech32',
                    'ERC20': 'eth',
                    'TRC20': 'trx',
                    'HRC20': 'heco',
                    'MATIC': 'matic',
                    'KCC': 'kcc',
                    'SOL': 'sol',
                    'ALGO': 'algo',
                    'EOS': 'eos',
                    'BEP20': 'bsc',
                    'BEP2': 'bnb',
                    'ARBONE': 'arbitrum',
                    'AVAXX': 'avax',
                    'AVAXC': 'avaxc',
                    'TLOS': 'tlos',
                    'CFX': 'cfx',
                    'ACA': 'aca',
                    'OPTIMISM': 'optimism',
                    'ONT': 'ont',
                    'GLMR': 'glmr',
                    'CSPR': 'cspr',
                    'KLAY': 'klay',
                    'XRD': 'xrd',
                    'RVN': 'rvn',
                    'NEAR': 'near',
                    'APT': 'aptos',
                    'ETHW': 'ethw',
                    'TON': 'ton',
                    'BCH': 'bch',
                    'BSV': 'bchsv',
                    'BCHA': 'bchabc',
                    'OSMO': 'osmo',
                    'NANO': 'nano',
                    'XLM': 'xlm',
                    'VET': 'vet',
                    'IOST': 'iost',
                    'ZIL': 'zil',
                    'XRP': 'xrp',
                    'TOMO': 'tomo',
                    'XMR': 'xmr',
                    'COTI': 'coti',
                    'XTZ': 'xtz',
                    'ADA': 'ada',
                    'WAX': 'waxp',
                    'THETA': 'theta',
                    'ONE': 'one',
                    'IOTEX': 'iotx',
                    'NULS': 'nuls',
                    'KSM': 'ksm',
                    'LTC': 'ltc',
                    'WAVES': 'waves',
                    'DOT': 'dot',
                    'STEEM': 'steem',
                    'QTUM': 'qtum',
                    'DOGE': 'doge',
                    'FIL': 'fil',
                    'XYM': 'xym',
                    'FLUX': 'flux',
                    'ATOM': 'atom',
                    'XDC': 'xdc',
                    'KDA': 'kda',
                    'ICP': 'icp',
                    'CELO': 'celo',
                    'LSK': 'lsk',
                    'VSYS': 'vsys',
                    'KAR': 'kar',
                    'XCH': 'xch',
                    'FLOW': 'flow',
                    'BAND': 'band',
                    'EGLD': 'egld',
                    'HBAR': 'hbar',
                    'XPR': 'xpr',
                    'AR': 'ar',
                    'FTM': 'ftm',
                    'KAVA': 'kava',
                    'KMA': 'kma',
                    'XEC': 'xec',
                    'IOTA': 'iota',
                    'HNT': 'hnt',
                    'ASTR': 'astr',
                    'PDEX': 'pdex',
                    'METIS': 'metis',
                    'ZEC': 'zec',
                    'POKT': 'pokt',
                    'OASYS': 'oas',
                    'OASIS': 'oasis',
                    'ETC': 'etc',
                    'AKT': 'akt',
                    'FSN': 'fsn',
                    'SCRT': 'scrt',
                    'CFG': 'cfg',
                    'ICX': 'icx',
                    'KMD': 'kmd',
                    'NEM': 'NEM',
                    'STX': 'stx',
                    'DGB': 'dgb',
                    'DCR': 'dcr',
                    'CKB': 'ckb',
                    'ELA': 'ela',
                    'HYDRA': 'hydra',
                    'BTM': 'btm',
                    'KARDIA': 'kai',
                    'SXP': 'sxp',
                    'NEBL': 'nebl',
                    'ZEN': 'zen',
                    'SDN': 'sdn',
                    'LTO': 'lto',
                    'WEMIX': 'wemix',
                    // 'BOBA': 'boba', // tbd
                    'EVER': 'ever',
                    'BNC': 'bnc',
                    'BNCDOT': 'bncdot',
                    // 'CMP': 'cmp', // todo: after consensus
                    'AION': 'aion',
                    'GRIN': 'grin',
                    'LOKI': 'loki',
                    'QKC': 'qkc',
                    'TT': 'TT',
                    'PIVX': 'pivx',
                    'SERO': 'sero',
                    'METER': 'meter',
                    'STATEMINE': 'statemine',
                    'DVPN': 'dvpn',
                    'XPRT': 'xprt',
                    'MOVR': 'movr',
                    'ERGO': 'ergo',
                    'ABBC': 'abbc',
                    'DIVI': 'divi',
                    'PURA': 'pura',
                    'DFI': 'dfi',
                    // 'NEO': 'neo', // tbd neo legacy
                    'NEON3': 'neon3',
                    'DOCK': 'dock',
                    'TRUE': 'true',
                    'CS': 'cs',
                    'ORAI': 'orai',
                    'BASE': 'base',
                    'TARA': 'tara',
                    // below will be uncommented after consensus
                    // 'BITCOINDIAMON': 'bcd',
                    // 'BITCOINGOLD': 'btg',
                    // 'HTR': 'htr',
                    // 'DEROHE': 'derohe',
                    // 'NDAU': 'ndau',
                    // 'HPB': 'hpb',
                    // 'AXE': 'axe',
                    // 'BITCOINPRIVATE': 'btcp',
                    // 'EDGEWARE': 'edg',
                    // 'JUPITER': 'jup',
                    // 'VELAS': 'vlx', // vlxevm is different
                    // // 'terra' luna lunc TBD
                    // 'DIGITALBITS': 'xdb',
                    // // fra is fra-emv on kucoin
                    // 'PASTEL': 'psl',
                    // // sysevm
                    // 'CONCORDIUM': 'ccd',
                    // 'AURORA': 'aurora',
                    // 'PHA': 'pha', // a.k.a. khala
                    // 'PAL': 'pal',
                    // 'RSK': 'rbtc',
                    // 'NIX': 'nix',
                    // 'NIM': 'nim',
                    // 'NRG': 'nrg',
                    // 'RFOX': 'rfox',
                    // 'PIONEER': 'neer',
                    // 'PIXIE': 'pix',
                    // 'ALEPHZERO': 'azero',
                    // 'ACHAIN': 'act', // actevm is different
                    // 'BOSCOIN': 'bos',
                    // 'ELECTRONEUM': 'etn',
                    // 'GOCHAIN': 'go',
                    // 'SOPHIATX': 'sphtx',
                    // 'WANCHAIN': 'wan',
                    // 'ZEEPIN': 'zpt',
                    // 'MATRIXAI': 'man',
                    // 'METADIUM': 'meta',
                    // 'METAHASH': 'mhc',
                    // // eosc --"eosforce" tbd
                    // 'IOTCHAIN': 'itc',
                    // 'CONTENTOS': 'cos',
                    // 'CPCHAIN': 'cpc',
                    // 'INTCHAIN': 'int',
                    // // 'DASH': 'dash', tbd digita-cash
                    // 'WALTONCHAIN': 'wtc',
                    // 'CONSTELLATION': 'dag',
                    // 'ONELEDGER': 'olt',
                    // 'AIRDAO': 'amb', // a.k.a. AMBROSUS
                    // 'ENERGYWEB': 'ewt',
                    // 'WAVESENTERPRISE': 'west',
                    // 'HYPERCASH': 'hc',
                    // 'ENECUUM': 'enq',
                    // 'HAVEN': 'xhv',
                    // 'CHAINX': 'pcx',
                    // // 'FLUXOLD': 'zel', // zel seems old chain (with uppercase FLUX in kucoin UI and with id 'zel')
                    // 'BUMO': 'bu',
                    // 'DEEPONION': 'onion',
                    // 'ULORD': 'ut',
                    // 'ASCH': 'xas',
                    // 'SOLARIS': 'xlr',
                    // 'APOLLO': 'apl',
                    // 'PIRATECHAIN': 'arrr',
                    // 'ULTRA': 'uos',
                    // 'EMONEY': 'ngm',
                    // 'AURORACHAIN': 'aoa',
                    // 'KLEVER': 'klv',
                    // undetermined: xns(insolar), rhoc, luk (luniverse), kts (klimatas), bchn (bitcoin cash node), god (shallow entry), lit (litmus),
                },
                'marginModes': {
                    'cross': 'MARGIN_TRADE',
                    'isolated': 'MARGIN_ISOLATED_TRADE',
                    'spot': 'TRADE',
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
                        'stopLossPrice': true,
                        'takeProfitPrice': true,
                        'attachedStopLossTakeProfit': undefined,
                        'timeInForce': {
                            'IOC': true,
                            'FOK': true,
                            'PO': true,
                            'GTD': true,
                        },
                        'hedged': false,
                        'trailing': false,
                        'leverage': false,
                        'marketBuyByCost': true,
                        'marketBuyRequiresPrice': false,
                        'selfTradePrevention': true,
                        'iceberg': true, // todo implement
                    },
                    'createOrders': {
                        'max': 5,
                    },
                    'fetchMyTrades': {
                        'marginMode': true,
                        'limit': undefined,
                        'daysBack': undefined,
                        'untilDays': 7,
                        'symbolRequired': true,
                    },
                    'fetchOrder': {
                        'marginMode': false,
                        'trigger': true,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOpenOrders': {
                        'marginMode': true,
                        'limit': 500,
                        'trigger': true,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOrders': undefined,
                    'fetchClosedOrders': {
                        'marginMode': true,
                        'limit': 500,
                        'daysBack': undefined,
                        'daysBackCanceled': undefined,
                        'untilDays': 7,
                        'trigger': true,
                        'trailing': false,
                        'symbolRequired': true,
                    },
                    'fetchOHLCV': {
                        'limit': 1500,
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
        });
    }
    nonce() {
        return this.milliseconds() - this.options['timeDifference'];
    }
    /**
     * @method
     * @name kucoin#fetchTime
     * @description fetches the current integer timestamp in milliseconds from the exchange server
     * @see https://docs.kucoin.com/#server-time
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {int} the current integer timestamp in milliseconds from the exchange server
     */
    async fetchTime(params = {}) {
        const response = await this.publicGetTimestamp(params);
        //
        //     {
        //         "code":"200000",
        //         "msg":"success",
        //         "data":1546837113087
        //     }
        //
        return this.safeInteger(response, 'data');
    }
    /**
     * @method
     * @name kucoin#fetchStatus
     * @description the latest known information on the availability of the exchange API
     * @see https://docs.kucoin.com/#service-status
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [status structure]{@link https://docs.ccxt.com/#/?id=exchange-status-structure}
     */
    async fetchStatus(params = {}) {
        const response = await this.publicGetStatus(params);
        //
        //     {
        //         "code":"200000",
        //         "data":{
        //             "status":"open", //open, close, cancelonly
        //             "msg":"upgrade match engine" //remark for operation
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const status = this.safeString(data, 'status');
        return {
            'status': (status === 'open') ? 'ok' : 'maintenance',
            'updated': undefined,
            'eta': undefined,
            'url': undefined,
            'info': response,
        };
    }
    /**
     * @method
     * @name kucoin#fetchMarkets
     * @description retrieves data on all markets for kucoin
     * @see https://docs.kucoin.com/#get-symbols-list-deprecated
     * @see https://docs.kucoin.com/#get-all-tickers
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} an array of objects representing market data
     */
    async fetchMarkets(params = {}) {
        let fetchTickersFees = undefined;
        [fetchTickersFees, params] = this.handleOptionAndParams(params, 'fetchMarkets', 'fetchTickersFees', true);
        const promises = [];
        promises.push(this.publicGetSymbols(params));
        //
        //     {
        //         "code": "200000",
        //         "data": [
        //             {
        //                 "symbol": "XLM-USDT",
        //                 "name": "XLM-USDT",
        //                 "baseCurrency": "XLM",
        //                 "quoteCurrency": "USDT",
        //                 "feeCurrency": "USDT",
        //                 "market": "USDS",
        //                 "baseMinSize": "0.1",
        //                 "quoteMinSize": "0.01",
        //                 "baseMaxSize": "10000000000",
        //                 "quoteMaxSize": "99999999",
        //                 "baseIncrement": "0.0001",
        //                 "quoteIncrement": "0.000001",
        //                 "priceIncrement": "0.000001",
        //                 "priceLimitRate": "0.1",
        //                 "isMarginEnabled": true,
        //                 "enableTrading": true
        //             },
        //
        const credentialsSet = this.checkRequiredCredentials(false);
        const requestMarginables = credentialsSet && this.safeBool(params, 'marginables', true);
        if (requestMarginables) {
            promises.push(this.privateGetMarginSymbols(params)); // cross margin symbols
            //
            //    {
            //        "code": "200000",
            //        "data": {
            //            "timestamp": 1719393213421,
            //            "items": [
            //                {
            //                    // same object as in market, with one additional field:
            //                    "minFunds": "0.1"
            //                },
            //
            promises.push(this.privateGetIsolatedSymbols(params)); // isolated margin symbols
            //
            //    {
            //        "code": "200000",
            //        "data": [
            //            {
            //                "symbol": "NKN-USDT",
            //                "symbolName": "NKN-USDT",
            //                "baseCurrency": "NKN",
            //                "quoteCurrency": "USDT",
            //                "maxLeverage": 5,
            //                "flDebtRatio": "0.97",
            //                "tradeEnable": true,
            //                "autoRenewMaxDebtRatio": "0.96",
            //                "baseBorrowEnable": true,
            //                "quoteBorrowEnable": true,
            //                "baseTransferInEnable": true,
            //                "quoteTransferInEnable": true,
            //                "baseBorrowCoefficient": "1",
            //                "quoteBorrowCoefficient": "1"
            //            },
            //
        }
        if (fetchTickersFees) {
            promises.push(this.publicGetMarketAllTickers(params));
            //
            //     {
            //         "code": "200000",
            //         "data": {
            //             "time":1602832092060,
            //             "ticker":[
            //                 {
            //                     "symbol": "BTC-USDT",   // symbol
            //                     "symbolName":"BTC-USDT", // Name of trading pairs, it would change after renaming
            //                     "buy": "11328.9",   // bestAsk
            //                     "sell": "11329",    // bestBid
            //                     "changeRate": "-0.0055",    // 24h change rate
            //                     "changePrice": "-63.6", // 24h change price
            //                     "high": "11610",    // 24h highest price
            //                     "low": "11200", // 24h lowest price
            //                     "vol": "2282.70993217", // 24h volume，the aggregated trading volume in BTC
            //                     "volValue": "25984946.157790431",   // 24h total, the trading volume in quote currency of last 24 hours
            //                     "last": "11328.9",  // last price
            //                     "averagePrice": "11360.66065903",   // 24h average transaction price yesterday
            //                     "takerFeeRate": "0.001",    // Basic Taker Fee
            //                     "makerFeeRate": "0.001",    // Basic Maker Fee
            //                     "takerCoefficient": "1",    // Taker Fee Coefficient
            //                     "makerCoefficient": "1" // Maker Fee Coefficient
            //                 }
            //
        }
        if (credentialsSet) {
            // load migration status for account
            promises.push(this.loadMigrationStatus());
        }
        const responses = await Promise.all(promises);
        const symbolsData = this.safeList(responses[0], 'data');
        const crossData = requestMarginables ? this.safeDict(responses[1], 'data', {}) : {};
        const crossItems = this.safeList(crossData, 'items', []);
        const crossById = this.indexBy(crossItems, 'symbol');
        const isolatedData = requestMarginables ? responses[2] : {};
        const isolatedItems = this.safeList(isolatedData, 'data', []);
        const isolatedById = this.indexBy(isolatedItems, 'symbol');
        const tickersIdx = requestMarginables ? 3 : 1;
        const tickersResponse = this.safeDict(responses, tickersIdx, {});
        const tickerItems = this.safeList(this.safeDict(tickersResponse, 'data', {}), 'ticker', []);
        const tickersById = this.indexBy(tickerItems, 'symbol');
        const result = [];
        for (let i = 0; i < symbolsData.length; i++) {
            const market = symbolsData[i];
            const id = this.safeString(market, 'symbol');
            const [baseId, quoteId] = id.split('-');
            const base = this.safeCurrencyCode(baseId);
            const quote = this.safeCurrencyCode(quoteId);
            // const quoteIncrement = this.safeNumber (market, 'quoteIncrement');
            const ticker = this.safeDict(tickersById, id, {});
            const makerFeeRate = this.safeString(ticker, 'makerFeeRate');
            const takerFeeRate = this.safeString(ticker, 'takerFeeRate');
            const makerCoefficient = this.safeString(ticker, 'makerCoefficient');
            const takerCoefficient = this.safeString(ticker, 'takerCoefficient');
            const hasCrossMargin = (id in crossById);
            const hasIsolatedMargin = (id in isolatedById);
            const isMarginable = this.safeBool(market, 'isMarginEnabled', false) || hasCrossMargin || hasIsolatedMargin;
            result.push({
                'id': id,
                'symbol': base + '/' + quote,
                'base': base,
                'quote': quote,
                'settle': undefined,
                'baseId': baseId,
                'quoteId': quoteId,
                'settleId': undefined,
                'type': 'spot',
                'spot': true,
                'margin': isMarginable,
                'marginModes': {
                    'cross': hasCrossMargin,
                    'isolated': hasIsolatedMargin,
                },
                'swap': false,
                'future': false,
                'option': false,
                'active': this.safeBool(market, 'enableTrading'),
                'contract': false,
                'linear': undefined,
                'inverse': undefined,
                'taker': this.parseNumber(Precise["default"].stringMul(takerFeeRate, takerCoefficient)),
                'maker': this.parseNumber(Precise["default"].stringMul(makerFeeRate, makerCoefficient)),
                'contractSize': undefined,
                'expiry': undefined,
                'expiryDatetime': undefined,
                'strike': undefined,
                'optionType': undefined,
                'precision': {
                    'amount': this.safeNumber(market, 'baseIncrement'),
                    'price': this.safeNumber(market, 'priceIncrement'),
                },
                'limits': {
                    'leverage': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'amount': {
                        'min': this.safeNumber(market, 'baseMinSize'),
                        'max': this.safeNumber(market, 'baseMaxSize'),
                    },
                    'price': {
                        'min': undefined,
                        'max': undefined,
                    },
                    'cost': {
                        'min': this.safeNumber(market, 'quoteMinSize'),
                        'max': this.safeNumber(market, 'quoteMaxSize'),
                    },
                },
                'created': undefined,
                'info': market,
            });
        }
        if (this.options['adjustForTimeDifference']) {
            await this.loadTimeDifference();
        }
        return result;
    }
    /**
     * @method
     * @name kucoin#loadMigrationStatus
     * @param {boolean} force load account state for non hf
     * @description loads the migration status for the account (hf or not)
     * @see https://www.kucoin.com/docs/rest/spot-trading/spot-hf-trade-pro-account/get-user-type
     * @returns {any} ignore
     */
    async loadMigrationStatus(force = false) {
        if (!('hf' in this.options) || (this.options['hf'] === undefined) || force) {
            const result = await this.privateGetHfAccountsOpened();
            this.options['hf'] = this.safeBool(result, 'data');
        }
        return true;
    }
    handleHfAndParams(params = {}) {
        const migrated = this.safeBool(this.options, 'hf', false);
        let loadedHf = undefined;
        if (migrated !== undefined) {
            if (migrated) {
                loadedHf = true;
            }
            else {
                loadedHf = false;
            }
        }
        const hf = this.safeBool(params, 'hf', loadedHf);
        params = this.omit(params, 'hf');
        return [hf, params];
    }
    /**
     * @method
     * @name kucoin#fetchCurrencies
     * @description fetches all available currencies on an exchange
     * @see https://docs.kucoin.com/#get-currencies
     * @param {object} params extra parameters specific to the exchange API endpoint
     * @returns {object} an associative dictionary of currencies
     */
    async fetchCurrencies(params = {}) {
        const response = await this.publicGetCurrencies(params);
        //
        //    {
        //        "code":"200000",
        //        "data":[
        //           {
        //              "currency":"CSP",
        //              "name":"CSP",
        //              "fullName":"Caspian",
        //              "precision":8,
        //              "confirms":null,
        //              "contractAddress":null,
        //              "isMarginEnabled":false,
        //              "isDebitEnabled":false,
        //              "chains":[
        //                 {
        //                    "chainName":"ERC20",
        //                    "chainId": "eth"
        //                    "withdrawalMinSize":"2999",
        //                    "depositMinSize":null,
        //                    "withdrawFeeRate":"0",
        //                    "withdrawalMinFee":"2999",
        //                    "isWithdrawEnabled":false,
        //                    "isDepositEnabled":false,
        //                    "confirms":12,
        //                    "preConfirms":12,
        //                    "withdrawPrecision": 8,
        //                    "maxWithdraw": null,
        //                    "maxDeposit": null,
        //                    "needTag": false,
        //                    "contractAddress":"0xa6446d655a0c34bc4f05042ee88170d056cbaf45",
        //                    "depositFeeRate": "0.001", // present for some currencies/networks
        //                 }
        //              ]
        //           },
        //        ]
        //    }
        //
        const currenciesData = this.safeList(response, 'data', []);
        const brokenCurrencies = this.safeList(this.options, 'brokenCurrencies', ['00', 'OPEN_ERROR', 'HUF', 'BDT']);
        const otherFiats = this.safeList(this.options, 'fiats', ['KWD', 'IRR', 'PKR']);
        const result = {};
        for (let i = 0; i < currenciesData.length; i++) {
            const entry = currenciesData[i];
            const id = this.safeString(entry, 'currency');
            if (this.inArray(id, brokenCurrencies)) {
                continue; // skip buggy entries: https://t.me/KuCoin_API/217798
            }
            const code = this.safeCurrencyCode(id);
            const networks = {};
            const chains = this.safeList(entry, 'chains', []);
            const chainsLength = chains.length;
            for (let j = 0; j < chainsLength; j++) {
                const chain = chains[j];
                const chainId = this.safeString(chain, 'chainId');
                const networkCode = this.networkIdToCode(chainId, code);
                networks[networkCode] = {
                    'info': chain,
                    'id': chainId,
                    'name': this.safeString(chain, 'chainName'),
                    'code': networkCode,
                    'active': undefined,
                    'fee': this.safeNumber(chain, 'withdrawalMinFee'),
                    'deposit': this.safeBool(chain, 'isDepositEnabled'),
                    'withdraw': this.safeBool(chain, 'isWithdrawEnabled'),
                    'precision': this.parseNumber(this.parsePrecision(this.safeString(chain, 'withdrawPrecision'))),
                    'limits': {
                        'withdraw': {
                            'min': this.safeNumber(chain, 'withdrawalMinSize'),
                            'max': this.safeNumber(chain, 'maxWithdraw'),
                        },
                        'deposit': {
                            'min': this.safeNumber(chain, 'depositMinSize'),
                            'max': this.safeNumber(chain, 'maxDeposit'),
                        },
                    },
                };
            }
            // kucoin has determined 'fiat' currencies with below logic
            const rawPrecision = this.safeString(entry, 'precision');
            const precision = this.parseNumber(this.parsePrecision(rawPrecision));
            const isFiat = this.inArray(id, otherFiats) || ((rawPrecision === '2') && (chainsLength === 0));
            result[code] = this.safeCurrencyStructure({
                'id': id,
                'name': this.safeString(entry, 'fullName'),
                'code': code,
                'type': isFiat ? 'fiat' : 'crypto',
                'precision': precision,
                'info': entry,
                'networks': networks,
                'deposit': undefined,
                'withdraw': undefined,
                'active': undefined,
                'fee': undefined,
                'limits': undefined,
            });
        }
        return result;
    }
    /**
     * @method
     * @name kucoin#fetchAccounts
     * @description fetch all the accounts associated with a profile
     * @see https://docs.kucoin.com/#list-accounts
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [account structures]{@link https://docs.ccxt.com/#/?id=account-structure} indexed by the account type
     */
    async fetchAccounts(params = {}) {
        const response = await this.privateGetAccounts(params);
        //
        //     {
        //         "code": "200000",
        //         "data": [
        //             {
        //                 "balance": "0.00009788",
        //                 "available": "0.00009788",
        //                 "holds": "0",
        //                 "currency": "BTC",
        //                 "id": "5c6a4fd399a1d81c4f9cc4d0",
        //                 "type": "trade"
        //             },
        //             {
        //                 "balance": "0.00000001",
        //                 "available": "0.00000001",
        //                 "holds": "0",
        //                 "currency": "ETH",
        //                 "id": "5c6a49ec99a1d819392e8e9f",
        //                 "type": "trade"
        //             }
        //         ]
        //     }
        //
        const data = this.safeList(response, 'data', []);
        const result = [];
        for (let i = 0; i < data.length; i++) {
            const account = data[i];
            const accountId = this.safeString(account, 'id');
            const currencyId = this.safeString(account, 'currency');
            const code = this.safeCurrencyCode(currencyId);
            const type = this.safeString(account, 'type'); // main or trade
            result.push({
                'id': accountId,
                'type': type,
                'currency': code,
                'code': code,
                'info': account,
            });
        }
        return result;
    }
    /**
     * @method
     * @name kucoin#fetchTransactionFee
     * @description *DEPRECATED* please use fetchDepositWithdrawFee instead
     * @see https://docs.kucoin.com/#get-withdrawal-quotas
     * @param {string} code unified currency code
     * @param {object} params extra parameters specific to the exchange API endpoint
     * @returns {object} a [fee structure]{@link https://docs.ccxt.com/#/?id=fee-structure}
     */
    async fetchTransactionFee(code, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        let networkCode = undefined;
        [networkCode, params] = this.handleNetworkCodeAndParams(params);
        if (networkCode !== undefined) {
            request['chain'] = this.networkCodeToId(networkCode).toLowerCase();
        }
        const response = await this.privateGetWithdrawalsQuotas(this.extend(request, params));
        const data = this.safeDict(response, 'data', {});
        const withdrawFees = {};
        withdrawFees[code] = this.safeNumber(data, 'withdrawMinFee');
        return {
            'info': response,
            'withdraw': withdrawFees,
            'deposit': {},
        };
    }
    /**
     * @method
     * @name kucoin#fetchDepositWithdrawFee
     * @description fetch the fee for deposits and withdrawals
     * @see https://docs.kucoin.com/#get-withdrawal-quotas
     * @param {string} code unified currency code
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.network] The chain of currency. This only apply for multi-chain currency, and there is no need for single chain currency; you can query the chain through the response of the GET /api/v2/currencies/{currency} interface
     * @returns {object} a [fee structure]{@link https://docs.ccxt.com/#/?id=fee-structure}
     */
    async fetchDepositWithdrawFee(code, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        let networkCode = undefined;
        [networkCode, params] = this.handleNetworkCodeAndParams(params);
        if (networkCode !== undefined) {
            request['chain'] = this.networkCodeToId(networkCode).toLowerCase();
        }
        const response = await this.privateGetWithdrawalsQuotas(this.extend(request, params));
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //            "currency": "USDT",
        //            "limitBTCAmount": "1.00000000",
        //            "usedBTCAmount": "0.00000000",
        //            "remainAmount": "16548.072149",
        //            "availableAmount": "0",
        //            "withdrawMinFee": "25",
        //            "innerWithdrawMinFee": "0",
        //            "withdrawMinSize": "50",
        //            "isWithdrawEnabled": true,
        //            "precision": 6,
        //            "chain": "ERC20"
        //        }
        //    }
        //
        const data = this.safeDict(response, 'data');
        return this.parseDepositWithdrawFee(data, currency);
    }
    parseDepositWithdrawFee(fee, currency = undefined) {
        //
        //    {
        //        "currency": "USDT",
        //        "limitBTCAmount": "1.00000000",
        //        "usedBTCAmount": "0.00000000",
        //        "remainAmount": "16548.072149",
        //        "availableAmount": "0",
        //        "withdrawMinFee": "25",
        //        "innerWithdrawMinFee": "0",
        //        "withdrawMinSize": "50",
        //        "isWithdrawEnabled": true,
        //        "precision": 6,
        //        "chain": "ERC20"
        //    }
        //
        if ('chains' in fee) {
            // if data obtained through `currencies` endpoint
            const resultNew = {
                'info': fee,
                'withdraw': {
                    'fee': undefined,
                    'percentage': false,
                },
                'deposit': {
                    'fee': undefined,
                    'percentage': undefined,
                },
                'networks': {},
            };
            const chains = this.safeList(fee, 'chains', []);
            for (let i = 0; i < chains.length; i++) {
                const chain = chains[i];
                const networkCodeNew = this.networkIdToCode(this.safeString(chain, 'chainId'), this.safeString(currency, 'code'));
                resultNew['networks'][networkCodeNew] = {
                    'withdraw': {
                        'fee': this.safeNumber(chain, 'withdrawMinFee'),
                        'percentage': false,
                    },
                    'deposit': {
                        'fee': undefined,
                        'percentage': undefined,
                    },
                };
            }
            return resultNew;
        }
        const minWithdrawFee = this.safeNumber(fee, 'withdrawMinFee');
        const result = {
            'info': fee,
            'withdraw': {
                'fee': minWithdrawFee,
                'percentage': false,
            },
            'deposit': {
                'fee': undefined,
                'percentage': undefined,
            },
            'networks': {},
        };
        const networkId = this.safeString(fee, 'chain');
        const networkCode = this.networkIdToCode(networkId, this.safeString(currency, 'code'));
        result['networks'][networkCode] = {
            'withdraw': minWithdrawFee,
            'deposit': {
                'fee': undefined,
                'percentage': undefined,
            },
        };
        return result;
    }
    isFuturesMethod(methodName, params) {
        //
        // Helper
        // @methodName (string): The name of the method
        // @params (dict): The parameters passed into {methodName}
        // @return: true if the method used is meant for futures trading, false otherwise
        //
        const defaultType = this.safeString2(this.options, methodName, 'defaultType', 'trade');
        const requestedType = this.safeString(params, 'type', defaultType);
        const accountsByType = this.safeDict(this.options, 'accountsByType');
        const type = this.safeString(accountsByType, requestedType);
        if (type === undefined) {
            const keys = Object.keys(accountsByType);
            throw new errors.ExchangeError(this.id + ' isFuturesMethod() type must be one of ' + keys.join(', '));
        }
        params = this.omit(params, 'type');
        return (type === 'contract') || (type === 'future') || (type === 'futures'); // * (type === 'futures') deprecated, use (type === 'future')
    }
    parseTicker(ticker, market = undefined) {
        //
        //     {
        //         "symbol": "BTC-USDT",   // symbol
        //         "symbolName":"BTC-USDT", // Name of trading pairs, it would change after renaming
        //         "buy": "11328.9",   // bestAsk
        //         "sell": "11329",    // bestBid
        //         "changeRate": "-0.0055",    // 24h change rate
        //         "changePrice": "-63.6", // 24h change price
        //         "high": "11610",    // 24h highest price
        //         "low": "11200", // 24h lowest price
        //         "vol": "2282.70993217", // 24h volume，the aggregated trading volume in BTC
        //         "volValue": "25984946.157790431",   // 24h total, the trading volume in quote currency of last 24 hours
        //         "last": "11328.9",  // last price
        //         "averagePrice": "11360.66065903",   // 24h average transaction price yesterday
        //         "takerFeeRate": "0.001",    // Basic Taker Fee
        //         "makerFeeRate": "0.001",    // Basic Maker Fee
        //         "takerCoefficient": "1",    // Taker Fee Coefficient
        //         "makerCoefficient": "1" // Maker Fee Coefficient
        //     }
        //
        //     {
        //         "trading": true,
        //         "symbol": "KCS-BTC",
        //         "buy": 0.00011,
        //         "sell": 0.00012,
        //         "sort": 100,
        //         "volValue": 3.13851792584,   //total
        //         "baseCurrency": "KCS",
        //         "market": "BTC",
        //         "quoteCurrency": "BTC",
        //         "symbolCode": "KCS-BTC",
        //         "datetime": 1548388122031,
        //         "high": 0.00013,
        //         "vol": 27514.34842,
        //         "low": 0.0001,
        //         "changePrice": -1.0e-5,
        //         "changeRate": -0.0769,
        //         "lastTradedPrice": 0.00012,
        //         "board": 0,
        //         "mark": 0
        //     }
        //
        // market/ticker ws subscription
        //
        //     {
        //         "bestAsk": "62258.9",
        //         "bestAskSize": "0.38579986",
        //         "bestBid": "62258.8",
        //         "bestBidSize": "0.0078381",
        //         "price": "62260.7",
        //         "sequence": "1621383297064",
        //         "size": "0.00002841",
        //         "time": 1634641777363
        //     }
        //
        let percentage = this.safeString(ticker, 'changeRate');
        if (percentage !== undefined) {
            percentage = Precise["default"].stringMul(percentage, '100');
        }
        let last = this.safeString2(ticker, 'last', 'lastTradedPrice');
        last = this.safeString(ticker, 'price', last);
        const marketId = this.safeString(ticker, 'symbol');
        market = this.safeMarket(marketId, market, '-');
        const symbol = market['symbol'];
        const baseVolume = this.safeString(ticker, 'vol');
        const quoteVolume = this.safeString(ticker, 'volValue');
        const timestamp = this.safeIntegerN(ticker, ['time', 'datetime', 'timePoint']);
        return this.safeTicker({
            'symbol': symbol,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'high': this.safeString(ticker, 'high'),
            'low': this.safeString(ticker, 'low'),
            'bid': this.safeString2(ticker, 'buy', 'bestBid'),
            'bidVolume': this.safeString(ticker, 'bestBidSize'),
            'ask': this.safeString2(ticker, 'sell', 'bestAsk'),
            'askVolume': this.safeString(ticker, 'bestAskSize'),
            'vwap': undefined,
            'open': this.safeString(ticker, 'open'),
            'close': last,
            'last': last,
            'previousClose': undefined,
            'change': this.safeString(ticker, 'changePrice'),
            'percentage': percentage,
            'average': this.safeString(ticker, 'averagePrice'),
            'baseVolume': baseVolume,
            'quoteVolume': quoteVolume,
            'markPrice': this.safeString(ticker, 'value'),
            'info': ticker,
        }, market);
    }
    /**
     * @method
     * @name kucoin#fetchTickers
     * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
     * @see https://docs.kucoin.com/#get-all-tickers
     * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchTickers(symbols = undefined, params = {}) {
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols);
        const response = await this.publicGetMarketAllTickers(params);
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "time":1602832092060,
        //             "ticker":[
        //                 {
        //                     "symbol": "BTC-USDT",   // symbol
        //                     "symbolName":"BTC-USDT", // Name of trading pairs, it would change after renaming
        //                     "buy": "11328.9",   // bestAsk
        //                     "sell": "11329",    // bestBid
        //                     "changeRate": "-0.0055",    // 24h change rate
        //                     "changePrice": "-63.6", // 24h change price
        //                     "high": "11610",    // 24h highest price
        //                     "low": "11200", // 24h lowest price
        //                     "vol": "2282.70993217", // 24h volume，the aggregated trading volume in BTC
        //                     "volValue": "25984946.157790431",   // 24h total, the trading volume in quote currency of last 24 hours
        //                     "last": "11328.9",  // last price
        //                     "averagePrice": "11360.66065903",   // 24h average transaction price yesterday
        //                     "takerFeeRate": "0.001",    // Basic Taker Fee
        //                     "makerFeeRate": "0.001",    // Basic Maker Fee
        //                     "takerCoefficient": "1",    // Taker Fee Coefficient
        //                     "makerCoefficient": "1" // Maker Fee Coefficient
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const tickers = this.safeList(data, 'ticker', []);
        const time = this.safeInteger(data, 'time');
        const result = {};
        for (let i = 0; i < tickers.length; i++) {
            tickers[i]['time'] = time;
            const ticker = this.parseTicker(tickers[i]);
            const symbol = this.safeString(ticker, 'symbol');
            if (symbol !== undefined) {
                result[symbol] = ticker;
            }
        }
        return this.filterByArrayTickers(result, 'symbol', symbols);
    }
    /**
     * @method
     * @name kucoin#fetchMarkPrices
     * @description fetches the mark price for multiple markets
     * @see https://www.kucoin.com/docs/rest/margin-trading/margin-info/get-all-margin-trading-pairs-mark-prices
     * @param {string[]} [symbols] unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchMarkPrices(symbols = undefined, params = {}) {
        await this.loadMarkets();
        symbols = this.marketSymbols(symbols);
        const response = await this.publicGetMarkPriceAllSymbols(params);
        const data = this.safeList(response, 'data', []);
        return this.parseTickers(data);
    }
    /**
     * @method
     * @name kucoin#fetchTicker
     * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
     * @see https://docs.kucoin.com/#get-24hr-stats
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
        const response = await this.publicGetMarketStats(this.extend(request, params));
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "time": 1602832092060,  // time
        //             "symbol": "BTC-USDT",   // symbol
        //             "buy": "11328.9",   // bestAsk
        //             "sell": "11329",    // bestBid
        //             "changeRate": "-0.0055",    // 24h change rate
        //             "changePrice": "-63.6", // 24h change price
        //             "high": "11610",    // 24h highest price
        //             "low": "11200", // 24h lowest price
        //             "vol": "2282.70993217", // 24h volume，the aggregated trading volume in BTC
        //             "volValue": "25984946.157790431",   // 24h total, the trading volume in quote currency of last 24 hours
        //             "last": "11328.9",  // last price
        //             "averagePrice": "11360.66065903",   // 24h average transaction price yesterday
        //             "takerFeeRate": "0.001",    // Basic Taker Fee
        //             "makerFeeRate": "0.001",    // Basic Maker Fee
        //             "takerCoefficient": "1",    // Taker Fee Coefficient
        //             "makerCoefficient": "1" // Maker Fee Coefficient
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseTicker(data, market);
    }
    /**
     * @method
     * @name kucoin#fetchMarkPrice
     * @description fetches the mark price for a specific market
     * @see https://www.kucoin.com/docs/rest/margin-trading/margin-info/get-mark-price
     * @param {string} symbol unified symbol of the market to fetch the ticker for
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
     */
    async fetchMarkPrice(symbol, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const response = await this.publicGetMarkPriceSymbolCurrent(this.extend(request, params));
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseTicker(data, market);
    }
    parseOHLCV(ohlcv, market = undefined) {
        //
        //     [
        //         "1545904980",             // Start time of the candle cycle
        //         "0.058",                  // opening price
        //         "0.049",                  // closing price
        //         "0.058",                  // highest price
        //         "0.049",                  // lowest price
        //         "0.018",                  // base volume
        //         "0.000945",               // quote volume
        //     ]
        //
        return [
            this.safeTimestamp(ohlcv, 0),
            this.safeNumber(ohlcv, 1),
            this.safeNumber(ohlcv, 3),
            this.safeNumber(ohlcv, 4),
            this.safeNumber(ohlcv, 2),
            this.safeNumber(ohlcv, 5),
        ];
    }
    /**
     * @method
     * @name kucoin#fetchOHLCV
     * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
     * @see https://docs.kucoin.com/#get-klines
     * @param {string} symbol unified symbol of the market to fetch OHLCV data for
     * @param {string} timeframe the length of time each candle represents
     * @param {int} [since] timestamp in ms of the earliest candle to fetch
     * @param {int} [limit] the maximum amount of candles to fetch
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
     */
    async fetchOHLCV(symbol, timeframe = '1m', since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchOHLCV', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDeterministic('fetchOHLCV', symbol, since, limit, timeframe, params, 1500);
        }
        const market = this.market(symbol);
        const marketId = market['id'];
        const request = {
            'symbol': marketId,
            'type': this.safeString(this.timeframes, timeframe, timeframe),
        };
        const duration = this.parseTimeframe(timeframe) * 1000;
        let endAt = this.milliseconds(); // required param
        if (since !== undefined) {
            request['startAt'] = this.parseToInt(Math.floor(since / 1000));
            if (limit === undefined) {
                // https://docs.kucoin.com/#get-klines
                // https://docs.kucoin.com/#details
                // For each query, the system would return at most 1500 pieces of data.
                // To obtain more data, please page the data by time.
                limit = this.safeInteger(this.options, 'fetchOHLCVLimit', 1500);
            }
            endAt = this.sum(since, limit * duration);
        }
        else if (limit !== undefined) {
            since = endAt - limit * duration;
            request['startAt'] = this.parseToInt(Math.floor(since / 1000));
        }
        request['endAt'] = this.parseToInt(Math.floor(endAt / 1000));
        const response = await this.publicGetMarketCandles(this.extend(request, params));
        //
        //     {
        //         "code":"200000",
        //         "data":[
        //             ["1591517700","0.025078","0.025069","0.025084","0.025064","18.9883256","0.4761861079404"],
        //             ["1591516800","0.025089","0.025079","0.025089","0.02506","99.4716622","2.494143499081"],
        //             ["1591515900","0.025079","0.02509","0.025091","0.025068","59.83701271","1.50060885172798"],
        //         ]
        //     }
        //
        const data = this.safeList(response, 'data', []);
        return this.parseOHLCVs(data, market, timeframe, since, limit);
    }
    /**
     * @method
     * @name kucoin#createDepositAddress
     * @see https://www.kucoin.com/docs/rest/funding/deposit/create-deposit-address-v3-
     * @description create a currency deposit address
     * @param {string} code unified currency code of the currency for the deposit address
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.network] the blockchain network name
     * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
     */
    async createDepositAddress(code, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        let networkCode = undefined;
        [networkCode, params] = this.handleNetworkCodeAndParams(params);
        if (networkCode !== undefined) {
            request['chain'] = this.networkCodeToId(networkCode); // docs mention "chain-name", but seems "chain-id" is used, like in "fetchDepositAddress"
        }
        const response = await this.privatePostDepositAddressCreate(this.extend(request, params));
        // {"code":"260000","msg":"Deposit address already exists."}
        //
        //   {
        //     "code": "200000",
        //     "data": {
        //       "address": "0x2336d1834faab10b2dac44e468f2627138417431",
        //       "memo": null,
        //       "chainId": "bsc",
        //       "to": "MAIN",
        //       "expirationDate": 0,
        //       "currency": "BNB",
        //       "chainName": "BEP20"
        //     }
        //   }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseDepositAddress(data, currency);
    }
    /**
     * @method
     * @name kucoin#fetchDepositAddress
     * @description fetch the deposit address for a currency associated with this account
     * @see https://docs.kucoin.com/#get-deposit-addresses-v2
     * @param {string} code unified currency code
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.network] the blockchain network name
     * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
     */
    async fetchDepositAddress(code, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
            // for USDT - OMNI, ERC20, TRC20, default is ERC20
            // for BTC - Native, Segwit, TRC20, the parameters are bech32, btc, trx, default is Native
            // 'chain': 'ERC20', // optional
        };
        let networkCode = undefined;
        [networkCode, params] = this.handleNetworkCodeAndParams(params);
        if (networkCode !== undefined) {
            request['chain'] = this.networkCodeToId(networkCode).toLowerCase();
        }
        const version = this.options['versions']['private']['GET']['deposit-addresses'];
        this.options['versions']['private']['GET']['deposit-addresses'] = 'v1';
        const response = await this.privateGetDepositAddresses(this.extend(request, params));
        // BCH {"code":"200000","data":{"address":"bitcoincash:qza3m4nj9rx7l9r0cdadfqxts6f92shvhvr5ls4q7z","memo":""}}
        // BTC {"code":"200000","data":{"address":"36SjucKqQpQSvsak9A7h6qzFjrVXpRNZhE","memo":""}}
        this.options['versions']['private']['GET']['deposit-addresses'] = version;
        const data = this.safeValue(response, 'data');
        if (data === undefined) {
            throw new errors.ExchangeError(this.id + ' fetchDepositAddress() returned an empty response, you might try to run createDepositAddress() first and try again');
        }
        return this.parseDepositAddress(data, currency);
    }
    parseDepositAddress(depositAddress, currency = undefined) {
        let address = this.safeString(depositAddress, 'address');
        // BCH/BSV is returned with a "bitcoincash:" prefix, which we cut off here and only keep the address
        if (address !== undefined) {
            address = address.replace('bitcoincash:', '');
        }
        let code = undefined;
        if (currency !== undefined) {
            code = this.safeCurrencyCode(currency['id']);
            if (code !== 'NIM') {
                // contains spaces
                this.checkAddress(address);
            }
        }
        return {
            'info': depositAddress,
            'currency': code,
            'network': this.networkIdToCode(this.safeString(depositAddress, 'chainId')),
            'address': address,
            'tag': this.safeString(depositAddress, 'memo'),
        };
    }
    /**
     * @method
     * @name kucoin#fetchDepositAddressesByNetwork
     * @see https://docs.kucoin.com/#get-deposit-addresses-v2
     * @description fetch the deposit address for a currency associated with this account
     * @param {string} code unified currency code
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an array of [address structures]{@link https://docs.ccxt.com/#/?id=address-structure}
     */
    async fetchDepositAddressesByNetwork(code, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
        };
        const version = this.options['versions']['private']['GET']['deposit-addresses'];
        this.options['versions']['private']['GET']['deposit-addresses'] = 'v2';
        const response = await this.privateGetDepositAddresses(this.extend(request, params));
        //
        //     {
        //         "code": "200000",
        //         "data": [
        //             {
        //                 "address": "fr1qvus7d4d5fgxj5e7zvqe6yhxd7txm95h2and69r",
        //                 "memo": "",
        //                 "chain": "BTC-Segwit",
        //                 "contractAddress": ""
        //             },
        //             {"address":"37icNMEWbiF8ZkwUMxmfzMxi2A1MQ44bMn","memo":"","chain":"BTC","contractAddress":""},
        //             {"address":"Deposit temporarily blocked","memo":"","chain":"TRC20","contractAddress":""}
        //         ]
        //     }
        //
        this.options['versions']['private']['GET']['deposit-addresses'] = version;
        const chains = this.safeList(response, 'data', []);
        const parsed = this.parseDepositAddresses(chains, [currency['code']], false, {
            'currency': currency['code'],
        });
        return this.indexBy(parsed, 'network');
    }
    /**
     * @method
     * @name kucoin#fetchOrderBook
     * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
     * @see https://www.kucoin.com/docs/rest/spot-trading/market-data/get-part-order-book-aggregated-
     * @see https://www.kucoin.com/docs/rest/spot-trading/market-data/get-full-order-book-aggregated-
     * @param {string} symbol unified symbol of the market to fetch the order book for
     * @param {int} [limit] the maximum amount of order book entries to return
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
     */
    async fetchOrderBook(symbol, limit = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const level = this.safeInteger(params, 'level', 2);
        const request = { 'symbol': market['id'] };
        const isAuthenticated = this.checkRequiredCredentials(false);
        let response = undefined;
        if (!isAuthenticated || limit !== undefined) {
            if (level === 2) {
                request['level'] = level;
                if (limit !== undefined) {
                    if ((limit === 20) || (limit === 100)) {
                        request['limit'] = limit;
                    }
                    else {
                        throw new errors.ExchangeError(this.id + ' fetchOrderBook() limit argument must be 20 or 100');
                    }
                }
                request['limit'] = limit ? limit : 100;
            }
            response = await this.publicGetMarketOrderbookLevelLevelLimit(this.extend(request, params));
        }
        else {
            response = await this.privateGetMarketOrderbookLevel2(this.extend(request, params));
        }
        //
        // public (v1) market/orderbook/level2_20 and market/orderbook/level2_100
        //
        //     {
        //         "sequence": "3262786978",
        //         "time": 1550653727731,
        //         "bids": [
        //             ["6500.12", "0.45054140"],
        //             ["6500.11", "0.45054140"],
        //         ],
        //         "asks": [
        //             ["6500.16", "0.57753524"],
        //             ["6500.15", "0.57753524"],
        //         ]
        //     }
        //
        // private (v3) market/orderbook/level2
        //
        //     {
        //         "sequence": "3262786978",
        //         "time": 1550653727731,
        //         "bids": [
        //             ["6500.12", "0.45054140"],
        //             ["6500.11", "0.45054140"],
        //         ],
        //         "asks": [
        //             ["6500.16", "0.57753524"],
        //             ["6500.15", "0.57753524"],
        //         ]
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const timestamp = this.safeInteger(data, 'time');
        const orderbook = this.parseOrderBook(data, market['symbol'], timestamp, 'bids', 'asks', level - 2, level - 1);
        orderbook['nonce'] = this.safeInteger(data, 'sequence');
        return orderbook;
    }
    handleTriggerPrices(params) {
        const triggerPrice = this.safeValue2(params, 'triggerPrice', 'stopPrice');
        const stopLossPrice = this.safeValue(params, 'stopLossPrice');
        const takeProfitPrice = this.safeValue(params, 'takeProfitPrice');
        const isStopLoss = stopLossPrice !== undefined;
        const isTakeProfit = takeProfitPrice !== undefined;
        if ((isStopLoss && isTakeProfit) || (triggerPrice && stopLossPrice) || (triggerPrice && isTakeProfit)) {
            throw new errors.ExchangeError(this.id + ' createOrder() - you should use either triggerPrice or stopLossPrice or takeProfitPrice');
        }
        return [triggerPrice, stopLossPrice, takeProfitPrice];
    }
    /**
     * @method
     * @name kucoin#createOrder
     * @description Create an order on the exchange
     * @see https://docs.kucoin.com/spot#place-a-new-order
     * @see https://docs.kucoin.com/spot#place-a-new-order-2
     * @see https://docs.kucoin.com/spot#place-a-margin-order
     * @see https://docs.kucoin.com/spot-hf/#place-hf-order
     * @see https://www.kucoin.com/docs/rest/spot-trading/orders/place-order-test
     * @see https://www.kucoin.com/docs/rest/margin-trading/orders/place-margin-order-test
     * @see https://www.kucoin.com/docs/rest/spot-trading/spot-hf-trade-pro-account/sync-place-hf-order
     * @param {string} symbol Unified CCXT market symbol
     * @param {string} type 'limit' or 'market'
     * @param {string} side 'buy' or 'sell'
     * @param {float} amount the amount of currency to trade
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params]  extra parameters specific to the exchange API endpoint
     * @param {float} [params.triggerPrice] The price at which a trigger order is triggered at
     * @param {string} [params.marginMode] 'cross', // cross (cross mode) and isolated (isolated mode), set to cross by default, the isolated mode will be released soon, stay tuned
     * @param {string} [params.timeInForce] GTC, GTT, IOC, or FOK, default is GTC, limit orders only
     * @param {string} [params.postOnly] Post only flag, invalid when timeInForce is IOC or FOK
     *
     * EXCHANGE SPECIFIC PARAMETERS
     * @param {string} [params.clientOid] client order id, defaults to uuid if not passed
     * @param {string} [params.remark] remark for the order, length cannot exceed 100 utf8 characters
     * @param {string} [params.tradeType] 'TRADE', // TRADE, MARGIN_TRADE // not used with margin orders
     * limit orders ---------------------------------------------------
     * @param {float} [params.cancelAfter] long, // cancel after n seconds, requires timeInForce to be GTT
     * @param {bool} [params.hidden] false, // Order will not be displayed in the order book
     * @param {bool} [params.iceberg] false, // Only a portion of the order is displayed in the order book
     * @param {string} [params.visibleSize] this.amountToPrecision (symbol, visibleSize), // The maximum visible size of an iceberg order
     * market orders --------------------------------------------------
     * @param {string} [params.funds] // Amount of quote currency to use
     * stop orders ----------------------------------------------------
     * @param {string} [params.stop]  Either loss or entry, the default is loss. Requires triggerPrice to be defined
     * margin orders --------------------------------------------------
     * @param {float} [params.leverage] Leverage size of the order
     * @param {string} [params.stp] '', // self trade prevention, CN, CO, CB or DC
     * @param {bool} [params.autoBorrow] false, // The system will first borrow you funds at the optimal interest rate and then place an order for you
     * @param {bool} [params.hf] false, // true for hf order
     * @param {bool} [params.test] set to true to test an order, no order will be created but the request will be validated
     * @param {bool} [params.sync] set to true to use the hf sync call
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrder(symbol, type, side, amount, price = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const testOrder = this.safeBool(params, 'test', false);
        params = this.omit(params, 'test');
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        let useSync = false;
        [useSync, params] = this.handleOptionAndParams(params, 'createOrder', 'sync', false);
        const [triggerPrice, stopLossPrice, takeProfitPrice] = this.handleTriggerPrices(params);
        const tradeType = this.safeString(params, 'tradeType'); // keep it for backward compatibility
        const isTriggerOrder = (triggerPrice || stopLossPrice || takeProfitPrice);
        const marginResult = this.handleMarginModeAndParams('createOrder', params);
        const marginMode = this.safeString(marginResult, 0);
        const isMarginOrder = tradeType === 'MARGIN_TRADE' || marginMode !== undefined;
        // don't omit anything before calling createOrderRequest
        const orderRequest = this.createOrderRequest(symbol, type, side, amount, price, params);
        let response = undefined;
        if (testOrder) {
            if (isMarginOrder) {
                response = await this.privatePostMarginOrderTest(orderRequest);
            }
            else if (hf) {
                response = await this.privatePostHfOrdersTest(orderRequest);
            }
            else {
                response = await this.privatePostOrdersTest(orderRequest);
            }
        }
        else if (isTriggerOrder) {
            response = await this.privatePostStopOrder(orderRequest);
        }
        else if (isMarginOrder) {
            response = await this.privatePostMarginOrder(orderRequest);
        }
        else if (useSync) {
            response = await this.privatePostHfOrdersSync(orderRequest);
        }
        else if (hf) {
            response = await this.privatePostHfOrders(orderRequest);
        }
        else {
            response = await this.privatePostOrders(orderRequest);
        }
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "orderId": "5bd6e9286d99522a52e458de"
        //         }
        //    }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseOrder(data, market);
    }
    /**
     * @method
     * @name kucoin#createMarketOrderWithCost
     * @description create a market order by providing the symbol, side and cost
     * @see https://www.kucoin.com/docs/rest/spot-trading/orders/place-order
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} side 'buy' or 'sell'
     * @param {float} cost how much you want to trade in units of the quote currency
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createMarketOrderWithCost(symbol, side, cost, params = {}) {
        await this.loadMarkets();
        const req = {
            'cost': cost,
        };
        return await this.createOrder(symbol, 'market', side, cost, undefined, this.extend(req, params));
    }
    /**
     * @method
     * @name kucoin#createMarketBuyOrderWithCost
     * @description create a market buy order by providing the symbol and cost
     * @see https://www.kucoin.com/docs/rest/spot-trading/orders/place-order
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {float} cost how much you want to trade in units of the quote currency
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createMarketBuyOrderWithCost(symbol, cost, params = {}) {
        await this.loadMarkets();
        return await this.createMarketOrderWithCost(symbol, 'buy', cost, params);
    }
    /**
     * @method
     * @name kucoin#createMarketSellOrderWithCost
     * @description create a market sell order by providing the symbol and cost
     * @see https://www.kucoin.com/docs/rest/spot-trading/orders/place-order
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {float} cost how much you want to trade in units of the quote currency
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createMarketSellOrderWithCost(symbol, cost, params = {}) {
        await this.loadMarkets();
        return await this.createMarketOrderWithCost(symbol, 'sell', cost, params);
    }
    /**
     * @method
     * @name kucoin#createOrders
     * @description create a list of trade orders
     * @see https://www.kucoin.com/docs/rest/spot-trading/orders/place-multiple-orders
     * @see https://www.kucoin.com/docs/rest/spot-trading/spot-hf-trade-pro-account/place-multiple-hf-orders
     * @see https://www.kucoin.com/docs/rest/spot-trading/spot-hf-trade-pro-account/sync-place-multiple-hf-orders
     * @param {Array} orders list of orders to create, each object should contain the parameters required by createOrder, namely symbol, type, side, amount, price and params
     * @param {object} [params]  extra parameters specific to the exchange API endpoint
     * @param {bool} [params.hf] false, // true for hf orders
     * @param {bool} [params.sync] false, // true to use the hf sync call
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async createOrders(orders, params = {}) {
        await this.loadMarkets();
        const ordersRequests = [];
        let symbol = undefined;
        for (let i = 0; i < orders.length; i++) {
            const rawOrder = orders[i];
            const marketId = this.safeString(rawOrder, 'symbol');
            if (symbol === undefined) {
                symbol = marketId;
            }
            else {
                if (symbol !== marketId) {
                    throw new errors.BadRequest(this.id + ' createOrders() requires all orders to have the same symbol');
                }
            }
            const type = this.safeString(rawOrder, 'type');
            if (type !== 'limit') {
                throw new errors.BadRequest(this.id + ' createOrders() only supports limit orders');
            }
            const side = this.safeString(rawOrder, 'side');
            const amount = this.safeValue(rawOrder, 'amount');
            const price = this.safeValue(rawOrder, 'price');
            const orderParams = this.safeValue(rawOrder, 'params', {});
            const orderRequest = this.createOrderRequest(marketId, type, side, amount, price, orderParams);
            ordersRequests.push(orderRequest);
        }
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
            'orderList': ordersRequests,
        };
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        let useSync = false;
        [useSync, params] = this.handleOptionAndParams(params, 'createOrders', 'sync', false);
        let response = undefined;
        if (useSync) {
            response = await this.privatePostHfOrdersMultiSync(this.extend(request, params));
        }
        else if (hf) {
            response = await this.privatePostHfOrdersMulti(this.extend(request, params));
        }
        else {
            response = await this.privatePostOrdersMulti(this.extend(request, params));
        }
        //
        // {
        //     "code": "200000",
        //     "data": {
        //        "data": [
        //           {
        //              "symbol": "LTC-USDT",
        //              "type": "limit",
        //              "side": "sell",
        //              "price": "90",
        //              "size": "0.1",
        //              "funds": null,
        //              "stp": "",
        //              "stop": "",
        //              "stopPrice": null,
        //              "timeInForce": "GTC",
        //              "cancelAfter": 0,
        //              "postOnly": false,
        //              "hidden": false,
        //              "iceberge": false,
        //              "iceberg": false,
        //              "visibleSize": null,
        //              "channel": "API",
        //              "id": "6539148443fcf500079d15e5",
        //              "status": "success",
        //              "failMsg": null,
        //              "clientOid": "5c4c5398-8ab2-4b4e-af8a-e2d90ad2488f"
        //           },
        // }
        //
        let data = this.safeDict(response, 'data', {});
        data = this.safeList(data, 'data', []);
        return this.parseOrders(data);
    }
    marketOrderAmountToPrecision(symbol, amount) {
        const market = this.market(symbol);
        const result = this.decimalToPrecision(amount, number.TRUNCATE, market['info']['quoteIncrement'], this.precisionMode, this.paddingMode);
        if (result === '0') {
            throw new errors.InvalidOrder(this.id + ' amount of ' + market['symbol'] + ' must be greater than minimum amount precision of ' + this.numberToString(market['precision']['amount']));
        }
        return result;
    }
    createOrderRequest(symbol, type, side, amount, price = undefined, params = {}) {
        const market = this.market(symbol);
        // required param, cannot be used twice
        const clientOrderId = this.safeString2(params, 'clientOid', 'clientOrderId', this.uuid());
        params = this.omit(params, ['clientOid', 'clientOrderId']);
        const request = {
            'clientOid': clientOrderId,
            'side': side,
            'symbol': market['id'],
            'type': type, // limit or market
        };
        const quoteAmount = this.safeNumber2(params, 'cost', 'funds');
        let amountString = undefined;
        let costString = undefined;
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('createOrder', params);
        if (type === 'market') {
            if (quoteAmount !== undefined) {
                params = this.omit(params, ['cost', 'funds']);
                // kucoin uses base precision even for quote values
                costString = this.marketOrderAmountToPrecision(symbol, quoteAmount);
                request['funds'] = costString;
            }
            else {
                amountString = this.amountToPrecision(symbol, amount);
                request['size'] = this.amountToPrecision(symbol, amount);
            }
        }
        else {
            amountString = this.amountToPrecision(symbol, amount);
            request['size'] = amountString;
            request['price'] = this.priceToPrecision(symbol, price);
        }
        const tradeType = this.safeString(params, 'tradeType'); // keep it for backward compatibility
        const [triggerPrice, stopLossPrice, takeProfitPrice] = this.handleTriggerPrices(params);
        const isTriggerOrder = (triggerPrice || stopLossPrice || takeProfitPrice);
        const isMarginOrder = tradeType === 'MARGIN_TRADE' || marginMode !== undefined;
        params = this.omit(params, ['stopLossPrice', 'takeProfitPrice', 'triggerPrice', 'stopPrice']);
        if (isTriggerOrder) {
            if (triggerPrice) {
                request['stopPrice'] = this.priceToPrecision(symbol, triggerPrice);
            }
            else if (stopLossPrice || takeProfitPrice) {
                if (stopLossPrice) {
                    request['stop'] = (side === 'buy') ? 'entry' : 'loss';
                    request['stopPrice'] = this.priceToPrecision(symbol, stopLossPrice);
                }
                else {
                    request['stop'] = (side === 'buy') ? 'loss' : 'entry';
                    request['stopPrice'] = this.priceToPrecision(symbol, takeProfitPrice);
                }
            }
            if (marginMode === 'isolated') {
                throw new errors.BadRequest(this.id + ' createOrder does not support isolated margin for stop orders');
            }
            else if (marginMode === 'cross') {
                request['tradeType'] = this.options['marginModes'][marginMode];
            }
        }
        else if (isMarginOrder) {
            if (marginMode === 'isolated') {
                request['marginModel'] = 'isolated';
            }
        }
        let postOnly = undefined;
        [postOnly, params] = this.handlePostOnly(type === 'market', false, params);
        if (postOnly) {
            request['postOnly'] = true;
        }
        return this.extend(request, params);
    }
    /**
     * @method
     * @name kucoin#editOrder
     * @description edit an order, kucoin currently only supports the modification of HF orders
     * @see https://docs.kucoin.com/spot-hf/#modify-order
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market to create an order in
     * @param {string} type not used
     * @param {string} side not used
     * @param {float} amount how much of the currency you want to trade in units of the base currency
     * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.clientOrderId] client order id, defaults to id if not passed
     * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async editOrder(id, symbol, type, side, amount = undefined, price = undefined, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbol': market['id'],
        };
        const clientOrderId = this.safeString2(params, 'clientOid', 'clientOrderId');
        if (clientOrderId !== undefined) {
            request['clientOid'] = clientOrderId;
        }
        else {
            request['orderId'] = id;
        }
        if (amount !== undefined) {
            request['newSize'] = this.amountToPrecision(symbol, amount);
        }
        if (price !== undefined) {
            request['newPrice'] = this.priceToPrecision(symbol, price);
        }
        const response = await this.privatePostHfOrdersAlter(this.extend(request, params));
        //
        // {
        //     "code":"200000",
        //     "data":{
        //        "newOrderId":"6478d7a6c883280001e92d8b"
        //     }
        // }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseOrder(data, market);
    }
    /**
     * @method
     * @name kucoin#cancelOrder
     * @description cancels an open order
     * @see https://docs.kucoin.com/spot#cancel-an-order
     * @see https://docs.kucoin.com/spot#cancel-an-order-2
     * @see https://docs.kucoin.com/spot#cancel-single-order-by-clientoid
     * @see https://docs.kucoin.com/spot#cancel-single-order-by-clientoid-2
     * @see https://docs.kucoin.com/spot-hf/#cancel-orders-by-orderid
     * @see https://docs.kucoin.com/spot-hf/#cancel-order-by-clientoid
     * @see https://www.kucoin.com/docs/rest/spot-trading/spot-hf-trade-pro-account/sync-cancel-hf-order-by-orderid
     * @see https://www.kucoin.com/docs/rest/spot-trading/spot-hf-trade-pro-account/sync-cancel-hf-order-by-clientoid
     * @param {string} id order id
     * @param {string} symbol unified symbol of the market the order was made in
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {bool} [params.trigger] True if cancelling a stop order
     * @param {bool} [params.hf] false, // true for hf order
     * @param {bool} [params.sync] false, // true to use the hf sync call
     * @returns Response from the exchange
     */
    async cancelOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        const clientOrderId = this.safeString2(params, 'clientOid', 'clientOrderId');
        const trigger = this.safeBool2(params, 'stop', 'trigger', false);
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        let useSync = false;
        [useSync, params] = this.handleOptionAndParams(params, 'cancelOrder', 'sync', false);
        if (hf || useSync) {
            if (symbol === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' cancelOrder() requires a symbol parameter for hf orders');
            }
            const market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        let response = undefined;
        params = this.omit(params, ['clientOid', 'clientOrderId', 'stop', 'trigger']);
        if (clientOrderId !== undefined) {
            request['clientOid'] = clientOrderId;
            if (trigger) {
                response = await this.privateDeleteStopOrderCancelOrderByClientOid(this.extend(request, params));
                //
                //    {
                //        code: '200000',
                //        data: {
                //          cancelledOrderId: 'vs8lgpiuao41iaft003khbbk',
                //          clientOid: '123456'
                //        }
                //    }
                //
            }
            else if (useSync) {
                response = await this.privateDeleteHfOrdersSyncClientOrderClientOid(this.extend(request, params));
            }
            else if (hf) {
                response = await this.privateDeleteHfOrdersClientOrderClientOid(this.extend(request, params));
                //
                //    {
                //        "code": "200000",
                //        "data": {
                //          "clientOid": "6d539dc614db3"
                //        }
                //    }
                //
            }
            else {
                response = await this.privateDeleteOrderClientOrderClientOid(this.extend(request, params));
                //
                //    {
                //        code: '200000',
                //        data: {
                //          cancelledOrderId: '665e580f6660500007aba341',
                //          clientOid: '1234567',
                //          cancelledOcoOrderIds: null
                //        }
                //    }
                //
            }
            response = this.safeDict(response, 'data');
            return this.parseOrder(response);
        }
        else {
            request['orderId'] = id;
            if (trigger) {
                response = await this.privateDeleteStopOrderOrderId(this.extend(request, params));
                //
                //    {
                //        code: '200000',
                //        data: { cancelledOrderIds: [ 'vs8lgpiuaco91qk8003vebu9' ] }
                //    }
                //
            }
            else if (useSync) {
                response = await this.privateDeleteHfOrdersSyncOrderId(this.extend(request, params));
            }
            else if (hf) {
                response = await this.privateDeleteHfOrdersOrderId(this.extend(request, params));
                //
                //    {
                //        "code": "200000",
                //        "data": {
                //          "orderId": "630625dbd9180300014c8d52"
                //        }
                //    }
                //
                response = this.safeDict(response, 'data');
                return this.parseOrder(response);
            }
            else {
                response = await this.privateDeleteOrdersOrderId(this.extend(request, params));
                //
                //    {
                //        code: '200000',
                //        data: { cancelledOrderIds: [ '665e4fbe28051a0007245c41' ] }
                //    }
                //
            }
            const data = this.safeDict(response, 'data');
            const orderIds = this.safeList(data, 'cancelledOrderIds', []);
            const orderId = this.safeString(orderIds, 0);
            return this.safeOrder({
                'info': data,
                'id': orderId,
            });
        }
    }
    /**
     * @method
     * @name kucoin#cancelAllOrders
     * @description cancel all open orders
     * @see https://docs.kucoin.com/spot#cancel-all-orders
     * @see https://docs.kucoin.com/spot#cancel-orders
     * @see https://docs.kucoin.com/spot-hf/#cancel-all-hf-orders-by-symbol
     * @param {string} symbol unified market symbol, only orders in the market of this symbol are cancelled when symbol is not undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {bool} [params.trigger] *invalid for isolated margin* true if cancelling all stop orders
     * @param {string} [params.marginMode] 'cross' or 'isolated'
     * @param {string} [params.orderIds] *stop orders only* Comma seperated order IDs
     * @param {bool} [params.hf] false, // true for hf order
     * @returns Response from the exchange
     */
    async cancelAllOrders(symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        const trigger = this.safeBool2(params, 'trigger', 'stop', false);
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        params = this.omit(params, 'stop');
        const [marginMode, query] = this.handleMarginModeAndParams('cancelAllOrders', params);
        if (symbol !== undefined) {
            request['symbol'] = this.marketId(symbol);
        }
        if (marginMode !== undefined) {
            request['tradeType'] = this.options['marginModes'][marginMode];
            if (marginMode === 'isolated' && trigger) {
                throw new errors.BadRequest(this.id + ' cancelAllOrders does not support isolated margin for stop orders');
            }
        }
        let response = undefined;
        if (trigger) {
            response = await this.privateDeleteStopOrderCancel(this.extend(request, query));
        }
        else if (hf) {
            if (symbol === undefined) {
                response = await this.privateDeleteHfOrdersCancelAll(this.extend(request, query));
            }
            else {
                response = await this.privateDeleteHfOrders(this.extend(request, query));
            }
        }
        else {
            response = await this.privateDeleteOrders(this.extend(request, query));
        }
        return [this.safeOrder({ 'info': response })];
    }
    /**
     * @method
     * @name kucoin#fetchOrdersByStatus
     * @description fetch a list of orders
     * @see https://docs.kucoin.com/spot#list-orders
     * @see https://docs.kucoin.com/spot#list-stop-orders
     * @see https://docs.kucoin.com/spot-hf/#obtain-list-of-active-hf-orders
     * @see https://docs.kucoin.com/spot-hf/#obtain-list-of-filled-hf-orders
     * @param {string} status *not used for stop orders* 'open' or 'closed'
     * @param {string} symbol unified market symbol
     * @param {int} [since] timestamp in ms of the earliest order
     * @param {int} [limit] max number of orders to return
     * @param {object} [params] exchange specific params
     * @param {int} [params.until] end time in ms
     * @param {string} [params.side] buy or sell
     * @param {string} [params.type] limit, market, limit_stop or market_stop
     * @param {string} [params.tradeType] TRADE for spot trading, MARGIN_TRADE for Margin Trading
     * @param {int} [params.currentPage] *trigger orders only* current page
     * @param {string} [params.orderIds] *trigger orders only* comma seperated order ID list
     * @param {bool} [params.trigger] True if fetching a trigger order
     * @param {bool} [params.hf] false, // true for hf order
     * @returns An [array of order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrdersByStatus(status, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let lowercaseStatus = status.toLowerCase();
        const until = this.safeInteger(params, 'until');
        const trigger = this.safeBool2(params, 'stop', 'trigger', false);
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        if (hf && (symbol === undefined)) {
            throw new errors.ArgumentsRequired(this.id + ' fetchOrdersByStatus() requires a symbol parameter for hf orders');
        }
        params = this.omit(params, ['stop', 'trigger', 'till', 'until']);
        const [marginMode, query] = this.handleMarginModeAndParams('fetchOrdersByStatus', params);
        if (lowercaseStatus === 'open') {
            lowercaseStatus = 'active';
        }
        else if (lowercaseStatus === 'closed') {
            lowercaseStatus = 'done';
        }
        const request = {
            'status': lowercaseStatus,
        };
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        if (since !== undefined) {
            request['startAt'] = since;
        }
        if (limit !== undefined) {
            request['pageSize'] = limit;
        }
        if (until) {
            request['endAt'] = until;
        }
        request['tradeType'] = this.safeString(this.options['marginModes'], marginMode, 'TRADE');
        let response = undefined;
        if (trigger) {
            response = await this.privateGetStopOrder(this.extend(request, query));
        }
        else if (hf) {
            if (lowercaseStatus === 'active') {
                response = await this.privateGetHfOrdersActive(this.extend(request, query));
            }
            else if (lowercaseStatus === 'done') {
                response = await this.privateGetHfOrdersDone(this.extend(request, query));
            }
        }
        else {
            response = await this.privateGetOrders(this.extend(request, query));
        }
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "currentPage": 1,
        //             "pageSize": 1,
        //             "totalNum": 153408,
        //             "totalPage": 153408,
        //             "items": [
        //                 {
        //                     "id": "5c35c02703aa673ceec2a168",   //orderid
        //                     "symbol": "BTC-USDT",   //symbol
        //                     "opType": "DEAL",      // operation type,deal is pending order,cancel is cancel order
        //                     "type": "limit",       // order type,e.g. limit,markrt,stop_limit.
        //                     "side": "buy",         // transaction direction,include buy and sell
        //                     "price": "10",         // order price
        //                     "size": "2",           // order quantity
        //                     "funds": "0",          // order funds
        //                     "dealFunds": "0.166",  // deal funds
        //                     "dealSize": "2",       // deal quantity
        //                     "fee": "0",            // fee
        //                     "feeCurrency": "USDT", // charge fee currency
        //                     "stp": "",             // self trade prevention,include CN,CO,DC,CB
        //                     "stop": "",            // stop type
        //                     "stopTriggered": false,  // stop order is triggered
        //                     "stopPrice": "0",      // stop price
        //                     "timeInForce": "GTC",  // time InForce,include GTC,GTT,IOC,FOK
        //                     "postOnly": false,     // postOnly
        //                     "hidden": false,       // hidden order
        //                     "iceberg": false,      // iceberg order
        //                     "visibleSize": "0",    // display quantity for iceberg order
        //                     "cancelAfter": 0,      // cancel orders time，requires timeInForce to be GTT
        //                     "channel": "IOS",      // order source
        //                     "clientOid": "",       // user-entered order unique mark
        //                     "remark": "",          // remark
        //                     "tags": "",            // tag order source
        //                     "isActive": false,     // status before unfilled or uncancelled
        //                     "cancelExist": false,   // order cancellation transaction record
        //                     "createdAt": 1547026471000  // time
        //                 },
        //             ]
        //         }
        //    }
        const listData = this.safeList(response, 'data');
        if (listData !== undefined) {
            return this.parseOrders(listData, market, since, limit);
        }
        const responseData = this.safeDict(response, 'data', {});
        const orders = this.safeList(responseData, 'items', []);
        return this.parseOrders(orders, market, since, limit);
    }
    /**
     * @method
     * @name kucoin#fetchClosedOrders
     * @description fetches information on multiple closed orders made by the user
     * @see https://docs.kucoin.com/spot#list-orders
     * @see https://docs.kucoin.com/spot#list-stop-orders
     * @see https://docs.kucoin.com/spot-hf/#obtain-list-of-active-hf-orders
     * @see https://docs.kucoin.com/spot-hf/#obtain-list-of-filled-hf-orders
     * @param {string} symbol unified market symbol of the market orders were made in
     * @param {int} [since] the earliest time in ms to fetch orders for
     * @param {int} [limit] the maximum number of order structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] end time in ms
     * @param {string} [params.side] buy or sell
     * @param {string} [params.type] limit, market, limit_stop or market_stop
     * @param {string} [params.tradeType] TRADE for spot trading, MARGIN_TRADE for Margin Trading
     * @param {bool} [params.trigger] True if fetching a trigger order
     * @param {bool} [params.hf] false, // true for hf order
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchClosedOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchClosedOrders', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDynamic('fetchClosedOrders', symbol, since, limit, params);
        }
        return await this.fetchOrdersByStatus('done', symbol, since, limit, params);
    }
    /**
     * @method
     * @name kucoin#fetchOpenOrders
     * @description fetch all unfilled currently open orders
     * @see https://docs.kucoin.com/spot#list-orders
     * @see https://docs.kucoin.com/spot#list-stop-orders
     * @see https://docs.kucoin.com/spot-hf/#obtain-list-of-active-hf-orders
     * @see https://docs.kucoin.com/spot-hf/#obtain-list-of-filled-hf-orders
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch open orders for
     * @param {int} [limit] the maximum number of  open orders structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] end time in ms
     * @param {bool} [params.trigger] true if fetching trigger orders
     * @param {string} [params.side] buy or sell
     * @param {string} [params.type] limit, market, limit_stop or market_stop
     * @param {string} [params.tradeType] TRADE for spot trading, MARGIN_TRADE for Margin Trading
     * @param {int} [params.currentPage] *trigger orders only* current page
     * @param {string} [params.orderIds] *trigger orders only* comma seperated order ID list
     * @param {bool} [params.hf] false, // true for hf order
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOpenOrders(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchOpenOrders', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDynamic('fetchOpenOrders', symbol, since, limit, params);
        }
        return await this.fetchOrdersByStatus('active', symbol, since, limit, params);
    }
    /**
     * @method
     * @name kucoin#fetchOrder
     * @description fetch an order
     * @see https://docs.kucoin.com/spot#get-an-order
     * @see https://docs.kucoin.com/spot#get-single-active-order-by-clientoid
     * @see https://docs.kucoin.com/spot#get-single-order-info
     * @see https://docs.kucoin.com/spot#get-single-order-by-clientoid
     * @see https://docs.kucoin.com/spot-hf/#details-of-a-single-hf-order
     * @see https://docs.kucoin.com/spot-hf/#obtain-details-of-a-single-hf-order-using-clientoid
     * @param {string} id Order id
     * @param {string} symbol not sent to exchange except for trigger orders with clientOid, but used internally by CCXT to filter
     * @param {object} [params] exchange specific parameters
     * @param {bool} [params.trigger] true if fetching a trigger order
     * @param {bool} [params.hf] false, // true for hf order
     * @param {bool} [params.clientOid] unique order id created by users to identify their orders
     * @returns An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
     */
    async fetchOrder(id, symbol = undefined, params = {}) {
        await this.loadMarkets();
        const request = {};
        const clientOrderId = this.safeString2(params, 'clientOid', 'clientOrderId');
        const trigger = this.safeBool2(params, 'stop', 'trigger', false);
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        if (hf) {
            if (symbol === undefined) {
                throw new errors.ArgumentsRequired(this.id + ' fetchOrder() requires a symbol parameter for hf orders');
            }
            request['symbol'] = market['id'];
        }
        params = this.omit(params, ['stop', 'clientOid', 'clientOrderId', 'trigger']);
        let response = undefined;
        if (clientOrderId !== undefined) {
            request['clientOid'] = clientOrderId;
            if (trigger) {
                if (symbol !== undefined) {
                    request['symbol'] = market['id'];
                }
                response = await this.privateGetStopOrderQueryOrderByClientOid(this.extend(request, params));
            }
            else if (hf) {
                response = await this.privateGetHfOrdersClientOrderClientOid(this.extend(request, params));
            }
            else {
                response = await this.privateGetOrderClientOrderClientOid(this.extend(request, params));
            }
        }
        else {
            // a special case for undefined ids
            // otherwise a wrong endpoint for all orders will be triggered
            // https://github.com/ccxt/ccxt/issues/7234
            if (id === undefined) {
                throw new errors.InvalidOrder(this.id + ' fetchOrder() requires an order id');
            }
            request['orderId'] = id;
            if (trigger) {
                response = await this.privateGetStopOrderOrderId(this.extend(request, params));
            }
            else if (hf) {
                response = await this.privateGetHfOrdersOrderId(this.extend(request, params));
            }
            else {
                response = await this.privateGetOrdersOrderId(this.extend(request, params));
            }
        }
        let responseData = this.safeDict(response, 'data', {});
        if (Array.isArray(responseData)) {
            responseData = this.safeValue(responseData, 0);
        }
        return this.parseOrder(responseData, market);
    }
    parseOrder(order, market = undefined) {
        //
        // createOrder
        //
        //    {
        //        "orderId": "63c97e47d686c5000159a656"
        //    }
        //
        // cancelOrder
        //
        //    {
        //        "cancelledOrderIds": [ "63c97e47d686c5000159a656" ]
        //    }
        //
        // fetchOpenOrders, fetchClosedOrders
        //
        //    {
        //        "id": "63c97ce8d686c500015793bb",
        //        "symbol": "USDC-USDT",
        //        "opType": "DEAL",
        //        "type": "limit",
        //        "side": "sell",
        //        "price": "1.05",
        //        "size": "1",
        //        "funds": "0",
        //        "dealFunds": "0",
        //        "dealSize": "0",
        //        "fee": "0",
        //        "feeCurrency": "USDT",
        //        "stp": "",
        //        "stop": "",
        //        "stopTriggered": false,
        //        "stopPrice": "0",
        //        "timeInForce": "GTC",
        //        "postOnly": false,
        //        "hidden": false,
        //        "iceberg": false,
        //        "visibleSize": "0",
        //        "cancelAfter": 0,
        //        "channel": "API",
        //        "clientOid": "d602d73f-5424-4751-bef0-8debce8f0a82",
        //        "remark": null,
        //        "tags": "partner:ccxt",
        //        "isActive": true,
        //        "cancelExist": false,
        //        "createdAt": 1674149096927,
        //        "tradeType": "TRADE"
        //    }
        //
        // stop orders (fetchOpenOrders, fetchClosedOrders)
        //
        //    {
        //        "id": "vs9f6ou9e864rgq8000t4qnm",
        //        "symbol": "USDC-USDT",
        //        "userId": "613a896885d8660006151f01",
        //        "status": "NEW",
        //        "type": "market",
        //        "side": "sell",
        //        "price": null,
        //        "size": "1.00000000000000000000",
        //        "funds": null,
        //        "stp": null,
        //        "timeInForce": "GTC",
        //        "cancelAfter": -1,
        //        "postOnly": false,
        //        "hidden": false,
        //        "iceberg": false,
        //        "visibleSize": null,
        //        "channel": "API",
        //        "clientOid": "5d3fd727-6456-438d-9550-40d9d85eee0b",
        //        "remark": null,
        //        "tags": "partner:ccxt",
        //        "relatedNo": null,
        //        "orderTime": 1674146316994000028,
        //        "domainId": "kucoin",
        //        "tradeSource": "USER",
        //        "tradeType": "MARGIN_TRADE",
        //        "feeCurrency": "USDT",
        //        "takerFeeRate": "0.00100000000000000000",
        //        "makerFeeRate": "0.00100000000000000000",
        //        "createdAt": 1674146316994,
        //        "stop": "loss",
        //        "stopTriggerTime": null,
        //        "stopPrice": "0.97000000000000000000"
        //    }
        // hf order
        //    {
        //        "id":"6478cf1439bdfc0001528a1d",
        //        "symbol":"LTC-USDT",
        //        "opType":"DEAL",
        //        "type":"limit",
        //        "side":"buy",
        //        "price":"50",
        //        "size":"0.1",
        //        "funds":"5",
        //        "dealSize":"0",
        //        "dealFunds":"0",
        //        "fee":"0",
        //        "feeCurrency":"USDT",
        //        "stp":null,
        //        "timeInForce":"GTC",
        //        "postOnly":false,
        //        "hidden":false,
        //        "iceberg":false,
        //        "visibleSize":"0",
        //        "cancelAfter":0,
        //        "channel":"API",
        //        "clientOid":"d4d2016b-8e3a-445c-aa5d-dc6df5d1678d",
        //        "remark":null,
        //        "tags":"partner:ccxt",
        //        "cancelExist":false,
        //        "createdAt":1685638932074,
        //        "lastUpdatedAt":1685639013735,
        //        "tradeType":"TRADE",
        //        "inOrderBook":true,
        //        "cancelledSize":"0",
        //        "cancelledFunds":"0",
        //        "remainSize":"0.1",
        //        "remainFunds":"5",
        //        "active":true
        //    }
        //
        const marketId = this.safeString(order, 'symbol');
        const timestamp = this.safeInteger(order, 'createdAt');
        const feeCurrencyId = this.safeString(order, 'feeCurrency');
        const cancelExist = this.safeBool(order, 'cancelExist', false);
        const responseStop = this.safeString(order, 'stop');
        const trigger = responseStop !== undefined;
        const stopTriggered = this.safeBool(order, 'stopTriggered', false);
        const isActive = this.safeBool2(order, 'isActive', 'active');
        const responseStatus = this.safeString(order, 'status');
        let status = undefined;
        if (isActive !== undefined) {
            if (isActive === true) {
                status = 'open';
            }
            else {
                status = 'closed';
            }
        }
        if (trigger) {
            if (responseStatus === 'NEW') {
                status = 'open';
            }
            else if (!isActive && !stopTriggered) {
                status = 'cancelled';
            }
        }
        if (cancelExist) {
            status = 'canceled';
        }
        if (responseStatus === 'fail') {
            status = 'rejected';
        }
        return this.safeOrder({
            'info': order,
            'id': this.safeStringN(order, ['id', 'orderId', 'newOrderId', 'cancelledOrderId']),
            'clientOrderId': this.safeString(order, 'clientOid'),
            'symbol': this.safeSymbol(marketId, market, '-'),
            'type': this.safeString(order, 'type'),
            'timeInForce': this.safeString(order, 'timeInForce'),
            'postOnly': this.safeBool(order, 'postOnly'),
            'side': this.safeString(order, 'side'),
            'amount': this.safeString(order, 'size'),
            'price': this.safeString(order, 'price'),
            'triggerPrice': this.safeNumber(order, 'stopPrice'),
            'cost': this.safeString(order, 'dealFunds'),
            'filled': this.safeString(order, 'dealSize'),
            'remaining': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'fee': {
                'currency': this.safeCurrencyCode(feeCurrencyId),
                'cost': this.safeNumber(order, 'fee'),
            },
            'status': status,
            'lastTradeTimestamp': undefined,
            'average': this.safeString(order, 'avgDealPrice'),
            'trades': undefined,
        }, market);
    }
    /**
     * @method
     * @name kucoin#fetchOrderTrades
     * @description fetch all the trades made from a single order
     * @see https://docs.kucoin.com/#list-fills
     * @see https://docs.kucoin.com/spot-hf/#transaction-details
     * @param {string} id order id
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchOrderTrades(id, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        const request = {
            'orderId': id,
        };
        return await this.fetchMyTrades(symbol, since, limit, this.extend(request, params));
    }
    /**
     * @method
     * @name kucoin#fetchMyTrades
     * @see https://docs.kucoin.com/#list-fills
     * @see https://docs.kucoin.com/spot-hf/#transaction-details
     * @description fetch all trades made by the user
     * @param {string} symbol unified market symbol
     * @param {int} [since] the earliest time in ms to fetch trades for
     * @param {int} [limit] the maximum number of trades structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch entries for
     * @param {bool} [params.hf] false, // true for hf order
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
     */
    async fetchMyTrades(symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchMyTrades', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDynamic('fetchMyTrades', symbol, since, limit, params);
        }
        let request = {};
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        if (hf && symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' fetchMyTrades() requires a symbol parameter for hf orders');
        }
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
            request['symbol'] = market['id'];
        }
        const method = this.options['fetchMyTradesMethod'];
        let parseResponseData = false;
        let response = undefined;
        [request, params] = this.handleUntilOption('endAt', request, params);
        if (hf) {
            // does not return trades earlier than 2019-02-18T00:00:00Z
            if (limit !== undefined) {
                request['limit'] = limit;
            }
            if (since !== undefined) {
                // only returns trades up to one week after the since param
                request['startAt'] = since;
            }
            response = await this.privateGetHfFills(this.extend(request, params));
        }
        else if (method === 'private_get_fills') {
            // does not return trades earlier than 2019-02-18T00:00:00Z
            if (since !== undefined) {
                // only returns trades up to one week after the since param
                request['startAt'] = since;
            }
            response = await this.privateGetFills(this.extend(request, params));
        }
        else if (method === 'private_get_limit_fills') {
            // does not return trades earlier than 2019-02-18T00:00:00Z
            // takes no params
            // only returns first 1000 trades (not only "in the last 24 hours" as stated in the docs)
            parseResponseData = true;
            response = await this.privateGetLimitFills(this.extend(request, params));
        }
        else {
            throw new errors.ExchangeError(this.id + ' fetchMyTradesMethod() invalid method');
        }
        //
        //     {
        //         "currentPage": 1,
        //         "pageSize": 50,
        //         "totalNum": 1,
        //         "totalPage": 1,
        //         "items": [
        //             {
        //                 "symbol":"BTC-USDT",       // symbol
        //                 "tradeId":"5c35c02709e4f67d5266954e",        // trade id
        //                 "orderId":"5c35c02703aa673ceec2a168",        // order id
        //                 "counterOrderId":"5c1ab46003aa676e487fa8e3", // counter order id
        //                 "side":"buy",              // transaction direction,include buy and sell
        //                 "liquidity":"taker",       // include taker and maker
        //                 "forceTaker":true,         // forced to become taker
        //                 "price":"0.083",           // order price
        //                 "size":"0.8424304",        // order quantity
        //                 "funds":"0.0699217232",    // order funds
        //                 "fee":"0",                 // fee
        //                 "feeRate":"0",             // fee rate
        //                 "feeCurrency":"USDT",      // charge fee currency
        //                 "stop":"",                 // stop type
        //                 "type":"limit",            // order type, e.g. limit, market, stop_limit.
        //                 "createdAt":1547026472000  // time
        //             },
        //             //------------------------------------------------------
        //             // v1 (historical) trade response structure
        //             {
        //                 "symbol": "SNOV-ETH",
        //                 "dealPrice": "0.0000246",
        //                 "dealValue": "0.018942",
        //                 "amount": "770",
        //                 "fee": "0.00001137",
        //                 "side": "sell",
        //                 "createdAt": 1540080199
        //                 "id":"5c4d389e4c8c60413f78e2e5",
        //             }
        //         ]
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        let trades = undefined;
        if (parseResponseData) {
            trades = data;
        }
        else {
            trades = this.safeList(data, 'items', []);
        }
        return this.parseTrades(trades, market, since, limit);
    }
    /**
     * @method
     * @name kucoin#fetchTrades
     * @description get the list of most recent trades for a particular symbol
     * @see https://www.kucoin.com/docs/rest/spot-trading/market-data/get-trade-histories
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
        // pagination is not supported on the exchange side anymore
        // if (since !== undefined) {
        //     request['startAt'] = Math.floor (since / 1000);
        // }
        // if (limit !== undefined) {
        //     request['pageSize'] = limit;
        // }
        const response = await this.publicGetMarketHistories(this.extend(request, params));
        //
        //     {
        //         "code": "200000",
        //         "data": [
        //             {
        //                 "sequence": "1548764654235",
        //                 "side": "sell",
        //                 "size":"0.6841354",
        //                 "price":"0.03202",
        //                 "time":1548848575203567174
        //             }
        //         ]
        //     }
        //
        const trades = this.safeList(response, 'data', []);
        return this.parseTrades(trades, market, since, limit);
    }
    parseTrade(trade, market = undefined) {
        //
        // fetchTrades (public)
        //
        //     {
        //         "sequence": "1548764654235",
        //         "side": "sell",
        //         "size":"0.6841354",
        //         "price":"0.03202",
        //         "time":1548848575203567174
        //     }
        //
        //     {
        //         "sequence": "1568787654360",
        //         "symbol": "BTC-USDT",
        //         "side": "buy",
        //         "size": "0.00536577",
        //         "price": "9345",
        //         "takerOrderId": "5e356c4a9f1a790008f8d921",
        //         "time": "1580559434436443257",
        //         "type": "match",
        //         "makerOrderId": "5e356bffedf0010008fa5d7f",
        //         "tradeId": "5e356c4aeefabd62c62a1ece"
        //     }
        //
        // fetchMyTrades (private) v2
        //
        //     {
        //         "symbol":"BTC-USDT",
        //         "tradeId":"5c35c02709e4f67d5266954e",
        //         "orderId":"5c35c02703aa673ceec2a168",
        //         "counterOrderId":"5c1ab46003aa676e487fa8e3",
        //         "side":"buy",
        //         "liquidity":"taker",
        //         "forceTaker":true,
        //         "price":"0.083",
        //         "size":"0.8424304",
        //         "funds":"0.0699217232",
        //         "fee":"0",
        //         "feeRate":"0",
        //         "feeCurrency":"USDT",
        //         "stop":"",
        //         "type":"limit",
        //         "createdAt":1547026472000
        //     }
        //
        // fetchMyTrades v2 alternative format since 2019-05-21 https://github.com/ccxt/ccxt/pull/5162
        //
        //     {
        //         "symbol": "OPEN-BTC",
        //         "forceTaker":  false,
        //         "orderId": "5ce36420054b4663b1fff2c9",
        //         "fee": "0",
        //         "feeCurrency": "",
        //         "type": "",
        //         "feeRate": "0",
        //         "createdAt": 1558417615000,
        //         "size": "12.8206",
        //         "stop": "",
        //         "price": "0",
        //         "funds": "0",
        //         "tradeId": "5ce390cf6e0db23b861c6e80"
        //     }
        //
        // fetchMyTrades (private) v1 (historical)
        //
        //     {
        //         "symbol": "SNOV-ETH",
        //         "dealPrice": "0.0000246",
        //         "dealValue": "0.018942",
        //         "amount": "770",
        //         "fee": "0.00001137",
        //         "side": "sell",
        //         "createdAt": 1540080199
        //         "id":"5c4d389e4c8c60413f78e2e5",
        //     }
        //
        const marketId = this.safeString(trade, 'symbol');
        market = this.safeMarket(marketId, market, '-');
        const id = this.safeString2(trade, 'tradeId', 'id');
        const orderId = this.safeString(trade, 'orderId');
        const takerOrMaker = this.safeString(trade, 'liquidity');
        let timestamp = this.safeInteger(trade, 'time');
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
        const priceString = this.safeString2(trade, 'price', 'dealPrice');
        const amountString = this.safeString2(trade, 'size', 'amount');
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
        let type = this.safeString(trade, 'type');
        if (type === 'match') {
            type = undefined;
        }
        const costString = this.safeString2(trade, 'funds', 'dealValue');
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
     * @name kucoin#fetchTradingFee
     * @description fetch the trading fees for a market
     * @see https://www.kucoin.com/docs/rest/funding/trade-fee/trading-pair-actual-fee-spot-margin-trade_hf
     * @param {string} symbol unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [fee structure]{@link https://docs.ccxt.com/#/?id=fee-structure}
     */
    async fetchTradingFee(symbol, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const request = {
            'symbols': market['id'],
        };
        const response = await this.privateGetTradeFees(this.extend(request, params));
        //
        //     {
        //         "code": "200000",
        //         "data": [
        //           {
        //             "symbol": "BTC-USDT",
        //             "takerFeeRate": "0.001",
        //             "makerFeeRate": "0.001"
        //           }
        //         ]
        //     }
        //
        const data = this.safeList(response, 'data', []);
        const first = this.safeDict(data, 0);
        const marketId = this.safeString(first, 'symbol');
        return {
            'info': response,
            'symbol': this.safeSymbol(marketId, market),
            'maker': this.safeNumber(first, 'makerFeeRate'),
            'taker': this.safeNumber(first, 'takerFeeRate'),
            'percentage': true,
            'tierBased': true,
        };
    }
    /**
     * @method
     * @name kucoin#withdraw
     * @description make a withdrawal
     * @see https://www.kucoin.com/docs/rest/funding/withdrawals/apply-withdraw-v3-
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
        this.checkAddress(address);
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
            'toAddress': address,
            'withdrawType': 'ADDRESS',
            // 'memo': tag,
            // 'isInner': false, // internal transfer or external withdrawal
            // 'remark': 'optional',
            // 'chain': 'OMNI', // 'ERC20', 'TRC20', default is ERC20, This only apply for multi-chain currency, and there is no need for single chain currency.
        };
        if (tag !== undefined) {
            request['memo'] = tag;
        }
        let networkCode = undefined;
        [networkCode, params] = this.handleNetworkCodeAndParams(params);
        if (networkCode !== undefined) {
            request['chain'] = this.networkCodeToId(networkCode).toLowerCase();
        }
        request['amount'] = parseFloat(this.currencyToPrecision(code, amount, networkCode));
        let includeFee = undefined;
        [includeFee, params] = this.handleOptionAndParams(params, 'withdraw', 'includeFee', false);
        if (includeFee) {
            request['feeDeductType'] = 'INTERNAL';
        }
        const response = await this.privatePostWithdrawals(this.extend(request, params));
        //
        // the id is inside "data"
        //
        //     {
        //         "code":  200000,
        //         "data": {
        //             "withdrawalId":  "5bffb63303aa675e8bbe18f9"
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseTransaction(data, currency);
    }
    parseTransactionStatus(status) {
        const statuses = {
            'SUCCESS': 'ok',
            'PROCESSING': 'pending',
            'WALLET_PROCESSING': 'pending',
            'FAILURE': 'failed',
        };
        return this.safeString(statuses, status, status);
    }
    parseTransaction(transaction, currency = undefined) {
        //
        // fetchDeposits
        //
        //     {
        //         "address": "0x5f047b29041bcfdbf0e4478cdfa753a336ba6989",
        //         "memo": "5c247c8a03aa677cea2a251d",
        //         "amount": 1,
        //         "fee": 0.0001,
        //         "currency": "KCS",
        //         "chain": "",
        //         "isInner": false,
        //         "walletTxId": "5bbb57386d99522d9f954c5a@test004",
        //         "status": "SUCCESS",
        //         "createdAt": 1544178843000,
        //         "updatedAt": 1544178891000
        //         "remark":"foobar"
        //     }
        //
        // fetchWithdrawals
        //
        //     {
        //         "id": "5c2dc64e03aa675aa263f1ac",
        //         "address": "0x5bedb060b8eb8d823e2414d82acce78d38be7fe9",
        //         "memo": "",
        //         "currency": "ETH",
        //         "chain": "",
        //         "amount": 1.0000000,
        //         "fee": 0.0100000,
        //         "walletTxId": "3e2414d82acce78d38be7fe9",
        //         "isInner": false,
        //         "status": "FAILURE",
        //         "createdAt": 1546503758000,
        //         "updatedAt": 1546504603000
        //         "remark":"foobar"
        //     }
        //
        // withdraw
        //
        //     {
        //         "withdrawalId":  "5bffb63303aa675e8bbe18f9"
        //     }
        //
        const currencyId = this.safeString(transaction, 'currency');
        const code = this.safeCurrencyCode(currencyId, currency);
        let address = this.safeString(transaction, 'address');
        const amount = this.safeString(transaction, 'amount');
        let txid = this.safeString(transaction, 'walletTxId');
        if (txid !== undefined) {
            const txidParts = txid.split('@');
            const numTxidParts = txidParts.length;
            if (numTxidParts > 1) {
                if (address === undefined) {
                    if (txidParts[1].length > 1) {
                        address = txidParts[1];
                    }
                }
            }
            txid = txidParts[0];
        }
        let type = (txid === undefined) ? 'withdrawal' : 'deposit';
        const rawStatus = this.safeString(transaction, 'status');
        let fee = undefined;
        const feeCost = this.safeString(transaction, 'fee');
        if (feeCost !== undefined) {
            let rate = undefined;
            if (amount !== undefined) {
                rate = Precise["default"].stringDiv(feeCost, amount);
            }
            fee = {
                'cost': this.parseNumber(feeCost),
                'rate': this.parseNumber(rate),
                'currency': code,
            };
        }
        let timestamp = this.safeInteger2(transaction, 'createdAt', 'createAt');
        let updated = this.safeInteger(transaction, 'updatedAt');
        const isV1 = !('createdAt' in transaction);
        // if it's a v1 structure
        if (isV1) {
            type = ('address' in transaction) ? 'withdrawal' : 'deposit';
            if (timestamp !== undefined) {
                timestamp = timestamp * 1000;
            }
            if (updated !== undefined) {
                updated = updated * 1000;
            }
        }
        const internal = this.safeBool(transaction, 'isInner');
        const tag = this.safeString(transaction, 'memo');
        return {
            'info': transaction,
            'id': this.safeString2(transaction, 'id', 'withdrawalId'),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'network': this.networkIdToCode(this.safeString(transaction, 'chain')),
            'address': address,
            'addressTo': address,
            'addressFrom': undefined,
            'tag': tag,
            'tagTo': tag,
            'tagFrom': undefined,
            'currency': code,
            'amount': this.parseNumber(amount),
            'txid': txid,
            'type': type,
            'status': this.parseTransactionStatus(rawStatus),
            'comment': this.safeString(transaction, 'remark'),
            'internal': internal,
            'fee': fee,
            'updated': updated,
        };
    }
    /**
     * @method
     * @name kucoin#fetchDeposits
     * @description fetch all deposits made to an account
     * @see https://www.kucoin.com/docs/rest/funding/deposit/get-deposit-list
     * @see https://www.kucoin.com/docs/rest/funding/deposit/get-v1-historical-deposits-list
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch deposits for
     * @param {int} [limit] the maximum number of deposits structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch entries for
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchDeposits(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchDeposits', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDynamic('fetchDeposits', code, since, limit, params);
        }
        let request = {};
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        if (limit !== undefined) {
            request['pageSize'] = limit;
        }
        [request, params] = this.handleUntilOption('endAt', request, params);
        let response = undefined;
        if (since !== undefined && since < 1550448000000) {
            // if since is earlier than 2019-02-18T00:00:00Z
            request['startAt'] = this.parseToInt(since / 1000);
            response = await this.privateGetHistDeposits(this.extend(request, params));
        }
        else {
            if (since !== undefined) {
                request['startAt'] = since;
            }
            response = await this.privateGetDeposits(this.extend(request, params));
        }
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "currentPage": 1,
        //             "pageSize": 5,
        //             "totalNum": 2,
        //             "totalPage": 1,
        //             "items": [
        //                 //--------------------------------------------------
        //                 // version 2 deposit response structure
        //                 {
        //                     "address": "0x5f047b29041bcfdbf0e4478cdfa753a336ba6989",
        //                     "memo": "5c247c8a03aa677cea2a251d",
        //                     "amount": 1,
        //                     "fee": 0.0001,
        //                     "currency": "KCS",
        //                     "isInner": false,
        //                     "walletTxId": "5bbb57386d99522d9f954c5a@test004",
        //                     "status": "SUCCESS",
        //                     "createdAt": 1544178843000,
        //                     "updatedAt": 1544178891000
        //                     "remark":"foobar"
        //                 },
        //                 //--------------------------------------------------
        //                 // version 1 (historical) deposit response structure
        //                 {
        //                     "currency": "BTC",
        //                     "createAt": 1528536998,
        //                     "amount": "0.03266638",
        //                     "walletTxId": "55c643bc2c68d6f17266383ac1be9e454038864b929ae7cee0bc408cc5c869e8@12ffGWmMMD1zA1WbFm7Ho3JZ1w6NYXjpFk@234",
        //                     "isInner": false,
        //                     "status": "SUCCESS",
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const items = this.safeList(data, 'items', []);
        return this.parseTransactions(items, currency, since, limit, { 'type': 'deposit' });
    }
    /**
     * @method
     * @name kucoin#fetchWithdrawals
     * @description fetch all withdrawals made from an account
     * @see https://www.kucoin.com/docs/rest/funding/withdrawals/get-withdrawals-list
     * @see https://www.kucoin.com/docs/rest/funding/withdrawals/get-v1-historical-withdrawals-list
     * @param {string} code unified currency code
     * @param {int} [since] the earliest time in ms to fetch withdrawals for
     * @param {int} [limit] the maximum number of withdrawals structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {int} [params.until] the latest time in ms to fetch entries for
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
     */
    async fetchWithdrawals(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchWithdrawals', 'paginate');
        if (paginate) {
            return await this.fetchPaginatedCallDynamic('fetchWithdrawals', code, since, limit, params);
        }
        let request = {};
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        if (limit !== undefined) {
            request['pageSize'] = limit;
        }
        [request, params] = this.handleUntilOption('endAt', request, params);
        let response = undefined;
        if (since !== undefined && since < 1550448000000) {
            // if since is earlier than 2019-02-18T00:00:00Z
            request['startAt'] = this.parseToInt(since / 1000);
            response = await this.privateGetHistWithdrawals(this.extend(request, params));
        }
        else {
            if (since !== undefined) {
                request['startAt'] = since;
            }
            response = await this.privateGetWithdrawals(this.extend(request, params));
        }
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "currentPage": 1,
        //             "pageSize": 5,
        //             "totalNum": 2,
        //             "totalPage": 1,
        //             "items": [
        //                 //--------------------------------------------------
        //                 // version 2 withdrawal response structure
        //                 {
        //                     "id": "5c2dc64e03aa675aa263f1ac",
        //                     "address": "0x5bedb060b8eb8d823e2414d82acce78d38be7fe9",
        //                     "memo": "",
        //                     "currency": "ETH",
        //                     "amount": 1.0000000,
        //                     "fee": 0.0100000,
        //                     "walletTxId": "3e2414d82acce78d38be7fe9",
        //                     "isInner": false,
        //                     "status": "FAILURE",
        //                     "createdAt": 1546503758000,
        //                     "updatedAt": 1546504603000
        //                 },
        //                 //--------------------------------------------------
        //                 // version 1 (historical) withdrawal response structure
        //                 {
        //                     "currency": "BTC",
        //                     "createAt": 1526723468,
        //                     "amount": "0.534",
        //                     "address": "33xW37ZSW4tQvg443Pc7NLCAs167Yc2XUV",
        //                     "walletTxId": "aeacea864c020acf58e51606169240e96774838dcd4f7ce48acf38e3651323f4",
        //                     "isInner": false,
        //                     "status": "SUCCESS"
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const items = this.safeList(data, 'items', []);
        return this.parseTransactions(items, currency, since, limit, { 'type': 'withdrawal' });
    }
    parseBalanceHelper(entry) {
        const account = this.account();
        account['used'] = this.safeString2(entry, 'holdBalance', 'hold');
        account['free'] = this.safeString2(entry, 'availableBalance', 'available');
        account['total'] = this.safeString2(entry, 'totalBalance', 'total');
        const debt = this.safeString(entry, 'liability');
        const interest = this.safeString(entry, 'interest');
        account['debt'] = Precise["default"].stringAdd(debt, interest);
        return account;
    }
    /**
     * @method
     * @name kucoin#fetchBalance
     * @description query for balance and get the amount of funds available for trading or funds locked in orders
     * @see https://www.kucoin.com/docs/rest/account/basic-info/get-account-list-spot-margin-trade_hf
     * @see https://www.kucoin.com/docs/rest/funding/funding-overview/get-account-detail-margin
     * @see https://www.kucoin.com/docs/rest/funding/funding-overview/get-account-detail-isolated-margin
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {object} [params.marginMode] 'cross' or 'isolated', margin type for fetching margin balance
     * @param {object} [params.type] extra parameters specific to the exchange API endpoint
     * @param {object} [params.hf] *default if false* if true, the result includes the balance of the high frequency account
     * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
     */
    async fetchBalance(params = {}) {
        await this.loadMarkets();
        const code = this.safeString(params, 'code');
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
        }
        const defaultType = this.safeString2(this.options, 'fetchBalance', 'defaultType', 'spot');
        const requestedType = this.safeString(params, 'type', defaultType);
        const accountsByType = this.safeDict(this.options, 'accountsByType');
        let type = this.safeString(accountsByType, requestedType, requestedType);
        params = this.omit(params, 'type');
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        if (hf && (type !== 'main')) {
            type = 'trade_hf';
        }
        const [marginMode, query] = this.handleMarginModeAndParams('fetchBalance', params);
        let response = undefined;
        const request = {};
        const isolated = (marginMode === 'isolated') || (type === 'isolated');
        const cross = (marginMode === 'cross') || (type === 'margin');
        if (isolated) {
            if (currency !== undefined) {
                request['balanceCurrency'] = currency['id'];
            }
            response = await this.privateGetIsolatedAccounts(this.extend(request, query));
        }
        else if (cross) {
            response = await this.privateGetMarginAccount(this.extend(request, query));
        }
        else {
            if (currency !== undefined) {
                request['currency'] = currency['id'];
            }
            request['type'] = type;
            response = await this.privateGetAccounts(this.extend(request, query));
        }
        //
        // Spot
        //
        //    {
        //        "code": "200000",
        //        "data": [
        //            {
        //                "balance": "0.00009788",
        //                "available": "0.00009788",
        //                "holds": "0",
        //                "currency": "BTC",
        //                "id": "5c6a4fd399a1d81c4f9cc4d0",
        //                "type": "trade",
        //            },
        //        ]
        //    }
        //
        // Cross
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "debtRatio": "0",
        //             "accounts": [
        //                 {
        //                     "currency": "USDT",
        //                     "totalBalance": "5",
        //                     "availableBalance": "5",
        //                     "holdBalance": "0",
        //                     "liability": "0",
        //                     "maxBorrowSize": "20"
        //                 },
        //             ]
        //         }
        //     }
        //
        // Isolated
        //
        //    {
        //        "code": "200000",
        //        "data": {
        //            "totalAssetOfQuoteCurrency": "0",
        //            "totalLiabilityOfQuoteCurrency": "0",
        //            "timestamp": 1712085661155,
        //            "assets": [
        //                {
        //                    "symbol": "MANA-USDT",
        //                    "status": "EFFECTIVE",
        //                    "debtRatio": "0",
        //                    "baseAsset": {
        //                        "currency": "MANA",
        //                        "borrowEnabled": true,
        //                        "transferInEnabled": true,
        //                        "total": "0",
        //                        "hold": "0",
        //                        "available": "0",
        //                        "liability": "0",
        //                        "interest": "0",
        //                        "maxBorrowSize": "0"
        //                    },
        //                    "quoteAsset": {
        //                        "currency": "USDT",
        //                        "borrowEnabled": true,
        //                        "transferInEnabled": true,
        //                        "total": "0",
        //                        "hold": "0",
        //                        "available": "0",
        //                        "liability": "0",
        //                        "interest": "0",
        //                        "maxBorrowSize": "0"
        //                    }
        //                },
        //                ...
        //            ]
        //        }
        //    }
        //
        let data = undefined;
        const result = {
            'info': response,
            'timestamp': undefined,
            'datetime': undefined,
        };
        if (isolated) {
            data = this.safeDict(response, 'data', {});
            const assets = this.safeValue(data, 'assets', data);
            for (let i = 0; i < assets.length; i++) {
                const entry = assets[i];
                const marketId = this.safeString(entry, 'symbol');
                const symbol = this.safeSymbol(marketId, undefined, '_');
                const base = this.safeDict(entry, 'baseAsset', {});
                const quote = this.safeDict(entry, 'quoteAsset', {});
                const baseCode = this.safeCurrencyCode(this.safeString(base, 'currency'));
                const quoteCode = this.safeCurrencyCode(this.safeString(quote, 'currency'));
                const subResult = {};
                subResult[baseCode] = this.parseBalanceHelper(base);
                subResult[quoteCode] = this.parseBalanceHelper(quote);
                result[symbol] = this.safeBalance(subResult);
            }
        }
        else if (cross) {
            data = this.safeDict(response, 'data', {});
            const accounts = this.safeList(data, 'accounts', []);
            for (let i = 0; i < accounts.length; i++) {
                const balance = accounts[i];
                const currencyId = this.safeString(balance, 'currency');
                const codeInner = this.safeCurrencyCode(currencyId);
                result[codeInner] = this.parseBalanceHelper(balance);
            }
        }
        else {
            data = this.safeList(response, 'data', []);
            for (let i = 0; i < data.length; i++) {
                const balance = data[i];
                const balanceType = this.safeString(balance, 'type');
                if (balanceType === type) {
                    const currencyId = this.safeString(balance, 'currency');
                    const codeInner2 = this.safeCurrencyCode(currencyId);
                    const account = this.account();
                    account['total'] = this.safeString(balance, 'balance');
                    account['free'] = this.safeString(balance, 'available');
                    account['used'] = this.safeString(balance, 'holds');
                    result[codeInner2] = account;
                }
            }
        }
        let returnType = result;
        if (!isolated) {
            returnType = this.safeBalance(result);
        }
        return returnType;
    }
    /**
     * @method
     * @name kucoin#transfer
     * @description transfer currency internally between wallets on the same account
     * @see https://www.kucoin.com/docs/rest/funding/transfer/inner-transfer
     * @see https://docs.kucoin.com/futures/#transfer-funds-to-kucoin-main-account-2
     * @see https://docs.kucoin.com/spot-hf/#internal-funds-transfers-in-high-frequency-trading-accounts
     * @param {string} code unified currency code
     * @param {float} amount amount to transfer
     * @param {string} fromAccount account to transfer from
     * @param {string} toAccount account to transfer to
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
     */
    async transfer(code, amount, fromAccount, toAccount, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const requestedAmount = this.currencyToPrecision(code, amount);
        let fromId = this.convertTypeToAccount(fromAccount);
        let toId = this.convertTypeToAccount(toAccount);
        const fromIsolated = this.inArray(fromId, this.ids);
        const toIsolated = this.inArray(toId, this.ids);
        if (fromId === 'contract') {
            if (toId !== 'main') {
                throw new errors.ExchangeError(this.id + ' transfer() only supports transferring from futures account to main account');
            }
            const request = {
                'currency': currency['id'],
                'amount': requestedAmount,
            };
            if (!('bizNo' in params)) {
                // it doesn't like more than 24 characters
                request['bizNo'] = this.uuid22();
            }
            const response = await this.futuresPrivatePostTransferOut(this.extend(request, params));
            //
            //     {
            //         "code": "200000",
            //         "data": {
            //             "applyId": "605a87217dff1500063d485d",
            //             "bizNo": "bcd6e5e1291f4905af84dc",
            //             "payAccountType": "CONTRACT",
            //             "payTag": "DEFAULT",
            //             "remark": '',
            //             "recAccountType": "MAIN",
            //             "recTag": "DEFAULT",
            //             "recRemark": '',
            //             "recSystem": "KUCOIN",
            //             "status": "PROCESSING",
            //             "currency": "XBT",
            //             "amount": "0.00001",
            //             "fee": "0",
            //             "sn": "573688685663948",
            //             "reason": '',
            //             "createdAt": 1616545569000,
            //             "updatedAt": 1616545569000
            //         }
            //     }
            //
            const data = this.safeDict(response, 'data');
            return this.parseTransfer(data, currency);
        }
        else {
            const request = {
                'currency': currency['id'],
                'amount': requestedAmount,
            };
            if (fromIsolated || toIsolated) {
                if (this.inArray(fromId, this.ids)) {
                    request['fromTag'] = fromId;
                    fromId = 'isolated';
                }
                if (this.inArray(toId, this.ids)) {
                    request['toTag'] = toId;
                    toId = 'isolated';
                }
            }
            request['from'] = fromId;
            request['to'] = toId;
            if (!('clientOid' in params)) {
                request['clientOid'] = this.uuid();
            }
            const response = await this.privatePostAccountsInnerTransfer(this.extend(request, params));
            //
            //     {
            //         "code": "200000",
            //         "data": {
            //              "orderId": "605a6211e657f00006ad0ad6"
            //         }
            //     }
            //
            const data = this.safeDict(response, 'data');
            return this.parseTransfer(data, currency);
        }
    }
    parseTransfer(transfer, currency = undefined) {
        //
        // transfer (spot)
        //
        //    {
        //        "orderId": "605a6211e657f00006ad0ad6"
        //    }
        //
        //    {
        //        "code": "200000",
        //        "msg": "Failed to transfer out. The amount exceeds the upper limit"
        //    }
        //
        // transfer (futures)
        //
        //     {
        //         "applyId": "605a87217dff1500063d485d",
        //         "bizNo": "bcd6e5e1291f4905af84dc",
        //         "payAccountType": "CONTRACT",
        //         "payTag": "DEFAULT",
        //         "remark": '',
        //         "recAccountType": "MAIN",
        //         "recTag": "DEFAULT",
        //         "recRemark": '',
        //         "recSystem": "KUCOIN",
        //         "status": "PROCESSING",
        //         "currency": "XBT",
        //         "amount": "0.00001",
        //         "fee": "0",
        //         "sn": "573688685663948",
        //         "reason": '',
        //         "createdAt": 1616545569000,
        //         "updatedAt": 1616545569000
        //     }
        //
        const timestamp = this.safeInteger(transfer, 'createdAt');
        const currencyId = this.safeString(transfer, 'currency');
        const rawStatus = this.safeString(transfer, 'status');
        const accountFromRaw = this.safeStringLower(transfer, 'payAccountType');
        const accountToRaw = this.safeStringLower(transfer, 'recAccountType');
        const accountsByType = this.safeDict(this.options, 'accountsByType');
        const accountFrom = this.safeString(accountsByType, accountFromRaw, accountFromRaw);
        const accountTo = this.safeString(accountsByType, accountToRaw, accountToRaw);
        return {
            'id': this.safeString2(transfer, 'applyId', 'orderId'),
            'currency': this.safeCurrencyCode(currencyId, currency),
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'amount': this.safeNumber(transfer, 'amount'),
            'fromAccount': accountFrom,
            'toAccount': accountTo,
            'status': this.parseTransferStatus(rawStatus),
            'info': transfer,
        };
    }
    parseTransferStatus(status) {
        const statuses = {
            'PROCESSING': 'pending',
        };
        return this.safeString(statuses, status, status);
    }
    parseLedgerEntryType(type) {
        const types = {
            'Assets Transferred in After Upgrading': 'transfer',
            'Deposit': 'transaction',
            'Withdrawal': 'transaction',
            'Transfer': 'transfer',
            'Trade_Exchange': 'trade',
            // 'Vote for Coin': 'Vote for Coin', // Vote for Coin
            'KuCoin Bonus': 'bonus',
            'Referral Bonus': 'referral',
            'Rewards': 'bonus',
            // 'Distribution': 'Distribution', // Distribution, such as get GAS by holding NEO
            'Airdrop/Fork': 'airdrop',
            'Other rewards': 'bonus',
            'Fee Rebate': 'rebate',
            'Buy Crypto': 'trade',
            'Sell Crypto': 'sell',
            'Public Offering Purchase': 'trade',
            // 'Send red envelope': 'Send red envelope', // Send red envelope
            // 'Open red envelope': 'Open red envelope', // Open red envelope
            // 'Staking': 'Staking', // Staking
            // 'LockDrop Vesting': 'LockDrop Vesting', // LockDrop Vesting
            // 'Staking Profits': 'Staking Profits', // Staking Profits
            // 'Redemption': 'Redemption', // Redemption
            'Refunded Fees': 'fee',
            'KCS Pay Fees': 'fee',
            'Margin Trade': 'trade',
            'Loans': 'Loans',
            // 'Borrowings': 'Borrowings', // Borrowings
            // 'Debt Repayment': 'Debt Repayment', // Debt Repayment
            // 'Loans Repaid': 'Loans Repaid', // Loans Repaid
            // 'Lendings': 'Lendings', // Lendings
            // 'Pool transactions': 'Pool transactions', // Pool-X transactions
            'Instant Exchange': 'trade',
            'Sub-account transfer': 'transfer',
            'Liquidation Fees': 'fee', // Liquidation Fees
            // 'Soft Staking Profits': 'Soft Staking Profits', // Soft Staking Profits
            // 'Voting Earnings': 'Voting Earnings', // Voting Earnings on Pool-X
            // 'Redemption of Voting': 'Redemption of Voting', // Redemption of Voting on Pool-X
            // 'Voting': 'Voting', // Voting on Pool-X
            // 'Convert to KCS': 'Convert to KCS', // Convert to KCS
        };
        return this.safeString(types, type, type);
    }
    parseLedgerEntry(item, currency = undefined) {
        //
        //     {
        //         "id": "611a1e7c6a053300067a88d9", //unique key for each ledger entry
        //         "currency": "USDT", //Currency
        //         "amount": "10.00059547", //The total amount of assets (fees included) involved in assets changes such as transaction, withdrawal and bonus distribution.
        //         "fee": "0", //Deposit or withdrawal fee
        //         "balance": "0", //Total assets of a currency remaining funds after transaction
        //         "accountType": "MAIN", //Account Type
        //         "bizType": "Loans Repaid", //business type
        //         "direction": "in", //side, in or out
        //         "createdAt": 1629101692950, //Creation time
        //         "context": "{\"borrowerUserId\":\"601ad03e50dc810006d242ea\",\"loanRepayDetailNo\":\"611a1e7cc913d000066cf7ec\"}" //Business core parameters
        //     }
        //
        const id = this.safeString(item, 'id');
        const currencyId = this.safeString(item, 'currency');
        const code = this.safeCurrencyCode(currencyId, currency);
        currency = this.safeCurrency(currencyId, currency);
        const amount = this.safeNumber(item, 'amount');
        const balanceAfter = undefined;
        // const balanceAfter = this.safeNumber (item, 'balance'); only returns zero string
        const bizType = this.safeString(item, 'bizType');
        const type = this.parseLedgerEntryType(bizType);
        const direction = this.safeString(item, 'direction');
        const timestamp = this.safeInteger(item, 'createdAt');
        const datetime = this.iso8601(timestamp);
        const account = this.safeString(item, 'accountType'); // MAIN, TRADE, MARGIN, or CONTRACT
        const context = this.safeString(item, 'context'); // contains other information about the ledger entry
        //
        // withdrawal transaction
        //
        //     "{\"orderId\":\"617bb2d09e7b3b000196dac8\",\"txId\":\"0x79bb9855f86b351a45cab4dc69d78ca09586a94c45dde49475722b98f401b054\"}"
        //
        // deposit to MAIN, trade via MAIN
        //
        //     "{\"orderId\":\"617ab9949e7b3b0001948081\",\"txId\":\"0x7a06b16bbd6b03dbc3d96df5683b15229fc35e7184fd7179a5f3a310bd67d1fa@default@0\"}"
        //
        // sell trade
        //
        //     "{\"symbol\":\"ETH-USDT\",\"orderId\":\"617adcd1eb3fa20001dd29a1\",\"tradeId\":\"617adcd12e113d2b91222ff9\"}"
        //
        let referenceId = undefined;
        if (context !== undefined && context !== '') {
            try {
                const parsed = JSON.parse(context);
                const orderId = this.safeString(parsed, 'orderId');
                const tradeId = this.safeString(parsed, 'tradeId');
                // transactions only have an orderId but for trades we wish to use tradeId
                if (tradeId !== undefined) {
                    referenceId = tradeId;
                }
                else {
                    referenceId = orderId;
                }
            }
            catch (exc) {
                referenceId = context;
            }
        }
        let fee = undefined;
        const feeCost = this.safeString(item, 'fee');
        let feeCurrency = undefined;
        if (feeCost !== '0') {
            feeCurrency = code;
            fee = { 'cost': this.parseNumber(feeCost), 'currency': feeCurrency };
        }
        return this.safeLedgerEntry({
            'info': item,
            'id': id,
            'direction': direction,
            'account': account,
            'referenceId': referenceId,
            'referenceAccount': account,
            'type': type,
            'currency': code,
            'amount': amount,
            'timestamp': timestamp,
            'datetime': datetime,
            'before': undefined,
            'after': balanceAfter,
            'status': undefined,
            'fee': fee,
        }, currency);
    }
    /**
     * @method
     * @name kucoin#fetchLedger
     * @description fetch the history of changes, actions done by the user or operations that altered the balance of the user
     * @see https://www.kucoin.com/docs/rest/account/basic-info/get-account-ledgers-spot-margin
     * @see https://www.kucoin.com/docs/rest/account/basic-info/get-account-ledgers-trade_hf
     * @see https://www.kucoin.com/docs/rest/account/basic-info/get-account-ledgers-margin_hf
     * @param {string} [code] unified currency code, default is undefined
     * @param {int} [since] timestamp in ms of the earliest ledger entry, default is undefined
     * @param {int} [limit] max number of ledger entries to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {boolean} [params.hf] default false, when true will fetch ledger entries for the high frequency trading account
     * @param {int} [params.until] the latest time in ms to fetch entries for
     * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [available parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
     * @returns {object} a [ledger structure]{@link https://docs.ccxt.com/#/?id=ledger}
     */
    async fetchLedger(code = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        await this.loadAccounts();
        let paginate = false;
        [paginate, params] = this.handleOptionAndParams(params, 'fetchLedger', 'paginate');
        let hf = undefined;
        [hf, params] = this.handleHfAndParams(params);
        if (paginate) {
            return await this.fetchPaginatedCallDynamic('fetchLedger', code, since, limit, params);
        }
        let request = {
        // 'currency': currency['id'], // can choose up to 10, if not provided returns for all currencies by default
        // 'direction': 'in', // 'out'
        // 'bizType': 'DEPOSIT', // DEPOSIT, WITHDRAW, TRANSFER, SUB_TRANSFER,TRADE_EXCHANGE, MARGIN_EXCHANGE, KUCOIN_BONUS (optional)
        // 'startAt': since,
        // 'endAt': exchange.milliseconds (),
        };
        if (since !== undefined) {
            request['startAt'] = since;
        }
        // atm only single currency retrieval is supported
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
            request['currency'] = currency['id'];
        }
        [request, params] = this.handleUntilOption('endAt', request, params);
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchLedger', params);
        let response = undefined;
        if (hf) {
            if (marginMode !== undefined) {
                response = await this.privateGetHfMarginAccountLedgers(this.extend(request, params));
            }
            else {
                response = await this.privateGetHfAccountsLedgers(this.extend(request, params));
            }
        }
        else {
            response = await this.privateGetAccountsLedgers(this.extend(request, params));
        }
        //
        //     {
        //         "code":"200000",
        //         "data":{
        //             "currentPage":1,
        //             "pageSize":50,
        //             "totalNum":1,
        //             "totalPage":1,
        //             "items":[
        //                 {
        //                     "id":"617cc528729f5f0001c03ceb",
        //                     "currency":"GAS",
        //                     "amount":"0.00000339",
        //                     "fee":"0",
        //                     "balance":"0",
        //                     "accountType":"MAIN",
        //                     "bizType":"Distribution",
        //                     "direction":"in",
        //                     "createdAt":1635566888183,
        //                     "context":"{\"orderId\":\"617cc47a1c47ed0001ce3606\",\"description\":\"Holding NEO,distribute GAS(2021/10/30)\"}"
        //                 }
        //                 {
        //                     "id": "611a1e7c6a053300067a88d9",//unique key
        //                     "currency": "USDT", //Currency
        //                     "amount": "10.00059547", //Change amount of the funds
        //                     "fee": "0", //Deposit or withdrawal fee
        //                     "balance": "0", //Total assets of a currency
        //                     "accountType": "MAIN", //Account Type
        //                     "bizType": "Loans Repaid", //business type
        //                     "direction": "in", //side, in or out
        //                     "createdAt": 1629101692950, //Creation time
        //                     "context": "{\"borrowerUserId\":\"601ad03e50dc810006d242ea\",\"loanRepayDetailNo\":\"611a1e7cc913d000066cf7ec\"}"
        //                 },
        //             ]
        //         }
        //     }
        //
        const dataList = this.safeList(response, 'data');
        if (dataList !== undefined) {
            return this.parseLedger(dataList, currency, since, limit);
        }
        const data = this.safeDict(response, 'data');
        const items = this.safeList(data, 'items', []);
        return this.parseLedger(items, currency, since, limit);
    }
    calculateRateLimiterCost(api, method, path, params, config = {}) {
        const versions = this.safeDict(this.options, 'versions', {});
        const apiVersions = this.safeDict(versions, api, {});
        const methodVersions = this.safeDict(apiVersions, method, {});
        const defaultVersion = this.safeString(methodVersions, path, this.options['version']);
        const version = this.safeString(params, 'version', defaultVersion);
        if (version === 'v3' && ('v3' in config)) {
            return config['v3'];
        }
        else if (version === 'v2' && ('v2' in config)) {
            return config['v2'];
        }
        else if (version === 'v1' && ('v1' in config)) {
            return config['v1'];
        }
        return this.safeValue(config, 'cost', 1);
    }
    parseBorrowRate(info, currency = undefined) {
        //
        //     {
        //         "tradeId": "62db2dcaff219600012b56cd",
        //         "currency": "USDT",
        //         "size": "10",
        //         "dailyIntRate": "0.00003",
        //         "term": 7,
        //         "timestamp": 1658531274508488480
        //     },
        //
        //     {
        //         "createdAt": 1697783812257,
        //         "currency": "XMR",
        //         "interestAmount": "0.1",
        //         "dayRatio": "0.001"
        //     }
        //
        const timestampId = this.safeString2(info, 'createdAt', 'timestamp');
        const timestamp = this.parseToInt(timestampId.slice(0, 13));
        const currencyId = this.safeString(info, 'currency');
        return {
            'currency': this.safeCurrencyCode(currencyId, currency),
            'rate': this.safeNumber2(info, 'dailyIntRate', 'dayRatio'),
            'period': 86400000,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'info': info,
        };
    }
    /**
     * @method
     * @name kucoin#fetchBorrowInterest
     * @description fetch the interest owed by the user for borrowing currency for margin trading
     * @see https://docs.kucoin.com/#get-repay-record
     * @see https://docs.kucoin.com/#query-isolated-margin-account-info
     * @param {string} [code] unified currency code
     * @param {string} [symbol] unified market symbol, required for isolated margin
     * @param {int} [since] the earliest time in ms to fetch borrrow interest for
     * @param {int} [limit] the maximum number of structures to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.marginMode] 'cross' or 'isolated' default is 'cross'
     * @returns {object[]} a list of [borrow interest structures]{@link https://docs.ccxt.com/#/?id=borrow-interest-structure}
     */
    async fetchBorrowInterest(code = undefined, symbol = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('fetchBorrowInterest', params, 'cross');
        const request = {};
        let currency = undefined;
        if (code !== undefined) {
            currency = this.currency(code);
            if (marginMode === 'isolated') {
                request['balanceCurrency'] = currency['id'];
            }
            else {
                request['quoteCurrency'] = currency['id'];
            }
        }
        let market = undefined;
        if (symbol !== undefined) {
            market = this.market(symbol);
        }
        let response = undefined;
        if (marginMode === 'isolated') {
            response = await this.privateGetIsolatedAccounts(this.extend(request, params));
        }
        else {
            response = await this.privateGetMarginAccounts(this.extend(request, params));
        }
        //
        // Cross
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "totalAssetOfQuoteCurrency": "0",
        //             "totalLiabilityOfQuoteCurrency": "0",
        //             "debtRatio": "0",
        //             "status": "EFFECTIVE",
        //             "accounts": [
        //                 {
        //                     "currency": "1INCH",
        //                     "total": "0",
        //                     "available": "0",
        //                     "hold": "0",
        //                     "liability": "0",
        //                     "maxBorrowSize": "0",
        //                     "borrowEnabled": true,
        //                     "transferInEnabled": true
        //                 }
        //             ]
        //         }
        //     }
        //
        // Isolated
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "totalConversionBalance": "0.02138647",
        //             "liabilityConversionBalance": "0.01480001",
        //             "assets": [
        //                 {
        //                     "symbol": "MANA-USDT",
        //                     "debtRatio": "0",
        //                     "status": "BORROW",
        //                     "baseAsset": {
        //                         "currency": "MANA",
        //                         "borrowEnabled": true,
        //                         "repayEnabled": true,
        //                         "transferEnabled": true,
        //                         "borrowed": "0",
        //                         "totalAsset": "0",
        //                         "available": "0",
        //                         "hold": "0",
        //                         "maxBorrowSize": "1000"
        //                     },
        //                     "quoteAsset": {
        //                         "currency": "USDT",
        //                         "borrowEnabled": true,
        //                         "repayEnabled": true,
        //                         "transferEnabled": true,
        //                         "borrowed": "0",
        //                         "totalAsset": "0",
        //                         "available": "0",
        //                         "hold": "0",
        //                         "maxBorrowSize": "50000"
        //                     }
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        const assets = (marginMode === 'isolated') ? this.safeList(data, 'assets', []) : this.safeList(data, 'accounts', []);
        const interest = this.parseBorrowInterests(assets, market);
        const filteredByCurrency = this.filterByCurrencySinceLimit(interest, code, since, limit);
        return this.filterBySymbolSinceLimit(filteredByCurrency, symbol, since, limit);
    }
    parseBorrowInterest(info, market = undefined) {
        //
        // Cross
        //
        //     {
        //         "currency": "1INCH",
        //         "total": "0",
        //         "available": "0",
        //         "hold": "0",
        //         "liability": "0",
        //         "maxBorrowSize": "0",
        //         "borrowEnabled": true,
        //         "transferInEnabled": true
        //     }
        //
        // Isolated
        //
        //     {
        //         "symbol": "MANA-USDT",
        //         "debtRatio": "0",
        //         "status": "BORROW",
        //         "baseAsset": {
        //             "currency": "MANA",
        //             "borrowEnabled": true,
        //             "repayEnabled": true,
        //             "transferEnabled": true,
        //             "borrowed": "0",
        //             "totalAsset": "0",
        //             "available": "0",
        //             "hold": "0",
        //             "maxBorrowSize": "1000"
        //         },
        //         "quoteAsset": {
        //             "currency": "USDT",
        //             "borrowEnabled": true,
        //             "repayEnabled": true,
        //             "transferEnabled": true,
        //             "borrowed": "0",
        //             "totalAsset": "0",
        //             "available": "0",
        //             "hold": "0",
        //             "maxBorrowSize": "50000"
        //         }
        //     }
        //
        const marketId = this.safeString(info, 'symbol');
        const marginMode = (marketId === undefined) ? 'cross' : 'isolated';
        market = this.safeMarket(marketId, market);
        const symbol = this.safeString(market, 'symbol');
        const timestamp = this.safeInteger(info, 'createdAt');
        const isolatedBase = this.safeDict(info, 'baseAsset', {});
        let amountBorrowed = undefined;
        let interest = undefined;
        let currencyId = undefined;
        if (marginMode === 'isolated') {
            amountBorrowed = this.safeNumber(isolatedBase, 'liability');
            interest = this.safeNumber(isolatedBase, 'interest');
            currencyId = this.safeString(isolatedBase, 'currency');
        }
        else {
            amountBorrowed = this.safeNumber(info, 'liability');
            interest = this.safeNumber(info, 'accruedInterest');
            currencyId = this.safeString(info, 'currency');
        }
        return {
            'info': info,
            'symbol': symbol,
            'currency': this.safeCurrencyCode(currencyId),
            'interest': interest,
            'interestRate': this.safeNumber(info, 'dailyIntRate'),
            'amountBorrowed': amountBorrowed,
            'marginMode': marginMode,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
        };
    }
    /**
     * @method
     * @name kucoin#fetchBorrowRateHistories
     * @description retrieves a history of a multiple currencies borrow interest rate at specific time slots, returns all currencies if no symbols passed, default is undefined
     * @see https://www.kucoin.com/docs/rest/margin-trading/margin-trading-v3-/get-cross-isolated-margin-interest-records
     * @param {string[]|undefined} codes list of unified currency codes, default is undefined
     * @param {int} [since] timestamp in ms of the earliest borrowRate, default is undefined
     * @param {int} [limit] max number of borrow rate prices to return, default is undefined
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.marginMode] 'cross' or 'isolated' default is 'cross'
     * @param {int} [params.until] the latest time in ms to fetch entries for
     * @returns {object} a dictionary of [borrow rate structures]{@link https://docs.ccxt.com/#/?id=borrow-rate-structure} indexed by the market symbol
     */
    async fetchBorrowRateHistories(codes = undefined, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const marginResult = this.handleMarginModeAndParams('fetchBorrowRateHistories', params);
        const marginMode = this.safeString(marginResult, 0, 'cross');
        const isIsolated = (marginMode === 'isolated'); // true-isolated, false-cross
        let request = {
            'isIsolated': isIsolated,
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        [request, params] = this.handleUntilOption('endTime', request, params);
        if (limit !== undefined) {
            request['pageSize'] = limit; // default:50, min:10, max:500
        }
        const response = await this.privateGetMarginInterest(this.extend(request, params));
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "timestamp": 1710829939673,
        //             "currentPage": 1,
        //             "pageSize": 50,
        //             "totalNum": 0,
        //             "totalPage": 0,
        //             "items": [
        //                 {
        //                     "createdAt": 1697783812257,
        //                     "currency": "XMR",
        //                     "interestAmount": "0.1",
        //                     "dayRatio": "0.001"
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data');
        const rows = this.safeList(data, 'items', []);
        return this.parseBorrowRateHistories(rows, codes, since, limit);
    }
    /**
     * @method
     * @name kucoin#fetchBorrowRateHistory
     * @description retrieves a history of a currencies borrow interest rate at specific time slots
     * @see https://www.kucoin.com/docs/rest/margin-trading/margin-trading-v3-/get-cross-isolated-margin-interest-records
     * @param {string} code unified currency code
     * @param {int} [since] timestamp for the earliest borrow rate
     * @param {int} [limit] the maximum number of [borrow rate structures]{@link https://docs.ccxt.com/#/?id=borrow-rate-structure} to retrieve
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @param {string} [params.marginMode] 'cross' or 'isolated' default is 'cross'
     * @param {int} [params.until] the latest time in ms to fetch entries for
     * @returns {object[]} an array of [borrow rate structures]{@link https://docs.ccxt.com/#/?id=borrow-rate-structure}
     */
    async fetchBorrowRateHistory(code, since = undefined, limit = undefined, params = {}) {
        await this.loadMarkets();
        const marginResult = this.handleMarginModeAndParams('fetchBorrowRateHistories', params);
        const marginMode = this.safeString(marginResult, 0, 'cross');
        const isIsolated = (marginMode === 'isolated'); // true-isolated, false-cross
        const currency = this.currency(code);
        let request = {
            'isIsolated': isIsolated,
            'currency': currency['id'],
        };
        if (since !== undefined) {
            request['startTime'] = since;
        }
        [request, params] = this.handleUntilOption('endTime', request, params);
        if (limit !== undefined) {
            request['pageSize'] = limit; // default:50, min:10, max:500
        }
        const response = await this.privateGetMarginInterest(this.extend(request, params));
        //
        //     {
        //         "code": "200000",
        //         "data": {
        //             "timestamp": 1710829939673,
        //             "currentPage": 1,
        //             "pageSize": 50,
        //             "totalNum": 0,
        //             "totalPage": 0,
        //             "items": [
        //                 {
        //                     "createdAt": 1697783812257,
        //                     "currency": "XMR",
        //                     "interestAmount": "0.1",
        //                     "dayRatio": "0.001"
        //                 }
        //             ]
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data');
        const rows = this.safeList(data, 'items', []);
        return this.parseBorrowRateHistory(rows, code, since, limit);
    }
    parseBorrowRateHistories(response, codes, since, limit) {
        //
        //     [
        //         {
        //             "createdAt": 1697783812257,
        //             "currency": "XMR",
        //             "interestAmount": "0.1",
        //             "dayRatio": "0.001"
        //         }
        //     ]
        //
        const borrowRateHistories = {};
        for (let i = 0; i < response.length; i++) {
            const item = response[i];
            const code = this.safeCurrencyCode(this.safeString(item, 'currency'));
            if (codes === undefined || this.inArray(code, codes)) {
                if (!(code in borrowRateHistories)) {
                    borrowRateHistories[code] = [];
                }
                const borrowRateStructure = this.parseBorrowRate(item);
                const borrowRateHistoriesCode = borrowRateHistories[code];
                borrowRateHistoriesCode.push(borrowRateStructure);
            }
        }
        const keys = Object.keys(borrowRateHistories);
        for (let i = 0; i < keys.length; i++) {
            const code = keys[i];
            borrowRateHistories[code] = this.filterByCurrencySinceLimit(borrowRateHistories[code], code, since, limit);
        }
        return borrowRateHistories;
    }
    /**
     * @method
     * @name kucoin#borrowCrossMargin
     * @description create a loan to borrow margin
     * @see https://docs.kucoin.com/#1-margin-borrowing
     * @param {string} code unified currency code of the currency to borrow
     * @param {float} amount the amount to borrow
     * @param {object} [params] extra parameters specific to the exchange API endpoints
     * @param {string} [params.timeInForce] either IOC or FOK
     * @returns {object} a [margin loan structure]{@link https://docs.ccxt.com/#/?id=margin-loan-structure}
     */
    async borrowCrossMargin(code, amount, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
            'size': this.currencyToPrecision(code, amount),
            'timeInForce': 'FOK',
        };
        const response = await this.privatePostMarginBorrow(this.extend(request, params));
        //
        //     {
        //         "success": true,
        //         "code": "200",
        //         "msg": "success",
        //         "retry": false,
        //         "data": {
        //             "orderNo": "5da6dba0f943c0c81f5d5db5",
        //             "actualSize": 10
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseMarginLoan(data, currency);
    }
    /**
     * @method
     * @name kucoin#borrowIsolatedMargin
     * @description create a loan to borrow margin
     * @see https://docs.kucoin.com/#1-margin-borrowing
     * @param {string} symbol unified market symbol, required for isolated margin
     * @param {string} code unified currency code of the currency to borrow
     * @param {float} amount the amount to borrow
     * @param {object} [params] extra parameters specific to the exchange API endpoints
     * @param {string} [params.timeInForce] either IOC or FOK
     * @returns {object} a [margin loan structure]{@link https://docs.ccxt.com/#/?id=margin-loan-structure}
     */
    async borrowIsolatedMargin(symbol, code, amount, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
            'size': this.currencyToPrecision(code, amount),
            'symbol': market['id'],
            'timeInForce': 'FOK',
            'isIsolated': true,
        };
        const response = await this.privatePostMarginBorrow(this.extend(request, params));
        //
        //     {
        //         "success": true,
        //         "code": "200",
        //         "msg": "success",
        //         "retry": false,
        //         "data": {
        //             "orderNo": "5da6dba0f943c0c81f5d5db5",
        //             "actualSize": 10
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseMarginLoan(data, currency);
    }
    /**
     * @method
     * @name kucoin#repayCrossMargin
     * @description repay borrowed margin and interest
     * @see https://docs.kucoin.com/#2-repayment
     * @param {string} code unified currency code of the currency to repay
     * @param {float} amount the amount to repay
     * @param {object} [params] extra parameters specific to the exchange API endpoints
     * @returns {object} a [margin loan structure]{@link https://docs.ccxt.com/#/?id=margin-loan-structure}
     */
    async repayCrossMargin(code, amount, params = {}) {
        await this.loadMarkets();
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
            'size': this.currencyToPrecision(code, amount),
        };
        const response = await this.privatePostMarginRepay(this.extend(request, params));
        //
        //     {
        //         "success": true,
        //         "code": "200",
        //         "msg": "success",
        //         "retry": false,
        //         "data": {
        //             "orderNo": "5da6dba0f943c0c81f5d5db5",
        //             "actualSize": 10
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseMarginLoan(data, currency);
    }
    /**
     * @method
     * @name kucoin#repayIsolatedMargin
     * @description repay borrowed margin and interest
     * @see https://docs.kucoin.com/#2-repayment
     * @param {string} symbol unified market symbol
     * @param {string} code unified currency code of the currency to repay
     * @param {float} amount the amount to repay
     * @param {object} [params] extra parameters specific to the exchange API endpoints
     * @returns {object} a [margin loan structure]{@link https://docs.ccxt.com/#/?id=margin-loan-structure}
     */
    async repayIsolatedMargin(symbol, code, amount, params = {}) {
        await this.loadMarkets();
        const market = this.market(symbol);
        const currency = this.currency(code);
        const request = {
            'currency': currency['id'],
            'size': this.currencyToPrecision(code, amount),
            'symbol': market['id'],
            'isIsolated': true,
        };
        const response = await this.privatePostMarginRepay(this.extend(request, params));
        //
        //     {
        //         "success": true,
        //         "code": "200",
        //         "msg": "success",
        //         "retry": false,
        //         "data": {
        //             "orderNo": "5da6dba0f943c0c81f5d5db5",
        //             "actualSize": 10
        //         }
        //     }
        //
        const data = this.safeDict(response, 'data', {});
        return this.parseMarginLoan(data, currency);
    }
    parseMarginLoan(info, currency = undefined) {
        //
        //     {
        //         "orderNo": "5da6dba0f943c0c81f5d5db5",
        //         "actualSize": 10
        //     }
        //
        const timestamp = this.milliseconds();
        const currencyId = this.safeString(info, 'currency');
        return {
            'id': this.safeString(info, 'orderNo'),
            'currency': this.safeCurrencyCode(currencyId, currency),
            'amount': this.safeNumber(info, 'actualSize'),
            'symbol': undefined,
            'timestamp': timestamp,
            'datetime': this.iso8601(timestamp),
            'info': info,
        };
    }
    /**
     * @method
     * @name kucoin#fetchDepositWithdrawFees
     * @description fetch deposit and withdraw fees - *IMPORTANT* use fetchDepositWithdrawFee to get more in-depth info
     * @see https://docs.kucoin.com/#get-currencies
     * @param {string[]|undefined} codes list of unified currency codes
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} a list of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure}
     */
    async fetchDepositWithdrawFees(codes = undefined, params = {}) {
        await this.loadMarkets();
        const response = await this.publicGetCurrencies(params);
        //
        //  [
        //      {
        //        "currency": "CSP",
        //        "name": "CSP",
        //        "fullName": "Caspian",
        //        "precision": 8,
        //        "confirms": 12,
        //        "contractAddress": "0xa6446d655a0c34bc4f05042ee88170d056cbaf45",
        //        "withdrawalMinSize": "2000",
        //        "withdrawalMinFee": "1000",
        //        "isWithdrawEnabled": true,
        //        "isDepositEnabled": true,
        //        "isMarginEnabled": false,
        //        "isDebitEnabled": false
        //      },
        //  ]
        //
        const data = this.safeList(response, 'data', []);
        return this.parseDepositWithdrawFees(data, codes, 'currency');
    }
    /**
     * @method
     * @name kucoin#setLeverage
     * @description set the level of leverage for a market
     * @see https://www.kucoin.com/docs/rest/margin-trading/margin-trading-v3-/modify-leverage-multiplier
     * @param {int } [leverage] New leverage multiplier. Must be greater than 1 and up to two decimal places, and cannot be less than the user's current debt leverage or greater than the system's maximum leverage
     * @param {string} [symbol] unified market symbol
     * @param {object} [params] extra parameters specific to the exchange API endpoint
     * @returns {object} response from the exchange
     */
    async setLeverage(leverage, symbol = undefined, params = {}) {
        await this.loadMarkets();
        let market = undefined;
        let marketType = undefined;
        [marketType, params] = this.handleMarketTypeAndParams('setLeverage', undefined, params);
        if ((symbol !== undefined) || marketType !== 'spot') {
            market = this.market(symbol);
            if (market['contract']) {
                throw new errors.NotSupported(this.id + ' setLeverage currently supports only spot margin');
            }
        }
        let marginMode = undefined;
        [marginMode, params] = this.handleMarginModeAndParams('setLeverage', params);
        if (marginMode === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setLeverage requires a marginMode parameter');
        }
        const request = {};
        if (marginMode === 'isolated' && symbol === undefined) {
            throw new errors.ArgumentsRequired(this.id + ' setLeverage requires a symbol parameter for isolated margin');
        }
        if (symbol !== undefined) {
            request['symbol'] = market['id'];
        }
        request['leverage'] = leverage.toString();
        request['isIsolated'] = (marginMode === 'isolated');
        return await this.privatePostPositionUpdateUserLeverage(this.extend(request, params));
    }
    sign(path, api = 'public', method = 'GET', params = {}, headers = undefined, body = undefined) {
        //
        // the v2 URL is https://openapi-v2.kucoin.com/api/v1/endpoint
        //                                ↑                 ↑
        //                                ↑                 ↑
        //
        const versions = this.safeDict(this.options, 'versions', {});
        const apiVersions = this.safeDict(versions, api, {});
        const methodVersions = this.safeDict(apiVersions, method, {});
        const defaultVersion = this.safeString(methodVersions, path, this.options['version']);
        const version = this.safeString(params, 'version', defaultVersion);
        params = this.omit(params, 'version');
        let endpoint = '/api/' + version + '/' + this.implodeParams(path, params);
        if (api === 'webExchange') {
            endpoint = '/' + this.implodeParams(path, params);
        }
        if (api === 'earn') {
            endpoint = '/api/v1/' + this.implodeParams(path, params);
        }
        const query = this.omit(params, this.extractParams(path));
        let endpart = '';
        headers = (headers !== undefined) ? headers : {};
        let url = this.urls['api'][api];
        if (!this.isEmpty(query)) {
            if (((method === 'GET') || (method === 'DELETE')) && (path !== 'orders/multi-cancel')) {
                endpoint += '?' + this.rawencode(query);
            }
            else {
                body = this.json(query);
                endpart = body;
                headers['Content-Type'] = 'application/json';
            }
        }
        url = url + endpoint;
        const isFuturePrivate = (api === 'futuresPrivate');
        const isPrivate = (api === 'private');
        const isBroker = (api === 'broker');
        const isEarn = (api === 'earn');
        if (isPrivate || isFuturePrivate || isBroker || isEarn) {
            this.checkRequiredCredentials();
            const timestamp = this.nonce().toString();
            headers = this.extend({
                'KC-API-KEY-VERSION': '2',
                'KC-API-KEY': this.apiKey,
                'KC-API-TIMESTAMP': timestamp,
            }, headers);
            const apiKeyVersion = this.safeString(headers, 'KC-API-KEY-VERSION');
            if (apiKeyVersion === '2') {
                const passphrase = this.hmac(this.encode(this.password), this.encode(this.secret), sha256.sha256, 'base64');
                headers['KC-API-PASSPHRASE'] = passphrase;
            }
            else {
                headers['KC-API-PASSPHRASE'] = this.password;
            }
            const payload = timestamp + method + endpoint + endpart;
            const signature = this.hmac(this.encode(payload), this.encode(this.secret), sha256.sha256, 'base64');
            headers['KC-API-SIGN'] = signature;
            let partner = this.safeDict(this.options, 'partner', {});
            partner = isFuturePrivate ? this.safeValue(partner, 'future', partner) : this.safeValue(partner, 'spot', partner);
            const partnerId = this.safeString(partner, 'id');
            const partnerSecret = this.safeString2(partner, 'secret', 'key');
            if ((partnerId !== undefined) && (partnerSecret !== undefined)) {
                const partnerPayload = timestamp + partnerId + this.apiKey;
                const partnerSignature = this.hmac(this.encode(partnerPayload), this.encode(partnerSecret), sha256.sha256, 'base64');
                headers['KC-API-PARTNER-SIGN'] = partnerSignature;
                headers['KC-API-PARTNER'] = partnerId;
                headers['KC-API-PARTNER-VERIFY'] = 'true';
            }
            if (isBroker) {
                const brokerName = this.safeString(partner, 'name');
                if (brokerName !== undefined) {
                    headers['KC-BROKER-NAME'] = brokerName;
                }
            }
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
        //     { code: '200000', data: { ... }}
        //
        const errorCode = this.safeString(response, 'code');
        const message = this.safeString2(response, 'msg', 'data', '');
        const feedback = this.id + ' ' + body;
        this.throwExactlyMatchedException(this.exceptions['exact'], message, feedback);
        this.throwExactlyMatchedException(this.exceptions['exact'], errorCode, feedback);
        this.throwBroadlyMatchedException(this.exceptions['broad'], body, feedback);
        if (errorCode !== '200000' && errorCode !== '200') {
            throw new errors.ExchangeError(feedback);
        }
        return undefined;
    }
}

module.exports = kucoin;
