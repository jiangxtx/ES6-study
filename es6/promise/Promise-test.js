/**
 * Created by 仲夏 on 2018/6/22.
 */


new Promise(resolve => {
  console.log('promise begin[1]...')

  setTimeout(() => {
    console.log(`[1]`)
    resolve('well down[1]')
  }, 2000)
})
  .then(data => {
    return new Promise(resolve => {
      console.log(`[2]` + data)
      resolve('well down[21]')

      setTimeout(() => {
        console.log(`[2-setTimeout]`)
        resolve('well down[22]')
      }, 2000)
    })
  })
  .then(data => {
    console.log('33' + data)
  })


var promise = new Promise(resolve => {
  setTimeout(() => {
    console.log('VAR promise fullfilled!')
    resolve('VAR promise data')
  }, 5000)
})

setTimeout(() => {
  promise.then(data => console.log(data))
}, 6500)


// Promise error handler
new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('Promise error...')
    // throw new Error('wrong msg')
    reject('wrong msg')
  }, 1000)
})
  .then(
    data => console.log('Error-line-OK: ' + data),
    error => console.log('then-Error: ' + error)
  )
  .catch(error => console.log('catch-Error: ' + error))
  .then(data => console.log('then-after-catch: ' + data))