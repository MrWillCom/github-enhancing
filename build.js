const fs = require('fs')

console.log('Building release...')

const light = fs.readFileSync('./styles/light.css', { encoding: 'utf8' })
const dark = fs.readFileSync('./styles/dark.css', { encoding: 'utf8' })
const styles = fs.readFileSync('./styles/styles.css', { encoding: 'utf8' })
const scripts = fs.readFileSync('./js/main.js', {encoding: 'utf8'})

const release = `(() => {
    var body = document.body;
    var style = document.createElement('style');
    style.innerHTML = \`[data-color-mode=auto], [data-color-mode=light] { ${light} } @media (prefers-color-scheme: dark) { [data-color-mode=auto] { ${dark} } } [data-color-mode=dark] { ${dark} }\n${styles}\`;
    body.appendChild(style);

    ${scripts}
})()`

console.log('Writing release...')
fs.writeFileSync('./index.js', release, { encoding: 'utf8' })
console.log('Completed.')
