// ----------------------------------------------------------------------------

// PLEASE DO NOT EDIT THIS FILE, IT IS GENERATED AND WILL BE OVERWRITTEN:
// https://github.com/ccxt/ccxt/blob/master/CONTRIBUTING.md#how-to-contribute-code
// EDIT THE CORRESPONDENT .ts FILE INSTEAD

// AUTO_TRANSPILE_ENABLED
import assert from 'assert';
import ccxt from '../../../ccxt.js';
function testParsePrecision() {
    const exchange = new ccxt.Exchange({
        'id': 'sampleexchange',
    });
    assert(exchange.parsePrecision('15') === '0.000000000000001');
    assert(exchange.parsePrecision('1') === '0.1');
    assert(exchange.parsePrecision('0') === '1');
    assert(exchange.parsePrecision('-5') === '100000');
}
export default testParsePrecision;
