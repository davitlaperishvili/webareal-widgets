function initVariationAjax() {
  $(".variant").off("change");
  $(".variant")
    .select2()
    .on("change", async function (e) {
      $(".variant").off("change");
      let selectName = $(this).attr("name");
      let selectID = $(this).attr("data-select2-id");

      let currentUrl = window.location.origin;
      let baseUrl = currentUrl.split("?")[0];

      let selectedValue = $(this).val(); // get the selected value of the Select2 element
      let selectedText = $(this).find("option:selected").text().split("`");

      let productID = $("#stars_main").attr("data-product-id"); // main product ID

      const response = await fetch(
        `https://www.obraznastenu.sk/wa_script/load_variants.php?id=obraznastenu&idp=${productID}&method=changed&ciselnik[1]=${selectedValue}&last_selected=${selectName}-${selectedValue}-${selectID}`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
      const data = await response.text();
      const subStr = data
        .split("BS.Variants.update_product(")[1]
        .split(",")[3]
        .trim()
        .replace(/^"+|"+$/g, "");
      const getHTML = await fetch(`${currentUrl}${subStr}`);
      const getHTMLData = await getHTML.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(getHTMLData, "text/html");
      doc.querySelector(".product-status-box").style.display = "none";
      const h1 = doc.querySelector("h1").innerText;
      const h2 = doc.querySelector("h2.second-product-name").innerText;
      doc
        .querySelector(".detail-box-product .col-r")
        .insertAdjacentHTML(
          "afterbegin",
          `<h1>${h1}</h1><h2 class="second-product-name">${h2}</h2>`
        );
      const productDesc = doc.querySelector(".detail-box-product").innerHTML;
      console.log(productDesc);
      $(".detail-box-product").html(productDesc);
      $("h1").html(h1);
      $("h2.second-product-name").html(h2);
      history.pushState(null, null, subStr);
      // init select2
      initVariationAjax();
    });
}
window.addEventListener("popstate", function () {
  // Reload the page
  location.reload();
});
initVariationAjax();
// https://www.obraznastenu.sk/wa_script/load_variants.php?id=obraznastenu&idp=12516&method=changed&ciselnik[1]=1962&last_selected=21-1962-1
// https://www.obraznastenu.sk/wa_script/load_variants.php?id=obraznastenu&idp=12516&method=changed&ciselnik[1]=5536&last_selected=21-1962-1
