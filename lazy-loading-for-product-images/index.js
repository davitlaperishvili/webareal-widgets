// <img> tag in the template should be as follow:
// <img data-src="{$SMARTY_globals.CONFIG.link_data}{$c.i.name}/products/{$i->image}" alt="{$i->name|htmlspecialchars}" width="300" height="300" style="display:block !important;" />

function addLazyLoading() {
  var lazyImages = [].slice.call(
    document.querySelectorAll(".product_wraper .img_box img")
  );
  console.log("Lazy Images: ", lazyImages);
  if ("IntersectionObserver" in window) {
    console.log("IntersectionObserver In Window");
    let lazyImageObserver = new IntersectionObserver(function (
      entries,
      observer
    ) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          let lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImage.classList.remove("lazy");
          lazyImageObserver.unobserve(lazyImage);
          console.log("Image is visible");
        }
      });
    });

    lazyImages.forEach(function (lazyImage) {
      console.log("Obsorver is started");

      lazyImageObserver.observe(lazyImage);
    });
  } else {
    // Fallback for browsers without IntersectionObserver support
    console.log("IntersectionObserver IS NOT In Window");
    lazyImages.forEach(function (lazyImage) {
      lazyImage.src = lazyImage.dataset.src;
      lazyImage.classList.remove("lazy");
    });
  }
}
