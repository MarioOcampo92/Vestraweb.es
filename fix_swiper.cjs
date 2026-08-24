const fs = require('fs');
let html = fs.readFileSync('disenador-grafico-barcelona.html', 'utf8');

const swiperWrapperStart = html.indexOf('<div class="swiper-wrapper">');
if (swiperWrapperStart > -1) {
    const swiperWrapperEnd = html.indexOf('</div>', swiperWrapperStart + 30);
    // Find all slides
    const slidesBlock = html.substring(swiperWrapperStart + '<div class="swiper-wrapper">'.length, swiperWrapperEnd);
    
    // Only duplicate if not already duplicated (check length)
    if (slidesBlock.split('swiper-slide').length < 8) {
        const duplicated = slidesBlock + slidesBlock;
        html = html.substring(0, swiperWrapperStart + '<div class="swiper-wrapper">'.length) + duplicated + html.substring(swiperWrapperEnd);
        fs.writeFileSync('disenador-grafico-barcelona.html', html, 'utf8');
        console.log('Swiper slides duplicated to fix loop gap!');
    } else {
        console.log('Slides already duplicated.');
    }
}
