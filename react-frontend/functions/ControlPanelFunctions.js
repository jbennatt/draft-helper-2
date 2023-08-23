export const supportedNumTeams = [8, 10, 12]

export function computeRound(pickNum, numTeams) {
    return Math.floor((pickNum - 1) / numTeams) + 1
}

export function computePickInRound(pickNum, numTeams) {
    return ((pickNum - 1) % numTeams) + 1
}

export function updateIntegerEvent(selectionEvent, setValue, oldValue, validValues = null) {
    const newValue = parseInt(selectionEvent.target.innerText)
    if (newValue && newValue !== oldValue &&
        (!validValues || validValues.includes(newValue)))
        setValue(newValue)
}

export function updateStringEvent(selectionEvent, setValue, oldValue, validValues = null) {
    const newValue = selectionEvent.target.innerText
    if (newValue && newValue !== oldValue &&
        (!validValues || validValues.includes(newValue)))
        setValue(newValue)
}

export function incrementPickNum(currPick, setPickNum, inc) {
    const newPickNum = currPick + inc
    if(inc !== 0 && newPickNum > 0) setPickNum(newPickNum)
}