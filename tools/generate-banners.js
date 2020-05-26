
const fs = require('fs');
const Path = require('path');

const yargs = require('yargs');
const _ = require('lodash');

const random = require('random');
const seedrandom = require('seedrandom');

const Canvas = require('canvas');
const trianglify = require('trianglify');
const optipng = require('optipng');

const postsPath = Path.join(__dirname, '../source/_posts');
const bannersPath = Path.join(__dirname, '../source/assets/img/banners');

const ls = path => fs.readdirSync(path);
const lsFilter = (path, filter, noExt) => ls(path)
    .filter(file => file.match(filter))
    .map(name => noExt ? name.replace(filter, '') : name);

const flags = yargs.argv;

init()
  .catch(error => console.error(error));

function init() {
  let posts = lsFilter(postsPath, /.md$/, true);
  let banners = lsFilter(bannersPath, /\@banner.png$/, true);

  if (flags.force) {
    deleteBanners(banners, bannersPath);
    return generateBanners(posts, bannersPath);
  }

  let bannersToDelete = _.difference(banners, posts);
  let bannersToCreate = _.difference(posts, banners);

  if (!bannersToDelete.length) console.log('No banners to remove');
  if (!bannersToCreate.length) console.log('No banners to create');

  deleteBanners(bannersToDelete, bannersPath);
  return generateBanners(bannersToCreate, bannersPath);
}


function deleteBanners(list, path) {
  for (let name of list) {
    deleteBanner(`${path}/${name}@banner.png`);
    deleteBanner(`${path}/${name}@social.png`);
  }
}


function deleteBanner(file) {
  try {
    fs.unlinkSync(file);
    console.log(`Banner removed: ${file}`);
    return true;
  } catch (err) {
    return false;
  }
}


async function generateBanners(list, path) {
  for (let name of list) {
    await createBanner({ name, path: `${path}/${name}@banner.png`, width: 2500, height: 625, white: false });
    await createBanner({ name, path: `${path}/${name}@social.png`, width: 1200, height: 675, white: true });
  }
}


function createBanner(params) {
  let bannerPath = params.path;

  return new Promise(function (resolve, reject) {
    let compress = new optipng(['-o2']);
    let writeFile = fs.createWriteStream(bannerPath);

    let stream = createCanvas(params)
      .createPNGStream()
      .pipe(compress)
      .pipe(writeFile);

      stream.on('finish', () => resolve(bannerPath));
      stream.on('error', error => reject(error));
  })
  .then(bannerPath => console.log(`Banner created: ${bannerPath}`))
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
    cellSize: rand([75, 150, 100]),
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
  }

  return trianglify(options).toCanvas(defaultCanvas);;
}
