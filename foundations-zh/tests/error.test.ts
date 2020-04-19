import { parseError } from '../src/index'

function testErrorReport (browser: string) {
  const fixtureStack = new TypeError(`Error raised`)
  if (browser === 'firefox') {
    // set userAgent
    const customUserAgent = 'firefox';
    Object.defineProperty(navigator, 'userAgent', {
      value: customUserAgent
    })
    fixtureStack.stack = `
      bar@http://192.168.31.8:8000/c.js:2:9
      foo@http://192.168.31.8:8000/b.js:4:15
      calc@http://192.168.31.8:8000/a.js:4:3
      <anonymous>:1:11
      http://192.168.31.8:8000/a.js:22:3
    `
  } else {
    fixtureStack.stack = `TypeError: Error raised
      at bar http://192.168.31.8:8000/c.js:2:9
      at foo http://192.168.31.8:8000/b.js:4:15
      at calc http://192.168.31.8:8000/a.js:4:3
      at <anonymous>:1:11
      at http://192.168.31.8:8000/a.js:22:3
    `
  }
  
  return parseError(fixtureStack)
}


describe('test error handler', () => {
  it('test errorJson in chrome', () => {
    expect(testErrorReport('chrome')).toEqual({
      message: 'Error raised',
      stack: [
        {
          line: 2,
          column: 9,
          filename: 'http://192.168.31.8:8000/c.js'
        }
      ]
    })
  })
  it('test errorJson in firefox', () => {
    expect(testErrorReport('firefox')).toEqual({
      message: 'Error raised',
      stack: [
        {
          line: 2,
          column: 9,
          filename: 'http://192.168.31.8:8000/c.js'
        }
      ]
    })
  })
})