import { clearPage, renderPageTitle } from '../../utils/render';

const AddMoviePage = () => {
    clearPage();
    renderPageTitle('AddMoviePage');
    renderAddPage()
}

function renderAddPage() {
    const main = document.querySelector('main');
    const text = `
    <p> Ici on va add des films </p>
    `
    main.innerHTML = text;
}


export default AddMoviePage