export function hideShowElement(id, boolean) {
    return {
        type: 'HIDE_SHOW_ELEMENT',
        payload: {
            boolean: boolean
        }
    }
}