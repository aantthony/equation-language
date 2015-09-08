# Overview

Equation-Language is a completely stateless programming language.

In Equation-Language, expressions are evaluated inside a context, and cannot modify that context in any way.

Example:

```js

var context = new Context()

var expr = context.parse('y = Sin[x + y + z]')

console.log(expr.dump())

var simplified = expr.eval()

console.log(simplified.dump())


```

Output:

```
Equal[
|   y,
|   Sin[
|   |   Plus[
|   |   |   Plus[
|   |   |   |   x,
|   |   |   |   y
|   |   |   ],
|   |   |   z
|   |   ]
|   ]
]

...

Equal[
|   y,
|   Sin[
|   |   Plus[
|   |   |   x,
|   |   |   y,
|   |   |   z
|   |   ]
|   ]
]
```
