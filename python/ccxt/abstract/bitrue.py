from ccxt.base.types import Entry


class ImplicitAPI:
    spot_kline_public_get_public_json = spotKlinePublicGetPublicJson = Entry('public.json', ['spot', 'kline', 'public'], 'GET', {'cost': 0.24})
    spot_kline_public_get_public_currency_json = spotKlinePublicGetPublicCurrencyJson = Entry('public{currency}.json', ['spot', 'kline', 'public'], 'GET', {'cost': 0.24})
    spot_v1_public_get_ping = spotV1PublicGetPing = Entry('ping', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24})
    spot_v1_public_get_time = spotV1PublicGetTime = Entry('time', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24})
    spot_v1_public_get_exchangeinfo = spotV1PublicGetExchangeInfo = Entry('exchangeInfo', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24})
    spot_v1_public_get_depth = spotV1PublicGetDepth = Entry('depth', ['spot', 'v1', 'public'], 'GET', {'cost': 1, 'byLimit': [[100, 0.24], [500, 1.2], [1000, 2.4]]})
    spot_v1_public_get_trades = spotV1PublicGetTrades = Entry('trades', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24})
    spot_v1_public_get_historicaltrades = spotV1PublicGetHistoricalTrades = Entry('historicalTrades', ['spot', 'v1', 'public'], 'GET', {'cost': 1.2})
    spot_v1_public_get_aggtrades = spotV1PublicGetAggTrades = Entry('aggTrades', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24})
    spot_v1_public_get_ticker_24hr = spotV1PublicGetTicker24hr = Entry('ticker/24hr', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24, 'noSymbol': 9.6})
    spot_v1_public_get_ticker_price = spotV1PublicGetTickerPrice = Entry('ticker/price', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24})
    spot_v1_public_get_ticker_bookticker = spotV1PublicGetTickerBookTicker = Entry('ticker/bookTicker', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24})
    spot_v1_public_get_market_kline = spotV1PublicGetMarketKline = Entry('market/kline', ['spot', 'v1', 'public'], 'GET', {'cost': 0.24})
    spot_v1_private_get_order = spotV1PrivateGetOrder = Entry('order', ['spot', 'v1', 'private'], 'GET', {'cost': 5})
    spot_v1_private_get_openorders = spotV1PrivateGetOpenOrders = Entry('openOrders', ['spot', 'v1', 'private'], 'GET', {'cost': 5})
    spot_v1_private_get_allorders = spotV1PrivateGetAllOrders = Entry('allOrders', ['spot', 'v1', 'private'], 'GET', {'cost': 25})
    spot_v1_private_get_account = spotV1PrivateGetAccount = Entry('account', ['spot', 'v1', 'private'], 'GET', {'cost': 25})
    spot_v1_private_get_mytrades = spotV1PrivateGetMyTrades = Entry('myTrades', ['spot', 'v1', 'private'], 'GET', {'cost': 25})
    spot_v1_private_get_etf_net_value_symbol = spotV1PrivateGetEtfNetValueSymbol = Entry('etf/net-value/{symbol}', ['spot', 'v1', 'private'], 'GET', {'cost': 0.24})
    spot_v1_private_get_withdraw_history = spotV1PrivateGetWithdrawHistory = Entry('withdraw/history', ['spot', 'v1', 'private'], 'GET', {'cost': 120})
    spot_v1_private_get_deposit_history = spotV1PrivateGetDepositHistory = Entry('deposit/history', ['spot', 'v1', 'private'], 'GET', {'cost': 120})
    spot_v1_private_post_order = spotV1PrivatePostOrder = Entry('order', ['spot', 'v1', 'private'], 'POST', {'cost': 5})
    spot_v1_private_post_withdraw_commit = spotV1PrivatePostWithdrawCommit = Entry('withdraw/commit', ['spot', 'v1', 'private'], 'POST', {'cost': 120})
    spot_v1_private_delete_order = spotV1PrivateDeleteOrder = Entry('order', ['spot', 'v1', 'private'], 'DELETE', {'cost': 5})
    spot_v2_private_get_mytrades = spotV2PrivateGetMyTrades = Entry('myTrades', ['spot', 'v2', 'private'], 'GET', {'cost': 1.2})
    fapi_v1_public_get_ping = fapiV1PublicGetPing = Entry('ping', ['fapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    fapi_v1_public_get_time = fapiV1PublicGetTime = Entry('time', ['fapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    fapi_v1_public_get_contracts = fapiV1PublicGetContracts = Entry('contracts', ['fapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    fapi_v1_public_get_depth = fapiV1PublicGetDepth = Entry('depth', ['fapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    fapi_v1_public_get_ticker = fapiV1PublicGetTicker = Entry('ticker', ['fapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    fapi_v1_public_get_klines = fapiV1PublicGetKlines = Entry('klines', ['fapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    fapi_v2_private_get_mytrades = fapiV2PrivateGetMyTrades = Entry('myTrades', ['fapi', 'v2', 'private'], 'GET', {'cost': 5})
    fapi_v2_private_get_openorders = fapiV2PrivateGetOpenOrders = Entry('openOrders', ['fapi', 'v2', 'private'], 'GET', {'cost': 5})
    fapi_v2_private_get_order = fapiV2PrivateGetOrder = Entry('order', ['fapi', 'v2', 'private'], 'GET', {'cost': 5})
    fapi_v2_private_get_account = fapiV2PrivateGetAccount = Entry('account', ['fapi', 'v2', 'private'], 'GET', {'cost': 5})
    fapi_v2_private_get_leveragebracket = fapiV2PrivateGetLeverageBracket = Entry('leverageBracket', ['fapi', 'v2', 'private'], 'GET', {'cost': 5})
    fapi_v2_private_get_commissionrate = fapiV2PrivateGetCommissionRate = Entry('commissionRate', ['fapi', 'v2', 'private'], 'GET', {'cost': 5})
    fapi_v2_private_get_futures_transfer_history = fapiV2PrivateGetFuturesTransferHistory = Entry('futures_transfer_history', ['fapi', 'v2', 'private'], 'GET', {'cost': 5})
    fapi_v2_private_get_forceordershistory = fapiV2PrivateGetForceOrdersHistory = Entry('forceOrdersHistory', ['fapi', 'v2', 'private'], 'GET', {'cost': 5})
    fapi_v2_private_post_positionmargin = fapiV2PrivatePostPositionMargin = Entry('positionMargin', ['fapi', 'v2', 'private'], 'POST', {'cost': 5})
    fapi_v2_private_post_level_edit = fapiV2PrivatePostLevelEdit = Entry('level_edit', ['fapi', 'v2', 'private'], 'POST', {'cost': 5})
    fapi_v2_private_post_cancel = fapiV2PrivatePostCancel = Entry('cancel', ['fapi', 'v2', 'private'], 'POST', {'cost': 5})
    fapi_v2_private_post_order = fapiV2PrivatePostOrder = Entry('order', ['fapi', 'v2', 'private'], 'POST', {'cost': 25})
    fapi_v2_private_post_allopenorders = fapiV2PrivatePostAllOpenOrders = Entry('allOpenOrders', ['fapi', 'v2', 'private'], 'POST', {'cost': 5})
    fapi_v2_private_post_futures_transfer = fapiV2PrivatePostFuturesTransfer = Entry('futures_transfer', ['fapi', 'v2', 'private'], 'POST', {'cost': 5})
    dapi_v1_public_get_ping = dapiV1PublicGetPing = Entry('ping', ['dapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    dapi_v1_public_get_time = dapiV1PublicGetTime = Entry('time', ['dapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    dapi_v1_public_get_contracts = dapiV1PublicGetContracts = Entry('contracts', ['dapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    dapi_v1_public_get_depth = dapiV1PublicGetDepth = Entry('depth', ['dapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    dapi_v1_public_get_ticker = dapiV1PublicGetTicker = Entry('ticker', ['dapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    dapi_v1_public_get_klines = dapiV1PublicGetKlines = Entry('klines', ['dapi', 'v1', 'public'], 'GET', {'cost': 0.24})
    dapi_v2_private_get_mytrades = dapiV2PrivateGetMyTrades = Entry('myTrades', ['dapi', 'v2', 'private'], 'GET', {'cost': 5})
    dapi_v2_private_get_openorders = dapiV2PrivateGetOpenOrders = Entry('openOrders', ['dapi', 'v2', 'private'], 'GET', {'cost': 5})
    dapi_v2_private_get_order = dapiV2PrivateGetOrder = Entry('order', ['dapi', 'v2', 'private'], 'GET', {'cost': 5})
    dapi_v2_private_get_account = dapiV2PrivateGetAccount = Entry('account', ['dapi', 'v2', 'private'], 'GET', {'cost': 5})
    dapi_v2_private_get_leveragebracket = dapiV2PrivateGetLeverageBracket = Entry('leverageBracket', ['dapi', 'v2', 'private'], 'GET', {'cost': 5})
    dapi_v2_private_get_commissionrate = dapiV2PrivateGetCommissionRate = Entry('commissionRate', ['dapi', 'v2', 'private'], 'GET', {'cost': 5})
    dapi_v2_private_get_futures_transfer_history = dapiV2PrivateGetFuturesTransferHistory = Entry('futures_transfer_history', ['dapi', 'v2', 'private'], 'GET', {'cost': 5})
    dapi_v2_private_get_forceordershistory = dapiV2PrivateGetForceOrdersHistory = Entry('forceOrdersHistory', ['dapi', 'v2', 'private'], 'GET', {'cost': 5})
    dapi_v2_private_post_positionmargin = dapiV2PrivatePostPositionMargin = Entry('positionMargin', ['dapi', 'v2', 'private'], 'POST', {'cost': 5})
    dapi_v2_private_post_level_edit = dapiV2PrivatePostLevelEdit = Entry('level_edit', ['dapi', 'v2', 'private'], 'POST', {'cost': 5})
    dapi_v2_private_post_cancel = dapiV2PrivatePostCancel = Entry('cancel', ['dapi', 'v2', 'private'], 'POST', {'cost': 5})
    dapi_v2_private_post_order = dapiV2PrivatePostOrder = Entry('order', ['dapi', 'v2', 'private'], 'POST', {'cost': 5})
    dapi_v2_private_post_allopenorders = dapiV2PrivatePostAllOpenOrders = Entry('allOpenOrders', ['dapi', 'v2', 'private'], 'POST', {'cost': 5})
    dapi_v2_private_post_futures_transfer = dapiV2PrivatePostFuturesTransfer = Entry('futures_transfer', ['dapi', 'v2', 'private'], 'POST', {'cost': 5})
    open_v1_private_post_poseidon_api_v1_listenkey = openV1PrivatePostPoseidonApiV1ListenKey = Entry('poseidon/api/v1/listenKey', ['open', 'v1', 'private'], 'POST', {'cost': 1})
    open_v1_private_put_poseidon_api_v1_listenkey_listenkey = openV1PrivatePutPoseidonApiV1ListenKeyListenKey = Entry('poseidon/api/v1/listenKey/{listenKey}', ['open', 'v1', 'private'], 'PUT', {'cost': 1})
    open_v1_private_delete_poseidon_api_v1_listenkey_listenkey = openV1PrivateDeletePoseidonApiV1ListenKeyListenKey = Entry('poseidon/api/v1/listenKey/{listenKey}', ['open', 'v1', 'private'], 'DELETE', {'cost': 1})
