'use strict'

const Env = use('Env')

module.exports = {
  sentry: {
    /* dns: url do sentry basicamente */
    dsn: Env.get('SENTRY_DSN')
  }
}
