const places = require('../places/places.js')
const favButton = document.getElementById('favorite-button')
const favBar = require('../favoritebar.js')

const FAVORITE_ICON_CLASS = 'carbon:favorite-filled'

async function updateFavoriteIcon (tabUrl) {
  try {
    const item = await places.getItem(tabUrl)
    if (item.isFavorite) {
      favButton.classList.add(FAVORITE_ICON_CLASS)
    } else {
      favButton.classList.remove(FAVORITE_ICON_CLASS)
    }
  } catch (error) {
    console.error('Error updating favorite icon:', error)
  }
}

async function toggleFavorite (selectedTabId) {
  favButton.classList.toggle(FAVORITE_ICON_CLASS)
  const selectedTabUrl = tabs.get(selectedTabId).url
  try {
    const item = await places.getItem(selectedTabUrl)
    if (!item.isFavorite) {
      await places.updateItem(selectedTabUrl, {
        isFavorite: true,
        title: tabs.get(selectedTabId).title
      })
    } else {
      await places.updateItem(selectedTabUrl, {
        isFavorite: false
      })
    }
  } catch (error) {
    console.error('Error toggling favorite:', error)
  }
}

function initialize () {
  favButton.addEventListener('click', async function (e) {
    const selectedTabId = tabs.getSelected()
    await toggleFavorite(selectedTabId)
    favBar.initialize()
  })

  tasks.on('tab-selected', async function (selectedTabId) {
    const selectedTabUrl = tabs.get(selectedTabId).url
    await updateFavoriteIcon(selectedTabUrl)
  })

  tasks.on('tab-updated', async function (selectedTabId) {
    const selectedTabUrl = tabs.get(selectedTabId).url
    await updateFavoriteIcon(selectedTabUrl)
  })
}

module.exports = { initialize }
