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

const edit = document.querySelectorAll('.edit-p');
const usercard = document.querySelector('.usercard');
const over = document.querySelector('.usercard__over');
const textSect = document.querySelector('.usercard__text-sect');

let target = '', editing = false, cl1, cl2, txtInput;


usercard.addEventListener('dblclick', function (e) {
    target = e.target;

    const edited = e.target.classList.contains('edited');
    if (edited) return

    const clickedEdit = e.target.classList.contains('edit');

    const [class1, class2] = target.classList

    cl1 = class1
    cl2 = class2

    if (!clickedEdit) return;

    const width = target.scrollWidth;
    const initValue = target.textContent.trim('');

    txtInput = document.createElement('textarea');
    txtInput.classList.add('input', 'edited', `${class2}`)
    txtInput.setAttribute("rows", "1")
    txtInput.setAttribute("cols", "20")
    txtInput.innerHTML = initValue
    txtInput.style.width = width + 'px'

    target.parentNode?.replaceChild(txtInput, target);

    editing = true

    txtInput.focus()

    textHeight()
})

const textHeight = function () {
    txtInput.style.height = (txtInput.scrollHeight) + "px"
}

usercard.addEventListener('keypress', textHeight);
usercard.addEventListener('keyup', textHeight);


document.addEventListener('click', function (e) {

    if (editing) {

        const edited = e.target.classList.contains('edited')

        if (edited) return

        const edit = document.createElement('p');
        edit.classList.add('edit', `${cl2}`)

        edit.innerHTML = txtInput?.value;
        txtInput.parentNode?.replaceChild(edit, txtInput);

        editing = false
    }
});
