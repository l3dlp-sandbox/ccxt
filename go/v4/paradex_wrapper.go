package ccxt

type Paradex struct {
   *paradex
   Core *paradex
}

func NewParadex(userConfig map[string]interface{}) Paradex {
   p := &paradex{}
   p.Init(userConfig)
   return Paradex{
       paradex: p,
       Core:  p,
   }
}

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


/**
 * @method
 * @name paradex#fetchTime
 * @description fetches the current integer timestamp in milliseconds from the exchange server
 * @see https://docs.api.testnet.paradex.trade/#get-system-time-unix-milliseconds
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {int} the current integer timestamp in milliseconds from the exchange server
 */
func (this *Paradex) FetchTime(params ...interface{}) ( int64, error) {
    res := <- this.Core.FetchTime(params...)
    if IsError(res) {
        return -1, CreateReturnError(res)
    }
    return (res).(int64), nil
}
/**
 * @method
 * @name paradex#fetchStatus
 * @description the latest known information on the availability of the exchange API
 * @see https://docs.api.testnet.paradex.trade/#get-system-state
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [status structure]{@link https://docs.ccxt.com/#/?id=exchange-status-structure}
 */
func (this *Paradex) FetchStatus(params ...interface{}) (map[string]interface{}, error) {
    res := <- this.Core.FetchStatus(params...)
    if IsError(res) {
        return map[string]interface{}{}, CreateReturnError(res)
    }
    return res.(map[string]interface{}), nil
}
/**
 * @method
 * @name paradex#fetchMarkets
 * @description retrieves data on all markets for bitget
 * @see https://docs.api.testnet.paradex.trade/#list-available-markets
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} an array of objects representing market data
 */
func (this *Paradex) FetchMarkets(params ...interface{}) ([]MarketInterface, error) {
    res := <- this.Core.FetchMarkets(params...)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewMarketInterfaceArray(res), nil
}
/**
 * @method
 * @name paradex#fetchOHLCV
 * @description fetches historical candlestick data containing the open, high, low, and close price, and the volume of a market
 * @see https://docs.api.testnet.paradex.trade/#ohlcv-for-a-symbol
 * @param {string} symbol unified symbol of the market to fetch OHLCV data for
 * @param {string} timeframe the length of time each candle represents
 * @param {int} [since] timestamp in ms of the earliest candle to fetch
 * @param {int} [limit] the maximum amount of candles to fetch
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {int} [params.until] timestamp in ms of the latest candle to fetch
 * @returns {int[][]} A list of candles ordered as timestamp, open, high, low, close, volume
 */
