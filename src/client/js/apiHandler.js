const analyzeArticle = async (url) => {
  const response = await fetch('http://localhost:8081/analyze', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ url })
  });
  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
};

export { analyzeArticle };
