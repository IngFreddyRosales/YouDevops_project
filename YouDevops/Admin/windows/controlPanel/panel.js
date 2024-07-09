document.addEventListener("DOMContentLoaded", async function() {
    try {
        const usersResponse = await fetch('http://localhost:3000/api/countUsers');
        if (!usersResponse.ok) {
            throw new Error('Error al obtener el número de usuarios');
        }
        const usersData = await usersResponse.json();


        const coursesResponse = await fetch('http://localhost:3000/api/countCourses');
        if (!coursesResponse.ok) {
            throw new Error('Error al obtener el número de cursos');
        }
        const coursesData = await coursesResponse.json();


        const usersCountElement = document.querySelector('.stats .stat:nth-child(1) h2');
        const coursesCountElement = document.querySelector('.stats .stat:nth-child(2) h2');

        if (usersCountElement && coursesCountElement) {
            usersCountElement.textContent = usersData.count; 
            coursesCountElement.textContent = coursesData.count; 
        } else {
            throw new Error('No se encontraron los elementos ');
        }
    } catch (error) {
        console.error(error);
    }
});
