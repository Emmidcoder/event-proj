"use strict"

const card1Front = document.querySelector('.card1__side1--front');
const card1Back = document.querySelector('.card1__side1--back');
const card2S1 = document.querySelectorAll('.card2__side1');
const card2S2 = document.querySelectorAll('.card2__side2');
const card3S4 = document.querySelector('.card3__side4');
const card3S3 = document.querySelector('.card3__side3');
const card3S2 = document.querySelector('.card3__side2');

const wait = function (seconds) {
    return new Promise(function (resolve) {
        setInterval(resolve, seconds * 1000);
    })
};

const timing = function () {
    wait(1).then(() => {
        card1Front.style.transform = 'rotateY(180deg)';
        card1Back.style.transform = 'rotateY(0)';

        return wait(1);
    }).then(() => {
        card1Front.style.transform = 'rotateY(0)';
        card1Back.style.transform = 'rotateY(-180deg)';

        return wait(1);
    }).then(() => {
        card2S1.forEach((s) => {
            s.style.transform = 'rotateY(-180deg)';
        });

        return wait(.5);
    }).then(() => {
        card2S2.forEach((s) => {
            s.style.transform = 'rotateY(-180deg)';
        });

        return wait(1);
    })
        .then(() => {
            card2S2.forEach((s) => {
                s.style.transform = 'rotateY(0)';
            });

            return wait(.5);
        }).then(() => {
            card2S1.forEach((s) => {
                s.style.transform = 'rotateY(0)';
            });

            return wait(.5);
        }).then(() => {
            card3S4.style.transform = 'translateX(100%)';

            return wait(.5);
        }).then(() => {
            card3S3.style.transform = 'translateX(100%)';

            return wait(.5);
        }).then(() => {
            card3S2.style.transform = 'translateX(100%)';

            return wait(.5);
        }).then(() => {
            card3S2.style.transform = 'translateX(0)';

            return wait(.5);
        }).then(() => {
            card3S3.style.transform = 'translateX(0)';

            return wait(.5);
        }).then(() => {
            card3S4.style.transform = 'translateX(0)';

            return wait(.5);
        })
};

// timing();/

// setInterval(timing, 8000);

const usercard = document.querySelector('.usercard');
const textSect = document.querySelector('.usercard__text-sect');
const imageCon = document.querySelector('.usercard__img-con');
const img = document.querySelector('.usercard__img');
const edit = document.querySelectorAll('.edit');
const back = document.querySelector('.back');
const forward = document.querySelector('.forward');

let uploadImage = '',
    target = '',
    cl1, cl2, cl3,
    txtInput,
    editing = false,
    initValue,
    state = [],
    redoState = [],
    undoState = [],
    redoStore = [],
    undoStore = [];

usercard.addEventListener('dblclick', function (e) {
    target = e.target;
    editing = true

    // To change OR Uploading an Image
    const image = target.classList.contains('usercard__img');
    if (image) {
        const initImg = window.getComputedStyle(img).backgroundImage;
        const imageInput = document.createElement('input')
        imageInput.setAttribute('type', 'file')
        imageInput.setAttribute('id', 'fileupload')
        imageInput.setAttribute('accept', 'image/png')
        imageInput.classList.add('usercard__img--input')

        target.parentNode?.replaceChild(imageInput, target)

        const html = `
            <P class="usercard__img--text">Click <a href="https://clipdrop.co/remove-background?gclid=CjwKCAiAwc-dBhA7EiwAxPRylOefW2X7NifeeNosTLOvYutZCKyUIiSKefD9xDFMmQJn3w1LplyHjBoC2MsQAvD_BwE" target="_blank">Here</a> to remove backgroung from your image</P>
        `
        imageCon.insertAdjacentHTML('afterbegin', html)

        imageInput.addEventListener('change', function (e) {
            if (this.files && this.files[0]) {
                imageCon.firstElementChild.hidden = true;

                const newImage = document.createElement('img')

                newImage.classList.add(`${target.classList[0]}`)

                imageInput.parentNode?.replaceChild(newImage, imageInput)

                newImage.onload = () => {
                    URL.revokeObjectURL(newImage.style);  // no longer needed, free memory
                }

                uploadImage = "url(" + URL.createObjectURL(e.target.files[0]) + ")";

                newImage.style.backgroundImage = uploadImage;


                const initImgE = `${target.classList[0]}`;
                const undoDomE = inverted(initImgE, `${initImg}`);
                // undoState.push(undoDomE)

                const editedDomE = inverted(initImgE, uploadImage);
                state.push(editedDomE);
                localStorage.setItem('state', JSON.stringify(state));
            }
        });
    }

    //Edit Text
    const typing = e.target.classList.contains('input');
    if (typing) return

    const clickedEdit = e.target.classList.contains('edit');
    if (clickedEdit) {
        const [class1, class2, class3] = target.classList;
        cl1 = class1;
        cl2 = class2;
        cl3 = class3;

        const width = target.scrollWidth;

        initValue = target.textContent.trim('');

        txtInput = document.createElement('textarea');
        txtInput.classList.add('input', `${cl3}`)
        txtInput.innerHTML = initValue
        txtInput.style.width = width + 'px'
        txtInput.style.height = (target.scrollHeight) + 'px'

        target.parentNode?.replaceChild(txtInput, target);
        txtInput.focus()
    }
})

