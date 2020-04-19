import { parseError } from '../../index'
import { ErrorMessage } from '../../types/type'

// test error
const fixtureStack: TypeError = new TypeError(`Error raised`)
fixtureStack.stack = `TypeError: Error raised
    at bar http://192.168.31.8:8000/c.js:2:9
    at foo http://192.168.31.8:8000/b.js:4:15
    at calc http://192.168.31.8:8000/a.js:4:3
    at <anonymous>:1:11
    at http://192.168.31.8:8000/a.js:22:3
  `
const errorJson1: ErrorMessage = parseError(fixtureStack)

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
const errorJson2: ErrorMessage = parseError(fixtureStack)

window.onload = function (): void {
  const $outputEl: HTMLElement | null = document.querySelector('#output')
  $outputEl && ($outputEl.innerHTML =
    `// chrome<br/>${JSON.stringify(errorJson1)}<br/>// firefox<br/>${JSON.stringify(errorJson2)}`)
}