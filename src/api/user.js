import {URL} from 'api/config'
import axios from 'axios'
import qs from 'qs'

export function login (username, password) {
  const url = URL + '/Session/login'
  const data = {
    username: username,
    password: password
  }
  return axios.post(url, qs.stringify(data))
}

export function register (username, password) {
  const url = URL + '/Session/registor'
  const data = {
    username: username,
    password: password
  }
  return axios.post(url, qs.stringify(data))
}

export function logout () {
  const url = URL + '/Session/logout'
  return axios.get(url)
}

export function search (id) {
  const url = URL + '/Session/search'
  const data = {
    id: id
  }
  return axios.post(url, qs.stringify(data))
}

export function modifyUser (data) {
  const url = URL + '/Session/modifyUser'
  return axios.post(url, qs.stringify(data, { indices: false }))
}
