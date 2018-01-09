if(window.frameElement) {
  var $live = $(parent.document.getElementsByClassName("theme-editor__add-section")),
      $added = $(parent.document.getElementsByClassName("theme-editor__index")),
      icon_youtube = '<img src="//ocean.tonytemplates.com/shopify/yourstore-admin/youtube.png" class="youtubebutton" alt="YouTube" style="position: absolute; top: 0; right: 0; background: #fff3f3; padding: 12px; cursor: pointer;">',
      image_class = 'section-image',
      youtube_class = 'section-youtube',
      delay_time = 1500,
  	  start_delay_time = 4000;

  $added.find(".youtubebutton").length && $added.find(".youtubebutton").remove();  
  
  var add_image = function(this_obj_type, $append_this, json_obj) {
    if($append_this.find('.' + image_class).length) return false;
    else if(!json_obj['images'].hasOwnProperty(this_obj_type)) return false;

    var image_append = '<img src="' + json_obj['defaulturl'] + json_obj['images'][this_obj_type] + '" alt="">',
        $image_append = $(image_append)
    .css({
      width: '100%',
      marginTop: 10
    })
    .addClass(image_class);

    $append_this.append($image_append);
  };

  var set_images = function(json_obj) {
    $live.each(function() {
      var $this = $(this),
          this_obj = $this.data('new-section'),
          this_obj_type,
          $this_button;

      if(!this_obj.type) return;
      else this_obj_type = this_obj.type;

      $this_button = $this.find('button').first();

      var set_youtube_btn = function() {
        if(youtube_obj.youtube.hasOwnProperty(this_obj_type) && !$this_button.find('.' + youtube_class).length) {
          $icon_youtube = $('<a href="' + youtube_obj['youtube'][this_obj_type] + '">' + icon_youtube + '</a>').css({
            display: 'inline-block',
            float: 'right',
            width: 24,
            height: 'auto'
          })
          .addClass(youtube_class);

          $this_button.append($icon_youtube);
        }
      }

      add_image(this_obj_type, $this_button, json_obj);

      $this_button.css({ paddingRight: 20 });

      $this_button.parent().find('.theme-editor__add-section-btn').on('click', function() {
        setTimeout(addImagesInAddedWidgets.bind(this, json_obj), delay_time);
      });

      if($(parent.document.getElementsByClassName('theme-editor__subheading')).length) {
        $(parent.document.getElementsByClassName('theme-editor__subheading')).css({"font-weight": "900", "font-size":"18px", "color":"#585858"});
        $(parent.document.getElementsByClassName('theme-editor__add-section-item')).each(function(){
          $(this).find("img").length && $(this).css({"text-decoration":"underline","font-weight":"600"});
        });
      }
    });
  };

  function addImagesInAddedWidgets(json_obj) {
    if($(parent.document.getElementsByClassName('btn-destroy')).length) {
      var $btn_destroy = $(parent.document.getElementsByClassName('btn-destroy'));
      $btn_destroy.unbind().on('click', function() { setTimeout(addImagesInAddedWidgets.bind(this, json_obj), delay_time); });
    }

    var $ul = $added.find(".next-tab__panel__container").find("ul.theme-editor__card[data-content-for-index='']").eq(0),
        $li = $ul.find("li");

    if($li.length === 1) return false;

    $li.each(function() {
      var $this = $(this),
          title = $this.data('bind-attribute'),
          $append_this = $this.find('> a');

      if(!title) return;

      title = title.split(',');

      title = parseTitle(title[1]);

      $append_this.unbind().on('click', function(){
        setTimeout(function(){setYoutube(json_obj, title)}, 200);
      });

      setYoutube(json_obj, title)
    });
  };

  function setYoutube(json_obj, title){
    var value = json_obj['youtube'][title];
    if(value === undefined) return false;
    if(!$(parent.document.getElementsByClassName("theme-editor__panel--is-active"))) return false;
    var $openedtab = $(parent.document.getElementsByClassName("theme-editor__panel--is-active"));
    if(String($openedtab.attr("id")).indexOf("-"+title+"-") == -1) return false;
    var $h2 = $openedtab.find("h2").first();
    if($h2.find("img").length == 0) {
      $h2.append(icon_youtube);
      $h2.find("img").attr("data-link", value).click(function(){window.open($(this).attr('data-link'), '_blank');});
    }
  }

  function parseTitle(title) {
    var new_title = '',
        i = 0;

    for(; i < title.length; i++) {
      if(title.charAt(i) === '\'' || title.charAt(i) === '\)' || title.charAt(i) === '\}' || title.charAt(i) ===  '\"' || title.charAt(i) ===  ' ') continue;
      new_title += title.charAt(i);
    }

    return new_title;
  }
  
  var json = {
    "defaulturl": "\/\/ocean.tonytemplates.com\/shopify\/yourstore-admin\/",
    "images": {
      "texts-section": "texts-section.png",
      "fixedbanners-section": "banners-colors.jpg",
      "banners-section": "banners-section.jpg",
      "banners-texts": "banners-texts.jpg",
      "fullscreen_banners": "fullwidth-banners.jpg",
      "banners-info": "info-banners.jpg",
      "featured-blog": "blog-posts.jpg",
      "info_section": "info-block.jpg",
      "testimonials": "testimonials.jpg",
      "testimonials-2": "testimonials-2.jpg",
      "testimonials-3": "testimonials-3.jpg",
      "collection-list": "collection-list.jpg",
      "collection-2-list": "collection-list-texts.jpg",
      "collectionsall": "collection-list.jpg",
      "grid-list": "grid-list.jpg",
      "icons-section": "icons-list.jpg",
      "text2-section": "text-block-2.jpg",
      "text3-section": "text-block-3.jpg",
      "bigslider-products": "bigslider.jpg",
      "one-product": "oneproduct.jpg",
      "featured-products": "productsgrid.jpg",
      "product-header": "productspresentation.jpg",
      "collection-products": "productswithbanner.jpg",
      "sliders-group": "slidersgroups.jpg",
      "collection-tabs": "tabswithproducts.jpg",
      "slider-with-banners": "sliderwithbanners.jpg",
      "brands-list": "brandslist.jpg"
    },
    "youtube": {
      "fixedbanners-section": "https://www.youtube.com/watch?v=RnEOJzTe0qM&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=2",
      "banners-section": "https://www.youtube.com/watch?v=8hZs6BZc8Cg&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "banners-texts": "https://www.youtube.com/watch?v=T5Ul6kmOCCU&index=3&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "fullscreen_banners": "https://www.youtube.com/watch?v=pTTjdTerzuI&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=4",
      "banners-info": "https://www.youtube.com/watch?v=SAn7F0phAuI&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=5",
      "featured-blog": "https://www.youtube.com/watch?v=yuPbmCiyP2U&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=6",
      "info_section": "https://www.youtube.com/watch?v=MyOtXaTiGHw&index=7&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "testimonials": "https://www.youtube.com/watch?v=hFwHCjDwg-k&index=8&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "collection-list": "https://www.youtube.com/watch?v=3VHrmgDJwNM&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=9",
      "collection-2-list": "https://www.youtube.com/watch?v=_5dByYyIUAk&index=10&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "collectionsall": "https://www.youtube.com/watch?v=Ja4JjQQAN_4&index=11&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "grid-list": "https://www.youtube.com/watch?v=6H25lpKxWUY&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=12",
      "icons-section": "https://www.youtube.com/watch?v=3oNlhLy27Fc&index=13&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "custom_html": "https://www.youtube.com/watch?v=ehW7vBwtTLA&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=14",
      "instagram": "https://www.youtube.com/watch?v=0GGLdXaEJjo&index=15&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "texts-section": "https://www.youtube.com/watch?v=uY933OANFc4&index=22&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "text2-section": "https://www.youtube.com/watch?v=jL4FKbWFTNs&index=23&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "text3-section": "https://www.youtube.com/watch?v=8rc3ez-byz0&index=24&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "one-product": "https://www.youtube.com/watch?v=qZt478bb-8g&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=16",
      "featured-products": "https://www.youtube.com/watch?v=FZiEsO0QEiI&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=17",
      "collection-products": "https://www.youtube.com/watch?v=p8xitC7FI3k&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=18",
      "sliders-group": "https://www.youtube.com/watch?v=Ycnj1SFovl8&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=19",
      "collection-tabs": "https://www.youtube.com/watch?v=AwQq1dg7_p0&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=20",
      "slider-with-banners": "https://www.youtube.com/watch?v=hjJ-NCfAelg&index=25&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR",
      "brands-list": "https://www.youtube.com/watch?v=yMPvfsxAtPo&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=21",
      "revolution-slider": "https://www.youtube.com/watch?v=tA8JPpvlXGg&list=PLnA7KvNvVDrS_3SU7rAInqAaUuT5rf2gR&index=26"
    }
  };
  
  $( document ).ready(function(){
    set_images(json);
    setTimeout(function(){addImagesInAddedWidgets(json);}, start_delay_time);
  });
}