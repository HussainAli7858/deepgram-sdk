
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { DeepgramSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = DeepgramSDK.test()
    equal(testsdk instanceof DeepgramSDK, true,
      'DeepgramSDK.test() must return a client synchronously')
  })

})
