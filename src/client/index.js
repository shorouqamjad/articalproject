document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const url = document.getElementById('url').value;
        const errorElement = document.getElementById('results');

        const urlPattern = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
        if (!urlPattern.test(url)) {
            errorElement.innerHTML = '<p>Invalid URL format.</p>';
            return;
        }

        await handleSubmit(event);
    });
});
