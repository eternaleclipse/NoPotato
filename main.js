const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
const activities = [
    'Running',
    'Barefoot running',
    'Golfing',
    'Fishing',
    'Basketballing',
    'Play Soccer',
    'Dancing',
    'Camping',
    'Photoshooting',
    'Sight-seeing',
    'Bouldering',
    'Hiking',
    'Painting',
    'Drawing',
    'Pool Swimming',
    'Ocean Swimming',
    'Diving',
    'Writing',
    'Karaoke Singing',
    'Eating out',
    'Cooking',
    'Play Tennis',
    'Study together',
    'Work together',
    'Partying',
    'Meditating',
    'Do Yoga',
    'Do Pilates',
    'Do TRX training',
    'Play board games',
    'Music-Making',
    'Volunteering',
    'Scooting',
    'Canoeing',
    'Indoor camping',
    'Slacklining',
    'Juggling',
    'Graffiti-Drawing',
    'Parkouring',
    'Boxing',
    'Arching',
    'Barbequing',
    'Do an escape room',
    'Wine Tasting',
    'Visit a museum',
    'Skydiving',
    'Caving',
    'Go-Karting',
    'Visit an amusement park',
    'Hot-air ballooning',
    'Horse riding',
    'Range-Shooting',
    'Kite-Surfing',
    'Traveling',
    'Do Pottery',
    'Learn Magic',
    'Do Urban-Exploration',
];

function GetRandomActivity() {
    return activities[Math.floor(Math.random() * activities.length)];
}

document.getElementById('btn-need-ideas').addEventListener('click', function () {
    document.getElementById('activity1').setAttribute('value', GetRandomActivity());
    document.getElementById('activity2').setAttribute('value', GetRandomActivity());
    document.getElementById('activity3').setAttribute('value', GetRandomActivity());
});

document.getElementById('btn-generate-link').addEventListener('click', function() {
    let times = [];
    
    for (day of days) {
        if (document.getElementById(`chk-day-${day}`).checked) {
            let entry = {
                'day': day,
                'start_time': document.getElementById(`${day}-start-time`).value,
                'end_time': document.getElementById(`${day}-end-time`).value
            };
            times.push(entry);
        }
    }

    let data = {
        'activity1': document.getElementById('activity1').value,
        'activity2': document.getElementById('activity2').value,
        'activity3': document.getElementById('activity3').value,
        'friend_name': document.getElementById('friend-name').value,
        'your_name': document.getElementById('your-name').value,
        'times': times
    };

    let cur_url = new URL(window.location.href);
    let url = `${cur_url.protocol}//${cur_url.hostname}:${cur_url.port}/?data=${btoa(JSON.stringify(data))}`;
    
    document.getElementById('link-container').innerHTML = `<a href='${url}'>${url}</a>`;
});

window.addEventListener('load', () => {
    let url = new URL(document.location.href);
    let data = (url).search.split('?data=');

    if (data.length > 1) {
        document.getElementById('page-home').style.display = 'none';
        data = JSON.parse(atob(decodeURIComponent(data[1])));
        console.log(data);
        document.getElementById('msg-friend-name').innerText = data.friend_name;
        document.getElementById('msg-activity1').innerText = data.activity1;
        document.getElementById('msg-activity2').innerText = data.activity2;
        document.getElementById('msg-activity3').innerText = data.activity3;
        document.getElementById('msg-your-name').innerText = data.your_name;

        for (day of data.times) {
            let row = document.createElement('tr');
            let cell_day = document.createElement('td');
            let cell_start_time = document.createElement('td');
            let cell_end_time = document.createElement('td');

            cell_day.innerText = day.day;
            cell_start_time.innerText = day.start_time + ' - ';
            cell_end_time.innerText = day.end_time;

            row.appendChild(cell_day);
            row.appendChild(cell_start_time);
            row.appendChild(cell_end_time);
            document.getElementById('tbl-times').appendChild(row);
        }
    } else {
        document.getElementById('page-msg').style.display = 'none';
    }
});
