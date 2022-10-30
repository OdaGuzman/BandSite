let targetDiv = document.querySelector('.comments__target');
let form = document.getElementById('commentsForm');
let inputName = document.getElementById('inputName');
let inputComment = document.getElementById('inputComment');

function insideGetRequest(response) {
    response.data.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp))
    console.log(response.data)
    targetDiv.innerText = ''
    populateComments(response.data)
}

function displayComment(comment) {

    const commentWrapper = document.createElement('div');
    commentWrapper.classList.add('comments__singlecomment');

    const leftSide = document.createElement('div');
    leftSide.classList.add('comments__left');

    const profile = document.createElement('div');
    profile.classList.add('comments__profile');

    const like = document.createElement('i');
    like.classList.add('fa', 'fa-heart', 'comments__icon', 'comments__heart');

    const num_likes = document.createElement('p');
    num_likes.classList.add('comments__likes');
    num_likes.innerText = comment['likes'];

    const del = document.createElement('i');
    del.classList.add('fa', 'fa-trash-o', 'comments__icon', 'comments__can');

    const textWrapper = document.createElement('div');
    textWrapper.classList.add('comments__textwrapper');

    const header = document.createElement('div');
    header.classList.add('comments__header');

    const nameTag = document.createElement('p');
    nameTag.classList.add('comments__name');
    nameTag.innerText = comment['name'];

    const dateTag = document.createElement('p');
    dateTag.classList.add('comments__date');

    let d = new Date(comment['timestamp']);
    let date = (d.getMonth() + 1) + '/' + d.getDate() + '/' + d.getFullYear();
    dateTag.innerText = date;

    const commentTag = document.createElement('p');
    commentTag.classList.add('comments__text');
    commentTag.innerText = comment['comment'];

    header.appendChild(nameTag)
    header.appendChild(dateTag)

    textWrapper.appendChild(header)
    textWrapper.appendChild(commentTag)

    leftSide.appendChild(profile)
    leftSide.appendChild(like)
    leftSide.appendChild(num_likes)
    leftSide.appendChild(del)
    commentWrapper.appendChild(leftSide)
    commentWrapper.appendChild(textWrapper)

    targetDiv.appendChild(commentWrapper)

    like.addEventListener('click', (event) => {
        like.classList.add('comments__heart--selected')
        console.log(event)
        axios.put(`${apiURL}/comments/${comment['id']}/like${apiKey}`)
            .then((response) => {
                return axios.get(`${apiURL}/comments${apiKey}`)
            })
            .then((response) => {
                insideGetRequest(response);
            })
            .catch((error) => {
                console.log(error)
            })
        like.classList.add('comments__heart--selected')
    })

    del.addEventListener('click', (event) => {
        axios.delete(`${apiURL}/comments/${comment['id']}${apiKey}`)
            .then((response) => {
                console.log(response)
                alert('Comment deleted!')
                return axios.get(`${apiURL}/comments${apiKey}`)
            })
            .then(response => {
                insideGetRequest(response);
            })
            .catch((error) => {
                console.log(error)
            })
    })
}

function populateComments(array) {
    array.forEach(displayComment)
}


const apiURL = 'https://project-1-api.herokuapp.com'
const apiKey = '?api_key="2a1263c5-1d30-4e6a-b987-c760cf792625"';
axios.get(`${apiURL}/comments${apiKey}`)
    .then((response) => {
        insideGetRequest(response);
    })
    .catch((error) => {
        console.log(error)
    })



form.addEventListener('submit', function (event) {

    event.preventDefault();

    inputName.classList.remove('comments__input--alert')
    inputComment.classList.remove('comments__input--alert')

    if (event.target.name.value == '') {
        inputName.classList.add('comments__input--alert')
    } else if (event.target.comment.value == '') {
        inputComment.classList.add('comments__input--alert')
    }
    else {

        let commentObject = {
            name: event.target.name.value,
            comment: event.target.comment.value
        }

        axios.post(`${apiURL}/comments${apiKey}`, commentObject)
            .then((response) => {
                console.log(response)
                alert("Comment posted")
                return axios.get(`${apiURL}/comments${apiKey}`)
            })
            .then((response) => {
                insideGetRequest(response)
            })
            .catch((error) => {
                console.log(error)
            })

        form.reset();
    }
})
