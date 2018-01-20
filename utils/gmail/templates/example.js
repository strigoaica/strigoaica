module.exports = (payload) => {
  let subject = 'Meaning of life, the universe, and everything'

  let html = `
    <div style="text-align:center">
      <h1 style="font-weight:initial">
        <strong>${payload.answer}</strong>
      </h1>
    </div>
  `

  return { subject, html }
}
