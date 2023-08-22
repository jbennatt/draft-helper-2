import { Container, Row, Col, Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap"
import {
    computeRound, computePickInRound, incrementPickNum, updateStringEvent, updateIntegerEvent,
    supportedNumTeams
} from "../functions/ControlPanelFunctions"
import { positions } from "../functions/PlayerLabelFunctions"
import { SearchBar } from "./SearchBar"

export default function ControlPanel({ pickNum, setPickNum, numTeams, setNumTeams,
    draftPos, setDraftPos, searchPos, setSearchPos, lastUpdateDate, setSearchValue,
    includeDrafted, setIncludeDrafted }) {

    const currentRound = computeRound(pickNum, numTeams)
    const currentPickInRound = computePickInRound(pickNum, numTeams)

    return <Container fluid>
        <Row>
            <Col md='auto'>
                <h1>Round {currentRound}.{currentPickInRound}, Pick &#35;{pickNum}</h1>
            </Col>
            <Col md='auto'>
                <Button size='sm'
                    onClick={() => incrementPickNum(pickNum, setPickNum, 1)}
                    as={ButtonGroup} variant='danger'>
                    Add Pick
                </Button>
                <Button size='sm'
                    onClick={() => incrementPickNum(pickNum, setPickNum, -1)}
                    as={ButtonGroup} variant='danger'>
                    Takeaway Pick
                </Button>
            </Col>
            <Col md='auto'>
                <h5>Updated: {lastUpdateDate}</h5>
            </Col>
        </Row>
        <Row>
            <Col md='auto'>
                <SearchBar setSearchValue={setSearchValue} includeDrafted={includeDrafted} setIncludeDrafted={setIncludeDrafted} />
            </Col>
            <Col md='auto'>
                <DropdownButton size='sm' title={`Position (${searchPos})`} onClick={event => updateStringEvent(event, setSearchPos, searchPos, positions)} variant='secondary'>
                    {positions.map(pos =>
                        <Dropdown.Item key={pos}>{pos}</Dropdown.Item>
                    )}
                </DropdownButton>
            </Col>
            <Col md='auto'>
                <DropdownButton size='sm' title={`Draft Position (${draftPos})`} onClick={event => updateIntegerEvent(event, setDraftPos, draftPos)} variant='secondary'>
                    {
                        [...Array(numTeams).keys()].map(index =>
                            <Dropdown.Item key={index}>{index + 1}</Dropdown.Item>
                        )
                    }
                </DropdownButton>
            </Col>
            <Col md='auto'>
                <DropdownButton size='sm' title={`Number of Teams (${numTeams})`}
                    onClick={event => updateIntegerEvent(event, setNumTeams, numTeams, supportedNumTeams)}
                    variant='secondary'>
                    {
                        supportedNumTeams.map(numTeams =>
                            <Dropdown.Item key={numTeams}>{numTeams}</Dropdown.Item>
                        )
                    }
                </DropdownButton>
            </Col>
        </Row>
    </Container>
}