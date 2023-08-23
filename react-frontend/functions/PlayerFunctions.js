import { allPositions, flex, wr, rb, te } from "./PlayerLabelFunctions"

/**
 * This should return the enriched players along with the id (player name) 
 * that is your next pick (if everyone goes in order)
 * @param {*} allPlayers 
 * @param {*} draftedMap 
 * @param {*} pickNum 
 * @param {*} draftPos 
 */
export function enrichPlayers(allPlayers, draftedMap, pickNum, draftPos,
    numTeams, resetRank = false) {
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
            const newBoundaries = _getPickBoundaries(pickNum - 1 + player.currentRank)

            if (newBoundaries.match) {
                player.isYourPick = true
                // set pickBoundaries so that the next pick will show as unchanged (
                // note: could still find an exact match

                // compute for 1 more than above (i.e. remove the -1)
                pickBoundaries = _getPickBoundaries(pickNum + player.currentRank)
            } else if (!areBoundariesEqual(newBoundaries.even, pickBoundaries.even) ||
                !areBoundariesEqual(newBoundaries.odd, pickBoundaries.odd)) {
                // if the boundaries have changed, you've moved to the next pick 
                // and should mark this as "your pick"
                player.isYourPick = true
                pickBoundaries = newBoundaries // update current boundaries
            } else if (playerCount === 1 &&
                _afterFirstPick(pickNum + player.currentRank - 1, pickNum)) {
                // the first player may not be a pick, but COULD be your next
                // possible pick if their current rank is above your next pick.
                player.isYourPick = true

                // same as above for when we find a match--make sure next pick
                //  doesn't register a change (only mark if it's an exact match)
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
        else if (!drafted) setPickNum(pickNum + 1)
    }
    draftedMap.set(player.name, !drafted)
    setDraftedMap(new Map(draftedMap))
}

function stripNumFromPos(pos) {
    const strippedPos = pos.replace(/[0-9]/g, '')
    return strippedPos
}

/**
 * Currently unused.
 * 
 * Returns a function that determines whether or not a pick number is "your pick"
 * given your draft position and number of teams (the constructed function holds
 * that information)
 * 
 * @param {U} draftPos 
 * @param {*} numTeams 
 * @returns 
 */
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

/**
 * Returns a function that takes a pick number and finds the lower and upper
 * bounds for both "odd" or "even" rounds AND whether or not that pick was 
 * EXACTLY one of your picks.
 * 
 * @param {*} draftPos 
 * @param {*} numTeams 
 * @returns 
 */
function getPickBoundaries(draftPos, numTeams) {
    const secondRoundPos = numTeams + numTeams - draftPos + 1
    const teams2X = 2 * numTeams

    return pick => {
        /*
         * We know that given d, a number which is DEFINITELY your pick, you
         * will always have picks with number: d + 2n * N, where N is the number
         * of teams.
         * 
         * We split your picks into "odds" and "evens" (literally since the 
         * root draftPos corresponds to rounds 1, 3, etc. and the secondRoundPos
         * corresponds to rounds 2, 4, etc.)
         * 
         * Solve equation pick = draftPos + 2n * N --> n = (pick - draftPos) / 2N
         * 
         * Same goes for odd rounds (with root secondRoundPos)
         * 
         * This gives a decimal number in general (it might give an exact 
         * integer which means it's exactly one of your picks).
         */
        const closestOdd = (pick - draftPos) / teams2X
        const closestEven = (pick - secondRoundPos) / teams2X

        // check whether or not there is an exact match: check both odd and even
        const match = pick === (draftPos + Math.round(closestOdd) * teams2X) ||
            pick === (secondRoundPos + Math.round(closestEven) * teams2X)

        // return even and odd boundaries and whether or not it was an exact match
        return newPickBoundarySet(
            newPickBoundaries(Math.floor(closestOdd), Math.ceil(closestOdd)),
            newPickBoundaries(Math.floor(closestEven), Math.ceil(closestEven)),
            match
        )
    }
}

/**
 * Returns a function that takes the rank and pickNum to determine whether or
 * not that rank occurs after your first pick.
 * 
 * @param {*} draftPos 
 * @param {*} numTeams 
 * @returns 
 */
function afterFirstPick(draftPos, numTeams) {
    const _getPickBoundaries = getPickBoundaries(draftPos, numTeams, true)
    const secondRoundPos = numTeams + numTeams - draftPos + 1
    const teams2X = 2 * numTeams

    return (rank, pickNum) => {
        // find the closest pick that is your pick that's below this rank:

        // get the odd and even boundaries, then pick the larger of the two lower bounds
        const bothBounds = _getPickBoundaries(rank)
        const lowerEven = draftPos + bothBounds.even.low * teams2X
        const lowerOdd = secondRoundPos + bothBounds.odd.low * teams2X
        const lowerClosest = lowerEven > lowerOdd ? lowerEven : lowerOdd

        // if your pick below this rank is BEFORE the pick, you can pick this
        // person up
        return lowerClosest > pickNum
    }
}

function newPickBoundarySet(oddBounds, evenBounds, match) {
    return {
        'odd': oddBounds,
        'even': evenBounds,
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