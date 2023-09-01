import { enrichPlayers } from "../functions/PlayerFunctions";
import { filterPlayers, filterByPos } from "../functions/PlayerFunctions";
import { getPosPanelId, scrollPanel } from "../functions/PositionPanelFunctions";
import styles from '../styles/PositionPanel.module.css'
import PlayerTable from "./PlayerTable/PlayerTable";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

export function PositionPanel({ players, pos, draftedMap, setDraftedMap, pickNum,
    setPickNum, draftPos, numTeams }) {

    const filteredPlayers = enrichPlayers(
        filterPlayers(players, filterByPos(pos)),
        draftedMap, pickNum, draftPos, numTeams
    )

    return <Card>
        <Card.Body>
            <Container>
                <Row>
                    <Col>
                        <div className='float-end'>
                            <Button size='sm' onClick={() => scrollPanel(pos)}>Reset</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div id={getPosPanelId(pos)} className={styles.pos_panel_div}>
                            <PlayerTable
                                players={filteredPlayers}
                                draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                                pickNum={pickNum} setPickNum={setPickNum}
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
        </Card.Body>
    </Card>
}