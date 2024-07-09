const button = document.querySelector("#login_id");
button.addEventListener('click', handleLogin);

async function handleLogin(event) {
    event.preventDefault();
    const name = document.getElementById('name_input').value;
    const password = document.getElementById('password_input').value;
    console.log("ENTRO A LA FUNCION DE LOGIN")

    
    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "nombre": name,
            "contrasenia": password })
    }); 
    
    const data = await response.json();
    console.log(data);
    
    if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        const user = JSON.parse(localStorage.getItem('user'));
        console.log(user);
        window.location.href = '../courses/courses.html';
        
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

