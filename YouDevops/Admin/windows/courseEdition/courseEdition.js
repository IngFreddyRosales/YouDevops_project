document.addEventListener("DOMContentLoaded", async function () {
    const form = document.getElementById('courseForm');
    if (!form) {
        console.error("Formulario no encontrado");
        return;
    }

    const courseId = sessionStorage.getItem('selectedCourseId');
    
    if (!courseId) {
        alert('No se ha encontrado un ID de curso seleccionado en sessionStorage.');
        return;
    }

    try {
        // Obtener los datos del curso existente
        const response = await fetch(`http://localhost:3000/api/courses/${courseId}`);
        if (!response.ok) {
            throw new Error('Error al obtener los datos del curso.');
        }

        const course = await response.json();
        console.log('Datos del curso:', course);
        document.getElementById('course_name').value = course.titulo || '';
        document.getElementById('course_description').value = course.descripcion || '';
        document.getElementById('category').value = course.categorias_id || '';
    } catch (error) {
        console.error('Error al obtener los datos del curso:', error);
    }

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const title = document.getElementById('course_name').value;
        const description = document.getElementById('course_description').value;
        const image = document.getElementById('image').files[0];
        const category = document.getElementById('category').value;

        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Image:', image);
        console.log('Category:', category);

        const formData = new FormData();
        formData.append('titulo', title);
        formData.append('descripcion', description);
        formData.append('image', image);
        formData.append('categorias_id', category);

        try {
            const response = await fetch(`http://localhost:3000/api/updateCourse/${courseId}`, {
                method: 'PUT',
                body: formData
            });

            const data = await response.json();
            console.log('Datos de la respuesta:', data);

            if (response.ok) {
                console.log('Course updated successfully:', data);
                alert('Curso actualizado correctamente.');
                window.location.href = '../gestionCursos/gestionCursos.html'; // Redirigir a la lista de cursos
            } else {
                console.error('Failed to update course:', response.statusText);
                alert('Error al actualizar el curso.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al actualizar el curso.');
        }
    });
});
