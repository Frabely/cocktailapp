export const removeItemFromIndex = (array: any[], item: any) => {
    const indexToRemove: number = array.indexOf(item)
    if (indexToRemove === -1) return undefined
    array.splice(indexToRemove, 1)
    return array
}
export default removeItemFromIndex
