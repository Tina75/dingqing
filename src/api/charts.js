import {URL} from 'api/config'
import axios from 'axios'
import qs from 'qs'

export function statistics (data) {
  const url = URL + '/Statistics/statistics'
  return axios.post(url, qs.stringify(data))
}
