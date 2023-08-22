import mainListStyles from '../styles/MainList.module.css'
import PlayerTable from './PlayerTable'

export default function MainList({ players, draftedMap, setDraftedMap, pickNum, setPickNum }) {
    return <div className={mainListStyles.main_list}>
        <PlayerTable 
        players={players} 
        draftedMap={draftedMap} setDraftedMap={setDraftedMap}
        pickNum={pickNum} setPickNum={setPickNum}
        />
    </div>
}