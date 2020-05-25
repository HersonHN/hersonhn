
const fs = require('fs');
const Path = require('path');

const yargs = require('yargs');
const _ = require('lodash');
const random = require('random');
const seedrandom = require('seedrandom');
const trianglify = require('trianglify');
const Canvas = require('canvas');

const postPath = Path.join(__dirname, '../source/_posts');
const bannersPath = Path.join(__dirname, '../source/assets/img/banners');

const ls = path => fs.readdirSync(path);
const lsFilter = (path, filter, noExt) => ls(path)
    .filter(file => file.match(filter))
    .map(name => noExt ? name.replace(filter, '') : name);

const flags = yargs.argv;

init();

function init() {
  let posts = lsFilter(postPath, /.md$/, true);
  let banners = lsFilter(bannersPath, /\@banner.png$/, true);

  if (flags.force) {
    deleteBanners(banners, bannersPath);
    generateBanners(posts, bannersPath);
    return;
  }

  let bannersToDelete = _.difference(banners, posts);
  let bannersToCreate = _.difference(posts, banners);

  if (!bannersToDelete.length) console.log('No banners to remove');
  if (!bannersToCreate.length) console.log('No banners to create');

  deleteBanners(bannersToDelete, bannersPath);
  generateBanners(bannersToCreate, bannersPath);
}


function deleteBanners(list, path) {
  for (let name of list) {
    deleteBanner(`${path}/${name}@banner.png`);
    deleteBanner(`${path}/${name}@social.png`);
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
    let bannerPath = `${path}/${name}@banner.png`;
    let socialPath = `${path}/${name}@social.png`;

    const banner = fs.createWriteStream(bannerPath);
    const social = fs.createWriteStream(socialPath);

    createCanvas({ name, width: 2500, height: 625, white: false }).createPNGStream().pipe(banner);
    createCanvas({ name, width: 1200, height: 675, white: true  }).createPNGStream().pipe(social);

    console.log(`Banner created: ${bannerPath}`);
    console.log(`Banner created: ${socialPath}`);
  }
}


function createCanvas({ name, width, height, white }) {
  random.use(seedrandom(name));

  let rand = (list) => {
    let index = random.int(0, list.length - 1);
    return list[index];
  }

  let options = {
    width: width,
    height: height,
    xColors: 'random',
    yColors: 'random',
    cellSize: rand([75, 40, 100]),
    colorSpace: rand(['rgb', 'hsv', 'hsl', 'hsi', 'lab', 'hcl']),
    fill: false,
    seed: name,
    strokeWidth: 2,
    variance: rand([0, 0.75, 1, 1.5, 2, 2.5, 3]),
  };

  let defaultCanvas = null;
  if (white) {
    defaultCanvas = Canvas.createCanvas(options.width, options.height);
    let ctx = defaultCanvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, options.width, options.height);
    ctx.imageSmoothingEnabled = false;
  }

  const trianglifyCanvas = trianglify(options).toCanvas(defaultCanvas);

  return trianglifyCanvas;
}
