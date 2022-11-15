const url_api = "http://aula/apiAgrotips/public_html/api/";

const timeline = document.querySelector("#timeline");
const my_timeline = document.querySelector("#my-timeline");
const login_form = document.querySelector("#form-login");

var session_storage = false;

function login() {

    login_form.addEventListener("submit", (e) => {
        e.preventDefault();

        let dataForm = new FormData(login_form);
        let email = dataForm.get('email');
        let password = dataForm.get('password');
        fetch(url_api + `user/${email}/${password}`,
            {
                method: 'get',
            })
            .then(response => response.json())
            .then(json => {
                if (json.status == "success") {
                    console.log(json.data);
                    window.location.assign("./timeline.html");
                    sessionStorage.setItem("name", json.data.name);
                    sessionStorage.setItem("category", json.data.category);
                    sessionStorage.setItem("id_user", json.data.id_user);
                } else {
                    alert(json.data);
                }
            })
            .catch(err => console.log('Erro de solicitação', err));
    })

}

function listTimeline() {
    fetch(url_api + 'post', { method: 'get' })
        .then(response => response.json())
        .then(json => {
            json.data.forEach((post) => {
                timeline.innerHTML += `
            <section class="container text-dark bg-gray-800 shadow rounded mt-5 w-11/12">
            <div class="card-body">
                <div id="card-header" class="flex mb-3">
                    <div class="avatar">
                        <div class="w-12 h-12 mr-3 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                    <div id="card-name">
                    <h2 class="card-title">${post.name}</h2>
                    <h3>${post.category}</h3>
                    </div>
                </div>
                <p>${post.post_text}</p>
            </div>
            </section>
        `;
            })
        })
        .catch(err => console.log('Erro de solicitação', err));
}

function listMyTimeline(id, name, category) {
    fetch(url_api + 'post/' + id, { method: 'get' })
        .then(response => response.json())
        .then(json => {
            json.data.forEach((post) => {
                let day =  new Date(post.publish_day);
                my_timeline.innerHTML += `
            <section class="container text-dark bg-gray-800 shadow rounded mt-5 w-11/12">
            <div class="card-body">
                <div id="card-header" class="flex">
                    <div class="avatar">
                        <div class="w-12 h-12 mr-3 rounded-full">
                            <img src="https://placeimg.com/192/192/people" />
                        </div>
                    </div>
                    <div id="card-name">
                    <h2 class="card-title">${name}</h2>
                    <h3>${category}</h3>
                    </div>
                </div>
                <p>${post.post_text}</p>
                <div id="post-footer" class="text-end">
                    <button href="#" class="btn bg-red-800 text-white"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn bg-blue-800 text-white"><i class="fa-solid fa-pen-to-square"></i></button>
                    <br/>
                    <small class="text-muted">${day.format("dd/mm/yyyy")}</small>
                </div>
            </div>
            </section>
        `;
            })
        })
        .catch(err => console.log('Erro de solicitação', err));
}

function logout() {
    sessionStorage.clear();
    window.location.reload();
}