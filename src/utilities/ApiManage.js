/**
 * Created by Hong HP on 6/28/21.
 */

export function getColor() {
  return fetch('http://www.colourlovers.com/api/colors/random?format=json', {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    return response.json().then(data => {
      console.log(data)
      return data
    })
  })
}

export function getImage() {
  return fetch('http://www.colourlovers.com/api/patterns/random?format=json', {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(response => {
    return response.json().then(data => {
      return data
    })
  })
}
