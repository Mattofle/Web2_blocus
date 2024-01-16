import { clearPage, renderPageTitle } from '../../utils/render';

const ViewMooviePage = () => {
    clearPage();
    renderPageTitle('ViewMooviePage');
    renderViewPage()
}

function renderViewPage() {
    const main = document.querySelector('main');
    const text = `
    <p> Ici on va voir les films </p>
    `
    main.innerHTML = text;
}


export default ViewMooviePage