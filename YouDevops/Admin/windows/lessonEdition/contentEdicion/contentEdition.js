document.addEventListener('DOMContentLoaded', async function() {
    const form = document.getElementById('formSection');
    const lessonId = sessionStorage.getItem('selectedLessonId');

    try {
        const response = await fetch(`http://localhost:3000/api/lesson/${lessonId}`);
        if (!response.ok) {
            throw new Error('Error al obtener la lección.');
        }

        const lesson = await response.json();
        console.log('Datos de la lección:', lesson);


        document.getElementById('course_name').value = lesson.title || '';
        document.getElementById('course_description').value = lesson.description || '';
        document.getElementById('course_video').value = lesson.videoUrl || '';
    } catch (error) {
        console.error('Error al obtener los datos de la lección:', error);
    }



    form.addEventListener('submit', async function(event) {
        event.preventDefault();


        const lessonId = sessionStorage.getItem('selectedLessonId');
        if (!lessonId) {
            console.error('No se encontró un ID de lección seleccionado en sessionStorage.');
            return;
        }

        const title = document.getElementById('course_name').value;
        const description = document.getElementById('course_description').value;
        const videoUrl = document.getElementById('course_video').value;


        const formData = {
            id: lessonId,
            title: title,
            description: description,
            videoUrl: videoUrl
        };

        try {
            const response = await fetch(`http://localhost:3000/api/updateLesson/${lessonId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar la lección.');
            }

            const updatedLesson = await response.json();
            console.log('Lección actualizada correctamente:', updatedLesson);

            alert('Lección actualizada correctamente.');
            window.location.href = '../lessonEdition.html';
        } catch (error) {
            console.error('Error al actualizar la lección:', error);
            alert('Error al actualizar la lección. Por favor, intenta nuevamente.');
        }
    });
});
