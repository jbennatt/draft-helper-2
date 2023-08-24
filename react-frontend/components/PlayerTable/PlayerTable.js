import { Table } from 'react-bootstrap'
import { headerFields } from '../../functions/TableFields'
import PlayerLabel from './PlayerLabel'

export default function PlayerTable({ players, draftedMap, setDraftedMap, pickNum, setPickNum }) {
    return <Table hover size='sm'>
        <thead className='thead-dark sticky-top' style={{ 'zIndex': '1' }}>
            <tr>
                {headerFields.map(field => (
                    <th key={field.header}>{field.header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {
                players.map(player => <PlayerLabel
                    key={player.name} player={player}
                    draftedMap={draftedMap} setDraftedMap={setDraftedMap}
                    pickNum={pickNum} setPickNum={setPickNum}
                />)
            }
        </tbody>
    </Table>
}