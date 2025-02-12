import TagCloud from 'TagCloud';
export default function renderTechnologies() {
  const container = '.text-sphere';
  const icons = {
    HTML5:
      '<iconify-icon icon="vscode-icons:file-type-html" width="50" height="50"></iconify-icon>',
    CSS3: '<iconify-icon icon="devicon:css3" width="50" height="50"></iconify-icon>',
    JavaScript:
      '<iconify-icon icon="vscode-icons:file-type-js-official" width="50" height="50"></iconify-icon>',
    React:
      '<iconify-icon icon="logos:react" width="50" height="50"></iconify-icon>',
    Redux:
      '<iconify-icon icon="logos:redux" width="50" height="50"></iconify-icon>',
    NodeJS:
      '<iconify-icon icon="logos:nodejs-icon" width="50" height="50"></iconify-icon>',
    Django:
      '<iconify-icon icon="vscode-icons:file-type-django" width="50" height="50"></iconify-icon>',
    PostgreSQL:
      '<iconify-icon icon="logos:postgresql" width="50" height="50"></iconify-icon>',
    MongoDB:
      '<iconify-icon icon="logos:mongodb-icon" width="50" height="50"></iconify-icon>',
    Git: '<iconify-icon icon="logos:git-icon" width="50" height="50"></iconify-icon>',
    Netlify:
      '<iconify-icon icon="skill-icons:netlify-dark" width="50" height="50"></iconify-icon>',
    Docker:
      '<iconify-icon icon="logos:docker-icon" width="50" height="50"></iconify-icon>',
    Oracle:
      '<iconify-icon icon="logos:oracle" width="70" height="70"></iconify-icon>',
  };

  const options = {
    maxSpeed: 'normal',
    itemClass: 'text-sphere',
    radius: 200,
  };

  setTimeout(() => {
    let _tags = TagCloud(container, Object.keys(icons), options);
    _tags['items'].forEach((tag) => {
      tag['el'].innerHTML = `<span style="cursor:pointer;">${
        icons[tag['el'].innerHTML]
      }</span>`;
    });
  }, 1000);
}