func (this *Paradex) FetchOHLCV(symbol string, options ...FetchOHLCVOptions) ([]OHLCV, error) {

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
 * @name paradex#fetchTickers
 * @description fetches price tickers for multiple markets, statistical information calculated over the past 24 hours for each market
 * @see https://docs.api.testnet.paradex.trade/#list-available-markets-summary
 * @param {string[]|undefined} symbols unified symbols of the markets to fetch the ticker for, all market tickers are returned if not assigned
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a dictionary of [ticker structures]{@link https://docs.ccxt.com/#/?id=ticker-structure}
 */
func (this *Paradex) FetchTickers(options ...FetchTickersOptions) (Tickers, error) {

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
 * @name paradex#fetchTicker
 * @description fetches a price ticker, a statistical calculation with the information calculated over the past 24 hours for a specific market
 * @see https://docs.api.testnet.paradex.trade/#list-available-markets-summary
 * @param {string} symbol unified symbol of the market to fetch the ticker for
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [ticker structure]{@link https://docs.ccxt.com/#/?id=ticker-structure}
 */
func (this *Paradex) FetchTicker(symbol string, options ...FetchTickerOptions) (Ticker, error) {

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
 * @name paradex#fetchOrderBook
 * @description fetches information on open orders with bid (buy) and ask (sell) prices, volumes and other data
 * @see https://docs.api.testnet.paradex.trade/#get-market-orderbook
 * @param {string} symbol unified symbol of the market to fetch the order book for
 * @param {int} [limit] the maximum amount of order book entries to return
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} A dictionary of [order book structures]{@link https://docs.ccxt.com/#/?id=order-book-structure} indexed by market symbols
 */
func (this *Paradex) FetchOrderBook(symbol string, options ...FetchOrderBookOptions) (OrderBook, error) {

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
 * @name paradex#fetchTrades
 * @description get the list of most recent trades for a particular symbol
 * @see https://docs.api.testnet.paradex.trade/#trade-tape
 * @param {string} symbol unified symbol of the market to fetch trades for
 * @param {int} [since] timestamp in ms of the earliest trade to fetch
 * @param {int} [limit] the maximum amount of trades to fetch
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {int} [params.until] the latest time in ms to fetch trades for
 * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times
 * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=public-trades}
 */
func (this *Paradex) FetchTrades(symbol string, options ...FetchTradesOptions) ([]Trade, error) {

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
 * @name paradex#fetchOpenInterest
 * @description retrieves the open interest of a contract trading pair
 * @see https://docs.api.testnet.paradex.trade/#list-available-markets-summary
 * @param {string} symbol unified CCXT market symbol
 * @param {object} [params] exchange specific parameters
 * @returns {object} an open interest structure{@link https://docs.ccxt.com/#/?id=open-interest-structure}
 */
func (this *Paradex) FetchOpenInterest(symbol string, options ...FetchOpenInterestOptions) (OpenInterest, error) {

    opts := FetchOpenInterestOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchOpenInterest(symbol, params)
    if IsError(res) {
        return OpenInterest{}, CreateReturnError(res)
    }
    return NewOpenInterest(res), nil
}
/**
 * @method
 * @name paradex#createOrder
 * @description create a trade order
 * @see https://docs.api.prod.paradex.trade/#create-order
 * @param {string} symbol unified symbol of the market to create an order in
 * @param {string} type 'market' or 'limit'
 * @param {string} side 'buy' or 'sell'
 * @param {float} amount how much of currency you want to trade in units of base currency
 * @param {float} [price] the price at which the order is to be fullfilled, in units of the quote currency, ignored in market orders
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {float} [params.stopPrice] alias for triggerPrice
 * @param {float} [params.triggerPrice] The price a trigger order is triggered at
 * @param {float} [params.stopLossPrice] the price that a stop loss order is triggered at
 * @param {float} [params.takeProfitPrice] the price that a take profit order is triggered at
 * @param {string} [params.timeInForce] "GTC", "IOC", or "POST_ONLY"
 * @param {bool} [params.postOnly] true or false
 * @param {bool} [params.reduceOnly] Ensures that the executed order does not flip the opened position.
 * @param {string} [params.clientOrderId] a unique id for the order
 * @returns {object} an [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Paradex) CreateOrder(symbol string, typeVar string, side string, amount float64, options ...CreateOrderOptions) (Order, error) {

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
 * @name paradex#cancelOrder
 * @description cancels an open order
 * @see https://docs.api.prod.paradex.trade/#cancel-order
 * @see https://docs.api.prod.paradex.trade/#cancel-open-order-by-client-order-id
 * @param {string} id order id
 * @param {string} symbol unified symbol of the market the order was made in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {string} [params.clientOrderId] a unique id for the order
 * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Paradex) CancelOrder(id string, options ...CancelOrderOptions) (Order, error) {

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
 * @name paradex#cancelAllOrders
 * @description cancel all open orders in a market
 * @see https://docs.api.prod.paradex.trade/#cancel-all-open-orders
 * @param {string} symbol unified market symbol of the market to cancel orders in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Paradex) CancelAllOrders(options ...CancelAllOrdersOptions) (map[string]interface{}, error) {

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
        return map[string]interface{}{}, CreateReturnError(res)
    }
    return res.(map[string]interface{}), nil
}
/**
 * @method
 * @name paradex#fetchOrder
 * @description fetches information on an order made by the user
 * @see https://docs.api.prod.paradex.trade/#get-order
 * @see https://docs.api.prod.paradex.trade/#get-order-by-client-id
 * @param {string} id the order id
 * @param {string} symbol unified symbol of the market the order was made in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {string} [params.clientOrderId] a unique id for the order
 * @returns {object} An [order structure]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Paradex) FetchOrder(id string, options ...FetchOrderOptions) (Order, error) {

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
 * @name paradex#fetchOrders
 * @description fetches information on multiple orders made by the user
 * @see https://docs.api.prod.paradex.trade/#get-orders
 * @param {string} symbol unified market symbol of the market orders were made in
 * @param {int} [since] the earliest time in ms to fetch orders for
 * @param {int} [limit] the maximum number of order structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {string} [params.side] 'buy' or 'sell'
 * @param {boolean} [params.paginate] set to true if you want to fetch orders with pagination
 * @param {int} params.until timestamp in ms of the latest order to fetch
 * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Paradex) FetchOrders(options ...FetchOrdersOptions) ([]Order, error) {

    opts := FetchOrdersOptionsStruct{}

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
    res := <- this.Core.FetchOrders(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewOrderArray(res), nil
}
/**
 * @method
 * @name paradex#fetchOpenOrders
 * @description fetches information on multiple orders made by the user
 * @see https://docs.api.prod.paradex.trade/#paradex-rest-api-orders
 * @param {string} symbol unified market symbol of the market orders were made in
 * @param {int} [since] the earliest time in ms to fetch orders for
 * @param {int} [limit] the maximum number of order structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {Order[]} a list of [order structures]{@link https://docs.ccxt.com/#/?id=order-structure}
 */
func (this *Paradex) FetchOpenOrders(options ...FetchOpenOrdersOptions) ([]Order, error) {

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
 * @name paradex#fetchBalance
 * @description query for balance and get the amount of funds available for trading or funds locked in orders
 * @see https://docs.api.prod.paradex.trade/#list-balances
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [balance structure]{@link https://docs.ccxt.com/#/?id=balance-structure}
 */
func (this *Paradex) FetchBalance(params ...interface{}) (Balances, error) {
    res := <- this.Core.FetchBalance(params...)
    if IsError(res) {
        return Balances{}, CreateReturnError(res)
    }
    return NewBalances(res), nil
}
/**
 * @method
 * @name paradex#fetchMyTrades
 * @description fetch all trades made by the user
 * @see https://docs.api.prod.paradex.trade/#list-fills
 * @param {string} symbol unified market symbol
 * @param {int} [since] the earliest time in ms to fetch trades for
 * @param {int} [limit] the maximum number of trades structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [available parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
 * @param {int} [params.until] the latest time in ms to fetch entries for
 * @returns {Trade[]} a list of [trade structures]{@link https://docs.ccxt.com/#/?id=trade-structure}
 */
func (this *Paradex) FetchMyTrades(options ...FetchMyTradesOptions) ([]Trade, error) {

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
 * @name paradex#fetchPosition
 * @description fetch data on an open position
 * @see https://docs.api.prod.paradex.trade/#list-open-positions
 * @param {string} symbol unified market symbol of the market the position is held in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
 */
func (this *Paradex) FetchPosition(symbol string, options ...FetchPositionOptions) (Position, error) {

    opts := FetchPositionOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchPosition(symbol, params)
    if IsError(res) {
        return Position{}, CreateReturnError(res)
    }
    return NewPosition(res), nil
}
/**
 * @method
 * @name paradex#fetchPositions
 * @description fetch all open positions
 * @see https://docs.api.prod.paradex.trade/#list-open-positions
 * @param {string[]} [symbols] list of unified market symbols
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object[]} a list of [position structure]{@link https://docs.ccxt.com/#/?id=position-structure}
 */
func (this *Paradex) FetchPositions(options ...FetchPositionsOptions) ([]Position, error) {

    opts := FetchPositionsOptionsStruct{}

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
    res := <- this.Core.FetchPositions(symbols, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewPositionArray(res), nil
}
/**
 * @method
 * @name paradex#fetchLiquidations
 * @description retrieves the public liquidations of a trading pair
 * @see https://docs.api.prod.paradex.trade/#list-liquidations
 * @param {string} symbol unified CCXT market symbol
 * @param {int} [since] the earliest time in ms to fetch liquidations for
 * @param {int} [limit] the maximum number of liquidation structures to retrieve
 * @param {object} [params] exchange specific parameters for the huobi api endpoint
 * @param {int} [params.until] timestamp in ms of the latest liquidation
 * @returns {object} an array of [liquidation structures]{@link https://docs.ccxt.com/#/?id=liquidation-structure}
 */
func (this *Paradex) FetchLiquidations(symbol string, options ...FetchLiquidationsOptions) ([]Liquidation, error) {

    opts := FetchLiquidationsOptionsStruct{}

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
    res := <- this.Core.FetchLiquidations(symbol, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewLiquidationArray(res), nil
}
func (this *Paradex) FetchDeposits(options ...FetchDepositsOptions) ([]Transaction, error) {

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
 * @name paradex#fetchWithdrawals
 * @description fetch all withdrawals made from an account
 * @see https://docs.api.prod.paradex.trade/#paradex-rest-api-transfers
 * @param {string} code unified currency code
 * @param {int} [since] the earliest time in ms to fetch withdrawals for
 * @param {int} [limit] the maximum number of withdrawals structures to retrieve
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {int} [params.until] the latest time in ms to fetch withdrawals for
 * @param {boolean} [params.paginate] default false, when true will automatically paginate by calling this endpoint multiple times. See in the docs all the [availble parameters](https://github.com/ccxt/ccxt/wiki/Manual#pagination-params)
 * @returns {object[]} a list of [transaction structures]{@link https://docs.ccxt.com/#/?id=transaction-structure}
 */
func (this *Paradex) FetchWithdrawals(options ...FetchWithdrawalsOptions) ([]Transaction, error) {

    opts := FetchWithdrawalsOptionsStruct{}

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
    res := <- this.Core.FetchWithdrawals(code, since, limit, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewTransactionArray(res), nil
}
/**
 * @method
 * @name paradex#fetchMarginMode
 * @description fetches the margin mode of a specific symbol
 * @see https://docs.api.testnet.paradex.trade/#get-account-margin-configuration
 * @param {string} symbol unified symbol of the market the order was made in
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [margin mode structure]{@link https://docs.ccxt.com/#/?id=margin-mode-structure}
 */
func (this *Paradex) FetchMarginMode(symbol string, options ...FetchMarginModeOptions) (MarginMode, error) {

    opts := FetchMarginModeOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchMarginMode(symbol, params)
    if IsError(res) {
        return MarginMode{}, CreateReturnError(res)
    }
    return NewMarginMode(res), nil
}
/**
 * @method
 * @name paradex#setMarginMode
 * @description set margin mode to 'cross' or 'isolated'
 * @see https://docs.api.testnet.paradex.trade/#set-margin-configuration
 * @param {string} marginMode 'cross' or 'isolated'
 * @param {string} symbol unified market symbol
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {float} [params.leverage] the rate of leverage
 * @returns {object} response from the exchange
 */
func (this *Paradex) SetMarginMode(marginMode string, options ...SetMarginModeOptions) (map[string]interface{}, error) {

    opts := SetMarginModeOptionsStruct{}

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
    res := <- this.Core.SetMarginMode(marginMode, symbol, params)
    if IsError(res) {
        return map[string]interface{}{}, CreateReturnError(res)
    }
    return res.(map[string]interface{}), nil
}
/**
 * @method
 * @name paradex#fetchLeverage
 * @description fetch the set leverage for a market
 * @see https://docs.api.testnet.paradex.trade/#get-account-margin-configuration
 * @param {string} symbol unified market symbol
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [leverage structure]{@link https://docs.ccxt.com/#/?id=leverage-structure}
 */
func (this *Paradex) FetchLeverage(symbol string, options ...FetchLeverageOptions) (Leverage, error) {

    opts := FetchLeverageOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchLeverage(symbol, params)
    if IsError(res) {
        return Leverage{}, CreateReturnError(res)
    }
    return NewLeverage(res), nil
}
/**
 * @method
 * @name paradex#setLeverage
 * @description set the level of leverage for a market
 * @see https://docs.api.testnet.paradex.trade/#set-margin-configuration
 * @param {float} leverage the rate of leverage
 * @param {string} [symbol] unified market symbol (is mandatory for swap markets)
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @param {string} [params.marginMode] 'cross' or 'isolated'
 * @returns {object} response from the exchange
 */
func (this *Paradex) SetLeverage(leverage int64, options ...SetLeverageOptions) (map[string]interface{}, error) {

    opts := SetLeverageOptionsStruct{}

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
    res := <- this.Core.SetLeverage(leverage, symbol, params)
    if IsError(res) {
        return map[string]interface{}{}, CreateReturnError(res)
    }
    return res.(map[string]interface{}), nil
}
/**
 * @method
 * @name paradex#fetchGreeks
 * @description fetches an option contracts greeks, financial metrics used to measure the factors that affect the price of an options contract
 * @see https://docs.api.testnet.paradex.trade/#list-available-markets-summary
 * @param {string} symbol unified symbol of the market to fetch greeks for
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [greeks structure]{@link https://docs.ccxt.com/#/?id=greeks-structure}
 */
func (this *Paradex) FetchGreeks(symbol string, options ...FetchGreeksOptions) (Greeks, error) {

    opts := FetchGreeksOptionsStruct{}

    for _, opt := range options {
        opt(&opts)
    }

    var params interface{} = nil
    if opts.Params != nil {
        params = *opts.Params
    }
    res := <- this.Core.FetchGreeks(symbol, params)
    if IsError(res) {
        return Greeks{}, CreateReturnError(res)
    }
    return NewGreeks(res), nil
}
/**
 * @method
 * @name paradex#fetchAllGreeks
 * @description fetches all option contracts greeks, financial metrics used to measure the factors that affect the price of an options contract
 * @see https://docs.api.testnet.paradex.trade/#list-available-markets-summary
 * @param {string[]} [symbols] unified symbols of the markets to fetch greeks for, all markets are returned if not assigned
 * @param {object} [params] extra parameters specific to the exchange API endpoint
 * @returns {object} a [greeks structure]{@link https://docs.ccxt.com/#/?id=greeks-structure}
 */
func (this *Paradex) FetchAllGreeks(options ...FetchAllGreeksOptions) ([]Greeks, error) {

    opts := FetchAllGreeksOptionsStruct{}

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
    res := <- this.Core.FetchAllGreeks(symbols, params)
    if IsError(res) {
        return nil, CreateReturnError(res)
    }
    return NewGreeksArray(res), nil
}