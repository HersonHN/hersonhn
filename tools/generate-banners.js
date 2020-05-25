
const fs = require('fs');
const Path = require('path');

const _ = require('lodash');
const random = require('random');
const seedrandom = require('seedrandom');
const trianglify = require('trianglify');

const ls = path => fs.readdirSync(path);
const lsFilter = (path, filter, noExt) => ls(path)
    .filter(file => file.match(filter))
    .map(name => noExt ? name.replace(filter, '') : name);

const postPath = Path.join(__dirname, '../source/_posts');
const bannersPath = Path.join(__dirname, '../source/assets/img/banners');

init();

function init() {
  let posts = lsFilter(postPath, /.md$/, true);
  let banners = lsFilter(bannersPath, /.png$/, true);

  let bannersToDelete = _.difference(banners, posts);
  let bannersToCreate = _.difference(posts, banners);

  if (!bannersToDelete.length) console.log('No banners to remove');
  if (!bannersToCreate.length) console.log('No banners to create');

  deleteBanners(bannersToDelete, bannersPath);
  generateBanners(bannersToCreate, bannersPath);
}


function deleteBanners(list, path) {
  for (let name of list) {
    deleteBanner(`${path}/${name}.png`);
    deleteBanner(`${path}/${name}.jpg`);
  }
}

function deleteBanner(file) {
  console.log(`Banner removed: ${file}`);
  try {
    fs.unlinkSync(file);
    return true;
  } catch (err) {
    return false;
  }
}

function generateBanners(list, path) {
  for (let name of list) {
    let pngPath = `${path}/${name}.png`;
    let jpgPath = `${path}/${name}.jpg`;

    const png = fs.createWriteStream(pngPath);
    const jpg = fs.createWriteStream(jpgPath);

    let canvas = createCanvas(name);
    canvas.createPNGStream().pipe(png);
    canvas.createJPEGStream().pipe(jpg);

    console.log(`Banner created: ${pngPath}`);
    console.log(`Banner created: ${jpgPath}`);
  }
}


function createCanvas(name) {
  random.use(seedrandom(name));

  let rand = (list) => {
    let index = random.int(0, list.length - 1);
    return list[index];
  }

  const canvas = trianglify({
    width: 800,
    height: 800 / 16 * 9,
    xColors: 'random',
    yColors: 'random',
    cellSize: rand([75, 40, 100]),
    colorSpace: rand(['rgb', 'hsv', 'hsl', 'hsi', 'lab', 'hcl']),
    fill: false,
    seed: name,
    strokeWidth: 2,
    variance: rand([0, 0.75, 1, 1.5, 2, 2.5, 3]),
  }).toCanvas();

  return canvas;
}
