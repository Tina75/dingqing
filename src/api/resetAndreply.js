import {URL} from 'api/config'
import axios from 'axios'
import qs from 'qs'

export function backup () { // 备份
  const url = URL + '/Backup/backup'
  return axios.get(url)
}

export function restore (time) { // 恢复
  let data = {
    date: time
  }
  const url = URL + '/Backup/restore'
  return axios.post(url, qs.stringify(data))
}
