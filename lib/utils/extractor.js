const allowedParameters = ['subject']

let extractionResult

/**
 *
 * @param template
 * @param parameters
 * @returns { template, ...parameters}
 */
function extractor (template, parameters) {
  extractionResult = { templateWithoutParameters: template}
  parameters.forEach(extractParameter)

  return extractionResult
}

/**
 *
 * @param parameter
 */
function extractParameter (parameter) {
  let match

  if (!allowedParameters.includes(parameter)) {
    throw new Error(`Unsupported parameter used - ${parameter}`)
  }

  switch (parameter) {
    case 'subject':
      match = extractionResult.templateWithoutParameters.match(/\[SUBJECT:(.*)]/)

      if (match) {
        extractionResult.templateWithoutParameters = extractionResult.templateWithoutParameters.replace(match[0], '').trimLeft()
        extractionResult[parameter] = match[1].trim()
        return
      }
  }
  throw new Error(`${parameter} parameter not found in template`)
}

module.exports = extractor