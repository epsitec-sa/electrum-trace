# Electrum Trace

The `Trace` class provides static tracing functions:

* `log()`, `info()`, `warn()` and `error()` which are by default forwarding
  to `console`.
* `dir()` which is by default forwarding to `console` too.

The user of `Trace` can reconfigure the tracing:

* `intercept(name, func)` &rarr; intercepts the _named_ call and calls `func`
  before calling the default. Multiple calls to `intercept` can be donc with
  the same `name`. The calls will be dispatched first to the last added funciton.
* `reset()` &rarr; resets to the default forwarding.
* `clear()` &rarr; clears all forwarding, making calls to `log()`, etc. equivalent
  to a no-op.
* `clear(name)` &rarr; clears the _named_ call; this replaces it with a no-op.

## How to use

Install with:

`npm install electrum-trace`

Import with:

```js
import Trace from 'electrum-trace';
```

and use like this:

```js
Trace.log ('Hello, world');

// With interception
Trace.intercept ('log', x => { /* do something */ });
Trace.log ('Hello, world');

// Resetting interception
Trace.reset ();
Trace.log ('Hello, world');

// Suppressing messages
Trace.clear ('log');
Trace.log ('Hello, world');
```
