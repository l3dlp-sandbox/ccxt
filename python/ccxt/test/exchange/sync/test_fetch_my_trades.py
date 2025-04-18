import os
import sys

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
sys.path.append(root)

# ----------------------------------------------------------------------------

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

# ----------------------------------------------------------------------------
# -*- coding: utf-8 -*-

from ccxt.test.exchange.base import test_shared_methods  # noqa E402
from ccxt.test.exchange.base import test_trade  # noqa E402

def test_fetch_my_trades(exchange, skipped_properties, symbol):
    method = 'fetchMyTrades'
    trades = exchange.fetch_my_trades(symbol)
    test_shared_methods.assert_non_emtpy_array(exchange, skipped_properties, method, trades, symbol)
    now = exchange.milliseconds()
    for i in range(0, len(trades)):
        test_trade(exchange, skipped_properties, method, trades[i], symbol, now)
    test_shared_methods.assert_timestamp_order(exchange, method, symbol, trades)
    return True
