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
            courseImage.src = course.rutaimagen; // Ajusta la ruta según sea necesario
            courseImage.alt = course.titulo;

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('information_course');

            const courseTitle = document.createElement('h3');
            courseTitle.textContent = course.titulo;

            const courseDescription = document.createElement('p');
            courseDescription.classList.add('content');
            courseDescription.textContent = course.descripcion;



            infoDiv.appendChild(courseTitle);
            infoDiv.appendChild(courseDescription);


            courseDiv.appendChild(courseImage);
            courseDiv.appendChild(infoDiv);

            courseDiv.addEventListener('click', function() {
                infoDiv.classList.toggle('active');
            });

            coursesSection.appendChild(courseDiv);

        });

    } catch (error) {
        console.error('Error al obtener cursos:', error);
    }
});