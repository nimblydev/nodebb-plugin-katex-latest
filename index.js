/*
 * LaTeX NodeBB Plugin
 * Add support of inline LaTeX expressions inside posts with katex
 */
(function() {
	'use strict';

	var winston = module.parent.require('winston');
	var katex = require("./katex/katex.js");

	/**
	 * Render inline LaTeX expressions : `$expr$` with Katex
	 * @param {string} html
	 * @returns the modified html content with
	 */
	function renderLatex(html) {

		if (!html || typeof html !== "string") return '';

		return html.replace(/\$(\S[^\$\n\r]*)\$/g, function(expr, match) {

			try {
				return katex.renderToString(match);
			} catch (err) {
				// signal the parse error with a red color instead of inside the log
				return "<span title='Syntax error in math expression' style='color: red'>" + expr + "</span>";
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

		renderRaw: function(raw, callback) {
			callback(null, renderLatex(raw));
		},
	};

})();
