/**
 * VariantSlider 
 * @author Davit
 */

public class VariantSlider {
// static HTML at the beginning of the page
	private static final String CARDS_PAGE_VIEW_START = "<div class=\"gaer add-list\" style=\"display: flex;
    justify-content: space-between;
    padding: 50px;
    flex-wrap: wrap;\"> ";

	// static HTML at the end of the page
	private static final String CARDS_PAGE_VIEW_END = "</div>";

	private static final String VARIANT_SLIDER = "" +
    "   <div class=\"product \"> " +
    "    <div class=\"product-variant-gaer add-list\" data-variantid=\"%1$s\"> " +
    "      <img " +
    "        src=\"https://www.artmie.uk/fotky66945/fotos/RTL5804-3021-mini.jpg\" " +
    "        class=\"variant-img-%1$s\" " +
    "        alt=\"%2$s\" " +
    "        width=\"100\" " +
    "        height=\"100\" " +
    "      /> " +
    "      <div class=\"product-variant-name productTitle\">%2$s</div> " +
    "        <div class=\"productPriceBox \"> " +
    "        <form method=\"post\" action=\"/maliarskeplatno/eshop/0/0/6/%1$s\"> " +
    "          <div class=\"input-spinner-group\" data-input-spinner=\"\"> " +
    "          <span class=\"input-spinner-btn btn-l\"><button type=\"button\" class=\"spin-dec\">-</button></span> " +
    "          <input name=\"kusy\" value=\"1\" class=\"prKs quantity-input spin-input\" maxlength=\"6\" size=\"6\"> " +
    "          <span class=\"input-spinner-btn btn-r\"><button type=\"button\" class=\"spin-inc\">+</button></span> " +
    "          </div> " +
    "          <input type=\"submit\" class=\"buy_btn\" name=\"\" value=\" Pridať do košíka \"> " +
    "        </form> " +
    "        </div> " +
    "    </div>"
    "   </div>";

	/**
	 *
	 *
	 * @param variantIdNumber 
	 * @param variantName 

	 * @return
	 */
	private static String getVariantSlider(String variantIdNumber,String variantName) {
		return String.format(VARIANT_SLIDER, variantIdNumber,variantName);
	}
}
