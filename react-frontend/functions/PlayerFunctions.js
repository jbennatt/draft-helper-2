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
    // const _isYourPick = isYourPick(draftPos, numTeams)
    const _getPickBoundaries = getPickBoundaries(draftPos, numTeams)
    const _afterFirstPick = afterFirstPick(draftPos, numTeams)
    let playerCount = 1
    let firstPick = null

    let pickBoundaries = _getPickBoundaries(pickNum)

    const enrichedPlayers = allPlayers.map(player => {
        player.drafted = draftedMap.get(player.name)
        player.isYourPick = false
        player.currentRank = resetRank ? 0 : player.currentRank
        player.value = resetRank ? 0 : player.value

        if (!player.drafted) {
            if (resetRank) {
                player.currentRank = playerCount
                player.value = computeValue(player, pickNum)
            }
            // player.isYourPick = _isYourPick(pickNum - 1 + player.currentRank)
            const newBoundaries = _getPickBoundaries(pickNum - 1 + player.currentRank)

            if (newBoundaries.match) {
                player.isYourPick = true
                // set pickBoundaries so that the next pick will show as unchanged (
                // note: could still find an exact match

                // compute for 1 more than above (i.e. remove the -1)
                pickBoundaries = _getPickBoundaries(pickNum + player.currentRank)
            } else if (!areBoundariesEqual(newBoundaries.even, pickBoundaries.even) ||
                !areBoundariesEqual(newBoundaries.odd, pickBoundaries.odd)) {
                player.isYourPick = true
                pickBoundaries = newBoundaries
            } else if (playerCount === 1 && _afterFirstPick(pickNum + player.currentRank - 1, pickNum)) {
                player.isYourPick = true
                pickBoundaries = _getPickBoundaries(pickNum + player.currentRank)
            }

            firstPick = !firstPick ? player.name : firstPick
            ++playerCount
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
        if (drafted && pickNum > 1) setPickNum(pickNum - 1)
        else if(!drafted) setPickNum(pickNum + 1)
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

function getPickBoundaries(draftPos, numTeams, logging = false) {
    const secondRoundPos = numTeams + numTeams - draftPos + 1
    const teams2X = 2 * numTeams

    return pick => {
        const closestEven = (pick - draftPos) / teams2X
        const closestOdd = (pick - secondRoundPos) / teams2X
        // console.log(`pick ${pick} for draft ${draftPos} and ${numTeams} teams: ${closestEven}`)
        if (logging)
            console.log(`${pick}: even: ${closestEven} -> [${Math.floor(closestEven)},${Math.ceil(closestEven)}], ${closestOdd} -> odd: [${Math.floor(closestOdd)},${Math.ceil(closestOdd)}]`)

        const match = pick === (draftPos + Math.round(closestEven) * teams2X) ||
            pick === (secondRoundPos + Math.round(closestOdd) * teams2X)

        return newPickBoundarySet(
            newPickBoundaries(Math.floor(closestEven), Math.ceil(closestEven)),
            newPickBoundaries(Math.floor(closestOdd), Math.ceil(closestOdd)),
            match
        )
    }
}

function afterFirstPick(draftPos, numTeams) {
    const _getPickBoundaries = getPickBoundaries(draftPos, numTeams, true)
    const secondRoundPos = numTeams + numTeams - draftPos + 1
    const teams2X = 2 * numTeams

    return (rank, pickNum) => {
        const bothBounds = _getPickBoundaries(rank)
        const lowerEven = draftPos + bothBounds.even.low * teams2X
        const lowerOdd = secondRoundPos + bothBounds.odd.low * teams2X
        const lowerClosest = lowerEven > lowerOdd ? lowerEven : lowerOdd

        console.log(`lowerEven: ${lowerEven}, lowerOdd: ${lowerOdd}, pickNum: ${pickNum}`)

        return lowerClosest > pickNum
    }
}

function newPickBoundarySet(evenBounds, oddBounds, match) {
    return {
        'even': evenBounds,
        'odd': oddBounds,
        'match': match
    }
}

function newPickBoundaries(low, high) {
    return {
        'low': low,
        'high': high
    }
}

function areBoundariesEqual(b1, b2) {
    return b1.low === b2.low && b1.high === b2.high
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
        newPlayer.team = player.team
        return newPlayer
    })
}