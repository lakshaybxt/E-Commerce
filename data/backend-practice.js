const xhr = new XMLHttpRequest();
xhr.addEventListener('load', () => {
    console.log(xhr.response);
});

// xhr.open('GET', 'https://supersimplebackend.dev');
xhr.open('GET', 'https://gist.githubusercontent.com/lakshaybxt/efe060afd31d45be49454e1514a62961/raw/b3247f6fd512b83c0233e6920930e3ba7ac4616d/products.json');
xhr.send();

