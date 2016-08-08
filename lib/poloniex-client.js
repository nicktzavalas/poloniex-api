'use strict';

const https = require('https');

const POLONIEX_PUBLIC_API_URL = 'https://poloniex.com/public';

const POLONIEX_TRADING_API_URL = 'https://poloniex.com/tradingApi';

function request(url, callback) {
    https.get(url, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            if (data.indexOf('"error":')) {
                var err = JSON.parse(data);
                callback(new Error(err.error));
            } else {
                callback(null, data);
            }
        });
    }).on('error', function (err) {
        callback(err);
    });
}

var PoloniexClient = function () {};

// Returns the ticker for all markets
// Call: https://poloniex.com/public?command=returnTicker
PoloniexClient.prototype.returnTicker = function (callback) {
    request(POLONIEX_PUBLIC_API_URL + '?command=returnTicker', callback);
};

// Returns the 24-hour volume for all markets, plus totals for primary currencies.
// Call: https://poloniex.com/public?command=return24hVolume
PoloniexClient.prototype.return24Volume = function (callback) {
    request(POLONIEX_PUBLIC_API_URL + '?command=return24hVolume', callback);
};

// Returns the order book for a given market, as well as a sequence number for use with the Push API and an indicator specifying whether the market
// is frozen. You may set currencyPair to "all" to get the order books of all markets.
// Call: https://poloniex.com/public?command=returnOrderBook&currencyPair=BTC_NXT&depth=10
PoloniexClient.prototype.returnOrderBook = function (options, callback) {
    var url = POLONIEX_PUBLIC_API_URL + '?command=returnOrderBook';
    if (options.hasOwnProperty('currencyPair')) {
        url += '&currencyPair=' + options.currencyPair;
    }
    if (options.hasOwnProperty('depth')) {
        url += '&depth=' + options.depth;
    }
    request(url, callback);
};

// Returns the past 200 trades for a given market, or up to 50,000 trades between a range specified in UNIX timestamps by the "start" and "end" GET
// parameters.
// Call: https://poloniex.com/public?command=returnTradeHistory&currencyPair=BTC_NXT&start=1410158341&end=1410499372
PoloniexClient.prototype.returnTradeHistory = function (options, callback) {
    var url = POLONIEX_PUBLIC_API_URL + '?command=returnTradeHistory';
    if (options.hasOwnProperty('currencyPair')) {
        url += '&currencyPair=' + options.currencyPair;
    }
    if (options.hasOwnProperty('start')) {
        url += '&start=' + options.start;
    }
    if (options.hasOwnProperty('end')) {
        url += '&end=' + options.end;
    }
    request(url, callback);
};

// Returns candlestick chart data. Required GET parameters are "currencyPair", "period" (candlestick period in seconds; valid values are 300, 900,
// 1800, 7200, 14400, and 86400), "start", and "end". "Start" and "end" are given in UNIX timestamp format and used to specify the date range for the
// data returned.
// Call: https://poloniex.com/public?command=returnChartData&currencyPair=BTC_XMR&start=1405699200&end=9999999999&period=14400
PoloniexClient.prototype.returnChartData = function (options, callback) {
    var url = POLONIEX_PUBLIC_API_URL + '?command=returnChartData';
    if (options.hasOwnProperty('currencyPair')) {
        url += '&currencyPair=' + options.currencyPair;
    }
    if (options.hasOwnProperty('start')) {
        url += '&start=' + options.start;
    }
    if (options.hasOwnProperty('end')) {
        url += '&end=' + options.end;
    }
    if (options.hasOwnProperty('period')) {
        url += '&period=' + options.period;
    }
    request(url, callback);
};

// Returns information about currencies.
// Call: https://poloniex.com/public?command=returnCurrencies
PoloniexClient.prototype.returnCurrencies = function (callback) {
    request(POLONIEX_PUBLIC_API_URL + '?command=returnCurrencies', callback);
};

// Returns the list of loan offers and demands for a given currency, specified by the "currency" GET parameter.
// Call: https://poloniex.com/public?command=returnLoanOrders&currency=BTC
PoloniexClient.prototype.returnLoanOrders = function (options, callback) {
    var url = POLONIEX_PUBLIC_API_URL + '?command=returnLoanOrders';
    if (options.hasOwnProperty('currency')) {
        url += '&currency=' + options.currency;
    }
    request(url, callback);
};

module.exports = PoloniexClient;
