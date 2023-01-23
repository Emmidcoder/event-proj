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

let uploadImage = '', target = '', cl1, cl2, cl3, txtInput, editing = false, counter = 0;
const prevTexts = [], prevElems = [], nextElems = [], nextTexts = [];

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
        const initValue = target.textContent.trim('');

        txtInput = document.createElement('textarea');
        txtInput.classList.add('input', `${cl3}`)
        txtInput.innerHTML = initValue
        txtInput.style.width = width + 'px'
        txtInput.style.height = (target.scrollHeight) + 'px'

        target.parentNode?.replaceChild(txtInput, target);
        txtInput.focus()
        
        prevElems.push(cl2)
        prevTexts.push(initValue)
    }
})

usercard.addEventListener('keyup', e => {
    txtInput.style.height = 'auto'
    txtInput.style.height = (e.target.scrollHeight) + "px"
});

document.addEventListener('click', function (e) {
    const typing = e.target.classList.contains('input')
    if (typing) return

    if (editing) {
        const editedValue = txtInput?.value;

        const edit = document.createElement('p');
        edit.classList.add(`${cl1}`, `${cl2}`, `${cl3}`)
        edit.innerHTML = editedValue

        // console.log(nextElems);
        // console.log(nextTexts);

        txtInput?.parentNode?.replaceChild(edit, txtInput);

        editing = false
    }
});

back.addEventListener('click', function () {
    if (prevElems.length === 0) return;

    const prevElem = prevElems.pop();
    const prevText = prevTexts.pop();

    
    console.log(prevElem);
    console.log(nextElems);
    console.log(prevTexts);
    console.log(prevElems);
    
    
    // console.log(prevElem);
    const elem = document.querySelector(`.${prevElem}`);
    console.log(elem.textContent);
    
    nextElems.push(prevElem)
    nextTexts.push(elem.textContent);

    elem.textContent = prevText;

    // counter++
    // console.log(counter);

    // count++
})

forward.addEventListener('click', function () {
    if (nextElems.length === 0) return;
    // if (counter > 0) {
        const nextElem = nextElems.pop();
        const nextText = nextTexts.pop();
        
        // console.log(nextElem);
        
        prevElems.push(nextElem)
        prevTexts.push(nextText)
        
        console.log(prevTexts);
        console.log(prevElems);    

        // console.log(nextElem);
        const elem = document.querySelector(`.${nextElem}`);

        elem.textContent = nextText;

        // counter--;

    // }
})