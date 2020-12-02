const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let initialImageCount = 10;
let imagesArray = [];
const apiKey = `YOUR_API_KEY`;
const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${initialImageCount}`;

// Create Elements for links and images. Add to DOM
function displayImages() {
  // Loop through each object in imagesArray
  imagesArray.forEach((image) => {
    // Create <a> for link to Unsplash
    const item = document.createElement("a");
    item.setAttribute("href", image.links.html);
    item.setAttribute("target", "_blank");
    // Create <img> for Unsplash images
    const img = document.createElement("img");
    img.setAttribute("src", image.urls.regular);
    img.setAttribute("alt", image.alt_description);
    img.setAttribute("title", image.alt_description);
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
