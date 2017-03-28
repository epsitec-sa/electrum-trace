/* global describe it */

import {expect} from 'mai-chai';
import {Trace} from 'electrum-trace';

/******************************************************************************/

describe ('Trace', () => {
  describe ('class', () => {
    it ('contains static implementation', () => {
      expect (Trace.log).to.be.function ();
    });
  });
});

/******************************************************************************/
