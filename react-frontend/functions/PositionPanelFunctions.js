export function getPosPanelId(pos) {
    return `${pos}_panel_id`
}

export function scrollPanel(pos) {
    const element = document.getElementById(getPosPanelId(pos))
    if (element)
        element.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
}