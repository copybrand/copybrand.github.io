async function render() {
    let data = await fetch('data.json')
        .then(response => response.json())

    // console.log(data);

    document.title = data.site_title;

    document.querySelector('.site-title').innerHTML = data.site_title;
    document.querySelector('.site-description').innerHTML = data.site_description;
    document.querySelector('.site-logo').src = data.site_logo;

    let linkItemTemplate = document.querySelector('#link-item');

    data.links.forEach(link => {
        let linkeItemClone = linkItemTemplate.content.cloneNode(true);

        linkeItemClone.querySelector('.link').href = link.url;

        let src = '';
        if (link.image) {
            src = link.image
        } else {
            src = 'https://www.google.com/s2/favicons?domain=' + new URL(link.url).host + '&sz=128'
        }

        if (src) {
            let image = document.createElement('img');
            image.src = src;
            image.alt = link.label;

            linkeItemClone.querySelector('.image').append(image)
        }

        linkeItemClone.querySelector('.text').innerHTML = link.label;

        document.querySelector('.link-list').append(linkeItemClone)
    });


}

window.addEventListener('DOMContentLoaded', () => {
    render();
})