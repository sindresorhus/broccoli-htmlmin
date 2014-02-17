'use strict';
var Filter = require('broccoli-filter');
var RSVP = require('rsvp');
var Minimize = require('minimize');

function HtmlminFilter(inputTree, options) {
	if (!(this instanceof HtmlminFilter)) {
		return new HtmlminFilter(inputTree, options);
	}

	this.inputTree = inputTree;
	this.minimize = new Minimize(options);
}

HtmlminFilter.prototype = Object.create(Filter.prototype);
HtmlminFilter.prototype.constructor = HtmlminFilter;

HtmlminFilter.prototype.extensions = ['html'];
HtmlminFilter.prototype.targetExtension = 'html';

HtmlminFilter.prototype.processString = function (str) {
	return new RSVP.Promise(function(resolve, reject) {
		this.minimize.parse(str, function (err, data) {
			if (err) {
				return reject(err);
			}

			resolve(data);
		});
	}.bind(this));
};

module.exports = HtmlminFilter;
