let section = document.getElementById('shows');
let target = document.getElementById('target');
let tablet = window.matchMedia("(min-width: 768px)");

function displayShows(shows) {
    const headings = document.createElement('ul');
    headings.classList.add('shows__headings');

    const titleDate = document.createElement('li');
    titleDate.classList.add('shows__subtitle--heading');
    titleDate.innerText = 'DATE';

    const titleVenue = document.createElement('li');
    titleVenue.classList.add('shows__subtitle--heading');
    titleVenue.innerText = 'VENUE';

    const titleLocation = document.createElement('li');
    titleLocation.classList.add('shows__subtitle--heading');
    titleLocation.innerText = 'LOCATION';

    const hidden = document.createElement('div');
    hidden.classList.add('shows__hidden');

    headings.appendChild(titleDate);
    headings.appendChild(titleVenue);
    headings.appendChild(titleLocation);
    headings.appendChild(hidden);
    target.appendChild(headings);


    shows.forEach(show => {
        const dataWrapper = document.createElement('ul');
        dataWrapper.classList.add('shows__data');

        const titleDate = document.createElement('li');
        titleDate.classList.add('shows__subtitle');
        titleDate.innerText = 'DATE';

        const date = document.createElement('li');
        date.classList.add('shows__date');
        let d = new Date(show['date']);
        date.innerText = d.toDateString();

        const titleVenue = document.createElement('li');
        titleVenue.classList.add('shows__subtitle');
        titleVenue.innerText = 'VENUE';

        const venue = document.createElement('li');
        venue.classList.add('shows__info');
        venue.innerText = show['place'];

        const titleLocation = document.createElement('li');
        titleLocation.classList.add('shows__subtitle');
        titleLocation.innerText = 'LOCATION';

        const location = document.createElement('li');
        location.classList.add('shows__info');
        location.innerText = show['location'];

        const button = document.createElement('button');
        button.classList.add('button', 'shows__button');
        button.innerText = 'BUY TICKETS';

        dataWrapper.appendChild(titleDate);
        dataWrapper.appendChild(date);
        dataWrapper.appendChild(titleVenue);
        dataWrapper.appendChild(venue);
        dataWrapper.appendChild(titleLocation);
        dataWrapper.appendChild(location);
        dataWrapper.appendChild(button);

        target.appendChild(dataWrapper);
    });

}

const showsURL = 'https://project-1-api.herokuapp.com/showdates?api_key="2a1263c5-1d30-4e6a-b987-c760cf792625"';
axios.get(showsURL)
    .then(res => {
        displayShows(res.data);
    })
    .catch(error => {
        console.log(error)
    })

let rows = document.querySelectorAll('.shows__data');


rows.forEach(function (row) {
    row.addEventListener('click', function () {
        for (let row of rows) {
            row.classList.remove('shows__data--selected');
        }
        console.log('row clicked')
        this.classList.add('shows__data--selected');
    });
});
