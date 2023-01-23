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
const image = document.querySelector('.image');
const imageCon = document.querySelector('.usercard__img-con');
const edit = document.querySelectorAll('.edit');
const back = document.querySelector('.back');
const forward = document.querySelector('.forward');

let uploadImage = '',
    target = '',
    cl1, cl2, cl3,
    txtInput,
    editing = false,
    initValue,
    curState = [],
    store = [];

const prevState = [],
    prevState2 = [];


usercard.addEventListener('dblclick', function (e) {
    target = e.target;
    editing = true

    // To change OR Uploading an Image
    const image = e.target.classList.contains('usercard__img--edit');
    if (image) {
        const imageInput = document.createElement('input')
        imageInput.setAttribute('type', 'file')
        imageInput.setAttribute('accept', 'image/png')
        imageInput.classList.add('usercard__img--input')

        target.parentNode?.replaceChild(imageInput, target)

        const html = `
            <P class="usercard__img--text">Click <a href="https://clipdrop.co/remove-background?gclid=CjwKCAiAwc-dBhA7EiwAxPRylOefW2X7NifeeNosTLOvYutZCKyUIiSKefD9xDFMmQJn3w1LplyHjBoC2MsQAvD_BwE" target="_blank">Here</a> to remove backgroung from your image</P>
        `
        imageCon.insertAdjacentHTML('afterbegin', html)

        imageInput.addEventListener('change', function () {

            const newImage = document.createElement('div')
            newImage.classList.add('usercard__img--edit')

            imageInput.parentNode?.replaceChild(newImage, imageInput)

            const reader = new FileReader()
            reader.addEventListener('load', () => {
                uploadImage = reader.result

                newImage.style.backgroundImage = `url(${uploadImage})`



                // const preImgE = 'usercard__img--edit';
                // prevElems.push(preImgE)
                // pr
            })
            reader.readAsDataURL(this.files[0])
        })
    }

    //Edit Text
    const typing = e.target.classList.contains('input');
    if (typing) return

    const clickedEdit = e.target.classList.contains('edit');
    if (clickedEdit) {
        const [class1, class2, class3] = target.classList
        cl1 = class1
        cl2 = class2
        cl3 = class3

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
    txtInput.style.height = '2rem'
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
            const initText = inverted(edit, initValue)
            prevState.push(initText)

            const curDom = inverted(cl2, editedValue)
            store.push(curDom)
            console.log(store);

            localStorage.setItem('state', JSON.stringify(store));


            curState = []
        }

        txtInput?.parentNode?.replaceChild(edit, txtInput);

        editing = false
    }
});

back.addEventListener('click', function () {
    if (prevState.length === 0) return;
    const prevElem = prevState.pop();
    prevState2.push(prevElem);

    const prevText = inverted(prevElem.elemt, prevElem.elemt.textContent);
    curState.push(prevText);

    prevElem.elemt.textContent = prevElem.value;

    const selectElemt = store.find(elem => elem.elemt === prevElem.elemt)
    const delElemt = store.indexOf(selectElemt);
    store.splice(delElemt, 1)

    const curDom = inverted(prevElem.elemt.classList[1], prevElem.value)
    store.push(curDom)
    localStorage.setItem('state', JSON.stringify(store));


})

forward.addEventListener('click', function () {
    if (curState.length === 0) return;
    const prevElem2 = prevState2.pop()
    prevState.push(prevElem2)

    const curElem = curState.pop()
    curElem.elemt.textContent = curElem.value

    const selectElemt = store.find(elem => elem.elemt === curElem.elemt)
    const delElemt = store.indexOf(selectElemt);
    store.splice(delElemt, 1)

    const curDom = inverted(curElem.elemt.classList[1], curElem.value)
    store.push(curDom)
    console.log(store);
    localStorage.setItem('state', JSON.stringify(store));

})

const render = function (store) {
    store.forEach(stElemt => {
        const renderElemt = document.querySelector(`.${stElemt.elemt}`)
        console.log(renderElemt)
        renderElemt.textContent = stElemt.value
    })
}

const getLocalStorage = function () {
    const data = JSON.parse(localStorage.getItem('state'))
    if (!data) return;

    store = data

    render(store)

    console.log(data[0].elemt);
}
getLocalStorage()

