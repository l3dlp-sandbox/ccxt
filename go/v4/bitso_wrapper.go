package ccxt

type Bitso struct {
   *bitso
   Core *bitso
}

func NewBitso(userConfig map[string]interface{}) Bitso {
   p := &bitso{}
   p.Init(userConfig)
   return Bitso{
       bitso: p,
       Core:  p,
   }
}

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


/**
 * @method
 * @name bitso#fetchLedger
 * @description fetch the history of changes, actions done by the user or operations that altered the balance of the user
 * @param {string} [code] unified currency code, default is undefined
 * @param {int} [since] timestamp in ms of the earliest ledger entry, default is undefined
 * @param {int} [limit] max number of ledger entries to return, default is undefined
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [ledger structure]{@link https://docs.ccxt.com/#/?id=ledger}
 */
func (this *Bitso) FetchLedger(options ...FetchLedgerOptions) ([]LedgerEntry, error) {

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
 * @name bitso#fetchMarkets
 * @description retrieves data on all markets for bitso
 * @see https://docs.bitso.com/bitso-api/docs/list-available-books
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} an array of objects representing market data
 */
func (this *Bitso) FetchMarkets(params ...interface{}) ([]MarketInterface, error) {
    res := <- this.Core.FetchMarkets(params...)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewMarketInterfaceArray(res), nil
}
/**
 * @method
 * @name bitso#fetchBalance
 * @description query for balance and get the amount of funds available for trading or funds locked in orders
 * @see https://docs.bitso.com/bitso-api/docs/get-account-balance
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
 */
func (this *Bitso) FetchBalance(params ...interface{}) (Balances, error) {
    res := <- this.Core.FetchBalance(params...)
    if IsError(res) {
        return Balances{}, CreateReturnError(res)
    }
    return NewBalances(res), nil
}
/**
 * @method
 * @name bitso#fetchOrderBook
 * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
 * @see https://docs.bitso.com/bitso-api/docs/list-order-book
 * @param {string} symbol unified symbol of the market to fetch the order book for
 * @param {int} [limit] the maximum amount of order book entries to return
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
 */
