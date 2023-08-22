import { allPositions, flex, wr, rb, te } from "./PlayerLabelFunctions"

/**
 * This should return the enriched players along with the id (player name) 
 * that is your next pick (if everyone goes in order)
 * @param {*} allPlayers 
 * @param {*} draftedMap 
 * @param {*} pickNum 
 * @param {*} draftPos 
 */
export function enrichPlayers(allPlayers, draftedMap, pickNum, draftPos, numTeams, resetRank = false) {
    const _isYourPick = isYourPick(draftPos, numTeams)
    let playerCount = 0
    let firstPick = null

    const enrichedPlayers = allPlayers.map(player => {
        player.drafted = draftedMap.get(player.name)
        player.isYourPick = false
        player.currentRank = resetRank ? 0 : player.currentRank
        player.value = resetRank ? 0 : player.value

        if (!player.drafted) {
            player.isYourPick = _isYourPick(pickNum + playerCount++)
            firstPick = !firstPick ? player.name : firstPick
            if (resetRank) {
                player.currentRank = playerCount
                player.value = computeValue(player, pickNum)
            }
        }
        return player
    })

    return [enrichedPlayers, firstPick]
}

export function filterPlayers(players, ...filterFunctions) {
    return players.filter(player => true &&
        filterFunctions.reduce(
            (acc, filterFunction) => acc && filterFunction(player),
            true
        )
    )
}

export function filterByPos(pos) {
    return player => {
        if (pos == allPositions) return true

        const strippedPos = stripNumFromPos(player.position)
        return strippedPos === pos ||
            (pos === flex &&
                (strippedPos === rb || strippedPos === wr || strippedPos === te)
            )
    }
}

export function filterByIncludeDrafted(includeDrafted) {
    return player => includeDrafted || !player.drafted
}

export function filterBySearchName(searchValue) {
    return player => {
        return searchValue.trim().length === 0 ||
            player.name.toLowerCase().includes(searchValue.toLowerCase())
    }
}

export function initDraftedMap(players) {
    return new Map(players.map(
        player => [player.name, false]
    ))
}

export function togglePlayerDrafted(player, draftedMap, setDraftedMap, pickNum, setPickNum) {
    const drafted = draftedMap.get(player.name)
    if (pickNum && setPickNum) {
        if (drafted) setPickNum(pickNum - 1)
        else setPickNum(pickNum + 1)
    }
    draftedMap.set(player.name, !drafted)
    setDraftedMap(new Map(draftedMap))
}

function stripNumFromPos(pos) {
    const strippedPos = pos.replace(/[0-9]/g, '')
    return strippedPos
}

function isYourPick(draftPos, numTeams) {
    const secondRoundPos = numTeams + numTeams - draftPos + 1
    return pick => {
        // need to verify that draftPos + 2n * numTeams = pick
        // OR secondRoundPos + 2n * numTeams = pick
        const draftDiff = pick - draftPos
        const secondRoundDiff = pick - secondRoundPos

        return (draftDiff % numTeams == 0 && draftDiff / numTeams % 2 == 0) ||
            (secondRoundDiff % numTeams == 0 && secondRoundDiff / numTeams % 2 == 0)
    }
}

function computeValue(player, pickNum) {
    // return player.rank - pickNum + 1
    return pickNum - player.rank
}

export function convertFFP(ffpPlayers) {
    return ffpPlayers.map(player => {
        const newPlayer = {}
        newPlayer.name = player.player_name
        newPlayer.rank = player.rk
        newPlayer.position = player.pos
        return newPlayer
    })
}