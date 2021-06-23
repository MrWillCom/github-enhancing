console.log('GitHub Enhancing is launched.')

document.querySelectorAll(".h4.mb-3").forEach((el) => {
    el.parentNode.parentElement.setAttribute("data-gheh-section-type", el.innerText.split(" ")[0].toLowerCase());
})
