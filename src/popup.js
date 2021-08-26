export default class Popup {
  constructor ( element )
  {
    this._element = element;
    this._handleKeyboardClosing = this._handleKeyboardClosing.bind( this );
    this._handleMouseClosing = this._handleMouseClosing.bind( this );
  }

  open ()
  {
    this._element.classList.add( 'popup--show' );
    this._element.addEventListener( 'click', this._handleMouseClosing );
    document.addEventListener( 'keydown', this._handleKeyboardClosing );
  }

  _close ( evt )
  {
    evt.preventDefault();
    this._element.classList.remove( 'popup--show' );
    this._element.removeEventListener( 'click', this._handleMouseClosing );
    document.removeEventListener( 'keydown', this._handleKeyboardClosing );
  }

  _handleKeyboardClosing ( evt )
  {
    if ( evt.key === 'Enter' || evt.key === 'Escape' )
    {
      this._close( evt );
    }
  }

  _handleMouseClosing ( evt )
  {
    if ( evt.target.tagName.toLowerCase() === 'button' || evt.target.classList.contains( 'popup' ) )
    {
      this._close( evt );
    }
  }
}