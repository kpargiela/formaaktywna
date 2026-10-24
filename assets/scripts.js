var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
  let window = _____WB$wombat$assign$function_____("window");
  let self = _____WB$wombat$assign$function_____("self");
  let document = _____WB$wombat$assign$function_____("document");
  let location = _____WB$wombat$assign$function_____("location");
  let top = _____WB$wombat$assign$function_____("top");
  let parent = _____WB$wombat$assign$function_____("parent");
  let frames = _____WB$wombat$assign$function_____("frames");
  let opener = _____WB$wombat$assign$function_____("opener");

const conjuctionsArr = [' W ', ' w ', ' i ', ' na ', ' przy ', ' jako ', ' się ', ' to ', ' z ', ' jest ',
' nie ', ' które ', ' do ', ' aby ', ' są ', ' a ', ' poza ', ' że ', ' je ', ' są ', ' co ', ' o ', ' lecz ', ' jaki ',
' one ', ' Stąd ', ' dla ', ' też ', ' więc ', ' To ', ' im ', ' we ', ' za ', '&nbsp;za ', ' ze ', ' był ', ' tak ', ' aby ',
 ' aż ', ' ma ', ' jak ', ' swego ', ' który ', ' od ', ' Jej ', ' pod ', ' ponieważ ', ' jak ', ' iż ', ' niż ', ' prof. ', '&nbsp;nie ', ' Pandemia ', ' Taka ', ' się, ',
  ' 50 ', ' oraz ', ' oraz\n'];

// Pandemia Taka się, 

const p = document.getElementsByTagName('p');

for (let i = 0; i < p.length; i++) {

    let paragraph = p[i];

    conjuctionsArr.forEach(conjuction => {

        const char = conjuction.split(' ')[1];

        conjuctionToNextLine = ' ' + char + '&nbsp;';

        paragraph.innerHTML = paragraph.innerHTML.replace( new RegExp( conjuction, 'g' ), conjuctionToNextLine );

    }, false);
}


const toogleLinks = document.querySelectorAll('.prolog-item');
const toogleBlocks = document.querySelectorAll('.content');
const description = document.getElementsByClassName('description')[0];
const screenshotsSection = document.getElementsByClassName('screenshots')[0];
const animationSection = document.getElementsByClassName('animation')[0];
const footer = document.getElementsByClassName('footer')[0];


let prevContentBtn = document.createElement('i');
let nextContentBtn = document.createElement('i');
let closeContentBtn = document.createElement('i');
prevContentBtn.classList.add("far", "fa-caret-square-left", "btn-prev-content");
nextContentBtn.classList.add("far", "fa-caret-square-right", "btn-prev-content");
closeContentBtn.classList.add("far", "fa-window-close", "btn-close-content");
// Loop through all links
Array.from(toogleLinks).forEach(link => {
		// add click event
    link.addEventListener('click', function(event) {
    	// Hide all blocks
		Array.from(toogleBlocks).forEach(item => item.classList.add('hidden'));
        const target = '#' + this.getAttribute('data-prolog');
        document.querySelector(target).classList.remove('hidden');
        document.querySelector(target).appendChild(closeContentBtn);

        let thisItemId = this.getAttribute('data-prolog');
        let thisItem = document.getElementById(thisItemId);
        // location.href = "#prolog";

        thisItem.scrollIntoView(true);
        window.scrollBy(0, -100);

        description.classList.add('hidden');
        screenshotsSection.classList.add('hidden');
        footer.classList.add('hidden');

    }, false);
    closeContentBtn.addEventListener('click', function(event) {
        description.classList.remove('hidden');
        screenshotsSection.classList.remove('hidden');
        footer.classList.remove('hidden');
    	// Hide all blocks
		Array.from(toogleBlocks).forEach(item => {
            item.classList.add('hidden')
        });
    }, false);
});


// fullscreen gallery

let body = document.querySelector('body');
let container = document.createElement('div');
body.appendChild(container);
 
let fullScreenBtn = document.createElement('button');
let fullScreenIcon = '<i class="fas fa-expand"></i>';
fullScreenBtn.innerHTML = fullScreenIcon;
fullScreenBtn.classList.add('btn-fullscreen');
container.appendChild(fullScreenBtn);

