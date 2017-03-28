/* global describe it */

import {expect} from 'mai-chai';
import {Trace} from 'electrum-trace';

/******************************************************************************/

describe ('Trace', () => {
  describe ('class', () => {
    it ('contains static implementation of log()', () => {
      expect (Trace.log).to.be.function ();
    });
    it ('contains static implementation of info()', () => {
      expect (Trace.info).to.be.function ();
    });
    it ('contains static implementation of warn()', () => {
      expect (Trace.warn).to.be.function ();
    });
    it ('contains static implementation of error()', () => {
      expect (Trace.error).to.be.function ();
    });
    it ('contains static implementation of dir()', () => {
      expect (Trace.dir).to.be.function ();
    });
  });

  /* global console */
  /* eslint no-console: 0 */

  describe ('method calls', () => {
    it ('log() calls console.log()', () => {
      const saveLog = console.log;
      let output;
      console.log = text => {
        output = text;
      };
      Trace.log ('hello');
      expect (output).to.equal ('hello');
      console.log = saveLog;
    });
  });

  describe ('intercept()', () => {
    it ('intercepts Trace.log()', () => {
      const saveLog = console.log;
      let output1;
      let output2;
      console.log = text => {
        output1 = text;
      };
      Trace.intercept ('log', text => {
        output2 = text;
      });
      Trace.log ('hello');

      console.log = saveLog;

      expect (output1).to.equal ('hello');
      expect (output2).to.equal ('hello');
    });
    it ('with invalid name throws an exception', () => {
      expect (() => Trace.intercept ('foo')).to.throw ();
    });
    it ('then reset() restores Trace.log()', () => {
      const saveLog = console.log;
      let output1;
      let output2;
      console.log = text => {
        output1 = text;
      };
      Trace.intercept ('log', text => {
        output2 = text;
      });
      Trace.reset ();
      Trace.log ('hello');

      console.log = saveLog;

      expect (output1).to.equal ('hello');
      expect (output2).to.be.undefined ();
    });
    it ('then clear() removes any logging from Trace.log()', () => {
      const saveLog = console.log;
      let output1;
      let output2;
      console.log = text => {
        output1 = text;
      };
      Trace.intercept ('log', text => {
        output2 = text;
      });
      Trace.clear ();
      Trace.log ('hello');

      console.log = saveLog;

      expect (output1).to.be.undefined ();
      expect (output2).to.be.undefined ();
    });
  });
});

/******************************************************************************/
