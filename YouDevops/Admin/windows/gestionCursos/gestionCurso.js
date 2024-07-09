document.addEventListener("DOMContentLoaded", async function() {
    const courseList = document.getElementById('courseList');

    try {
        const response = await fetch('http://localhost:3000/api/courses');
        if (!response.ok) {
            throw new Error('Error al obtener los cursos');
        }
        const courses = await response.json();

        courses.forEach(course => {
            const courseDiv = document.createElement('div');
            courseDiv.classList.add('item_courses');
            courseDiv.id = `course-${course.id}`;

            const title = document.createElement('h2');
            title.id = 'title';
            title.textContent = course.titulo;

            const deleteIcon = document.createElement('i');
            deleteIcon.id = 'delete';
            deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-lg');
            deleteIcon.style.color = '#ffd43b';
            console.log(course.id);
            deleteIcon.addEventListener('click', () => deleteCourse(course.id));


            const editIcon = document.createElement('i');
            editIcon.id = 'edit';
            editIcon.classList.add('fa-solid', 'fa-pen', 'fa-lg');
            editIcon.style.color = '#ffd43b';
            editIcon.addEventListener('click', () => editCourse(course.id));

            const editLink = document.createElement('a');
            editLink.appendChild(editIcon);

            courseDiv.appendChild(title);
            courseDiv.appendChild(deleteIcon);
            courseDiv.appendChild(editLink);

            courseList.appendChild(courseDiv);
        });
    } catch (error) {
        console.error('Error al cargar los cursos:', error);
    }
});

async function deleteCourse(courseId){
    try{
        const response = await fetch(`http://localhost:3000/api/deleteCourse/${courseId}`, {
            method: 'DELETE',
        });

        console.log("curso eliminado: ", courseId);
        if(response.ok){
            alert('Curso eliminado correctamente');
        }else{
            alert('Error al eliminar el curso');
        }

        document.getElementById(`course-${courseId}`).remove();
        console.log('Curso eliminado correctamente:', courseId	)
    }catch(error){
        console.error('Error al eliminar curso:', error);
    }

}

function editCourse(courseId) {
    sessionStorage.setItem('selectedCourseId', courseId);
    window.location.href = '../courseEdition/courseEdition.html';
}




document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('courseForm');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const title = document.getElementById('title_field').value;
        const description = document.getElementById('description').value;
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

        console.log('image:', image);

        try {
            const response = await fetch('http://localhost:3000/api/addCourses', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                console.log('Course created successfully:', data);
                window.location.reload();
            } else {
                console.error('Failed to create course:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

});