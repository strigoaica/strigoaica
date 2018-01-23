const caseHelper = require('case')
const toCamelCase = caseHelper.camel

/**
 *
 * @param {string} rawTemplate
 * @param {object} params
 * @returns {template, meta}
 */
function htmlProcessor (rawTemplate, params) {
  return {
    template: _replaceParams(rawTemplate, params),
    meta: _extractMeta(rawTemplate)
  }
}

/**
 *
 * @param rawTemplate
 * @param params
 * @returns {string | *}
 * @private
 */
function _replaceParams (rawTemplate, params = {}) {
  /** Remove meta */
  rawTemplate = rawTemplate
    .split('\n')
    .filter((l) => !l.startsWith('['))
    .join('\n')

  /** Extract unique mergeValues */
  let mergeValues = rawTemplate
    .match(/\*\|(\w*)\|\*/g)
    .reduce((acc, curr) => {
      if (!acc.includes(curr)) {
        acc.push(curr)
      }

      return acc
    }, [])

  /** Replace mergeValues with payloadValues */
  for (let i = mergeValues.length - 1; i >= 0; i--) {
    let mv = mergeValues[i]
    let param = params[toCamelCase(mv.slice(2, mv.length - 2))]
    mv = mv
      .replace(/\*/g, '\\*')
      .replace(/\|/g, '\\|')

    if (param) {
      rawTemplate = rawTemplate.replace(new RegExp(mv, 'g'), param)
      mergeValues.splice(i, 1)
    }
  }

  if (mergeValues.length) {
    throw new Error('[html-processor] Missing some parameters')
  }

  return rawTemplate
}

/**
 *
 * @param rawTemplate
 * @returns {{}}
 * @private
 */
function _extractMeta (rawTemplate) {
  return rawTemplate
    .split('\n')
    .filter((l) => l.startsWith('['))
    .map((l) => l.slice(1, l.length - 1).split(':', 2))
    .reduce((acc, curr) => {
      acc[toCamelCase(curr[0])] = curr[1].trim()
      return acc
    }, {})
}

module.exports = htmlProcessor
