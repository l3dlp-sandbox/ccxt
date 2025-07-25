package base
import "github.com/ccxt/ccxt/go/v4"

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code


    func TestFetchTicker(exchange ccxt.ICoreExchange, skippedProperties interface{}, symbol interface{}) <- chan interface{} {
                ch := make(chan interface{})
                go func() interface{} {
                    defer close(ch)
                    defer ReturnPanicError(ch)
                        var method interface{} = "fetchTicker"
            
                ticker:= (<-exchange.FetchTicker(symbol))
                PanicOnError(ticker)
                TestTicker(exchange, skippedProperties, method, ticker, symbol)
            
                ch <- true
                return nil
            
                }()
                return ch
            }
