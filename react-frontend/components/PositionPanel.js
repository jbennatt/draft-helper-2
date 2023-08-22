import { enrichPlayers } from "../functions/PlayerFunctions";
import { filterPlayers, filterByPos } from "../functions/PlayerFunctions";
import styles from '../styles/PositionPanel.module.css'
import PlayerTable from "./PlayerTable";
import { useEffect, useRef } from "react";

export function PositionPanel(
    {
        players, pos, draftedMap, setDraftedMap, pickNum, setPickNum, draftPos, numTeams
    }) {

    // const { filteredPlayers, _ } = enrichPlayers(
    //     filterPlayers(players, filterByPos(pos)), draftedMap, pickNum, draftPos, numTeams
    // )

    const [filteredPlayers, firstPickId] = enrichPlayers(
        filterPlayers(players, filterByPos(pos)),
        draftedMap, pickNum, draftPos, numTeams
    )

    return <div className={styles.pos_panel_div}>
        <PlayerTable
            players={filteredPlayers}
            draftedMap={draftedMap} setDraftedMap={setDraftedMap}
            pickNum={pickNum} setPickNum={setPickNum}
        />
    </div>
}