let closeBtn = document.createElement('button');
let closeIcon = '<i class="fas fa-times"></i>';
closeBtn.innerHTML = closeIcon;
closeBtn.classList.add('btn-close');
container.appendChild(closeBtn);

container.style.visibility = 'hidden';

let pictures = document.querySelectorAll('.gallery img');
let picsArr = Array.prototype.slice.call(pictures, 0);

let miniatures;
let miniaturesArr;

let lightboxMiniatures = (currentPic) => {

    let miniature;

    if (!miniatures) {
        miniatures = document.createElement('div');
        miniatures.classList.add('miniatures');
        container.appendChild(miniatures);

        for (let i = 0; i < picsArr.length; i++) {
            miniature = picsArr[i].cloneNode(true);
            if (miniature != currentPic) {
                miniature.classList.add('miniature');
                miniatures.appendChild(miniature);
            }
        }
    }
}

for (let i = 0; i < picsArr.length; i++) {

    let currentPic = picsArr[i];

    currentPic.addEventListener('click', function (e) {

        container.classList.add('lightbox');
        container.style.visibility = 'visible';

        var indexCurrentPic = picsArr.indexOf(currentPic);

        let addPictures = () => {

            currentPicClone = currentPic.cloneNode(true);
            container.appendChild(currentPicClone);
            currentPicClone.classList.add('lightbox-current-img');

        };

        let pickFromMiniatures = () => {


			Array.from(miniatures.childNodes).forEach(pickedMiniature => {

				this.classList.add('active');
				// add click event
				pickedMiniature.addEventListener('click', function(event) {
					
					Array.from(miniatures.childNodes).forEach(miniature => miniature.classList.remove('active'));
					this.classList.add('active');

                    currentPicClone.remove();
                    currentPicClone = pickedMiniature.cloneNode(true);
                    currentPicClone.classList.remove('miniature');
                    currentPicClone.classList.add('lightbox-current-img');
                    container.appendChild(currentPicClone);

				}, false);
			});

        };

        let removePictures = () => {

            currentPicClone.remove();

        };

        let miniaturesScrollOnDrag = () => {

            miniatures.setAttribute('draggable', true);

            let curXPos, curDown;

            miniatures.addEventListener('mousemove', function (e) {
                if (curDown) {
                    miniatures.scrollTo((miniatures.scrollLeft + ((curXPos - e.pageX) / 5)), 0);
                }
            }, false);

            miniatures.addEventListener('mousedown', function (e) {
                e.preventDefault();

                curXPos = e.pageX;
                curDown = true;
            }, false);

            miniatures.addEventListener('mouseup', function (e) {
                e.preventDefault();

                curDown = false;
            }, false);

        };

        function openFullscreen() {
            if (currentPicClone.requestFullscreen) {
                currentPicClone.requestFullscreen();
            } else if (currentPicClone.mozRequestFullScreen) { /* Firefox */
                currentPicClone.mozRequestFullScreen();
            } else if (currentPicClone.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
                currentPicClone.webkitRequestFullscreen();
            } else if (currentPicClone.msRequestFullscreen) { /* IE/Edge */
                currentPicClone.msRequestFullscreen();
            }
        }


        fullScreenBtn.addEventListener('click', openFullscreen, false);

        addPictures();
        lightboxMiniatures(currentPic);
        pickFromMiniatures();
        miniaturesScrollOnDrag();

        closeBtn.addEventListener('click', function (e) {
            container.style.visibility = 'hidden';

            removePictures();
        }, false);

    }, false);
}




}
/*
     FILE ARCHIVED ON 01:21:05 Jan 23, 2022 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 10:08:40 Nov 19, 2023.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 506.389
  exclusion.robots: 0.068
  exclusion.robots.policy: 0.059
  cdx.remote: 0.054
  esindex: 0.009
  LoadShardBlock: 68.664 (3)
  PetaboxLoader3.datanode: 72.302 (4)
  PetaboxLoader3.resolve: 74.063 (2)
  load_resource: 84.676
*/