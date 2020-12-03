const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let ready = false;
let imagesArray = [];
let imagesLoaded = 0;
let totalImages = 0;
let initialLoad = true;

let initialImageCount = 5;
const apiKey = `YOUR_API_KEY`;
let unsplashApiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialImageCount}`;

function updateApiUrlWithNewContent(imageCount) {
  unsplashApiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

// Helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links and images. Add to DOM
function displayImages() {
  imagesLoaded = 0;
  totalImages = imagesArray.length;
  // Loop through each object in imagesArray
  imagesArray.forEach((image) => {
    // Create <a> for link to Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: image.links.html,
      target: "_blank",
    });
    // Create <img> for Unsplash images
    const img = document.createElement("img");
    setAttributes(img, {
      src: image.urls.regular,
      alt: image.alt_description,
      title: image.alt_description,
    });
    // Event listener, check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Place <img> inside <a> then add both to imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Fetch random photos from Unsplash API
async function getImagesFromUnsplash() {
  try {
    const response = await fetch(unsplashApiUrl);
    imagesArray = await response.json();
    displayImages();
    if (initialLoad) {
      updateApiUrlWithNewContent(30);
      initialLoad = false;
    }
  } catch (error) {
    // Catch errors here
    alert("An error occurred while loading images. Try refreshing the page.");
  }
}

// Check to see if scrolling is near bottom of page. If true load more images
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getImagesFromUnsplash();
  }
});

// On Load
getImagesFromUnsplash();
