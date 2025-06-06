package ccxt

type Cex struct {
   *cex
   Core *cex
}

func NewCex(userConfig map[string]interface{}) Cex {
   p := &cex{}
   p.Init(userConfig)
   return Cex{
       cex: p,
       Core:  p,
   }
}

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


/**
 * @method
 * @name cex#fetchCurrencies
 * @description fetches all available currencies on an exchange
 * @see https://trade.cex.io/docs/#rest-public-api-calls-currencies-info
 * @param {dict} [params] extra parameters specific to the exchange API endpoint
 * @returns {dict} an associative dictionary of currencies
 */
func (this *Cex) FetchCurrencies(params ...interface{}) (Currencies, error) {
    res := <- this.Core.FetchCurrencies(params...)
    if IsError(res) {
        return Currencies{}, CreateReturnError(res)
    }
    return NewCurrencies(res), nil
}
/**
 * @method
 * @name cex#fetchMarkets
 * @description retrieves data on all markets for ace
 * @see https://trade.cex.io/docs/#rest-public-api-calls-pairs-info
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} an array of objects representing market data
 */
func (this *Cex) FetchMarkets(params ...interface{}) ([]MarketInterface, error) {
    res := <- this.Core.FetchMarkets(params...)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewMarketInterfaceArray(res), nil
}
/**
 * @method
 * @name cex#fetchTime
 * @description fetches the current integer timestamp in milliseconds from the exchange server
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {int} the current integer timestamp in milliseconds from the exchange server
 */
func (this *Cex) FetchTime(params ...interface{}) ( int64, error) {
    res := <- this.Core.FetchTime(params...)
    if IsError(res) {
        return -1, CreateReturnError(res)
    }
    return (res).(int64), nil
}
/**
 * @method
 * @name cex#fetchTicker
 * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
 * @see https://trade.cex.io/docs/#rest-public-api-calls-ticker
 * @param {string} symbol
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
 */
func (this *Cex) FetchTicker(symbol string, options ...FetchTickerOptions) (Ticker, error) {

    opts := FetchTickerOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchTicker(symbol, params)
    if IsError(res) {
        return Ticker{}, CreateReturnError(res)
    }
    return NewTicker(res), nil
}
/**
 * @method
 * @name cex#fetchTickers
 * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
 * @see https://trade.cex.io/docs/#rest-public-api-calls-ticker
 * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
 */
