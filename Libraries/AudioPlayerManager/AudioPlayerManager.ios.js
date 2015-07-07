/**
 * @providesModule AudioPlayerManager
 * @flow
 */
'use strict';

var NativeAudioPlayerManager = require('NativeModules').AudioPlayerManager;
var invariant = require('invariant');

/**
 * High-level docs for the AudioPlayerManager iOS API can be written here.
 */

var AudioPlayerManager = {
  test: function() {
    NativeAudioPlayerManager.test();
  }
};

module.exports = AudioPlayerManager;
