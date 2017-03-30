/* global describe it beforeEach afterEach */

import {expect} from 'mai-chai';
import {Trace} from 'electrum-trace';

const saveLog = console.log;

/******************************************************************************/

describe ('Trace', () => {

  beforeEach (() => Trace.reset ());
  afterEach (() => console.log = saveLog);

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
      let output;
      console.log = text => output = text;
      Trace.log ('hello');
      expect (output).to.equal ('hello');
    });
  });

  describe ('intercept()', () => {
    it ('intercepts Trace.log()', () => {
      let output1, output2;
      console.log = text => output1 = text;
      Trace.intercept ('log', text => output2 = text);
      Trace.log ('hello');
      expect (output1).to.equal ('hello');
      expect (output2).to.equal ('hello');
    });
    it ('with invalid name throws an exception', () => {
      expect (() => Trace.intercept ('foo')).to.throw ();
    });
    it ('then reset() restores Trace.log()', () => {
      let output1, output2;
      console.log = text => output1 = text;
      Trace.intercept ('log', text => output2 = text);
      Trace.reset ();
      Trace.log ('hello');
      expect (output1).to.equal ('hello');
      expect (output2).to.be.undefined ();
    });
    it ('then clear() removes any logging from Trace.log()', () => {
      let output1, output2;
      console.log = text => output1 = text;
      Trace.intercept ('log', text => output2 = text);
      Trace.clear ();
      Trace.log ('hello');
      expect (output1).to.be.undefined ();
      expect (output2).to.be.undefined ();
    });
    it ('then clear("info", "errror") does not remove logging from Trace.log()', () => {
      let output1, output2;
      console.log = text => output1 = text;
      Trace.intercept ('log', text => output2 = text);
      Trace.clear ('info', 'error');
      Trace.log ('hello');
      expect (output1).to.equal ('hello');
      expect (output2).to.equal ('hello');
    });
  });
});

/******************************************************************************/
