document.addEventListener("DOMContentLoaded", function() {

    console.log('ENTRO AL JAVASCRIPT')
    const courseId = sessionStorage.getItem('selectedCourseId'); 

    const createLessonForm = document.getElementById('createLessonForm');
    createLessonForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        const lessonTitle = document.getElementById('lesson_title').value;
        const lessonDescription = document.getElementById('lesson_description').value;
        const lessonVideo = document.getElementById('lesson_video').value;

        console.log('Título:', lessonTitle);
        console.log('Descripción:', lessonDescription);
        console.log('Video:', lessonVideo);
        console.log('ID del curso:', courseId);


        const lessonData = {
            titulo: lessonTitle,
            descripcion: lessonDescription,
            curso_id: courseId,
            urlVideo: lessonVideo
        };

        try {
            const response = await fetch('http://localhost:3000/api/addLessons', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(lessonData)
            });

            if (!response.ok) {
                throw new Error('Error al crear la lección');
            }

            const lesson = await response.json();
            console.log('Lección creada:', lesson);
            window.location.href = '../lessonEdition/lessonEdition.html';
        } catch (error) {
            console.error('Error al crear la lección:', error);
            alert('Error al crear la lección');
        }
    });
});
