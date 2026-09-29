const asset = (path) => `/frontend/${path}`;

const collapsibleCategories = [
  {
    id: 'sportswear',
    title: 'Sportswear',
    items: ['Nike', 'Under Armour', 'Adidas', 'Puma', 'ASICS'],
  },
  {
    id: 'mens',
    title: 'Mens',
    items: ['Fendi', 'Guess', 'Valentino', 'Dior', 'Versace', 'Armani', 'Prada', 'Dolce and Gabbana', 'Chanel', 'Gucci'],
  },
  {
    id: 'womens',
    title: 'Womens',
    items: ['Fendi', 'Guess', 'Valentino', 'Dior', 'Versace'],
  },
];

const simpleCategories = ['Kids', 'Fashion', 'Households', 'Interiors', 'Clothing', 'Bags', 'Shoes'];

const brands = [
  ['Acne', 50],
  ['Grune Erde', 56],
  ['Albiro', 27],
  ['Ronhill', 32],
  ['Oddmolly', 5],
  ['Boudestijn', 9],
  ['Rosch creative culture', 4],
];

function MenuLeft() {  
  return (
    <div className="left-sidebar">
      <h2>Category</h2>
      <div className="panel-group category-products" id="accordian">
        {collapsibleCategories.map((category) => (
          <div className="panel panel-default" key={category.id}>
            <div className="panel-heading">
              <h4 className="panel-title">
                <a data-toggle="collapse" data-parent="#accordian" href={`#${category.id}`}>
                  <span className="badge pull-right"><i className="fa fa-plus"></i></span>
                  {category.title}
                </a>
              </h4>
            </div>
            <div id={category.id} className="panel-collapse collapse">
              <div className="panel-body">
                <ul>
                  {category.items.map((item) => (
                    <li key={item}><a href="#!">{item}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}

        {simpleCategories.map((category) => (
          <div className="panel panel-default" key={category}>
            <div className="panel-heading">
              <h4 className="panel-title"><a href="#!">{category}</a></h4>
            </div>
          </div>
        ))}
      </div>

      <div className="brands_products">
        <h2>Brands</h2>
        <div className="brands-name">
          <ul className="nav nav-pills nav-stacked">
            {brands.map(([name, count]) => (
              <li key={name}>
                <a href="#!"> <span className="pull-right">({count})</span>{name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="price-range">
        <h2>Price Range</h2>
        <div className="well">
          <input
            type="text"
            className="span2"
            defaultValue=""
            data-slider-min="0"
            data-slider-max="600"
            data-slider-step="5"
            data-slider-value="[250,450]"
            id="sl2"
          />
          <br />
          <b>$ 0</b> <b className="pull-right">$ 600</b>
        </div>
      </div>

      <div className="shipping text-center">
        <img src={asset('images/home/shipping.jpg')} alt="" />
      </div>
    </div>
  );
}

export default MenuLeft;
