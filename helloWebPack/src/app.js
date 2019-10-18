
document.addEventListener('click', function() {
  // import(/* webpackChunkName: 'use-lodash'*/ 'lodash').then(function(_) {
  //   console.log(_.join(['9', '11']))
  // })

  const element = document.createElement('div')
  element.innerHTML = 'Hello World'
  document.body.appendChild(element)
})

console.log('hello webPack!')
