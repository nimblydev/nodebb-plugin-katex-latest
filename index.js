/*
 * LaTeX NodeBB Plugin
 * Add support of inline LaTeX expressions inside posts with katex
 */
(function() {
	'use strict';

	var winston = module.parent.require('winston');
	var katex = require("./katex/katex.js");
	var _KATEX_OPTIONS = {
		throwOnError: false
	}

	/**
	 * Render inline LaTeX expressions : `$expr$` with Katex
	 * @param {string} html
	 * @returns the modified html content with
	 */
	function renderLatex(html) {

		if (!html || typeof html !== "string") return '';

		// We will store and count the <code> and <pre> content
		// where LaTeX expressions must not be parsed !
		var codeKeeper = {},
			codeCount  = 0;

		function keep(expr) { // take a matching expression and store it
			let key = "@@" + (++codeCount) + "@@"; // increment counter
			codeKeeper[key] = expr;
			return key;
		}
		function restore(key) { // take a key and restore the matching expression
			return codeKeeper[key];
		}

		// Keep code outside the search scope
		html = html.replace(/<pre>([\s\S]*?)<\/pre>/g, keep);
		html = html.replace(/<code>(.+)<\/code>/g, keep);

		winston.verbose("After code put aside : " + html);

		// replace LaTeX expression by their katex rendering
		html = html.replace(/\$(\S[^\$\n\r]*)\$/g, function(expr, match) {

			try {
				return katex.renderToString(match, _KATEX_OPTIONS);
			} catch (err) {
				// signal the parse error with a red color instead of inside the log
				return "<span title='Syntax error in math expression' style='color: red'>" + expr + "</span>";
			}
		});

		// Restore portions of code that was put aside
		if (codeCount) {
			html = html.replace(/@@\d+@@/g, restore);
		}

		return html;
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
