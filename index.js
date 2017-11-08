/*
 * LaTeX NodeBB Plugin
 * Add support of inline LaTeX expressions with katex
 */
(function() {
	'use strict';

	var winston = module.parent.require('winston');
	var plugins = module.parent.require('./plugins');
	var katex = require("./katex/katex.js");

	/**
	 * Render inline LaTeX expressions (`$expr$`) with Katex
	 * @param {*} text
	 */
	function renderLatex(text) {

		if (!text || typeof text !== "string") return '';

		return text.replace(/\$(\S[^\$\n\r]*)\$/g, function(expr, match) {

			try {
				return katex.renderToString(match);
			} catch (err) {
				//winston.error(err);
				return "<span style='color: red'>" + expr + "</span>";
			}
		});
	}

	module.exports = {

		renderPost: function(data, callback) {
			if (data && data.postData && data.postData.content) {
				data.postData.content = renderLatex(data.postData.content);
			}
			callback(null, data);
		},

		parseRaw: function(raw, callback) {
			winston.info("nodebb-plugin-latex parseRaw()");
			callback(null, renderLatex(raw));
		},
	};

})();
