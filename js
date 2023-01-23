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



// < !DOCTYPE html >
{/* <html lang="en"> */}
    
    // <head>
    //     <meta charset="UTF-8">
    //     <meta http-equiv="X-UA-Compatible" content="IE=edge">
    //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
    //     <title>Create</title>
    //     <script src="https://kit.fontawesome.com/514ff62e5d.js" crossorigin="anonymous"></script>
    //     <link rel="preconnect" href="https://fonts.googleapis.com" />
    //     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    //     <link rel="stylesheet" href="css/style.css">
    //     <script defer src="script.js"></script>
    // </head>

    <body class="cards-container">

        <div class="usercard-con">
            <div class="usercard">
                <div class="usercard__head">
                    <div class="usercard__img-con">
                        <div class="usercard__img usercard__img--edit"></div>
                    </div>


                    <div class="usercard__circle">
                        <div class="usercard__circle__inn">
                            <div class="usercard__circle__name">
                                <p spellcheck="false" contenteditable="true" class="edit usercard__circle__firstname">Queen
                                </p>
                                <p spellcheck="false" contenteditable="true" class="edit usercard__circle__lastname">
                                    Elisabeth
                                </p>
                                <p spellcheck="false" contenteditable="true" class="edit usercard__circle__surname">II</p>
                            </div>
                            <div class="usercard__circle__path">
                                <div class="usercard__circle__born">
                                    <p contenteditable="true" class="edit usercard__circle__born-t">Beautiful sunrise</p>
                                    <p contenteditable="true" class="edit usercard__circle__born--date">21-04-1926</p>
                                </div>

                                <div class="usercard__circle__path-line"></div>

                                <div class="usercard__circle__died">
                                    <p contenteditable="true" class="edit usercard__circle__died-t">Glorious sunrise</p>
                                    <p contenteditable="true" class="edit usercard__circle__died--date">21-04-1926</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="usercard__circle usercard__circle--small">
                        <div class="usercard__circle__inn usercard__circle__inn--small">
                            <div class="usercard__circle__age">
                                <p contenteditable="true" class="edit usercard__circle__num">96</p>
                                <p contenteditable="true" class="edit usercard__circle__year">years</p>
                            </div>
                        </div>
                    </div>

                    <div class="usercard__curve1">
                        <svg class="image-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#fff" fill-opacity="1"
                                d="M0,96L80,85.3C160,75,320,53,480,90.7C640,128,800,224,960,266.7C1120,309,1280,299,1360,293.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                            </path>
                        </svg>
                    </div>


                    <div class="usercard__curve2">
                        <svg class="image-edit" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#c1dff8" fill-opacity="1"
                                d="M0,96L80,85.3C160,75,320,53,480,90.7C640,128,800,224,960,266.7C1120,309,1280,299,1360,293.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                            </path>
                        </svg>
                    </div>

                    <div class="usercard__curve3">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                            <path fill="#0369a1" fill-opacity="1"
                                d="M0,96L80,85.3C160,75,320,53,480,90.7C640,128,800,224,960,266.7C1120,309,1280,299,1360,293.3L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z">
                            </path>
                        </svg>
                    </div>
                </div>

                <div class="usercard__text-sect">
                    <div class="usercard__sect usercard__sect1">
                        <p contenteditable="true" class="edit usercard__title">burial programme</p>
                        <p contenteditable="true" class="edit usercard__date">wednesday 12th febuary 2022</p>
                        <p spellcheck="false" contenteditable="true" class="edit usercard__topic">commendation services:</p>

                        <ul class="usercard__list-items">
                            <li>
                                <p spellcheck="false" contenteditable="true" class="edit">Venue: Nigeria Bar Association,
                                    Kwara
                                    State Chapter The Bar Centre, High Court
                                    Complex, Torin
                                </p>
                                <p contenteditable="true" class="edit">Time: 11:00am. </p>
                            </li>

                            <li>
                                <p spellcheck="false" contenteditable="true" class="edit">
                                    Her residence: 5, G. Olaniran Aluko street, Opposite sanreb Filling station Tanke,
                                    Ilorin,
                                    Kwara
                                    State.
                                </p>
                                <p contenteditable="true" class="edit">Time: 4:00pm.</p>
                            </li>
                        </ul>

                        <p contenteditable="true" class="edit usercard__date">thursday 13th febuary 2022</p>
                        <p spellcheck="false" contenteditable="true" class="edit usercard__topic">christain wake keep:</p>
                        <p spellcheck="false" contenteditable="true" class="edit">Venue: Government day secondary school,
                            Tanke
                            Ilorin, Kwara State. </p>
                        <p contenteditable="true" class="edit">Time: 4:00pm.</p>
                    </div>

                    <div class="usercard__sect usercard__sect2">
                        <div>
                            <p contenteditable="true" class="edit usercard__date">friday 14th febuary 2022.</p>
                            <p spellcheck="false" contenteditable="true" class="edit usercard__topic">lying in state:</p>
                            <p spellcheck="false" contenteditable="true" class="edit">Her residence: 5, G. Oliniram, Aliku
                                Street, Opposite Sanrab Filling Station, Tanke,
                                Ilorin,
                            </p>
                            <p contenteditable="true" class="edit">Time: 7:30am.</p>
                        </div>

                        <div>
                            <p spellcheck="false" contenteditable="true" class="edit usercard__topic">home going service:
                            </p>
                            <p spellcheck="false" contenteditable="true" class="edit">@RCCG Regional Headquarters, 1,
                                Redemption
                                Way off fufu street, Sabo-Oke, Ilorin</p>
                            <p contenteditable="true" class="edit">Time: 10:00am.</p>
                            <p spellcheck="false" contenteditable="true" class="edit usercard__sect2--clu">INTERTAINMENT
                                FOLLOWS
                                IMMIDIETELLY AT HER RESIDENCE</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="sidebar">
                <div class="back"><i class="fa-solid fa-rotate-right"></i></div>
                <div class="forward"><i class="fa-solid fa-rotate-right"></i></div>
            </div>
        </div>
    </body>

// </html>

