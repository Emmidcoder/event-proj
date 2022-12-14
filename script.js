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

        return wait(1);
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

            return wait(1);
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

timing();

setInterval(timing, 8000);
