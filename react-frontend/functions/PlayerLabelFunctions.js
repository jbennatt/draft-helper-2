export const allPositions='ALL'
export const qb = 'QB'
export const rb = 'RB'
export const wr = 'WR'
export const te = 'TE'
export const flex = 'FLEX'
export const qbte = "QBTE"
export const pk = 'K'
export const dst = 'DST'
export const positions = [allPositions, qb, rb, wr, te, flex, pk, dst]

export function getPosClass(pos) {
    switch (pos.trim().toUpperCase()) {
        case wr: return 'table-success'
        case rb: return 'table-primary'
        case te: return 'table-warning'
        case qb: return 'table-danger'
        case 'DEF':
        case dst:
            return 'table-info'
        case 'PK':
        case pk:
            return 'table-secondary'
        default: return 'table-light'
    }
}

export function stripNumFromPos(pos) {
    const strippedPos = pos.replace(/[0-9]/g, '')
    return strippedPos
}