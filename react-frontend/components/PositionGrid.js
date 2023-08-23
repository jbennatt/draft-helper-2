import { PositionPanel } from "./PositionPanel"
import { qb, wr, rb, te, flex, dst } from "../functions/PlayerLabelFunctions"
import { Container, Row, Col } from "react-bootstrap"

export default function PositionGrid({ players, draftedMap, setDraftedMap,
    pickNum, setPickNum, draftPos, numTeams }) {

    return <Container fluid>
        <Row>
            {
                [qb, wr, rb].map(pos =>
                    <Col key={pos}>
                        <PositionPanel
                            players={players} pos={pos}
                            draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                            pickNum={pickNum} setPickNum={setPickNum}
                            draftPos={draftPos} numTeams={numTeams}
                        />
                    </Col>
                )
            }
        </Row>
        <Row>
            {
                [te, flex, dst].map(pos =>
                    <Col key={pos}>
                        <PositionPanel
                            players={players} pos={pos}
                            draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                            pickNum={pickNum} setPickNum={setPickNum}
                            draftPos={draftPos} numTeams={numTeams}
                        />
                    </Col>
                )
            }
        </Row>
    </Container>
}