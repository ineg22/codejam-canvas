const sw4 = document.querySelector('#sw4');
const sw32 = document.querySelector('#sw32');
const swPic = document.querySelector('#sw-pic');

const cv4 = document.querySelector('#cv4');
const cv32 = document.querySelector('#cv32');
const cvPic = document.querySelector('#cv-pic');

let actualCv = cv4;
draw4();

sw4.addEventListener('click', () => {
  actualCv = cv4;

  if (cv4.classList.contains('hidden')) {
    cv4.classList.remove('hidden');
    sw4.classList.add('size-switcher__item--selected');

    if (!cv32.classList.contains('hidden')) {
      cv32.classList.add('hidden');
      sw32.classList.remove('size-switcher__item--selected');
    }

    if (!cvPic.classList.contains('hidden')) {
      cvPic.classList.add('hidden');
      swPic.classList.remove('size-switcher__item--selected');
    }
  }

  draw4();
});

sw32.addEventListener('click', () => {
  actualCv = cv32;

  if (cv32.classList.contains('hidden')) {
    cv32.classList.remove('hidden');
    sw32.classList.add('size-switcher__item--selected');

    if (!cv4.classList.contains('hidden')) {
      cv4.classList.add('hidden');
      sw4.classList.remove('size-switcher__item--selected');
    }

    if (!cvPic.classList.contains('hidden')) {
      cvPic.classList.add('hidden');
      swPic.classList.remove('size-switcher__item--selected');
    }
  }

  draw32();
});

swPic.addEventListener('click', () => {
  actualCv = cvPic;

  if (cvPic.classList.contains('hidden')) {
    cvPic.classList.remove('hidden');
    swPic.classList.add('size-switcher__item--selected');

    if (!cv32.classList.contains('hidden')) {
      cv32.classList.add('hidden');
      sw32.classList.remove('size-switcher__item--selected');
    }

    if (!cv4.classList.contains('hidden')) {
      cv4.classList.add('hidden');
      sw4.classList.remove('size-switcher__item--selected');
    }
  }

  drawPic();
});

function draw4() {
  let context = actualCv.getContext('2d');
  let colors4;

  fetch('../data/4x4.json')
    .then(res => res.json(), rej => {
      throw new Error(rej);
    })
    .then(json => colors4 = json, rej => {
      throw new Error(rej);
    })
    .then(() => {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          context.fillStyle = `#${colors4[i][j]}`;
          context.fillRect(i * actualCv.width / 4, j * actualCv.height / 4, actualCv.width / 4, actualCv.height / 4);
        }
      }
    })
}

function draw32() {
  let context = actualCv.getContext('2d');
  let colors32;

  fetch('../data/32x32.json')
    .then(res => res.json(), rej => {
      throw new Error(rej);
    })
    .then(json => colors32 = json, rej => {
      throw new Error(rej);
    })
    .then(() => {
      for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
          context.fillStyle = `rgba(${colors32[i][j][0]}, ${colors32[i][j][1]}, ${colors32[i][j][2]}, ${colors32[i][j][3]})`;
          context.fillRect(i * actualCv.width / 32, j * actualCv.height / 32, actualCv.width / 32, actualCv.height / 32);
        }
      }
    })
}

function drawPic() {
  let context = actualCv.getContext('2d');
  let img = new Image(512, 512);
  img.src = '../data/image.png';

  img.addEventListener('load', () => {
    context.drawImage(img, 0, 0, 512, 512);
  });
}
