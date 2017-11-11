![nobebb version compatibility](https://packages.nodebb.org/api/v1/plugins/nodebb-plugin-chats-global/compatibility.png)


# nodebb-plugin-katex-latest

Just a leaner version of `nodebb-plugin-katex` with no admin pannel or options whatsoever..
and a focus at keeping in sync with the latest (stable) version of Katex, which is currently the [v0.8.3](https://github.com/Khan/KaTeX/releases/tag/v0.8.3)

## Syntax
the usual LaTeX syntax for inline math expression is to surround your maths with `$` like this : `I'm speaking maths : $E = MC^2$`

## Ignored blocks

LaTeX expressions inside `<code>` or `<pre>` blocks will be _ignored and not rendered_ because these blocks are used to display source code.

If you use the `nodebb-plugin-markdown`, that means that `nodebb-plugin-katex-latest` must be called _after_ (this way it will receive html)

And the the way to write exemples of katex code is to surround them in `

## Update to a new version of katex

If you spot a different version of katex that you'd want to use,
just replace the katex javascript file inside `katex/` and include an updated reference to the external stylesheet inside `katex.less`
