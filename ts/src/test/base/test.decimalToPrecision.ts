
// AUTO_TRANSPILE_ENABLED

import assert from 'assert';
import ccxt from '../../../ccxt.js';
import { ROUND, TRUNCATE, DECIMAL_PLACES, TICK_SIZE, PAD_WITH_ZERO, SIGNIFICANT_DIGITS } from '../../base/functions/number.js';


function testDecimalToPrecision () {
    const exchange = new ccxt.Exchange ({
        'id': 'regirock',
    });
    // ----------------------------------------------------------------------------
    // testDecimalToPrecisionTruncationToNDigitsAfterDot

    assert (exchange.decimalToPrecision ('12.3456000', TRUNCATE, 100, DECIMAL_PLACES) === '12.3456');
    assert (exchange.decimalToPrecision ('12.3456', TRUNCATE, 100, DECIMAL_PLACES) === '12.3456');
    assert (exchange.decimalToPrecision ('12.3456', TRUNCATE, 4, DECIMAL_PLACES) === '12.3456');
    assert (exchange.decimalToPrecision ('12.3456', TRUNCATE, 3, DECIMAL_PLACES) === '12.345');
    assert (exchange.decimalToPrecision ('12.3456', TRUNCATE, 2, DECIMAL_PLACES) === '12.34');
    assert (exchange.decimalToPrecision ('12.3456', TRUNCATE, 1, DECIMAL_PLACES) === '12.3');
    assert (exchange.decimalToPrecision ('12.3456', TRUNCATE, 0, DECIMAL_PLACES) === '12');
    // ['12.3456',    TRUNCATE,  -1, DECIMAL_PLACES,  '10'],   // not yet supported
    // ['123.456',    TRUNCATE,  -2, DECIMAL_PLACES,  '120'],  // not yet supported
    // ['123.456',    TRUNCATE,  -3, DECIMAL_PLACES,  '100'],  // not yet supported

    assert (exchange.decimalToPrecision ('0.0000001', TRUNCATE, 8, DECIMAL_PLACES) === '0.0000001');
    assert (exchange.decimalToPrecision ('0.00000001', TRUNCATE, 8, DECIMAL_PLACES) === '0.00000001');

    assert (exchange.decimalToPrecision ('0.000000000', TRUNCATE, 9, DECIMAL_PLACES, PAD_WITH_ZERO) === '0.000000000');
    assert (exchange.decimalToPrecision ('0.000000001', TRUNCATE, 9, DECIMAL_PLACES, PAD_WITH_ZERO) === '0.000000001');

    assert (exchange.decimalToPrecision ('12.3456', TRUNCATE, -1, DECIMAL_PLACES) === '10');
    assert (exchange.decimalToPrecision ('123.456', TRUNCATE, -1, DECIMAL_PLACES) === '120');
    assert (exchange.decimalToPrecision ('123.456', TRUNCATE, -2, DECIMAL_PLACES) === '100');
    assert (exchange.decimalToPrecision ('9.99999', TRUNCATE, -1, DECIMAL_PLACES) === '0');
    assert (exchange.decimalToPrecision ('99.9999', TRUNCATE, -1, DECIMAL_PLACES) === '90');
    assert (exchange.decimalToPrecision ('99.9999', TRUNCATE, -2, DECIMAL_PLACES) === '0');

    assert (exchange.decimalToPrecision ('0', TRUNCATE, 0, DECIMAL_PLACES) === '0');
    assert (exchange.decimalToPrecision ('-0.9', TRUNCATE, 0, DECIMAL_PLACES) === '0');

    // ----------------------------------------------------------------------------
    // testDecimalToPrecisionTruncationToNSignificantDigits

    assert (exchange.decimalToPrecision ('0.000123456700', TRUNCATE, 100, SIGNIFICANT_DIGITS) === '0.0001234567');
    assert (exchange.decimalToPrecision ('0.0001234567', TRUNCATE, 100, SIGNIFICANT_DIGITS) === '0.0001234567');
    assert (exchange.decimalToPrecision ('0.0001234567', TRUNCATE, 7, SIGNIFICANT_DIGITS) === '0.0001234567');

    assert (exchange.decimalToPrecision ('0.000123456', TRUNCATE, 6, SIGNIFICANT_DIGITS) === '0.000123456');
    assert (exchange.decimalToPrecision ('0.000123456', TRUNCATE, 5, SIGNIFICANT_DIGITS) === '0.00012345');
    assert (exchange.decimalToPrecision ('0.000123456', TRUNCATE, 2, SIGNIFICANT_DIGITS) === '0.00012');
    assert (exchange.decimalToPrecision ('0.000123456', TRUNCATE, 1, SIGNIFICANT_DIGITS) === '0.0001');

    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 10, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '123.0000987');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 8, SIGNIFICANT_DIGITS) === '123.00009');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 7, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '123.0000');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 6, SIGNIFICANT_DIGITS) === '123');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 5, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '123.00');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 4, SIGNIFICANT_DIGITS) === '123');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 4, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '123.0');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 3, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '123');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 2, SIGNIFICANT_DIGITS) === '120');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 1, SIGNIFICANT_DIGITS) === '100');
    assert (exchange.decimalToPrecision ('123.0000987654', TRUNCATE, 1, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '100');

    assert (exchange.decimalToPrecision ('1234', TRUNCATE, 5, SIGNIFICANT_DIGITS) === '1234');
    assert (exchange.decimalToPrecision ('1234', TRUNCATE, 5, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '1234.0');
    assert (exchange.decimalToPrecision ('1234', TRUNCATE, 4, SIGNIFICANT_DIGITS) === '1234');
    assert (exchange.decimalToPrecision ('1234', TRUNCATE, 4, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '1234');
    assert (exchange.decimalToPrecision ('1234.69', TRUNCATE, 0, SIGNIFICANT_DIGITS) === '0');
    assert (exchange.decimalToPrecision ('1234.69', TRUNCATE, 0, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '0');

    // ----------------------------------------------------------------------------
    // testDecimalToPrecisionRoundingToNDigitsAfterDot

    assert (exchange.decimalToPrecision ('12.3456000', ROUND, 100, DECIMAL_PLACES) === '12.3456');
    assert (exchange.decimalToPrecision ('12.3456', ROUND, 100, DECIMAL_PLACES) === '12.3456');
    assert (exchange.decimalToPrecision ('12.3456', ROUND, 4, DECIMAL_PLACES) === '12.3456');
    assert (exchange.decimalToPrecision ('12.3456', ROUND, 3, DECIMAL_PLACES) === '12.346');
    assert (exchange.decimalToPrecision ('12.3456', ROUND, 2, DECIMAL_PLACES) === '12.35');
    assert (exchange.decimalToPrecision ('12.3456', ROUND, 1, DECIMAL_PLACES) === '12.3');
    assert (exchange.decimalToPrecision ('12.3456', ROUND, 0, DECIMAL_PLACES) === '12');

    // todo:
    // ['9.999',     ROUND,   3, DECIMAL_PLACES,    NO_PADDING,  '9.999'],
    // ['9.999',     ROUND,   2, DECIMAL_PLACES,    NO_PADDING,  '10'],
    // ['9.999',     ROUND,   2, DECIMAL_PLACES, PAD_WITH_ZERO,  '10.00'],
    // ['99.999',    ROUND,   2, DECIMAL_PLACES, PAD_WITH_ZERO,  '100.00'],
    // ['-99.999',    ROUND,   2, DECIMAL_PLACES, PAD_WITH_ZERO, '-100.00'],

    // ['12.3456',    ROUND,  -1, DECIMAL_PLACES,    NO_PADDING,  '10'],  // not yet supported
    // ['123.456',    ROUND,  -1, DECIMAL_PLACES,    NO_PADDING,  '120'],  // not yet supported
    // ['123.456',    ROUND,  -2, DECIMAL_PLACES,    NO_PADDING,  '100'],  // not yet supported

    // a problematic case in PHP
    assert (exchange.decimalToPrecision ('10000', ROUND, 6, DECIMAL_PLACES) === '10000');
    assert (exchange.decimalToPrecision ('0.00003186', ROUND, 8, DECIMAL_PLACES) === '0.00003186');

    assert (exchange.decimalToPrecision ('12.3456', ROUND, -1, DECIMAL_PLACES) === '10');
    assert (exchange.decimalToPrecision ('123.456', ROUND, -1, DECIMAL_PLACES) === '120');
    assert (exchange.decimalToPrecision ('123.456', ROUND, -2, DECIMAL_PLACES) === '100');
    assert (exchange.decimalToPrecision ('9.99999', ROUND, -1, DECIMAL_PLACES) === '10');
    assert (exchange.decimalToPrecision ('99.9999', ROUND, -1, DECIMAL_PLACES) === '100');
    assert (exchange.decimalToPrecision ('99.9999', ROUND, -2, DECIMAL_PLACES) === '100');

    assert (exchange.decimalToPrecision ('9.999', ROUND, 3, DECIMAL_PLACES) === '9.999');
    assert (exchange.decimalToPrecision ('9.999', ROUND, 2, DECIMAL_PLACES) === '10');
    assert (exchange.decimalToPrecision ('9.999', ROUND, 2, DECIMAL_PLACES, PAD_WITH_ZERO) === '10.00');
    assert (exchange.decimalToPrecision ('99.999', ROUND, 2, DECIMAL_PLACES, PAD_WITH_ZERO) === '100.00');
    assert (exchange.decimalToPrecision ('-99.999', ROUND, 2, DECIMAL_PLACES, PAD_WITH_ZERO) === '-100.00');

    // ----------------------------------------------------------------------------
    // testDecimalToPrecisionRoundingToNSignificantDigits

    assert (exchange.decimalToPrecision ('0.000123456700', ROUND, 100, SIGNIFICANT_DIGITS) === '0.0001234567');
    assert (exchange.decimalToPrecision ('0.0001234567', ROUND, 100, SIGNIFICANT_DIGITS) === '0.0001234567');
    assert (exchange.decimalToPrecision ('0.0001234567', ROUND, 7, SIGNIFICANT_DIGITS) === '0.0001234567');
    assert (exchange.decimalToPrecision ('0.000123456', ROUND, 6, SIGNIFICANT_DIGITS) === '0.000123456');
    assert (exchange.decimalToPrecision ('0.000123456', ROUND, 5, SIGNIFICANT_DIGITS) === '0.00012346');
    assert (exchange.decimalToPrecision ('0.000123456', ROUND, 4, SIGNIFICANT_DIGITS) === '0.0001235');
    assert (exchange.decimalToPrecision ('0.00012', ROUND, 2, SIGNIFICANT_DIGITS) === '0.00012');
    assert (exchange.decimalToPrecision ('0.0001', ROUND, 1, SIGNIFICANT_DIGITS) === '0.0001');

    assert (exchange.decimalToPrecision ('123.0000987654', ROUND, 7, SIGNIFICANT_DIGITS) === '123.0001');
    assert (exchange.decimalToPrecision ('123.0000987654', ROUND, 6, SIGNIFICANT_DIGITS) === '123');

    assert (exchange.decimalToPrecision ('0.00098765', ROUND, 2, SIGNIFICANT_DIGITS) === '0.00099');
    assert (exchange.decimalToPrecision ('0.00098765', ROUND, 2, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '0.00099');

    assert (exchange.decimalToPrecision ('0.00098765', ROUND, 1, SIGNIFICANT_DIGITS) === '0.001');
    assert (exchange.decimalToPrecision ('0.00098765', ROUND, 10, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '0.0009876500000');

    assert (exchange.decimalToPrecision ('0.098765', ROUND, 1, SIGNIFICANT_DIGITS, PAD_WITH_ZERO) === '0.1');

    assert (exchange.decimalToPrecision ('0', ROUND, 0, SIGNIFICANT_DIGITS) === '0');
    assert (exchange.decimalToPrecision ('-0.123', ROUND, 0, SIGNIFICANT_DIGITS) === '0');

    assert (exchange.decimalToPrecision ('0.00000044', ROUND, 5, SIGNIFICANT_DIGITS) === '0.00000044');


    assert (exchange.decimalToPrecision ('0.123456', ROUND, 5, SIGNIFICANT_DIGITS) === '0.12346');
    assert (exchange.decimalToPrecision ('0.123456', ROUND, 6, SIGNIFICANT_DIGITS) === '0.123456');
    assert (exchange.decimalToPrecision ('0.123456', ROUND, 7, SIGNIFICANT_DIGITS) === '0.123456');
    assert (exchange.decimalToPrecision ('1.234567', ROUND, 5, SIGNIFICANT_DIGITS) === '1.2346');
    assert (exchange.decimalToPrecision ('1.234567', ROUND, 6, SIGNIFICANT_DIGITS) === '1.23457');
    assert (exchange.decimalToPrecision ('1.234567', ROUND, 7, SIGNIFICANT_DIGITS) === '1.234567');
    assert (exchange.decimalToPrecision ('12.34567', ROUND, 5, SIGNIFICANT_DIGITS) === '12.346');
    assert (exchange.decimalToPrecision ('12.34567', ROUND, 6, SIGNIFICANT_DIGITS) === '12.3457');
    assert (exchange.decimalToPrecision ('12.34567', ROUND, 7, SIGNIFICANT_DIGITS) === '12.34567');

    // above 1.0
    assert (exchange.decimalToPrecision ('1114.5', ROUND, 3, SIGNIFICANT_DIGITS) === '1110');
    assert (exchange.decimalToPrecision ('1115.5', ROUND, 3, SIGNIFICANT_DIGITS) === '1120');
    assert (exchange.decimalToPrecision ('1114.5', ROUND, 4, SIGNIFICANT_DIGITS) === '1115');
    assert (exchange.decimalToPrecision ('1114.5', ROUND, 5, SIGNIFICANT_DIGITS) === '1114.5');
    assert (exchange.decimalToPrecision ('1115.5', ROUND, 5, SIGNIFICANT_DIGITS) === '1115.5');



    // ----------------------------------------------------------------------------
    // testDecimalToPrecisionRoundingToTickSize

    assert (exchange.decimalToPrecision ('0.000123456700', ROUND, 0.00012, TICK_SIZE) === '0.00012');
    assert (exchange.decimalToPrecision ('0.0001234567', ROUND, 0.00013, TICK_SIZE) === '0.00013');
    assert (exchange.decimalToPrecision ('0.0001234567', TRUNCATE, 0.00013, TICK_SIZE) === '0');
    assert (exchange.decimalToPrecision ('101.000123456700', ROUND, 100, TICK_SIZE) === '100');
    assert (exchange.decimalToPrecision ('0.000123456700', ROUND, 100, TICK_SIZE) === '0');
    assert (exchange.decimalToPrecision ('165', TRUNCATE, 110, TICK_SIZE) === '110');
    assert (exchange.decimalToPrecision ('3210', TRUNCATE, 1110, TICK_SIZE) === '2220');
    assert (exchange.decimalToPrecision ('165', ROUND, 110, TICK_SIZE) === '220');
    assert (exchange.decimalToPrecision ('0.000123456789', ROUND, 0.00000012, TICK_SIZE) === '0.00012348');
    assert (exchange.decimalToPrecision ('0.000123456789', TRUNCATE, 0.00000012, TICK_SIZE) === '0.00012336');
    assert (exchange.decimalToPrecision ('0.000273398', ROUND, 1e-7, TICK_SIZE) === '0.0002734');

    assert (exchange.decimalToPrecision ('0.00005714', TRUNCATE, 0.00000001, TICK_SIZE) === '0.00005714');
    // this line causes problems in JS, fix with Precise
    // assert (exchange.decimalToPrecision ('0.0000571495257361', TRUNCATE, 0.00000001, TICK_SIZE) === '0.00005714');

    assert (exchange.decimalToPrecision ('0.01', ROUND, 0.0001, TICK_SIZE, PAD_WITH_ZERO) === '0.0100');
    assert (exchange.decimalToPrecision ('0.01', TRUNCATE, 0.0001, TICK_SIZE, PAD_WITH_ZERO) === '0.0100');

    assert (exchange.decimalToPrecision ('-0.000123456789', ROUND, 0.00000012, TICK_SIZE) === '-0.00012348');
    assert (exchange.decimalToPrecision ('-0.000123456789', TRUNCATE, 0.00000012, TICK_SIZE) === '-0.00012336');
    assert (exchange.decimalToPrecision ('-165', TRUNCATE, 110, TICK_SIZE) === '-110');
    assert (exchange.decimalToPrecision ('-165', ROUND, 110, TICK_SIZE) === '-220');
    assert (exchange.decimalToPrecision ('-1650', TRUNCATE, 1100, TICK_SIZE) === '-1100');
    assert (exchange.decimalToPrecision ('-1650', ROUND, 1100, TICK_SIZE) === '-2200');

    assert (exchange.decimalToPrecision ('0.0006', TRUNCATE, 0.0001, TICK_SIZE) === '0.0006');
    assert (exchange.decimalToPrecision ('-0.0006', TRUNCATE, 0.0001, TICK_SIZE) === '-0.0006');
    assert (exchange.decimalToPrecision ('0.6', TRUNCATE, 0.2, TICK_SIZE) === '0.6');
    assert (exchange.decimalToPrecision ('-0.6', TRUNCATE, 0.2, TICK_SIZE) === '-0.6');
    assert (exchange.decimalToPrecision ('1.2', ROUND, 0.4, TICK_SIZE) === '1.2');
    assert (exchange.decimalToPrecision ('-1.2', ROUND, 0.4, TICK_SIZE) === '-1.2');
    assert (exchange.decimalToPrecision ('1.2', ROUND, 0.02, TICK_SIZE) === '1.2');
    assert (exchange.decimalToPrecision ('-1.2', ROUND, 0.02, TICK_SIZE) === '-1.2');
    assert (exchange.decimalToPrecision ('44', ROUND, 4.4, TICK_SIZE) === '44');
    assert (exchange.decimalToPrecision ('-44', ROUND, 4.4, TICK_SIZE) === '-44');
    assert (exchange.decimalToPrecision ('44.00000001', ROUND, 4.4, TICK_SIZE) === '44');
    assert (exchange.decimalToPrecision ('-44.00000001', ROUND, 4.4, TICK_SIZE) === '-44');

    // https://github.com/ccxt/ccxt/issues/6731
    assert (exchange.decimalToPrecision ('20', TRUNCATE, 0.00000001, TICK_SIZE) === '20');

    // ----------------------------------------------------------------------------
    // testDecimalToPrecisionNegativeNumbers

    assert (exchange.decimalToPrecision ('-0.123456', TRUNCATE, 5, DECIMAL_PLACES) === '-0.12345');
    assert (exchange.decimalToPrecision ('-0.123456', ROUND, 5, DECIMAL_PLACES) === '-0.12346');

    // ----------------------------------------------------------------------------
    // decimalToPrecision: without dot / trailing dot

    assert (exchange.decimalToPrecision ('123', TRUNCATE, 0) === '123');

    assert (exchange.decimalToPrecision ('123', TRUNCATE, 5, DECIMAL_PLACES) === '123');
    assert (exchange.decimalToPrecision ('123', TRUNCATE, 5, DECIMAL_PLACES, PAD_WITH_ZERO) === '123.00000');

    assert (exchange.decimalToPrecision ('123.', TRUNCATE, 0, DECIMAL_PLACES) === '123');
    assert (exchange.decimalToPrecision ('123.', TRUNCATE, 5, DECIMAL_PLACES, PAD_WITH_ZERO) === '123.00000');

    assert (exchange.decimalToPrecision ('0.', TRUNCATE, 0) === '0');
    assert (exchange.decimalToPrecision ('0.', TRUNCATE, 5, DECIMAL_PLACES, PAD_WITH_ZERO) === '0.00000');

    // ----------------------------------------------------------------------------
    // decimalToPrecision: rounding for equidistant digits

    assert (exchange.decimalToPrecision ('1.44', ROUND, 1, DECIMAL_PLACES) === '1.4');
    assert (exchange.decimalToPrecision ('1.45', ROUND, 1, DECIMAL_PLACES) === '1.5');
    assert (exchange.decimalToPrecision ('1.45', ROUND, 0, DECIMAL_PLACES) === '1'); // not 2

    // ----------------------------------------------------------------------------
    // negative precision only implemented so far in python
    // pretty useless for decimal applications as anything |x| < 5 === 0
    // NO_PADDING and PAD_WITH_ZERO are ignored

    assert (exchange.decimalToPrecision ('5', ROUND, -1, DECIMAL_PLACES) === '10');
    assert (exchange.decimalToPrecision ('4.999', ROUND, -1, DECIMAL_PLACES) === '0');
    assert (exchange.decimalToPrecision ('0.0431531423', ROUND, -1, DECIMAL_PLACES) === '0');
    assert (exchange.decimalToPrecision ('-69.3', ROUND, -1, DECIMAL_PLACES) === '-70');
    assert (exchange.decimalToPrecision ('5001', ROUND, -4, DECIMAL_PLACES) === '10000');
    assert (exchange.decimalToPrecision ('4999.999', ROUND, -4, DECIMAL_PLACES) === '0');

    assert (exchange.decimalToPrecision ('69.3', TRUNCATE, -2, DECIMAL_PLACES) === '0');
    assert (exchange.decimalToPrecision ('-69.3', TRUNCATE, -2, DECIMAL_PLACES) === '0');
    assert (exchange.decimalToPrecision ('69.3', TRUNCATE, -1, SIGNIFICANT_DIGITS) === '60');
    assert (exchange.decimalToPrecision ('-69.3', TRUNCATE, -1, SIGNIFICANT_DIGITS) === '-60');
    assert (exchange.decimalToPrecision ('69.3', TRUNCATE, -2, SIGNIFICANT_DIGITS) === '0');
    assert (exchange.decimalToPrecision ('1602000000000000000000', TRUNCATE, 3, SIGNIFICANT_DIGITS) === '1600000000000000000000');

    // ----------------------------------------------------------------------------
    // decimal_to_precision: stringified precision
    assert (exchange.decimalToPrecision ('-0.000123456789', ROUND, '0.00000012', TICK_SIZE) === '-0.00012348');
    assert (exchange.decimalToPrecision ('-0.000123456789', TRUNCATE, '0.00000012', TICK_SIZE) === '-0.00012336');
    assert (exchange.decimalToPrecision ('-165', TRUNCATE, '110', TICK_SIZE) === '-110');
    assert (exchange.decimalToPrecision ('-165', ROUND, '110', TICK_SIZE) === '-220');

    // ----------------------------------------------------------------------------
    // testDecimalToPrecisionErrorHandling (todo)
    //
    // throws (() =>
    //     decimalToPrecision ('123456.789', TRUNCATE, -2, DECIMAL_PLACES),
    //         'negative precision is not yet supported')
    //
    // throws (() =>
    //     decimalToPrecision ('foo'),
    //         "invalid number (contains an illegal character 'f')")
    //
    // throws (() =>
    //     decimalToPrecision ('0.01', TRUNCATE, -1, TICK_SIZE),
    //         "TICK_SIZE cant be used with negative numPrecisionDigits")

    // ----------------------------------------------------------------------------

    // todo
    // $this->assertSame (0,   Exchange::sum ());
    // $this->assertSame (2,   Exchange::sum (2));
    // $this->assertSame (432, Exchange::sum (2, 30, 400));
    // eslint-disable-next-line eol-last
    // $this->assertSame (439, Exchange::sum (2, null, [88], 30, '7', 400, null));
}

export default testDecimalToPrecision;
