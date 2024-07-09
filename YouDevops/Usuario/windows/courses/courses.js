document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch('http://localhost:3000/api/courses');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const courses = await response.json();
        console.log('Cursos obtenidos:', courses);

        const coursesSection = document.getElementById('coursesSection');

        courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('course');

            const courseImage = document.createElement('img');
            courseImage.src = course.rutaimagen; 
            courseImage.alt = course.titulo;

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('information_course');

            const courseTitle = document.createElement('h3');
            courseTitle.textContent = course.titulo;

            const courseDescription = document.createElement('p');
            courseDescription.classList.add('content');
            courseDescription.textContent = course.descripcion;

            const enterButton = document.createElement('button');
            enterButton.classList.add('button');
            enterButton.textContent = 'Entrar';

            infoDiv.appendChild(courseTitle);
            infoDiv.appendChild(courseDescription);
            infoDiv.appendChild(enterButton);

            courseDiv.appendChild(courseImage);
            courseDiv.appendChild(infoDiv);

            courseDiv.addEventListener('click', function() {
                infoDiv.classList.toggle('active');
            });

            coursesSection.appendChild(courseDiv);

            // Add event listener to each enter button
            enterButton.addEventListener('click', function(event) {
                handleEnter(event, course.id);
            });
        });

    } catch (error) {
        console.error('Error al obtener cursos:', error);
    }
});

async function handleEnter(event, courseId) {
    event.preventDefault();
    console.log("ENTRO A LA FUNCION");

    // Save the course ID in sessionStorage
    sessionStorage.setItem('selectedCourseId', courseId);

    // Get the credential from localStorage and parse it
    const credential = JSON.parse(localStorage.getItem('user'));
    const credentialId = credential.id;
    const loginType = credential.type;

    try {
        // Fetch the user and administrator tables
        const userTableResponse = await fetch('http://localhost:3000/api/users');
        const adminTableResponse = await fetch('http://localhost:3000/api/adminTable');

        if (!userTableResponse.ok || !adminTableResponse.ok) {
            throw new Error('Error fetching user or admin table');
        }

        // Check if the credential exists in the user table
        const userTable = await userTableResponse.json();
        const userIds = userTable.map(user => user.id);
        const userExists = userIds.includes(credentialId);

        // Check if the credential exists in the administrator table
        const adminTable = await adminTableResponse.json();
        const adminIds = adminTable.map(admin => admin.id);
        const adminExists = adminIds.includes(credentialId);

        // Redirect based on the credential location
        if (userExists) {
            window.location.href = '../lesson/lessonList1.html';
        } else if (adminExists) {
            window.location.href = '../../../Admin/windows/lessonEdition/lessonEdition.html';
        } else {
            // Handle invalid credential case
            console.log('Invalid credential');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al intentar validar la credencial');
    }
}
