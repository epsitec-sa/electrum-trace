/* global console */
/* eslint no-console: 0 */

/******************************************************************************/

function getDefaults () {
  let defaults = {};
  defaults.log   = [ (...args) => console.log.apply (console, args) ];
  defaults.info  = [ (...args) => console.info.apply (console, args) ];
  defaults.warn  = [ (...args) => console.warn.apply (console, args) ];
  defaults.error = [ (...args) => console.error.apply (console, args) ];
  defaults.dir   = [ (...args) => console.dir.apply (console, args) ];
  return defaults;
}

function getEmptyDefaults () {
  let defaults = {};
  defaults.log   = [];
  defaults.info  = [];
  defaults.warn  = [];
  defaults.error = [];
  defaults.dir   = [];
  return defaults;
}

/******************************************************************************/

let defaults = getDefaults ();

/******************************************************************************/

export class Trace {
  static log (...args) {
    defaults.log.forEach (x => x (...args));
  }

  static info (...args) {
    defaults.info.forEach (x => x (...args));
  }

  static warn (...args) {
    defaults.warn.forEach (x => x (...args));
  }

  static error (...args) {
    defaults.error.forEach (x => x (...args));
  }

  static dir (...args) {
    defaults.dir.forEach (x => x (...args));
  }

  static reset () {
    defaults = getDefaults ();
  }

  static clear (...names) {
    if (arguments.length === 0) {
      defaults = getEmptyDefaults ();
    } else {
      names.forEach (name => {
        if (name && defaults[name]) {
          defaults[name] = [];
        } else if (name) {
          throw new TypeError (`${name} is not an interceptable method name`);
        }
      });
    }
  }

  static intercept (name, func) {
    if (name && defaults[name]) {
      defaults[name].unshift (func);
    } else {
      throw new TypeError (`${name} is not an interceptable method name`);
    }
  }
}

/******************************************************************************/
