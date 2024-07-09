// public/script.js
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        try {
            const response = await fetch('/api/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (response.ok) {
                alert('Usuario creado exitosamente!');
            } else {
                alert(`Error: ${result.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear el usuario');
        }
    });
});
