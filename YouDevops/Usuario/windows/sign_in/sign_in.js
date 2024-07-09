const button = document.querySelector("#sign_in_id");
button.addEventListener('click', handleSignIn);

async function handleSignIn(event) {
    event.preventDefault();
    const name = document.getElementById('name_input').value;
    const last_name = document.getElementById('last_name_input').value;
    const email = document.getElementById('email_input').value;
    const password = document.getElementById('password_input').value;
    console.log("ENTRO A LA FUNCION DE SIGN IN")

    const response = await fetch('http://localhost:3000/api/signIn', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            "nombre": name,
            "apellido": last_name,
            "correo": email,
            "contrasenia": password })
    });

    const data = await response.json();
    console.log(data);

    if(response.ok){
        window.location.href = '../log_in/log_in.html';
    } else{
        alert('Algun campo no cumple con la validacion');
    }
    


}
