document.addEventListener("DOMContentLoaded", async function() {
    try {
        const lessonId = sessionStorage.getItem('selectedLessonId');
        if (!lessonId) {
            throw new Error('No se ha encontrado un ID de lección seleccionado en sessionStorage.');
        }

        const response = await fetch(`http://localhost:3000/api/lesson/${lessonId}`);
        if (!response.ok) {
            throw new Error('Error al obtener la lección.');
        }

        const lesson = await response.json();
        console.log('Datos de la lección:', lesson);


        let videoUrl = lesson.urlvideo;
        if (!videoUrl) {
            throw new Error('No se encontró la URL del video en los datos de la lección.');
        }

        const videoId = getVideoId(videoUrl);
        if (!videoId) {
            throw new Error('La URL del video es inválida.');
        }


        renderLessonContent(lesson, videoId);

    } catch (error) {
        console.error('Error al obtener y renderizar la lección:', error);
    }
});

function getVideoId(url) {
    const videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
    console.log(JSON.stringify(videoid));
    if (videoid != null) {
        return videoid[1];
    }
    return null;
}

function renderLessonContent(lesson, videoId) {

    const titleElement = document.querySelector('.title');
    const descriptionElement = document.querySelector('.description');
    const videoAreaElement = document.querySelector("#video_area");

    titleElement.textContent = lesson.titulo;
    console.log(lesson.descripcion);
    descriptionElement.textContent = lesson.descripcion;

    const iframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>`;
    videoAreaElement.innerHTML = iframe;

}
