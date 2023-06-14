/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  /*!********************************************!*\
    !*** ./resources/share/product-variant.js ***!
    \********************************************/
  function _createForOfIteratorHelper(o, allowArrayLike) {
    var it =
      (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
    if (!it) {
      if (
        Array.isArray(o) ||
        (it = _unsupportedIterableToArray(o)) ||
        (allowArrayLike && o && typeof o.length === "number")
      ) {
        if (it) o = it;
        var i = 0;
        var F = function F() {};
        return {
          s: F,
          n: function n() {
            if (i >= o.length) return { done: true };
            return { done: false, value: o[i++] };
          },
          e: function e(_e) {
            throw _e;
          },
          f: F,
        };
      }
      throw new TypeError(
        "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
      );
    }
    var normalCompletion = true,
      didErr = false,
      err;
    return {
      s: function s() {
        it = it.call(o);
      },
      n: function n() {
        var step = it.next();
        normalCompletion = step.done;
        return step;
      },
      e: function e(_e2) {
        didErr = true;
        err = _e2;
      },
      f: function f() {
        try {
          if (!normalCompletion && it["return"] != null) it["return"]();
        } finally {
          if (didErr) throw err;
        }
      },
    };
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
      return _arrayLikeToArray(o, minLen);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      enumerableOnly &&
        (symbols = symbols.filter(function (sym) {
          return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        })),
        keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = null != arguments[i] ? arguments[i] : {};
      i % 2
        ? ownKeys(Object(source), !0).forEach(function (key) {
            _defineProperty(target, key, source[key]);
          })
        : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(
            target,
            Object.getOwnPropertyDescriptors(source)
          )
        : ownKeys(Object(source)).forEach(function (key) {
            Object.defineProperty(
              target,
              key,
              Object.getOwnPropertyDescriptor(source, key)
            );
          });
    }
    return target;
  }
  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    Object.defineProperty(Constructor, "prototype", { writable: false });
    return Constructor;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  var ProductVariant = /*#__PURE__*/ (function () {
    function ProductVariant(config) {
      _classCallCheck(this, ProductVariant);
      _defineProperty(this, "intertimer", null);
      _defineProperty(this, "cacheUrl", {});
      _defineProperty(this, "overlay", null);
      _defineProperty(this, "variants", []);
      _defineProperty(this, "config", {
        fakeVariant: false,
        loadStyle: true,
        artmieBase: document.location.origin,
        proxyBase: "https://www.artmieadmin.com",
        category: "artmie",
        website: "",
        cache_min: 60,
        ttl: 3600,
        isProxyVisit: 0,
        btnText: "do koÅ¡Ã­ka",
        title: "Choose the desired shade",
      });
      this.config = _objectSpread(_objectSpread({}, this.config), config);
    }
    _createClass(ProductVariant, [
      {
        key: "print",
        value: function print() {
          console.log(this.config);
        },
      },
      {
        key: "setup",
        value: function setup() {
          var self = this;
          this.intertimer = setInterval(function () {
            console.log("check id_product=", BS.Variants.id_product);
            if (!BS.Variants.id_product) return;
            clearInterval(self.intertimer);
            $(".add-list").remove();
            self.processLoadStyle();
            self.setProductVariants();
            console.log("variants:", self.variants);
            self.processList();
            self.processBtn();
          }, 200);
          return this;
        },
      },
      {
        key: "setProductVariants",
        value: function setProductVariants() {
          var _this = this;
          if ($("select.variant>option[value!=0]").size() == 0) return;
          var url = ""
            .concat(this.config.proxyBase, "/load-product-variants?website=")
            .concat(this.config.website, "&category=")
            .concat(this.config.category, "&productId=")
            .concat(BS.Variants.id_product);
          $.ajax({
            type: "GET",
            url: url,
            async: false,
          }).done(function (resp) {
            if (resp.status == "success") _this.variants = resp.data;
            else {
              console.error(resp);
            }
          });
        },
      },
      {
        key: "processLoadStyle",
        value: function processLoadStyle() {
          if (this.config.loadStyle)
            $("head").prepend(
              '<style class="add-list">.product-variants{margin-top:20px;text-align:center;}.product-variant-gaer a{color:#ffffff !important;text-decoration:none !important;}.gaer{width:100%;text-align:left;}.product-variant-gaer{display:inline-block;width:calc(48% - 12px);margin:6px;text-align:center;vertical-align:top;box-sizing:border-box;}.product-variant-gaer img{display:block;margin:0 auto;border-radius:50%;}.product-variant-gaer .product-variant-name{margin-top:10px;margin-bottom:15px;font-weight:400;}.product-variant-gaer .product-variant-button{margin-top:10px;padding:4px 20px;border:none;border-radius:50px;color:#fff;font-weight:bold;background-color:#00B67A;text-decoration:none;}.product-variant-gaer .product-variant-button:hover{background-color:#007B4E;}@media screen and (min-width:768px){.product-variant-gaer{width:calc(10% - 12px);}}@media screen and (min-width:768px) and (max-width:1219px){.product-variant-gaer{width:calc(20% - 12px);}}@media screen and (min-width:1220px) and (max-width:1619px){.product-variant-gaer{width:calc(18% - 12px);}}@media screen and (min-width:1620px){.product-variant-gaer{width:calc(10% - 12px);}}</style>'
            );
        },
      },
      {
        key: "processList",
        value: function processList() {
          if (!this.variants.length) return;
          var self = this;
          var list = $('<div className="gaer add-list"></div>');
          $("#description>div.spc").prepend(list);
          $("#description>div.spc").prepend(
            '<h1 class="add-list"><font style="vertical-align: inherit;"><font style="vertical-align: inherit;">'.concat(
              self.config.title,
              "</font></font></h1>"
            )
          );
          $.each(this.variants, function (x, _ref) {
            var _URL, _URL$pathname$split;
            var properties = _ref.properties,
              picture = _ref.picture,
              previewPicture = _ref.previewPicture;
            var _properties$ = properties[0],
              variant_text = _properties$.valueName,
              variant_id = _properties$.valueId;
            if (!previewPicture) {
              previewPicture = $("#detail_src_magnifying_small").attr("src");
            }
            var newName =
              (_URL = new URL($("link[rel=previewimage]").attr("href"))) ===
                null || _URL === void 0
                ? void 0
                : (_URL$pathname$split = _URL.pathname.split("/")) === null ||
                  _URL$pathname$split === void 0
                ? void 0
                : _URL$pathname$split[1];
            previewPicture = previewPicture.replace(/(fotky\d+)/g, newName);
            var template =
              '\t<div class="product-variant-gaer add-list">\n                \t\t<img src="'
                .concat(previewPicture, '" class="variant-img-')
                .concat(variant_id, '" alt="')
                .concat(
                  variant_text,
                  '" width="100" height="100">\n                \t\t<div class="product-variant-name">'
                )
                .concat(
                  variant_text,
                  '</div>\n                \t\t<a class="product-variant-button product-variant-btn-'
                )
                .concat(
                  variant_id,
                  ' variant-add-cart" style="background-color: gray" data-uri="" data-vid="'
                )
                .concat(variant_id, '">')
                .concat(self.config.btnText, "</a>\n                \t</div>");
            list.append($(template));
          });
        },
      },
      {
        key: "processBtn",
        value: function processBtn() {
          var _this2 = this;
          var _iterator = _createForOfIteratorHelper(this.variants),
            _step;
          try {
            var _loop = function _loop() {
              var elem = _step.value;
              var variant_id = elem.properties[0].valueId;
              var self = _this2;
              btn = $(".product-variant-btn-" + variant_id);
              btn[0].addEventListener("click", function (evt) {
                console.log("trigger add cart:", variant_id);
                var btn =
                  evt.target.tagName != "A"
                    ? evt.target.parentElement.parentElement
                    : evt.target;
                _this2.load_variants(variant_id, function (resp) {
                  console.log(resp);
                  var uri = resp.uri;
                  self.loadProductVariantDetail(uri, function (page) {
                    var newDoc = $(page);
                    var form = newDoc.find(".detail-info form");
                    _this2.buy_variant_event(newDoc, form, 1);
                    return;
                  });
                });
              });
              btn.removeAttr("style");
            };
            for (_iterator.s(); !(_step = _iterator.n()).done; ) {
              var btn;
              _loop();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
        },
      },
      {
        key: "loadProductVariantDetail",
        value: function loadProductVariantDetail(uri, cb) {
          var url = "".concat(this.config.artmieBase, "/").concat(uri);
          var self = this;
          if (!!this.cacheUrl[url]) {
            cb(self.cacheUrl[url]);
          } else {
            this.load_by_proxy(url, function (page) {
              self.cacheUrl[url] = page;
              cb(page);
            });
          }
        },
      },
      {
        key: "load_variants",
        value: function load_variants(variant_id, cb) {
          var to_send =
            "&ciselnik[" + $("select.variant").attr("id") + "]=" + variant_id;
          var url =
            this.config.artmieBase +
            "/wa_script/load_variants.php?id=" +
            BS.User.get_domain() +
            "&idp=" +
            BS.Variants.id_product +
            "&method=changed" +
            to_send +
            "&last_selected=" +
            BS.Variants.last_selected +
            "&ttl=" +
            this.config.ttl;
          if (this.config.fakeVariant) url = this.getFakeUrl();
          console.log(url);
          var self = this;
          this.load_by_proxy(url, function (msg) {
            var oParams = self.getParam(msg);
            var uri = oParams.new_url.replace(/^\/+/g, "");
            if (
              uri.lastIndexOf(".") > 0 &&
              uri.length - uri.lastIndexOf(".") < 5
            ) {
              uri = "".concat(oParams.name).concat(uri);
            }
            if (!!cb)
              cb({
                uri: uri,
                variant_id: variant_id,
              });
          });
        },
      },
      {
        key: "load_by_proxy",
        value: function load_by_proxy(url, cb) {
          if (this.config.isProxyVisit) {
            var proxyUrl =
              ""
                .concat(this.config.proxyBase, "/proxy-get-visit?cache_min=")
                .concat(this.config.cache_min, "&extra=") +
              encodeURIComponent(url);
            $.ajax({
              type: "POST",
              url: proxyUrl,
              data: {
                url: url,
              },
            }).done(function (msg) {
              cb(msg);
            });
          } else {
            $.ajax({
              type: "POST",
              url: url,
            }).done(function (msg) {
              cb(msg);
            });
          }
        },
      },
      {
        key: "getParam",
        value: function getParam(msg) {
          var _msg$match;
          var params = eval(
            "[" +
              ((_msg$match = msg.match(/update_product\((.*?)\)/gi)) === null ||
              _msg$match === void 0
                ? void 0
                : _msg$match[0]
                    .replace(/update_product\(/g, "")
                    .replace(/\)/g, "")) +
              "]"
          );
          var oParams = {};
          var items = [
            "id",
            "name",
            "wait_text",
            "new_url",
            "new_category",
            "pid",
          ];
          items.forEach(function (val, idx) {
            oParams["".concat(val)] = params[idx];
          });
          return oParams;
        },
      },
      {
        key: "getFakeUrl",
        value: function getFakeUrl() {
          return (
            this.config.artmieBase +
            "/wa_script/load_variants.php?id=maliarskeplatno&idp=646&method=changed&ciselnik[1]=".concat(
              variant_id,
              "&last_selected=null"
            )
          );
        },
      },
      {
        key: "buy_variant_event",
        value: function buy_variant_event(newDoc, this_element, box) {
          var self = this;
          var form_action = this_element.attr("action");
          var kusy = 1;
          if (WA.Url_translator.enabled === true) {
            var blizzi = BS.Basket.explode("pid=", form_action);
            var blizzi2 = BS.Basket.explode("&vid=", blizzi[1]);
            var product_id = blizzi2[0];
            var variant_id = 0;
            if (typeof blizzi2[1] !== "undefined") variant_id = blizzi2[1];
          } else {
            var blizzi = BS.Basket.explode("/", form_action);
            var product_id = blizzi[6];
            var variant_id = 0;
            if (typeof blizzi[7] !== "undefined") variant_id = blizzi[7];
          }
          if (
            BS.Design.third_generation() &&
            newDoc.find("body").hasClass("page-product-detail")
          ) {
            kusy = this_element.find("#kusy").val();
          }
          self.openOverlay();
          $.ajax({
            type: "POST",
            url: "/request.php?action=Basket_add_variant_control",
            data: {
              main_id: product_id,
              id_zakaznik: uzivatel_id,
            },
            success: function success(data) {
              var variant_selected_el = newDoc
                .find("input[name=variant_selected]")
                .val();
              var is_not_selected_variant = variant_selected_el == undefined;
              var clicked_buy_button = related_click == true;
              var need_to_choose_variant = data.params.choose_variant;
              var is_basket_popup =
                newDoc.find("body #ajax-basket").length || 0;
              if (
                variant_general &&
                ((variant_id == 0 &&
                  (is_not_selected_variant || is_basket_popup)) ||
                  clicked_buy_button ||
                  need_to_choose_variant) &&
                data.success
              ) {
                jQuery.post("/wa_script/basket_ajax.php", {
                  warning: "show",
                });
                window.location.replace(form_action);
                return false;
              } else {
                // if (typeof (fb_pixel) !== "undefined")
                // {
                //     if (typeof(kusy) === "undefined")
                //     {
                //         kusy = 1;
                //     }
                //     fb_pixel_init(product_id, kusy, 'addToCart');
                // }

                if (
                  BS.Design.template.is_selected("platinum") &&
                  newDoc.find("body").hasClass("basket-empty")
                ) {
                  $("body").removeClass("basket-empty");
                }
                $.post(
                  "/wa_script/basket_ajax.php",
                  {
                    method: "add",
                    kusy: kusy,
                    item: product_id,
                    item_variant: variant_id,
                    variant_selected:
                      newDoc.find("input[name=variant_selected]").length == 0
                        ? ""
                        : newDoc.find("input[name=variant_selected]").val(),
                    ciselnik1:
                      newDoc.find("select[name=ciselnik1]").length == 0
                        ? ""
                        : newDoc.find("select[name=ciselnik1]").val(),
                    ciselnik2:
                      newDoc.find("select[name=ciselnik2]").length == 0
                        ? ""
                        : newDoc.find("select[name=ciselnik2]").val(),
                    ciselnik3:
                      newDoc.find("select[name=ciselnik3]").length == 0
                        ? ""
                        : newDoc.find("select[name=ciselnik3]").val(),
                    poznamka: "",
                    stock:
                      newDoc.find("input[name=stock]").length == 0
                        ? ""
                        : newDoc.find("input[name=stock]").val(),
                    availability:
                      newDoc.find("input[name=availability]").length == 0
                        ? ""
                        : newDoc.find("input[name=availability]").val(),
                    delivery_to_day:
                      newDoc.find("input[name=delivery_to_day]").length == 0
                        ? ""
                        : newDoc.find("input[name=delivery_to_day]").val(),
                    number:
                      newDoc.find("input[name=number]").length == 0
                        ? ""
                        : newDoc.find("input[name=number]").val(),
                    parameter1:
                      newDoc.find("input[name=parameter1]").length == 0
                        ? ""
                        : newDoc.find("input[name=parameter1]").val(),
                    parameter2:
                      newDoc.find("input[name=parameter2]").length == 0
                        ? ""
                        : newDoc.find("input[name=parameter2]").val(),
                    parameter3:
                      newDoc.find("input[name=parameter3]").length == 0
                        ? ""
                        : newDoc.find("input[name=parameter3]").val(),
                    manufacturer:
                      newDoc.find("input[name=manufacturer]").length == 0
                        ? ""
                        : newDoc.find("input[name=manufacturer]").val(),
                    ean:
                      newDoc.find("input[name=ean]").length == 0
                        ? ""
                        : newDoc.find("input[name=ean]").val(),
                    id: uzivatel_id,
                    get_aditional_info: "1",
                  },
                  function (data) {
                    if (data == "2") {
                      if (self.overlay != undefined) {
                        self.overlay.fade_out();
                      }
                      BS.ui.popMessage.alert(BS.Basket.$not_in_stock);
                    } else if (data.substr(0, 2) == "3-") {
                      if (self.overlay != undefined) {
                        self.overlay.fade_out();
                      }
                      BS.ui.popMessage.alert(
                        BS.Basket.$not_bought_minimum +
                          " " +
                          data.replace(/3-/, "")
                      );
                    } else {
                      BS.Conversion.getEvent(
                        product_id,
                        variant_selected_el || 0,
                        kusy,
                        "add_to_cart"
                      );
                      $("body").append(data);
                      $("#ajax-basket").fadeIn("fast");
                      var window_height = $(window).height();
                      var basket_height = $("#ajax-basket").height();
                      if (basket_height + 40 > window_height) {
                        var from_top =
                          $(window).scrollTop() + window_height / 2;
                        $("#ajax-basket")
                          .css("position", "absolute")
                          .css("top", from_top - basket_height / 4 + "px");
                        if (
                          !BS.Design.template.is_selected(
                            BS.Design.templates.TEMPLATE_TITANIUM
                          )
                        ) {
                          $(
                            "#ajax-basket .similar, #ajax-basket .own_info"
                          ).hide();
                        }
                      } else {
                        basket_height = $("#ajax-basket").height();
                        $("#ajax-basket")
                          .css("top", "50%")
                          .css("margin-top", "-" + basket_height / 2 + "px");
                      }
                      if (BS.Design.is_new_template()) {
                        jQuery(".product").hoverIntent({
                          over: function over() {
                            jQuery(this)
                              .find(".icons_width_hack")
                              .animate(
                                {
                                  width: "145px",
                                },
                                300,
                                function () {}
                              );
                          },
                          out: function out() {
                            jQuery(this)
                              .find(".icons_width_hack")
                              .animate(
                                {
                                  width: "10px",
                                },
                                300,
                                function () {}
                              );
                          },
                          interval: 40,
                        });
                      }
                      BS.Basket.refresh_top_basket_data();
                      //recolor
                      BS.Design.recolor(
                        jQuery('<input class="buy_btn">')
                          .hide()
                          .appendTo("body"),
                        jQuery(".go .left a")
                      );
                      //BS.Basket.register_close_event();
                      self.register_close_event();
                    }
                  }
                );
                return false;
              }
            },
          });
        },
      },
      {
        key: "openOverlay",
        value: function openOverlay() {
          this.overlay = BS.Overlay.init(
            $("#page").length > 0 ? "#page" : "body",
            jQuery("<div />").appendTo("body"),
            {
              $z_index: 9999,
              $background_image_url: "",
              $background_color: "#fff",
              $opacity: 0.3,
              $is_clickable: true,
            }
          );
          this.overlay.fade_in();
        },
      },
      {
        key: "register_close_event",
        value: function register_close_event() {
          var self = this;
          jQuery(".close-box").click(function (el) {
            if (self.overlay != undefined) {
              self.overlay.fade_out();
            }
            jQuery("#ajax-basket").fadeOut(200);
            jQuery("#ajax-basket").remove();
            el.preventDefault();
            return false;
          });
        },
      },
    ]);
    return ProductVariant;
  })();
  window.ProductVariant = ProductVariant;
  console.log("ProductVariant loaded");
  /******/
})();
