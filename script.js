const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let initialImageCount = 10;
let imagesArray = [];
const apiKey = `YOUR_API_KEY`;
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialImageCount}`;

// Helper function to set attributes
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for links and images. Add to DOM
function displayImages() {
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
    // Place <img> inside <a> then add both to imageContainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Fetch random photos from Unsplash API
async function getImagesFromUnsplash() {
  try {
    const response = await fetch(unsplashUrl);
    imagesArray = await response.json();
    displayImages();
  } catch (error) {
    // Catch errors here
  }
}

// On Load
getImagesFromUnsplash();
