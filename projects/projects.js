import { fetchJSON, renderProjects } from '../global.js';

const projects = await fetchJSON('../lib/projects.json');
const projectsContainer = document.querySelector('.projects');
renderProjects(projects, projectsContainer, 'h2');

// Display the number of projects
function displayNumProjects(projects) {
    let num_projects = projects.length;
    num_projects = num_projects === 1 ? '1 Project' : num_projects + ' Projects';
    document.querySelector('.projects-title').textContent = num_projects;
}
displayNumProjects(projects);
