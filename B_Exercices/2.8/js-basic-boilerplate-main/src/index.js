import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';

import lasVegasUrl from './img/5028486419944_1.jpg';
import mishimaUrl from './img/SD2zJgkpw48fYDV15DU2gFI98ZyTgj_large.jpg';

const main = document.querySelector('main');


const homepageHtml = `
<div class="row">
        <div id="block_1" class="text-center col-lg-6 col-xs-12">
          <img src="${lasVegasUrl}" class="img-thumbnail w-50">
          <p>T'as johnny Dep il se barre a Las vegas avec un kho a lui et ils se pêtent la geule de ouf 
            mon reuf. Wlh il sont chépère, charger comme des éléfants</p>
        </div>

        <div id="block_2" class="text-center col-lg-6 col-xs-12">
          <img src="${mishimaUrl}" class="img-thumbnail w-50">
          <p>Aloes la mon reuf on est sur du conceptuel de ouf, tu suis un vrai écrivain jap dans sa 
            vie et et ses histoire et wlh c space mais t'as vu c bo</p>
        </div>
</div>
`
main.innerHTML = homepageHtml;