const txtHeight = (e) => {
    txtInput.style.height = '1rem'
    txtInput.style.height = (e.target.scrollHeight) + "px"
}

usercard.addEventListener('keypress', (e) => txtHeight(e))
usercard.addEventListener('keyup', (e) => txtHeight(e))


const inverted = (classN, text) => {
    const obj = {
        elemt: classN,
        value: text,
    }

    return obj
}

document.addEventListener('click', function (e) {
    const typing = e.target.classList.contains('input',)
    if (typing) return

    if (editing) {
        const editedValue = txtInput?.value;
        const edit = document.createElement('p');

        edit.classList.add(`${cl1}`, `${cl2}`, `${cl3}`)
        edit.innerHTML = editedValue

        if (initValue !== editedValue) {
            const initDomE = inverted(cl2, initValue)
            undoState.push(initDomE)

            if (undoStore.length <= 0) {
                undoStore = [...undoState];

            } else {
                undoStore.push(initDomE);
            }

            console.log(undoState);

            const editedDom = inverted(cl2, editedValue)
            state.push(editedDom);

            localStorage.setItem('undoState', JSON.stringify(undoStore));
            localStorage.setItem('state', JSON.stringify(state));

            redoState = []
        }

        txtInput?.parentNode?.replaceChild(edit, txtInput);

        editing = false
    }
});

back.addEventListener('click', () => {
    if (editing) return;
    if (undoState.length === 0) return;

    const undoElem = undoState.pop();
    undoStore = [...undoState]

    const elemt = document.querySelector(`.${undoElem.elemt}`)

    let redoDomE
    if (undoElem.elemt.startsWith('editt')) {
        redoDomE = inverted(undoElem.elemt, elemt.textContent);

        elemt.textContent = undoElem.value;
    } else {
        redoDomE = inverted(undoElem.elemt, elemt.style.backgroundImage);

        // elemt.style.background = "none";
        elemt.style.backgroundImage = undoElem.value;
    }

    redoState.push(redoDomE);


    console.log(redoState);

    redoStore = [...redoState];

    const selectElemts = state.find(elem => elem.elemt === undoElem.elemt)
    const delElemts = state.indexOf(selectElemts);
    state.splice(delElemts, 1);

    state.push(undoElem);

    localStorage.setItem('redoState', JSON.stringify(redoStore));
    localStorage.setItem('undoState', JSON.stringify(undoState));
    localStorage.setItem('state', JSON.stringify(state));
})

forward.addEventListener('click', () => {
    if (editing) return;
    if (redoState.length === 0) return;

    const redoElem = redoState.pop()
    redoStore = redoState;

    const elemt = document.querySelector(`.${redoElem.elemt}`)

    const undoDomE = inverted(redoElem.elemt, elemt.textContent);
    undoState.push(undoDomE)

    undoStore = [...undoState];

    elemt.textContent = redoElem.value;

    const selectElemts = state.find(elem => elem.elemt === redoElem.elemt)
    const delElemts = state.indexOf(selectElemts);
    state.splice(delElemts, 1);

    state.push(redoElem);

    localStorage.setItem('redoState', JSON.stringify(redoStore));
    localStorage.setItem('undoState', JSON.stringify(undoStore));
    localStorage.setItem('state', JSON.stringify(state));
})

const render = state => {
    state.forEach(stElemt => {
        const renderElemt = document.querySelector(`.${stElemt.elemt}`)
        if (stElemt.elemt.startsWith('editt')) {
            renderElemt.textContent = stElemt.value
        } else {
            console.log(stElemt.value);
            renderElemt.style.backgroundImage = stElemt.value
        }
    })
}

const getLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem('state'))
    const undoData = JSON.parse(localStorage.getItem('undoState'))
    const redoData = JSON.parse(localStorage.getItem('redoState'))
    if (data) {
        state = data;
        render(state);
    }

    if (undoData) undoState = undoData;

    if (redoData) redoState = redoData;
}
getLocalStorage()

