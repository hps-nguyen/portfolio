console.log('IT’S ALIVE!');

function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}


// let navLinks = $$("nav a");
// let currentLink = navLinks.find(
//     (a) => a.host === location.host && a.pathname === location.pathname
// );
// currentLink?.classList.add('current');


// Navigation links
const ARE_WE_HOME = document.documentElement.classList.contains('home');

let pages = [
    { url: '', title: 'Home' },
    { url: 'projects/', title: 'Projects' },
    { url: 'contact/', title: 'Contact' },
    { url: 'resume/', title: 'Resume' },
    { url: 'https://github.com/hps-nguyen', title: 'GitHub profile' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

for (let p of pages) {
    let url = p.url;
    let title = p.title;
    url = !ARE_WE_HOME && !url.startsWith('http') ? '../' + url : url;

    let a = document.createElement('a');
    a.href = url;
    a.textContent = title;
    nav.append(a);

    if (a.host === location.host && a.pathname === location.pathname) {
        a.classList.add('current');
      }
    if (a.host !== location.host) {
        a.target = '_blank';
    }
}


// Light/Dark mode selection
document.body.insertAdjacentHTML(
    'afterbegin',
    `
    <label class="color-scheme">
        Theme:
        <select>
            <option value="light dark">Automatic</option>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
    </label>
    `
)

let select = document.querySelector('select')
select.addEventListener('input', function (event) {
    console.log('color scheme changed to', event.target.value);
    document.documentElement.style.setProperty('color-scheme', event.target.value);
    localStorage.colorScheme = event.target.value;
});

document.addEventListener('DOMContentLoaded', function () {
    let colorScheme = localStorage.colorScheme || 'light dark';
    select.value = colorScheme;
    document.documentElement.style.setProperty('color-scheme', colorScheme);
});


// Import project data
export async function fetchJSON(url) {
    try {
        // Fetch the JSON file from the given URL
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch projects: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
        

    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }
}

export function renderProjects(project, containerElement, headingLevel = 'h2') {
    // Validate containerElement
    if (!containerElement) {
        console.error('Container element is null or undefined');
        return;
    }

    // Validate headingLevel
    const validHeadings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
    if (!validHeadings.includes(headingLevel)) {
        console.error(`Invalid heading level: ${headingLevel}. Defaulting to 'h2'.`);
        headingLevel = 'h2'; // Fallback to 'h2'
    }

    // Validate project data (no projects, empty array, etc.)
    if (!project || project.length === 0) {
        console.error('No projects provided to renderProjects()');
    }

    containerElement.innerHTML = '';
    for (let p of project) {
        const article = document.createElement('article');
        const heading = document.createElement(headingLevel);
        heading.textContent = p.title;
        article.innerHTML = `
        <img src="${p.image}" alt="${p.title}">
        <p>${p.description}</p>
        `;
        article.prepend(heading);
        containerElement.appendChild(article);
    }
}

export async function fetchGitHubData(username) {
    return fetchJSON(`https://api.github.com/users/${username}`);
}