func (this *Bitso) FetchOrderBook(symbol string, options ...FetchOrderBookOptions) (OrderBook, error) {

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
 * @name bitso#fetchTicker
 * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
 * @see https://docs.bitso.com/bitso-api/docs/ticker
 * @param {string} symbol unified symbol of the market to fetch the ticker for
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
 */
func (this *Bitso) FetchTicker(symbol string, options ...FetchTickerOptions) (Ticker, error) {

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
 * @name bitso#fetchOHLCV
 * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
 * @param {string} symbol unified symbol of the market to fetch OHLCV data for
 * @param {string} timeframe the length of time each candle represents
 * @param {int} [since] timestamp in ms of the earliest candle to fetch
 * @param {int} [limit] the maximum amount of candles to fetch
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
 */
func (this *Bitso) FetchOHLCV(symbol string, options ...FetchOHLCVOptions) ([]OHLCV, error) {

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
 * @name bitso#fetchTrades
 * @description get the list of most recent trades for a particular symbol
 * @see https://docs.bitso.com/bitso-api/docs/list-trades
 * @param {string} symbol unified symbol of the market to fetch trades for
 * @param {int} [since] timestamp in ms of the earliest trade to fetch
 * @param {int} [limit] the maximum amount of trades to fetch
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
 */
func (this *Bitso) FetchTrades(symbol string, options ...FetchTradesOptions) ([]Trade, error) {

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
 * @name bitso#fetchTradingFees
 * @description fetch the trading fees for multiple markets
 * @see https://docs.bitso.com/bitso-api/docs/list-fees
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a dictionary of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure} indexed by market symbols
 */
func (this *Bitso) FetchTradingFees(params ...interface{}) (TradingFees, error) {
    res := <- this.Core.FetchTradingFees(params...)
    if IsError(res) {
        return TradingFees{}, CreateReturnError(res)
    }
    return NewTradingFees(res), nil
}
/**
 * @method
 * @name bitso#fetchMyTrades
 * @description fetch all trades made by the user
 * @see https://docs.bitso.com/bitso-api/docs/user-trades
 * @param {string} symbol unified market symbol
 * @param {int} [since] the earliest time in ms to fetch trades for
 * @param {int} [limit] the maximum number of trades structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
 */
func (this *Bitso) FetchMyTrades(options ...FetchMyTradesOptions) ([]Trade, error) {

    opts := FetchMyTradesOptionsStruct{}

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
    res := <- this.Core.FetchMyTrades(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTradeArray(res), nil
}
/**
 * @method
 * @name bitso#createOrder
 * @description create a trade order
 * @see https://docs.bitso.com/bitso-api/docs/place-an-order
 * @param {string} symbol unified symbol of the market to create an order in
 * @param {string} type 'market' or 'limit'
 * @param {string} side 'buy' or 'sell'
 * @param {float} amount how much of currency you want to trade in units of base currency
 * @param {float} [price] the price at which the order is to be fulfilled, in units of the quote currency, ignored in market orders
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Bitso) CreateOrder(symbol string, typeVar string, side string, amount float64, options ...CreateOrderOptions) (Order, error) {

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
 * @name bitso#cancelOrder
 * @description cancels an open order
 * @see https://docs.bitso.com/bitso-api/docs/cancel-an-order
 * @param {string} id order id
 * @param {string} symbol not used by bitso cancelOrder ()
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Bitso) CancelOrder(id string, options ...CancelOrderOptions) (Order, error) {

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
 * @name bitso#cancelOrders
 * @description cancel multiple orders
 * @see https://docs.bitso.com/bitso-api/docs/cancel-an-order
 * @param {string[]} ids order ids
 * @param {string} symbol unified market symbol
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} an list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Bitso) CancelOrders(ids interface{}, options ...CancelOrdersOptions) ([]Order, error) {

    opts := CancelOrdersOptionsStruct{}

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
    res := <- this.Core.CancelOrders(ids, symbol, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name bitso#cancelAllOrders
 * @description cancel all open orders
 * @see https://docs.bitso.com/bitso-api/docs/cancel-an-order
 * @param {undefined} symbol bitso does not support canceling orders for only a specific market
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Bitso) CancelAllOrders(options ...CancelAllOrdersOptions) ([]Order, error) {

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
 * @name bitso#fetchOpenOrders
 * @description fetch all unfilled currently open orders
 * @see https://docs.bitso.com/bitso-api/docs/list-open-orders
 * @param {string} symbol unified market symbol
 * @param {int} [since] the earliest time in ms to fetch open orders for
 * @param {int} [limit] the maximum number of  open orders structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Bitso) FetchOpenOrders(options ...FetchOpenOrdersOptions) ([]Order, error) {

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
 * @name bitso#fetchOrder
 * @description fetches information on an order made by the user
 * @see https://docs.bitso.com/bitso-api/docs/look-up-orders
 * @param {string} id the order id
 * @param {string} symbol not used by bitso fetchOrder
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Bitso) FetchOrder(id string, options ...FetchOrderOptions) (Order, error) {

    opts := FetchOrderOptionsStruct{}

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
    res := <- this.Core.FetchOrder(id, symbol, params)
    if IsError(res) {
        return Order{}, CreateReturnError(res)
    }
    return NewOrder(res), nil
}
/**
 * @method
 * @name bitso#fetchOrderTrades
 * @description fetch all the trades made from a single order
 * @see https://docs.bitso.com/bitso-api/docs/list-user-trades
 * @param {string} id order id
 * @param {string} symbol unified market symbol
 * @param {int} [since] the earliest time in ms to fetch trades for
 * @param {int} [limit] the maximum number of trades to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
 */
func (this *Bitso) FetchOrderTrades(id string, options ...FetchOrderTradesOptions) ([]Trade, error) {

    opts := FetchOrderTradesOptionsStruct{}

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
    res := <- this.Core.FetchOrderTrades(id, symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTradeArray(res), nil
}
/**
 * @method
 * @name bitso#fetchDeposit
 * @description fetch information on a deposit
 * @see https://docs.bitso.com/bitso-payouts-funding/docs/fundings
 * @param {string} id deposit id
 * @param {string} code bitso does not support filtering by currency code and will ignore this argument
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
 */
func (this *Bitso) FetchDeposit(id string, options ...FetchDepositOptions) (Transaction, error) {

    opts := FetchDepositOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var code interface{} = nil
    if opts.Code != nil {
        code = *opts.Code
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchDeposit(id, code, params)
    if IsError(res) {
        return Transaction{}, CreateReturnError(res)
    }
    return NewTransaction(res), nil
}
/**
 * @method
 * @name bitso#fetchDeposits
 * @description fetch all deposits made to an account
 * @see https://docs.bitso.com/bitso-payouts-funding/docs/fundings
 * @param {string} code unified currency code
 * @param {int} [since] the earliest time in ms to fetch deposits for
 * @param {int} [limit] the maximum number of deposits structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
 */
func (this *Bitso) FetchDeposits(options ...FetchDepositsOptions) ([]Transaction, error) {

    opts := FetchDepositsOptionsStruct{}

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
    res := <- this.Core.FetchDeposits(code, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTransactionArray(res), nil
}
/**
 * @method
 * @name bitso#fetchDepositAddress
 * @description fetch the deposit address for a currency associated with this account
 * @param {string} code unified currency code
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} an [address structure]{@link https://docs.ccxt.com/#/?id=address-structure}
 */
func (this *Bitso) FetchDepositAddress(code string, options ...FetchDepositAddressOptions) (DepositAddress, error) {

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
/**
 * @method
 * @name bitso#fetchTransactionFees
 * @deprecated
 * @description please use fetchDepositWithdrawFees instead
 * @see https://docs.bitso.com/bitso-api/docs/list-fees
 * @param {string[]|undefined} codes list of unified currency codes
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure}
 */
func (this *Bitso) FetchTransactionFees(options ...FetchTransactionFeesOptions) (map[string]interface{}, error) {

    opts := FetchTransactionFeesOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var codes interface{} = nil
    if opts.Codes != nil {
        codes = *opts.Codes
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchTransactionFees(codes, params)
    if IsError(res) {
        return map[string]interface{}{}, CreateReturnError(res)
    }
    return res.(map[string]interface{}), nil
}
/**
 * @method
 * @name bitso#fetchDepositWithdrawFees
 * @description fetch deposit and withdraw fees
 * @see https://docs.bitso.com/bitso-api/docs/list-fees
 * @param {string[]|undefined} codes list of unified currency codes
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [fee structures]{@link https://docs.ccxt.com/#/?id=fee-structure}
 */
func (this *Bitso) FetchDepositWithdrawFees(options ...FetchDepositWithdrawFeesOptions) (map[string]interface{}, error) {

    opts := FetchDepositWithdrawFeesOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var codes interface{} = nil
    if opts.Codes != nil {
        codes = *opts.Codes
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchDepositWithdrawFees(codes, params)
    if IsError(res) {
        return map[string]interface{}{}, CreateReturnError(res)
    }
    return res.(map[string]interface{}), nil
}
/**
 * @method
 * @name bitso#withdraw
 * @description make a withdrawal
 * @param {string} code unified currency code
 * @param {float} amount the amount to withdraw
 * @param {string} address the address to withdraw to
 * @param {string} tag
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [transaction structure]{@link https://docs.ccxt.com/#/?id=transaction-structure}
 */
func (this *Bitso) Withdraw(code string, amount float64, address string, options ...WithdrawOptions) (Transaction, error) {

    opts := WithdrawOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var tag interface{} = nil
    if opts.Tag != nil {
        tag = *opts.Tag
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.Withdraw(code, amount, address, tag, params)
    if IsError(res) {
        return Transaction{}, CreateReturnError(res)
    }
    return NewTransaction(res), nil
}