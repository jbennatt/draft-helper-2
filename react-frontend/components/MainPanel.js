import { useState } from "react"
import { Container, Row, Col } from 'react-bootstrap'
import ControlPanel from "./ControlPanel"
import MainList from "./MainList"
import PositionGrid from "./PositionGrid"
import {
    enrichPlayers, filterPlayers, filterByPos, filterBySearchName, filterByIncludeDrafted,
    initDraftedMap
} from "../functions/PlayerFunctions"
import { allPositions } from "../functions/PlayerLabelFunctions"

export default function MainPanel({ players, lastUpdateDate }) {
    const [draftedMap, setDraftedMap] = useState(initDraftedMap(players))

    const [includeDrafted, setIncludeDrafted] = useState(false)
    const [pickNum, setPickNum] = useState(1)
    const [numTeams, setNumTeams] = useState(12)
    const [draftPos, setDraftPos] = useState(4)
    const [searchValue, setSearchValue] = useState('')
    const [searchPos, setSearchPos] = useState(allPositions)

    const [enrichedPlayers, _] = enrichPlayers(players, draftedMap, pickNum, draftPos, numTeams, true)
    // const enrichedPlayers = enrichPlayers(players, draftedMap, pickNum, draftPos, numTeams, true)

    return <div>
        <Container>
            <Row>
                <Col>
                    <ControlPanel
                        pickNum={pickNum} setPickNum={setPickNum}
                        lastUpdateDate={lastUpdateDate}
                        searchPos={searchPos} setSearchPos={setSearchPos}
                        searchValue={searchValue} setSearchValue={setSearchValue}
                        includeDrafted={includeDrafted} setIncludeDrafted={setIncludeDrafted}
                        draftPos={draftPos} setDraftPos={setDraftPos}
                        numTeams={numTeams} setNumTeams={setNumTeams}
                    />
                </Col>
            </Row>
            <Row>
                <Col md='auto'>
                    <MainList
                        players={filterPlayers(enrichedPlayers,
                            filterByPos(searchPos),
                            filterBySearchName(searchValue),
                            filterByIncludeDrafted(includeDrafted)
                        )}
                        draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                        pickNum={pickNum} setPickNum={setPickNum}
                    />
                </Col>
                <Col>
                    <PositionGrid
                        players={filterPlayers(enrichedPlayers, filterByIncludeDrafted(includeDrafted))}
                        draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                        pickNum={pickNum} setPickNum={setPickNum}
                        draftPos={draftPos} numTeams={numTeams}
                    />
                </Col>
            </Row>
        </Container>
    </div>
}