/**
 * @param {Object} championData
 * @returns {Object}
 */

export const buildPositionIndex = (championData) => {
    const positionIndex = {}

    Object.keys(championData).forEach((lane) => {
        Object.entries(championData[lane]).forEach(([champKey, rate]) => {
            if (!positionIndex[champKey]) {
                positionIndex[champKey] = []
            }
            positionIndex[champKey].push({ lane, rate })
        })
    })

    Object.keys(positionIndex).forEach((champKey) => {
        positionIndex[champKey].sort((a, b) => b.rate - a.rate)
    })

    return positionIndex
}

/**
 * @param {string} champKey
 * @param {Object} positionIndex
 * @returns {Array}
 */

export const getChampionLanes = (champKey, positionIndex) => positionIndex[champKey] || []