func (this *Cex) FetchTickers(options ...FetchTickersOptions) (Tickers, error) {

    opts := FetchTickersOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbols interface{} = nil
    if opts.Symbols != nil {
        symbols = *opts.Symbols
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchTickers(symbols, params)
    if IsError(res) {
        return Tickers{}, CreateReturnError(res)
    }
    return NewTickers(res), nil
}
/**
 * @method
 * @name cex#fetchTrades
 * @description get the list of most recent trades for a particular symbol
 * @see https://trade.cex.io/docs/#rest-public-api-calls-trade-history
 * @param {string} symbol unified symbol of the market to fetch trades for
 * @param {int} [since] timestamp in ms of the earliest trade to fetch
 * @param {int} [limit] the maximum amount of trades to fetch
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {int} [params.until] timestamp in ms of the latest entry
 * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
 */
func (this *Cex) FetchTrades(symbol string, options ...FetchTradesOptions) ([]Trade, error) {

    opts := FetchTradesOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchTrades(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTradeArray(res), nil
}
/**
 * @method
 * @name cex#fetchOrderBook
 * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
 * @see https://trade.cex.io/docs/#rest-public-api-calls-order-book
 * @param {string} symbol unified symbol of the market to fetch the order book for
 * @param {int} [limit] the maximum amount of order book entries to return
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
 */
func (this *Cex) FetchOrderBook(symbol string, options ...FetchOrderBookOptions) (OrderBook, error) {

    opts := FetchOrderBookOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOrderBook(symbol, limit, params)
    if IsError(res) {
        return OrderBook{}, CreateReturnError(res)
    }
    return NewOrderBook(res), nil
}
/**
 * @method
 * @name cex#fetchOHLCV
 * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
 * @see https://trade.cex.io/docs/#rest-public-api-calls-candles
 * @param {string} symbol unified symbol of the market to fetch OHLCV data for
 * @param {string} timeframe the length of time each candle represents
 * @param {int} [since] timestamp in ms of the earliest candle to fetch
 * @param {int} [limit] the maximum amount of candles to fetch
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {int} [params.until] timestamp in ms of the latest entry
 * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
 */
func (this *Cex) FetchOHLCV(symbol string, options ...FetchOHLCVOptions) ([]OHLCV, error) {

    opts := FetchOHLCVOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var timeframe interface{} = nil
    if opts.Timeframe != nil {
        timeframe = *opts.Timeframe
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOHLCV(symbol, timeframe, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOHLCVArray(res), nil
}
/**
 * @method
 * @name cex#fetchTradingFees
 * @description fetch the trading fees for multiple markets
 * @see https://trade.cex.io/docs/#rest-public-api-calls-candles
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a dictionary of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure} indexed by market symbols
 */
func (this *Cex) FetchTradingFees(params ...interface{}) (TradingFees, error) {
    res := <- this.Core.FetchTradingFees(params...)
    if IsError(res) {
        return TradingFees{}, CreateReturnError(res)
    }
    return NewTradingFees(res), nil
}
func (this *Cex) FetchAccounts(params ...interface{}) ([]Account, error) {
    res := <- this.Core.FetchAccounts(params...)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewAccountArray(res), nil
}
/**
 * @method
 * @name cex#fetchBalance
 * @description query for balance and get the amount of funds available for trading or funds locked in orders
 * @see https://trade.cex.io/docs/#rest-private-api-calls-account-status-v3
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {object} [params.method] 'privatePostGetMyWalletBalance' or 'privatePostGetMyAccountStatusV3'
 * @param {object} [params.account]  in case 'privatePostGetMyAccountStatusV3' is chosen, this can specify the account name (default is empty string)
 * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
 */
func (this *Cex) FetchBalance(params ...interface{}) (Balances, error) {
    res := <- this.Core.FetchBalance(params...)
    if IsError(res) {
        return Balances{}, CreateReturnError(res)
    }
    return NewBalances(res), nil
}
func (this *Cex) FetchOrdersByStatus(status string, options ...FetchOrdersByStatusOptions) ([]Order, error) {

    opts := FetchOrdersByStatusOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOrdersByStatus(status, symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name cex#fetchClosedOrders
 * @see https://trade.cex.io/docs/#rest-private-api-calls-orders
 * @description fetches information on multiple canceled orders made by the user
 * @param {string} symbol unified market symbol of the market orders were made in
 * @param {int} [since] timestamp in ms of the earliest order, default is undefined
 * @param {int} [limit] max number of orders to return, default is undefined
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Cex) FetchClosedOrders(options ...FetchClosedOrdersOptions) ([]Order, error) {

    opts := FetchClosedOrdersOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchClosedOrders(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name cex#fetchOpenOrders
 * @see https://trade.cex.io/docs/#rest-private-api-calls-orders
 * @description fetches information on multiple canceled orders made by the user
 * @param {string} symbol unified market symbol of the market orders were made in
 * @param {int} [since] timestamp in ms of the earliest order, default is undefined
 * @param {int} [limit] max number of orders to return, default is undefined
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Cex) FetchOpenOrders(options ...FetchOpenOrdersOptions) ([]Order, error) {

    opts := FetchOpenOrdersOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOpenOrders(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name cex#fetchOpenOrder
 * @description fetches information on an open order made by the user
 * @see https://trade.cex.io/docs/#rest-private-api-calls-orders
 * @param {string} id order id
 * @param {string} [symbol] unified symbol of the market the order was made in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Cex) FetchOpenOrder(id string, options ...FetchOpenOrderOptions) (Order, error) {

    opts := FetchOpenOrderOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOpenOrder(id, symbol, params)
    if IsError(res) {
        return Order{}, CreateReturnError(res)
    }
    return NewOrder(res), nil
}
/**
 * @method
 * @name cex#fetchClosedOrder
 * @description fetches information on an closed order made by the user
 * @see https://trade.cex.io/docs/#rest-private-api-calls-orders
 * @param {string} id order id
 * @param {string} [symbol] unified symbol of the market the order was made in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Cex) FetchClosedOrder(id string, options ...FetchClosedOrderOptions) (Order, error) {

    opts := FetchClosedOrderOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchClosedOrder(id, symbol, params)
    if IsError(res) {
        return Order{}, CreateReturnError(res)
    }
    return NewOrder(res), nil
}
/**
 * @method
 * @name cex#createOrder
 * @description create a trade order
 * @see https://trade.cex.io/docs/#rest-private-api-calls-new-order
 * @param {string} symbol unified symbol of the market to create an order in
 * @param {string} type 'market' or 'limit'
 * @param {string} side 'buy' or 'sell'
 * @param {float} amount how much of currency you want to trade in units of base currency
 * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {string} [params.accountId] account-id to use (default is empty string)
 * @param {float} [params.triggerPrice] the price at which a trigger order is triggered at
 * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Cex) CreateOrder(symbol string, typeVar string, side string, amount float64, options ...CreateOrderOptions) (Order, error) {

    opts := CreateOrderOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var price interface{} = nil
    if opts.Price != nil {
        price = *opts.Price
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.CreateOrder(symbol, typeVar, side, amount, price, params)
    if IsError(res) {
        return Order{}, CreateReturnError(res)
    }
    return NewOrder(res), nil
}
/**
 * @method
 * @name cex#cancelOrder
 * @description cancels an open order
 * @see https://trade.cex.io/docs/#rest-private-api-calls-cancel-order
 * @param {string} id order id
 * @param {string} symbol unified symbol of the market the order was made in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Cex) CancelOrder(id string, options ...CancelOrderOptions) (Order, error) {

    opts := CancelOrderOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.CancelOrder(id, symbol, params)
    if IsError(res) {
        return Order{}, CreateReturnError(res)
    }
    return NewOrder(res), nil
}
/**
 * @method
 * @name cex#cancelAllOrders
 * @description cancel all open orders in a market
 * @see https://trade.cex.io/docs/#rest-private-api-calls-cancel-all-orders
 * @param {string} symbol alpaca cancelAllOrders cannot setting symbol, it will cancel all open orders
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Cex) CancelAllOrders(options ...CancelAllOrdersOptions) ([]Order, error) {

    opts := CancelAllOrdersOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var symbol interface{} = nil
    if opts.Symbol != nil {
        symbol = *opts.Symbol
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.CancelAllOrders(symbol, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name cex#fetchLedger
 * @description fetch the history of changes, actions done by the user or operations that altered the balance of the user
 * @see https://trade.cex.io/docs/#rest-private-api-calls-transaction-history
 * @param {string} [code] unified currency code
 * @param {int} [since] timestamp in ms of the earliest ledger entry
 * @param {int} [limit] max number of ledger entries to return
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {int} [params.until] timestamp in ms of the latest ledger entry
 * @returns {object} a [ledger structure]{@link https://docs.ccxt.com/#/?id=ledger}
 */
func (this *Cex) FetchLedger(options ...FetchLedgerOptions) ([]LedgerEntry, error) {

    opts := FetchLedgerOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var code interface{} = nil
    if opts.Code != nil {
        code = *opts.Code
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchLedger(code, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewLedgerEntryArray(res), nil
}
/**
 * @method
 * @name cex#fetchDepositsWithdrawals
 * @description fetch history of deposits and withdrawals
 * @see https://trade.cex.io/docs/#rest-private-api-calls-funding-history
 * @param {string} [code] unified currency code for the currency of the deposit/withdrawals, default is undefined
 * @param {int} [since] timestamp in ms of the earliest deposit/withdrawal, default is undefined
 * @param {int} [limit] max number of deposit/withdrawals to return, default is undefined
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a list of [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
 */
func (this *Cex) FetchDepositsWithdrawals(options ...FetchDepositsWithdrawalsOptions) ([]Transaction, error) {

    opts := FetchDepositsWithdrawalsOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var code interface{} = nil
    if opts.Code != nil {
        code = *opts.Code
    }

    var since interface{} = nil
    if opts.Since != nil {
        since = *opts.Since
    }

    var limit interface{} = nil
    if opts.Limit != nil {
        limit = *opts.Limit
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchDepositsWithdrawals(code, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTransactionArray(res), nil
}
/**
 * @method
 * @name cex#transfer
 * @description transfer currency internally between wallets on the same account
 * @see https://trade.cex.io/docs/#rest-private-api-calls-internal-transfer
 * @param {string} code unified currency code
 * @param {float} amount amount to transfer
 * @param {string} fromAccount 'SPOT', 'FUND', or 'CONTRACT'
 * @param {string} toAccount 'SPOT', 'FUND', or 'CONTRACT'
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [transfer structure]{@link https://docs.ccxt.com/#/?id=transfer-structure}
 */
func (this *Cex) Transfer(code string, amount float64, fromAccount string, toAccount string, options ...TransferOptions) (TransferEntry, error) {

    opts := TransferOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.Transfer(code, amount, fromAccount, toAccount, params)
    if IsError(res) {
        return TransferEntry{}, CreateReturnError(res)
    }
    return NewTransferEntry(res), nil
}
func (this *Cex) TransferBetweenMainAndSubAccount(code string, amount float64, fromAccount string, toAccount string, options ...TransferBetweenMainAndSubAccountOptions) (TransferEntry, error) {

    opts := TransferBetweenMainAndSubAccountOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.TransferBetweenMainAndSubAccount(code, amount, fromAccount, toAccount, params)
    if IsError(res) {
        return TransferEntry{}, CreateReturnError(res)
    }
    return NewTransferEntry(res), nil
}
func (this *Cex) TransferBetweenSubAccounts(code string, amount float64, fromAccount string, toAccount string, options ...TransferBetweenSubAccountsOptions) (TransferEntry, error) {

    opts := TransferBetweenSubAccountsOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.TransferBetweenSubAccounts(code, amount, fromAccount, toAccount, params)
    if IsError(res) {
        return TransferEntry{}, CreateReturnError(res)
    }
    return NewTransferEntry(res), nil
}
/**
 * @method
 * @name cex#fetchDepositAddress
 * @description fetch the deposit address for a currency associated with this account
 * @see https://trade.cex.io/docs/#rest-private-api-calls-deposit-address
 * @param {string} code unified currency code
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {string} [params.accountId] account-id (default to empty string) to refer to (at this moment, only sub-accounts allowed by exchange)
 * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
 */
func (this *Cex) FetchDepositAddress(code string, options ...FetchDepositAddressOptions) (DepositAddress, error) {

    opts := FetchDepositAddressOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchDepositAddress(code, params)
    if IsError(res) {
        return DepositAddress{}, CreateReturnError(res)
    }
    return NewDepositAddress(res), nil
}