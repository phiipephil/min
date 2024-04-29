const places = require('./places/places.js')
const browserUI = require('browserUI.js')
var webviews = require('webviews.js')
const favBar = document.getElementById('favorites-bar')

function createFavoriteElement (favoriteItem) {
  const favoriteLink = document.createElement('a')
  favoriteLink.href = favoriteItem.url
  favoriteLink.textContent = favoriteItem.title
  favoriteLink.classList.add('favorite-item')

  favoriteLink.addEventListener('click', (e) => {
    e.preventDefault()
    browserUI.openURLInNewTab(favoriteItem.url)
  })

  return favoriteLink
}

function updateFavoritesBar () {
  places.getAllItems().then((allItems) => {
    const favoriteItems = allItems.filter((item) => item.isFavorite)

    favBar.innerHTML = ''

    favoriteItems.forEach((favoriteItem) => {
      const favoriteElement = createFavoriteElement(favoriteItem)
      favBar.appendChild(favoriteElement)
    })
  }).catch((error) => {
    console.error('Error updating favorite :', error)
  })
}

function initialize () {
  updateFavoritesBar()

  tasks.on('tab-updated', async function (tabId) {
    updateFavoritesBar()
  })
}

document.addEventListener('DOMContentLoaded', initialize)
module.exports = { initialize }
