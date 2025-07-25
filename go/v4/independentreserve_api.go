// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

package ccxt

func (this *independentreserve) PublicGetGetValidPrimaryCurrencyCodes (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetValidPrimaryCurrencyCodes", args...)
}

func (this *independentreserve) PublicGetGetValidSecondaryCurrencyCodes (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetValidSecondaryCurrencyCodes", args...)
}

func (this *independentreserve) PublicGetGetValidLimitOrderTypes (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetValidLimitOrderTypes", args...)
}

func (this *independentreserve) PublicGetGetValidMarketOrderTypes (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetValidMarketOrderTypes", args...)
}

func (this *independentreserve) PublicGetGetValidOrderTypes (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetValidOrderTypes", args...)
}

func (this *independentreserve) PublicGetGetValidTransactionTypes (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetValidTransactionTypes", args...)
}

func (this *independentreserve) PublicGetGetMarketSummary (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetMarketSummary", args...)
}

func (this *independentreserve) PublicGetGetOrderBook (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetOrderBook", args...)
}

func (this *independentreserve) PublicGetGetAllOrders (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetAllOrders", args...)
}

func (this *independentreserve) PublicGetGetTradeHistorySummary (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetTradeHistorySummary", args...)
}

func (this *independentreserve) PublicGetGetRecentTrades (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetRecentTrades", args...)
}

func (this *independentreserve) PublicGetGetFxRates (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetFxRates", args...)
}

func (this *independentreserve) PublicGetGetOrderMinimumVolumes (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetOrderMinimumVolumes", args...)
}

func (this *independentreserve) PublicGetGetCryptoWithdrawalFees (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetCryptoWithdrawalFees", args...)
}

func (this *independentreserve) PublicGetGetCryptoWithdrawalFees2 (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetCryptoWithdrawalFees2", args...)
}

func (this *independentreserve) PublicGetGetNetworks (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetNetworks", args...)
}

func (this *independentreserve) PublicGetGetPrimaryCurrencyConfig2 (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("publicGetGetPrimaryCurrencyConfig2", args...)
}

func (this *independentreserve) PrivatePostGetOpenOrders (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetOpenOrders", args...)
}

func (this *independentreserve) PrivatePostGetClosedOrders (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetClosedOrders", args...)
}

func (this *independentreserve) PrivatePostGetClosedFilledOrders (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetClosedFilledOrders", args...)
}

func (this *independentreserve) PrivatePostGetOrderDetails (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetOrderDetails", args...)
}

func (this *independentreserve) PrivatePostGetAccounts (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetAccounts", args...)
}

func (this *independentreserve) PrivatePostGetTransactions (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetTransactions", args...)
}

func (this *independentreserve) PrivatePostGetFiatBankAccounts (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetFiatBankAccounts", args...)
}

func (this *independentreserve) PrivatePostGetDigitalCurrencyDepositAddress (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetDigitalCurrencyDepositAddress", args...)
}

func (this *independentreserve) PrivatePostGetDigitalCurrencyDepositAddress2 (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetDigitalCurrencyDepositAddress2", args...)
}

func (this *independentreserve) PrivatePostGetDigitalCurrencyDepositAddresses (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetDigitalCurrencyDepositAddresses", args...)
}

func (this *independentreserve) PrivatePostGetDigitalCurrencyDepositAddresses2 (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetDigitalCurrencyDepositAddresses2", args...)
}

func (this *independentreserve) PrivatePostGetTrades (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetTrades", args...)
}

func (this *independentreserve) PrivatePostGetBrokerageFees (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetBrokerageFees", args...)
}

func (this *independentreserve) PrivatePostGetDigitalCurrencyWithdrawal (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostGetDigitalCurrencyWithdrawal", args...)
}

func (this *independentreserve) PrivatePostPlaceLimitOrder (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostPlaceLimitOrder", args...)
}

func (this *independentreserve) PrivatePostPlaceMarketOrder (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostPlaceMarketOrder", args...)
}

func (this *independentreserve) PrivatePostCancelOrder (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostCancelOrder", args...)
}

func (this *independentreserve) PrivatePostSynchDigitalCurrencyDepositAddressWithBlockchain (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostSynchDigitalCurrencyDepositAddressWithBlockchain", args...)
}

func (this *independentreserve) PrivatePostRequestFiatWithdrawal (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostRequestFiatWithdrawal", args...)
}

func (this *independentreserve) PrivatePostWithdrawFiatCurrency (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostWithdrawFiatCurrency", args...)
}

func (this *independentreserve) PrivatePostWithdrawDigitalCurrency (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostWithdrawDigitalCurrency", args...)
}

func (this *independentreserve) PrivatePostWithdrawCrypto (args ...interface{}) <-chan interface{} {
   return this.callEndpointAsync("privatePostWithdrawCrypto", args...)
}
