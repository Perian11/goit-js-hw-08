// Файл: main.js

import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');
const listItem = galleryItems
    .map(({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="large-image.jpg">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
  `)
    .join('');

galleryList.insertAdjacentHTML('beforeend', listItem);

galleryList.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(event) {
    event.preventDefault();
    if (event.target.nodeName !== 'IMG') {
        return;
    }
    const instance = new SimpleLightbox(
        `<img src="${event.target.dataset.source}" alt="${event.target.alt}">`,
        {
            onShow: (instance) => {
                window.addEventListener('keydown', closeByEsc);
            },

            onClose: (instance) => {
                window.removeEventListener('keydown', closeByEsc);
            },
        }
    );

    instance.show();

    function closeByEsc({ code }) {
        if (code === 'Escape') {
            instance.close();
        }
    }
}
