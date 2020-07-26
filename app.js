const container = document.querySelector('.container');
const team = document.querySelector('#ourTeam');
const blogPosts = document.querySelector('#blogPosts');
const gallery = document.querySelector('#gallery')
const uri = 'https://blog-b1c74.firebaseio.com/';

// HOMEPAGE
window.addEventListener('load', function() {
    fetch(`${uri}posts.json`)
    .then(response => response.json())
    .then(data => {
        let recentPost = document.createElement('div');
        recentPost.className = "recentPost";
        recentPost.innerHTML = `
            <h1>${data[0].title}</h1>
            <img src="${data[0].image}">
            <p>${data[0].body.replace(/\n/g, '<br />')}</p>
        `;
        let latestPosts = document.createElement('div');
        latestPosts.className = "latestPosts";
        data.slice(1, 4).forEach(post => {
            let singlePost = document.createElement('div');
            singlePost.className = "latestPostSingle";
            singlePost.innerHTML = `
                <img src="${post.image}">
                    <h3>${post.title}</h3>
                    <p>${post.body.slice(0, 200)}</p>
                <button>Read More</button>
            `
            latestPosts.appendChild(singlePost);
        });
        container.appendChild(recentPost);
        container.appendChild(latestPosts);
    });    
})


// OUR TEAM
team.addEventListener('click', function(e){
    container.innerHTML = '';
    e.preventDefault();
    fetch(`${uri}users.json`)
        .then(response => response.json())
        .then(data => {
            let teamWrapper = document.createElement('div');
            teamWrapper.className = "teamWrapper";
            data.forEach(user => {
                let userInfo = document.createElement('div');
                userInfo.className = "userInfo";
                userInfo.innerHTML = `
                <img src="${user.photo}">
                <h3>${user.username}</h3>
                <p>Name: ${user.name}</p>
                <p>Email: ${user.email}</p>
                <p>Website: ${user.website}</p>
                `
                teamWrapper.appendChild(userInfo);
            })
            container.appendChild(teamWrapper);       
        })
})


// BLOG POSTS
blogPosts.addEventListener('click', function(e) {
    container.innerHTML = '';
    e.preventDefault();
    fetch(`${uri}posts.json`)
        .then(response => response.json())
        .then(data => {
            data.forEach(post => {
                let postInfo = document.createElement('div');
                postInfo.className = "postInfo";
                postInfo.innerHTML = `
                    <div class="postInfoImg">
                        <img src="${post.image}">
                    </div>
                    <div class="postInfoText">
                        <h1>${post.title}</h1>
                        <p>${post.body.slice(0, 250)}...</p>
                        <a href="#">Continue reading</a>
                    </div>
                `
                container.appendChild(postInfo);
            })
        });
})


// GALLERY
gallery.addEventListener('click', function(e){
    container.innerHTML = '';
    e.preventDefault();
    fetch(`${uri}photos.json`)
        .then(response => response.json())
        .then(data => {
            let galleryWrapper = document.createElement('div');
            galleryWrapper.className = "galleryWrapper";
            data.forEach(photo => {
                let thumbnail = document.createElement('div');
                thumbnail.className = "thumbnail";
                thumbnail.innerHTML = `
                    <img src="${photo.url}">
                `;
                galleryWrapper.appendChild(thumbnail);
            })
            container.appendChild(galleryWrapper);
        })
})