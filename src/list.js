export default class List {
  constructor ( element )
  {
    this._element = element;
    this._hoveredItem = this._item = null;
    this._dropItem = this._dropItem.bind( this );
    this._grabItem = this._grabItem.bind( this );
    this._handleMouseEnter = this._handleMouseEnter.bind( this );
    this._handleMouseLeave = this._handleMouseLeave.bind( this );
    this._moveItem = this._moveItem.bind( this );
  }

  init ( files )
  {
    this._element.innerHTML = files.map( ( file ) => `<li class="form__uploaded-item"><h3 class="form__uploaded-title">${file.name}</h3><p class="form__uploaded-size">${Math.ceil( file.size / 1024 )} kb</p></li>` ).join( '' );
    this._element.addEventListener( 'mousedown', this._grabItem );
  }

  _dropItem ( evt )
  {
    if ( this._hoveredItem )
    {
      this._hoveredItem.removeAttribute( 'style' );
      this._hoveredItem.before( this._item );
    }
    else if ( evt.pageX - this._item.offsetWidth / 2 < this._element.getBoundingClientRect().x )
    {
      this._element.prepend( this._item );
    }
    else
    {
      this._element.append( this._item );
    }

    this._item.classList.remove( 'form__uploaded-item--grabbed' );
    this._item.removeAttribute( 'style' );
    this._hoveredItem = this._item = null;
    document.removeEventListener( 'mousemove', this._moveItem );
    document.removeEventListener( 'mouseup', this._dropItem );

    Array.from( this._element.querySelectorAll( 'li' ) ).forEach( ( it ) => {
      it.removeEventListener( 'mouseenter', this._handleMouseEnter );
      it.removeEventListener( 'mouseleave', this._handleMouseLeave );
    } );
  }

  _grabItem ( evt )
  {
    this._item = evt.target.closest( 'li' );
    
    if ( !this._item )
    {
      return;
    }
  
    this._item.classList.add( 'form__uploaded-item--grabbed' );
    document.body.append( this._item );
    this._moveItem( evt );
    document.addEventListener( 'mousemove', this._moveItem );
    document.addEventListener( 'mouseup', this._dropItem );
  
    Array.from( this._element.querySelectorAll( 'li' ) ).forEach( ( it ) => {
      it.addEventListener( 'mouseenter', this._handleMouseEnter );
      it.addEventListener( 'mouseleave', this._handleMouseLeave );
    } );
  }

  _handleMouseEnter ( evt )
  {
    this._hoveredItem = evt.currentTarget;
    this._hoveredItem.style.opacity = 0.5;
  }

  _handleMouseLeave ()
  {
    this._hoveredItem.removeAttribute( 'style' );
    this._hoveredItem = null;
  }

  _moveItem ( evt )
  {
    evt.preventDefault();
    this._item.style.left = evt.pageX - this._item.offsetWidth / 2 + 'px';
    this._item.style.top = evt.pageY - this._item.offsetHeight / 2 + 'px';
  }
}