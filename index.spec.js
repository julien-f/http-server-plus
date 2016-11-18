'use strict'

/* eslint-env mocha */

// ===================================================================

var expect = require('chai').expect
var tcpBind = require('tcp-bind')

var HttpServerPlus = require('./')

// ===================================================================

describe('HttpServerPlus', function () {
  describe('#create()', function () {
    it('creates a new instance', function () {
      expect(HttpServerPlus.create()).to.be.an.instanceof(HttpServerPlus)
    })

    it('can register a `request` listener', function () {
      var listener = function () {}
      var server = HttpServerPlus.create(listener)

      expect(server.listeners('request')).to.have.members([listener])
    })
  })

  describe('.addresses()', function () {
    it('returns the list of addresses the server is listening at')
  })

  describe('.niceAddresses()', function () {
    it('returns the list of human readable addresses the server is listening at')
  })

  // TODO
  describe('.listen()', function () {
    it('can use a host:port')
    it('can use a systemd socket', function () {
      var SD_LISTEN_FDS_START = 3

      var server = HttpServerPlus.create()
      var fd = tcpBind(0)

      var env = process.env
      env.LISTEN_FDS = fd - SD_LISTEN_FDS_START + 1
      env.LISTEN_PID = process.pid

      return server.listen({
        systemdSocket: fd - SD_LISTEN_FDS_START // systemd fds start at 3 but we have not control over it in Node.
      }).then(function () {
        delete env.LISTEN_FDS
        delete env.LISTEN_PID

        return server.close()
      })
    })
    it('can use a socket')
    it('can use a HTTPS certificate')
    it('returns a promise which will resolve once listening')
    it('returns a promise which will reject if failure')
  })

  describe('.close()', function () {
    it('closes all servers')
    it('emit the `close` event when all servers are closed')
    it('emit the `close` event even if there are no servers')
  })

  // TODO
  it('can be used exactly like `{http,https}.Server`')
})
