const CleanCSS = require('clean-css');
const fs = require('fs')

console.log('Building release...')

const light = new CleanCSS().minify(fs.readFileSync('./styles/light.css', { encoding: 'utf8' })).styles
const dark = new CleanCSS().minify(fs.readFileSync('./styles/dark.css', { encoding: 'utf8' })).styles
const styles = new CleanCSS().minify(fs.readFileSync('./styles/styles.css', { encoding: 'utf8' })).styles
const scripts = fs.readFileSync('./js/main.js', {encoding: 'utf8'})

const release = `(() => {
    var body = document.body;
    var style = document.createElement('style');
    style.innerHTML = \`:root, [data-color-mode=auto], [data-color-mode=light] { ${light} } @media (prefers-color-scheme: dark) { [data-color-mode=auto] { ${dark} } } [data-color-mode=dark] { ${dark} }\n${styles}\`;
    body.appendChild(style);

    ${scripts}
})()`

console.log('Writing release...')
fs.writeFileSync('./index.js', release, { encoding: 'utf8' })
console.log('Completed.')
