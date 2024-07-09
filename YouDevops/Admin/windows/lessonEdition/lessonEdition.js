document.addEventListener("DOMContentLoaded", async function() {
    try {
        const courseId = sessionStorage.getItem('selectedCourseId');
        if (!courseId) {
            throw new Error('No se ha encontrado un ID de curso seleccionado en sessionStorage.');
        }

        const response = await fetch(`http://localhost:3000/api/lessons/${courseId}`);
        if (!response.ok) {
            throw new Error('Error al obtener las lecciones del curso.');
        }
        
        const lessons = await response.json();
        console.log('Lecciones obtenidas:', lessons);


        const lessonsSection = document.getElementById('lessonsSection');
        if (!lessonsSection) {
            throw new Error('No se encontró el elemento con ID "lessonsSection" en el DOM.');
        }


        lessonsSection.innerHTML = '';// Limpiar cualquier contenido previo en la sección de lecciones


        lessons.forEach(lesson => {
            const lessonSection = document.createElement('section');
            lessonSection.classList.add('lesson');

            const lessonDescriptionDiv = document.createElement('div');
            lessonDescriptionDiv.classList.add('lesson_description');

            const lessonTitleLink = document.createElement('a');
            lessonTitleLink.classList.add('title_button');
            lessonTitleLink.href = `../../windows/content/conten1.html?id=${lesson.id}`;
            lessonTitleLink.textContent = lesson.titulo;

            lessonTitleLink.addEventListener('click', (event) => {
                handleEnter(event, lesson.id);
            });

            const deleteIcon = document.createElement('i');
            deleteIcon.id = 'delete';
            deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-lg');
            deleteIcon.style.color = '#ffd43b';
            deleteIcon.addEventListener('click', () => deleteLesson(lesson.id));




            const editIcon = document.createElement('i');
            editIcon.id = 'edit';
            editIcon.classList.add('fa-solid', 'fa-pen', 'fa-lg');
            editIcon.style.color = '#ffd43b';
            editIcon.addEventListener('click', () => editLesson(lesson.id));

            const editLink = document.createElement('a');
            editLink.appendChild(editIcon);

            lessonDescriptionDiv.appendChild(lessonTitleLink);
            lessonDescriptionDiv.appendChild(deleteIcon);
            lessonDescriptionDiv.appendChild(editLink);

            lessonSection.appendChild(lessonDescriptionDiv);
            lessonsSection.appendChild(lessonSection);
        });
    } catch (error) {
        console.error('Error al obtener y renderizar las lecciones:', error);
    }
});

async function deleteLesson(lessonId) {
    try {
        const response = await fetch(`http://localhost:3000/api/deleteLesson/${lessonId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log(`Lección ${lessonId} eliminada correctamente.`);
            alert('Lección eliminada correctamente');
            window.location.reload();
        } else {
            console.error('Error al eliminar la lección:', response.status);
            alert('Error al eliminar la lección');
        }
    } catch (error) {
        console.error('Error al eliminar la lección:', error);
        alert('Error al eliminar la lección');
    }
}

function editLesson(lessonId) {
    sessionStorage.setItem('selectedLessonId', lessonId);
    window.location.href = '../lessonEdition/contentEdicion/contentEdition.html';
}

function handleEnter(event, lessonId) {
    event.preventDefault();
    console.log("ENTRO A LA FUNCION");
    sessionStorage.setItem('selectedLessonId', lessonId);
    window.location.href = `../../../Usuario/windows/content/conten1.html?id=${lessonId}`;
}
