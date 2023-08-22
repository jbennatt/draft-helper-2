import useSWR from 'swr'
import axios from 'axios'
import { convertFFP } from '../functions/PlayerFunctions'
import MainPanel from '../components/MainPanel'
import staticData from './ffp-rankings-underscores.json'

const jsonPath = 'http://jaredbennatt.com/draft-helper/data/json/rankings.json'

const fetchUpdatedJson = url => axios.get(url, {
  // query URL without using browser cache
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
}).then(res => res.data)

// const fetchUpdatedJson = url => { return staticData}

export default function Draft_Helper2() {
  // const { data, error } = useSWR(jsonPath, fetchUpdatedJson)
  const data = staticData

  // if (error) return <div>Failed to Load Player Data: {error.toString()}</div>
  if (!data) return <div><h1>Loading Player Data...</h1></div>

  return <MainPanel players={convertFFP(data.players)} lastUpdateDate={data.last_update}/>

}
