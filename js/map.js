
var jsonPoints = {"type":"FeatureCollection","features":[
        {"type":"Feature","id":"Россия-Москва-Москва-1","geometry":{"type":"Point","coordinates":[55.783478, 37.632098]},"properties":{"balloonContent":"<div class='content_baloon'><p class='title'>Сервисный центр Comeforta</p><p class='address'>г. Москва улица Гиляровского, 39</p><ul><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li></ul></div></div>","clusterCaption":"","hintContent":""},"options":{"iconLayout":"default#image","iconImageHref":"img/map_icon.convert","iconImageSize":[43,50]}
        },

        {"type":"Feature","id":"Беларусь-Могилёв-Могилёв-2","geometry":{"type":"Point","coordinates":[53.894548, 30.330654]},"properties":{"balloonContent":"<div class='content_baloon'><p class='title'>Могилёвский основной центр</p><p class='address'>г. Могилёв ул. Победителей, д. 222</p><ul><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li></ul></div></div>","clusterCaption":"","hintContent":""},"options":{"iconLayout":"default#image","iconImageHref":"img/map_icon.convert","iconImageSize":[43,50]}
        },

        {"type":"Feature","id":"Беларусь-Минск-Минск-3","geometry":{"type":"Point","coordinates":[53.922273, 27.473850]},"properties":{"balloonContent":"<div class='content_baloon'><p class='title'>Центральный офис</p><p class='address'>г. Минск ул. Петра Глебки, д. 222 оф. 452</p><ul><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li></ul></div></div>","clusterCaption":"","hintContent":""},"options":{"iconLayout":"default#image","iconImageHref":"img/map_icon.convert","iconImageSize":[43,50]}
        },
        {"type":"Feature","id":"Беларусь-Бобруйск-Бобруйск-4","geometry":{"type":"Point","coordinates":[53.135658, 29.226319]},"properties":{"balloonContent":"<div class='content_baloon'><p class='title'>Сервисный центр Бобруйска</p><p class='address'>г. Бобруйск ул. Победы, д. 15 оф. 56</p><ul><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li></ul></div></div>","clusterCaption":"","hintContent":""},"options":{"iconLayout":"default#image","iconImageHref":"img/map_icon.convert","iconImageSize":[43,50]}
        },
        {"type":"Feature","id":"Беларусь-Гомель-Гомель-5","geometry":{"type":"Point","coordinates":[52.424160, 31.014272]},"properties":{"balloonContent":"<div class='content_baloon'><p class='title'>Сервисный центр с очень длинным названием</p><p class='address'>г. Гомель ул. Захарова, д. 97</p><ul><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li><li><a href='tel:8 (029) 111-11-11'>8 (029) 111-11-11</a></li></ul></div></div>","clusterCaption":"","hintContent":""},"options":{"iconLayout":"default#image","iconImageHref":"img/map_icon.convert","iconImageSize":[43,50]}
        },


    ]};


var myMap = null,
    objectManager = null,
    c1,c2;

(function($) {
    $(function() {

        $('.js-locate-center').on('click', function () {
            var $item = $(this).closest('.js-center-item');

            c1 = parseFloat($item.data('c1'));
            c2 = parseFloat($item.data('c2'));

            myMap.setCenter([c1, c2], 12);
            myMap.balloon.open([c1, c2], $item.find('.js-balloon-content').html(), {});

            setTimeout(function () {
                myMap.panTo([c1, c2]);
                setTimeout(function () {
                    $('html, body').animate({ scrollTop: ($('#centers_map').offset().top - 150) }, 500);
                }, 200);

            }, 100)
        });


        $('#center-country').on('change', function () {
            var country = $(this).val();
            $('#center-city').val('');
            $('#center-city').find('option').attr('disabled', true);
            $('#center-city').find('option').each(function () {
                if($(this).data('country') == country) {
                    $(this).attr('disabled', false);
                }
            });
            //$('#center-city').trigger('refresh');
            $('#center-city').on('select2:clearing',function (e) {
                // Do something
            });

        });

        $('#search_centers').on('click', function () {
            var city = $('#center-city').val(),
             country = $('#center-country').val(),
                pointsCount = jsonPoints.features.length;
            //////////////////////////
            myMap.geoObjects.removeAll();
            objectManager.removeAll();
            objectManager.add(jsonPoints);
            if(city !== '') {
                console.log(city);
                objectManager.objects.each(function (object) {
                    // console.log(object.id);
                    if(object.id.indexOf(city + '-') === -1) {
                        objectManager.objects.remove([object.id]);
                        pointsCount--;
                    }
                });

                $('.js-center-item').addClass('center-item-hidden');
                $('.js-center-item[data-city="'+city+'"]').removeClass('center-item-hidden');
            }

            if(country !== '') {
                console.log(country);
                objectManager.objects.each(function (object) {
                    if(object.id.indexOf(country + '-') === -1) {
                        objectManager.objects.remove([object.id]);
                        pointsCount--;
                    }
                });
                $('.js-center-item').addClass('center-item-hidden');
                $('.js-center-item[data-country="'+country+'"]').removeClass('center-item-hidden')
            }

            myMap.geoObjects.add(objectManager);

            if(pointsCount > 1) {
                myMap.setBounds( objectManager.getBounds(),{zoomMargin: 15} );
            } else {
                objectManager.objects.each(function (object) {
                    myMap.setZoom(15);
                    myMap.panTo(object.geometry.coordinates);
                    // console.log();
                });
            }



        });


    });
})(jQuery);




ymaps.ready(init);

function init () {
    var windowWidth = $(window).width();
    myMap = new ymaps.Map('centers_map', {
        center: [53.902284, 27.561831],
        zoom: 6
    }, {
        searchControlProvider: 'yandex#search'
    });

    clusterer = new ymaps.Clusterer({
        // Зададим массив, описывающий иконки кластеров разного размера.
        clusterIcons: [
            {
                href: 'img/map_icon.convert',
                size: [40, 40],
                offset: [-20, -20]
            },
            {
                href: 'img/map_icon.convert',
                size: [60, 60],
                offset: [-30, -30]
            }],
        // Эта опция отвечает за размеры кластеров.
        // В данном случае для кластеров, содержащих до 100 элементов,
        // будет показываться маленькая иконка. Для остальных - большая.
        clusterNumbers: [10],
        clusterIconContentLayout: null
    });


    objectManager = new ymaps.ObjectManager({
        clusterize: true,
        gridSize: 32
    });

    if(windowWidth < 800) {
        myMap.behaviors.disable(['drag']);
    } else {
        // myMap.behaviors.disable(['scrollZoom']);
    }


    MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class="cluster_text">{{ properties.geoObjects.length }}</div>'
    );

    objectManager.clusters.options.set({
        clusterIcons: [{
            href: 'img/map_icon.convert',
            size: [43, 50],
            offset: [-20, -40]
        }],
        clusterIconContentLayout: MyIconContentLayout,
    });
    objectManager.add(jsonPoints);
    myMap.geoObjects.add(objectManager);
    myMap.setBounds( objectManager.getBounds(),{zoomMargin: 8} );


}
