import os
import sys

root = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))))
sys.path.append(root)

# ----------------------------------------------------------------------------

# PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
# https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code

# ----------------------------------------------------------------------------
# -*- coding: utf-8 -*-

from ccxt.test.exchange.base import test_ledger_entry  # noqa E402
from ccxt.test.exchange.base import test_shared_methods  # noqa E402

def test_fetch_ledger(exchange, skipped_properties, code):
    method = 'fetchLedger'
    items = exchange.fetch_ledger(code)
    test_shared_methods.assert_non_emtpy_array(exchange, skipped_properties, method, items, code)
    now = exchange.milliseconds()
    for i in range(0, len(items)):
        test_ledger_entry(exchange, skipped_properties, method, items[i], code, now)
    test_shared_methods.assert_timestamp_order(exchange, method, code, items)
    return True
