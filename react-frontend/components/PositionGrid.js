import { PositionPanel } from "./PositionPanel"
import { qbte, wr, rb, flex, dst, pk } from "../functions/PlayerLabelFunctions"
import { Container, Row, Col } from "react-bootstrap"

export default function PositionGrid({ players, draftedMap, setDraftedMap,
    pickNum, setPickNum, draftPos, numTeams }) {

    return <Container fluid>
        <Row>
            {
                [flex, wr, rb].map(pos =>
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
                [qbte, dst, pk].map(pos =>
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