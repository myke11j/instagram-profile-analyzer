/**
 * @description Validates if input string by user is valid instagram URL or handle or not
 */

'use strict'

module.exports = {
    isInstagramURL: (input) => {
        const regex = /^(https:\/\/www\.instagram\.com)([^\s]+)/gm;
        return regex.test(input)
    },

    /**
     * @desc This helper only validates if input had space or some other domain than instagram
     */
    isInstagramHandle: (input) => {
        const regex = /^([^\s]+)/gm;
        return regex.test(input)
    }
}