
import './css/base.css'
//import './scss/main.scss'
import { helloWebPack } from './vendor/util'
console.log(helloWebPack())


document.addEventListener('click', function() {
  // import(/* webpackChunkName: 'use-lodash'*/ 'lodash').then(function(_) {
  //   console.log(_.join(['9', '11']))
  // })

  const element = document.createElement('div')
  element.innerHTML = 'Hello World'
  document.body.appendChild(element)

  var app = document.getElementById('app')
  var div = document.createElement('div')
  div.className = 'box'
  app.appendChild(div)
})

