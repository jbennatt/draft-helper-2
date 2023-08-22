import { PositionPanel } from "./PositionPanel"
import { qb, wr, rb, te, flex, dst } from "../functions/PlayerLabelFunctions"
import { Container, Row, Col } from "react-bootstrap"

export default function PositionGrid(
    {
        players, draftedMap, setDraftedMap, pickNum, setPickNum, draftPos, numTeams
    }) {
    return <Container fluid>
        <Row>
            <Col>
                <PositionPanel
                    players={players}
                    pos={qb} draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                    pickNum={pickNum} setPickNum={setPickNum} draftPos={draftPos}
                    numTeams={numTeams}
                />
            </Col>
            <Col>
                <PositionPanel
                    players={players}
                    pos={wr} draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                    pickNum={pickNum} setPickNum={setPickNum} draftPos={draftPos}
                    numTeams={numTeams}
                />
            </Col>
            <Col>
                <PositionPanel
                    players={players}
                    pos={rb} draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                    pickNum={pickNum} setPickNum={setPickNum} draftPos={draftPos}
                    numTeams={numTeams}
                />
            </Col>
        </Row>
        <Row>
            <Col>
                <PositionPanel
                    players={players}
                    pos={te} draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                    pickNum={pickNum} setPickNum={setPickNum} draftPos={draftPos}
                    numTeams={numTeams}
                />
            </Col>
            <Col>
                <PositionPanel
                    players={players}
                    pos={flex} draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                    pickNum={pickNum} setPickNum={setPickNum} draftPos={draftPos}
                    numTeams={numTeams}
                />
            </Col>
            <Col>
                <PositionPanel
                    players={players}
                    pos={dst} draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                    pickNum={pickNum} setPickNum={setPickNum} draftPos={draftPos}
                    numTeams={numTeams}
                />
            </Col>
        </Row>
    </Container>
}