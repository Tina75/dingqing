import {URL} from 'api/config'
import axios from 'axios'
import qs from 'qs'

export function search (data) {
  const url = URL + '/Archives/search'
  return axios.post(url, qs.stringify(data))
}

export const exportString = URL + '/Archives/export'

export function importExcel (fd, config) {
  const url = URL + '/Archives/importExcel'
  return axios.post(url, fd, config)
}

export function softDelete (data) {
  console.log(data)
  const url = URL + '/Archives/hardDelete'
  return axios.post(url, qs.stringify(data, { indices: false }))
}

export function insertClick (data) {
  const url = URL + '/Archives/insert'
  return axios.post(url, qs.stringify(data))
}

export function updateClick (data) {
  const url = URL + '/Archives/update'
  return axios.post(url, qs.stringify(data))
}
