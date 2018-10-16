import {URL} from 'api/config'
import axios from 'axios'

export function slide () {
  const url = URL + '/Statistics/slide'
  return axios.get(url)
}
