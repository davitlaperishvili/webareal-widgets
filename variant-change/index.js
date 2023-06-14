// loading help functions ----------------

window.addEventListener("DOMContentLoaded", (event) => {
  function insertLoadingSpinner() {
    $(".detail-box-product .col-r").css("position", "relative").append(`
      <div class="loading-overlay">
        <img src="https://www.mafiapopart.sk/fotky16354/webareal/variantAjax/spinner.gif" width="80px" height="80px"/>
      </div>
    `);
    $(".loading-overlay").css({
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      position: "absolute",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      background: "rgba(241, 242, 243, 0.7)",
      "z-index": "10",
      transition: "0.4s",
      opacity: "0",
      "pointer-events": "none",
      "box-shadow": "0 0 10px rgba(241, 242, 243, 1)",
    });
  }
  function startLoading() {
    $(".loading-overlay").css({
      opacity: "1",
      "pointer-events": "all",
    });
  }
  function endLoading() {
    $(".loading-overlay").css({
      opacity: "0",
      "pointer-events": "none",
    });
  }
  // ------------------------
  function initVariationAjax() {
    let p = window.imageArr; // random numbers which generated in separate function
    var result2 = [];
    for (var i = 0; i < location.hostname.replace(/^www\./i, "").length; i++) {
      var code = location.hostname.replace(/^www\./i, "").charCodeAt(i);
      if (code >= 97 && code <= 122) {
        // check if the character is a lowercase letter
        result2.push(code - 97 + 1); // convert the letter to its numeric value and append it to the result string
      }
    }
    var result = [1, 18, 20, 13, 9, 5, 21, 11]; // numbers which are same as domain name

    if (window.arraysEqual(result, result2)) {
      $(".variant").off("change");
      $(".variant")
        .select2()
        .on("change", async function (e) {
          $(".variant").off("change");
          insertLoadingSpinner();
          startLoading();
          // get choose select2 params
          startLoading();
          let selectName = $(this).attr("name");
          let selectID = $(this).attr("data-select2-id");

          // get current url
          let currentUrl = window.location.origin;

          let selectedValue = $(this).val(); // get the selected value of the Select2 element

          const regex = /page-product-\d+/;
          let bodyClassList; // main product ID
          console.log(bodyClassList);
          let productID; // main product ID
          try {
            bodyClassList = Array.from(
              document.querySelector("body").classList
            ).join(" ");
            productID = bodyClassList.match(regex)[0].split("-")[2];
          } catch (e) {
            console.log("Error when getting productID: ", e);
          }

          // get URl of variant
          let includes = result2.every((item) => {
            return p.includes(item);
          });

          let response;
          let data;
          console.log("INCLUDES: ", includes);
          console.log(
            "INCLUDES SECOND: ",
            result.length == location.hostname.replace(/^www\./i, "").length
          );
          if (includes) {
            try {
              window.arraysEqual(result, result2)
                ? (response = await fetch(
                    `https://www.artmie.uk/wa_script/load_variants.php?id=h9j3f1t8&idp=${productID}&method=changed&ciselnik[1]=${selectedValue}&last_selected=${selectName}-${selectedValue}-${selectID}`,
                    {
                      headers: {
                        "Content-Type": "text/html",
                      },
                    }
                  ))
                : null;
              data = await response.text();
            } catch (e) {
              console.log("Error when fetching data: ", e);
            }
          }
          // get url from the response string
          console.log(data);
          let subStr;
          try {
            subStr = data
              .split("BS.Variants.update_product(")[1]
              .split(",")[3]
              .trim()
              .replace(/^"+|"+$/g, "");
          } catch (e) {
            console.log("Error when get url from the response string: ", e);
          }

          // get variant html from the url got before
          let getHTML;
          let getHTMLData;
          try {
            getHTML = await fetch(`${currentUrl}${subStr}`);
            getHTMLData = await getHTML.text();
          } catch (e) {
            console.log(
              "Error when get variant html from the url got before: ",
              e
            );
          }

          try {
            // create and update DOM tree from the html got from GET request
            if (getHTMLData) {
              const parser = new DOMParser();
              const doc = parser.parseFromString(getHTMLData, "text/html");

              doc.querySelector(".product-status-box").style.display = "none"; // hide stars
              const h1 = doc.querySelector("h1").innerText; // get h1
              const h2 = doc.querySelector("h2.second-product-name").innerText; // get h2

              // adjast html
              doc
                .querySelector(".detail-box-product .col-r")
                .insertAdjacentHTML(
                  "afterbegin",
                  `<h1>${h1}</h1><h2 class="second-product-name">${h2}</h2>`
                );

              // get final html
              const productDesc = doc.querySelector(
                ".detail-box-product"
              ).innerHTML;

              // put final html instead existing one
              $(".detail-box-product").html(productDesc);
              $("h1").html(h1);
              $("h2.second-product-name").html(h2);
            }
          } catch (e) {
            console.log(
              "Error when create and update DOM tree from the html got from GET request: ",
              e
            );
          }

          try {
            // init gallery plugin Colorbox - a jQuery lightbox (https://www.jacklmoore.com/colorbox/)
            // $(".cboxElement").colorbox();
            $(".owl-carousel").owlCarousel({ items: 1, loop: true });
            function createGalleries(rel) {
              var regex = new RegExp(rel + "\\[(\\d+)]"),
                m,
                group = "g_" + rel,
                groupN;
              $("a[rel*=" + rel + "]").each(function () {
                m = regex.exec(this.getAttribute("rel"));
                if (m) {
                  groupN = group + m[1];
                } else {
                  groupN = group;
                }
                $(this).colorbox({
                  rel: groupN,
                  slideshow: true,
                  maxWidth: "85%",
                  maxHeight: "85%",
                  returnFocus: false,
                });
              });
            }
            createGalleries("lytebox");
            createGalleries("lyteshow");
            // Init add in busket on product page
            jQuery("body").on(
              "submit",
              "form, .product3PriceBox a, .productPriceBox a",
              function () {
                if (!jQuery(this).is("form")) {
                  buy_event(jQuery(this), 2);
                  return false;
                } else {
                  if ($(this).children("input.buy_btn").length) {
                    buy_event(jQuery(this), 1);
                    return false;
                  }
                }
              }
            );

            $(
              "html.tmpl__titanium .page-product-detail form,html.tmpl__platinum .page-product-detail form"
            ).click(function (event) {
              if (event.target.classList.contains("product-cart-btn")) {
                buy_event(jQuery(this), 1);
                return false;
              }
            });
            $("#buy_btn,.product-cart-btn-old").on("click", function () {
              var $pocet_kusu = $(".product-cart-info-value")
                .find("input[name='kusy']")
                .val();
              fb_pixel_init(product_information.id, $pocet_kusu, "addToCart");
            });
            // ----------------------------
            endLoading();
            // change url line and save in the history
            history.pushState(null, null, subStr);

            // init select2 and  ajax call function for new element
            initVariationAjax();
          } catch (e) {
            console.log("Error init function for the new element: ", e);
          }
        });
    }
  }

  // reload page on history back
  window.addEventListener("popstate", function () {
    // Reload the page
    location.reload();
  });

  // first init
  initVariationAjax();
});
// https://www.artmie.sk/wa_script/load_variants.php?id=maliarskeplatno&idp=undefined&method=changed&ciselnik[1]=2574&last_selected=91-2574-1
// https://www.artmie.sk/wa_script/load_variants.php?id=maliarskeplatno&idp=1006&method=changed&ciselnik[1]=1882&last_selected=91-1882-1
