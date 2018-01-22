/**
 * Embedded payload into template by replacing placeholder values e.g *|VALUE|*
 * @param string template
 * @param {} payload
 * @returns string template
 */
function embeddor (template, payload) {
  const normalizedPayload = normalizePayload(payload)

  const templateValues = template.match(/\*\|(\w*)\|\*/g) // [*|VALUE1|*,*|VALUE2|*]
  templateValues.forEach(tValue => {
    const strippedValue = tValue.replace(/(^\*\||\|\*$)/g, '').toLowerCase() // *|VALUE|* => VALUE => value
    if (normalizedPayload[strippedValue]) {
      template = template.replace(tValue, normalizedPayload[strippedValue])
    }
  })
  return template
}

/**
 * Convert object keys to lowercase
 * @param {} payload
 * @returns {}
 */
function normalizePayload (payload) {
  return Object.keys(payload).reduce((accumulator, key) => {
    accumulator[key.toLowerCase()] = payload[key]

    return accumulator
  }, {})
}

module.exports = embeddor