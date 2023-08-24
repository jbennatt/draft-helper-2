import { headerFields } from '../../functions/TableFields'
import { getPosClass, stripNumFromPos } from '../../functions/PlayerLabelFunctions'
import { togglePlayerDrafted } from '../../functions/PlayerFunctions'
import labelStyles from '../../styles/PlayerTable/PlayerLabel.module.css'

export default function PlayerLabel({ player, draftedMap, setDraftedMap, pickNum, setPickNum }) {
    return (
        <tr
            className={`${labelStyles.player_label} ${getPosClass(stripNumFromPos(player.position))} ${player.isYourPick ? labelStyles.your_pick : ''} ${player.drafted ? labelStyles.drafted : labelStyles.undrafted}`}
            onClick={() => togglePlayerDrafted(player, draftedMap, setDraftedMap, 
                pickNum, setPickNum)}
        >
            {
                headerFields.map(field =>
                    <td key={field.header}>{player[field.playerKey]}</td>
                )
            }
        </tr>
    )
}