// external js: isotope.pkgd.js


// init Isotope
var $grid = $('.portfolio__list').isotope({
  itemSelector: '.portfolio__list-item',
  layoutMode: 'masonry',
  getSortData: {
    name: '.name',
    symbol: '.symbol',
    number: '.number parseInt',
    category: '[data-category]',
    weight: function( itemElem ) {
      var weight = $( itemElem ).find('.weight').text();
      return parseFloat( weight.replace( /[\(\)]/g, '') );
    }
  }
});

// bind filter button click
$('#filters').on( 'click', 'button', function() {
  var filterValue = $( this ).attr('data-filter');
  // use filterFn if matches value
  $grid.isotope({ filter: filterValue });
});


// change is-checked class on buttons
$('.portfolio__list-filter-group').each( function( i, buttonGroup ) {
  var $buttonGroup = $( buttonGroup );
  $buttonGroup.on( 'click', 'button', function() {
    $buttonGroup.find('.is-checked').removeClass('is-checked');
    $( this ).addClass('is-checked');
  });
});



document.addEventListener('DOMContentLoaded', function() {
  fetch('/js/work-4-style-5.json')
    .then(response => {
      if (!response.ok) throw new Error('Failed to load JSON');
      return response.json();
    })
    .then(data => {
      const items = document.querySelectorAll('.portfolio__list-item');

      items.forEach((item, index) => {
        const bgDiv = item.querySelector('.portfolio__list-bg-image');
        const entry = data[index]; // You can also match by category

        if (entry && bgDiv) {
          const img = new Image();
          img.src = entry.image;
          img.onload = () => {
            bgDiv.style.backgroundImage = `url(${entry.image})`;
            bgDiv.classList.add('loaded'); // fade in smoothly
          };
        }
      });
    })
    .catch(error => console.error('Error loading portfolio images:', error));
});


