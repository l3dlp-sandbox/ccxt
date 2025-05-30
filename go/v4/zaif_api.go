// -------------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

// -------------------------------------------------------------------------------

package ccxt

func (this *zaif) PublicGetDepthPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetDepthPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PublicGetCurrenciesPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetCurrenciesPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PublicGetCurrenciesAll (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetCurrenciesAll", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PublicGetCurrencyPairsPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetCurrencyPairsPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PublicGetCurrencyPairsAll (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetCurrencyPairsAll", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PublicGetLastPricePair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetLastPricePair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PublicGetTickerPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetTickerPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PublicGetTradesPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("publicGetTradesPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostActiveOrders (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostActiveOrders", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostCancelOrder (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostCancelOrder", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostDepositHistory (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostDepositHistory", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostGetIdInfo (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostGetIdInfo", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostGetInfo (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostGetInfo", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostGetInfo2 (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostGetInfo2", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostGetPersonalInfo (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostGetPersonalInfo", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostTrade (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostTrade", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostTradeHistory (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostTradeHistory", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostWithdraw (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostWithdraw", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) PrivatePostWithdrawHistory (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("privatePostWithdrawHistory", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) EcapiPostCreateInvoice (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("ecapiPostCreateInvoice", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) EcapiPostGetInvoice (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("ecapiPostGetInvoice", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) EcapiPostGetInvoiceIdsByOrderNumber (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("ecapiPostGetInvoiceIdsByOrderNumber", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) EcapiPostCancelInvoice (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("ecapiPostCancelInvoice", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) TlapiPostGetPositions (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("tlapiPostGetPositions", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) TlapiPostPositionHistory (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("tlapiPostPositionHistory", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) TlapiPostActivePositions (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("tlapiPostActivePositions", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) TlapiPostCreatePosition (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("tlapiPostCreatePosition", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) TlapiPostChangePosition (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("tlapiPostChangePosition", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) TlapiPostCancelPosition (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("tlapiPostCancelPosition", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) FapiGetGroupsGroupId (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("fapiGetGroupsGroupId", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) FapiGetLastPriceGroupIdPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("fapiGetLastPriceGroupIdPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) FapiGetTickerGroupIdPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("fapiGetTickerGroupIdPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) FapiGetTradesGroupIdPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("fapiGetTradesGroupIdPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}

func (this *zaif) FapiGetDepthGroupIdPair (args ...interface{}) <-chan interface{} {
   parameters := GetArg(args, 0, nil)
   ch := make(chan interface{})
   go func() {
       defer close(ch)
       defer func() {
           if r := recover(); r != nil {
               ch <- "panic:" + ToString(r)
           }
       }()
       ch <- (<-this.callEndpoint ("fapiGetDepthGroupIdPair", parameters))
       PanicOnError(ch)
   }()
   return ch
}
