export default {
  // Functions return fixtures
  getRoot: () => {
    return {
      ok: true,
      data: require('../Data/Fixtures/root.json')
    }
  },
  getRate: () => {
    return {
      ok: true,
      data: require('../Data/Fixtures/rateLimit.json')
    }
  },
  getUser: (username) => {
    // This fixture only supports gantman or else returns skellock
    const gantmanData = require('../Data/Fixtures/gantman.json')
    const skellockData = require('../Data/Fixtures/skellock.json')
    return {
      ok: true,
      data: username.toLowerCase() === 'gantman' ? gantmanData : skellockData
    }
  }
}
