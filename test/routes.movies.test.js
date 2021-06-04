const assert = require('assert')
const { request } = require('http')
const proxyquire = require('proxyquire')

const { moviesMock, MoviesServiceMock } = require('../utils/mocks/movies.js')
const testServer = require('../utils/testServer')

describe('routes - movies', function() {
  const route = proxyquire('../routes/movies', {
    '../services/movies': MoviesServiceMock
  })

  const request = testServer(route)
  describe('Get movies', function () {
    it('should response with status 200', function(done) {
      request.get('/api/movies').expect(200, done)
    })

    it('should response with the list of movies', function(done) {
      request.get('/api/movies').end((err, res) => {
        assert.deepEqual(res.body, {
          data: moviesMock,
          message: 'movies listed'
        })

        done()
      })
    })
  })
})
