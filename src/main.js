import List from './list';
import Popup from './popup';

const form = document.querySelector( '.form' );
const uploadInput = form.querySelector( '.form__input' );
const uploadedList = new List( form.querySelector( '.form__uploaded-list' ) );
const popup = new Popup( document.querySelector( '.popup' ) );

uploadInput.addEventListener( 'change', ( evt ) => {
  const uploadedFiles = Array.from( evt.target.files );

  if ( uploadedFiles.length < 2 || uploadedFiles.length > 5 )
  {
    popup.open();

    return;
  }

  form.classList.add( 'form--uploaded' );
  uploadedList.init( uploadedFiles );
} );