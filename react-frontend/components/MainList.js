import mainListStyles from '../styles/MainList.module.css'
import PlayerTable from './PlayerTable'
import { enrichPlayers } from '../functions/PlayerFunctions'

export default function MainList({ players, draftedMap, setDraftedMap,
    pickNum, setPickNum, draftPos, numTeams }) {

    const [enrichedPlayers, _] = enrichPlayers(players, draftedMap, pickNum, draftPos, numTeams)

    return <div className={mainListStyles.main_list}>
        <PlayerTable
            players={enrichedPlayers}
            draftedMap={draftedMap} setDraftedMap={setDraftedMap}
            pickNum={pickNum} setPickNum={setPickNum}
        />
    </div>
}