import { useEffect } from "react";
import { enrichPlayers } from "../functions/PlayerFunctions";
import { filterPlayers, filterByPos } from "../functions/PlayerFunctions";
import { getPosPanelId } from "../functions/PositionPanelFunctions";
import styles from '../styles/PositionPanel.module.css'
import PlayerTable from "./PlayerTable/PlayerTable";
import { Card } from "react-bootstrap";

export function PositionPanel({ players, pos, draftedMap, setDraftedMap, pickNum,
    setPickNum, draftPos, numTeams }) {

    const [filteredPlayers, firstPickId] = enrichPlayers(
        filterPlayers(players, filterByPos(pos)),
        draftedMap, pickNum, draftPos, numTeams
    )

    useEffect(() => {
        const element = document.getElementById(getPosPanelId(pos))
        if (element)
            element.scrollTo({
                top: 0,
                behavior: 'smooth',
            })
    })

    return <Card>
        <Card.Body>
            <div id={getPosPanelId(pos)} className={styles.pos_panel_div}>
                <PlayerTable
                    players={filteredPlayers}
                    draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                    pickNum={pickNum} setPickNum={setPickNum}
                />
            </div>
        </Card.Body>
    </Card>
}