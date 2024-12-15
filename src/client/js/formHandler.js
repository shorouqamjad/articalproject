async function handleSubmit(event) {
  event.preventDefault();

  const url = document.getElementById('url').value;

  // Simple URL validation (optional)
  const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
  if (!urlPattern.test(url)) {
    document.getElementById('results').innerHTML = '<p>Invalid URL format.</p>';
    return;
  }

  try {
    const response = await fetch('http://localhost:8081/analyze', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    document.getElementById('results').innerHTML = `
      <p>Polarity: ${data.score_tag || 'N/A'}</p>
      <p>Subjectivity: ${data.subjectivity || 'N/A'}</p>
      <p>Text: ${data.sentence_list && data.sentence_list[0] ? data.sentence_list[0].text : 'N/A'}</p>
    `;
  } catch (error) {
    document.getElementById('results').innerHTML = '<p>An error occurred. Please try again.</p>';
    console.error("Error:", error);
  }
}

export { handleSubmit };
