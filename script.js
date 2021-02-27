const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded=0;
let totalImages=0;
let photosArray= [];

//Unsplash API
let count= 5
const apiKey= 'odrLh8tzEXVbklSE4RvGcIxqcKFOB5SOEo0UmfdYa-k';
const apiUrl= `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

//check if all the images were loaded
function imageLoaded() {
    
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
        ready =true;
        loader.hidden = true;
        count = 30
    }
}

//create elements for links & photos
function displayPhotos() {
    imagesLoaded= 0;
    totalImages = photosArray.length;
    
    //run function for each object in photosArray
    photosArray.forEach((photo)=> {
    //Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
        href: photo.links.html,
        target: '_blank',
    });
    //create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
        src: photo.urls.regular,
        alt: photo.alt_description,
        title: photo.alt_description,
    });
    //Event Listener, check when each is finished loading
    img.addEventListener('load',imageLoaded);

    //put <img> inside <a>, the both inside image container
    item.appendChild(img);
    imageContainer.appendChild(item);

    });
}

// Get photos from unsplash API

async function getPhotos() {
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        
    }catch (error){
        //Catch error here
        
    }
}

//check to see if scrolling near bottom of the page loads more photos
window.addEventListener ('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready= false;
        getPhotos();
    }
});

//on load
getPhotos();