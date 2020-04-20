const MAX_CODE_SECTION_HEIGHT = 150;

function clampCodeSections() {
    let codeSections = document.getElementsByTagName("PRE");

    for (let i = 0; i < codeSections.length; ++i) {
        if (codeSections[i].offsetHeight > 200) {
            clampCodeSection(codeSections[i], i);
        }
    }
}

function clampCodeSection(codeSection, num) {
    codeSection.style.maxHeight = MAX_CODE_SECTION_HEIGHT + "px";
    codeSection.style.overflow = "hidden";
    codeSection.style.marginBottom = "0";
    codeSection.setAttribute("code-num", num);

    if (getFader(num) == null) {
        let fader = createFader(num);
        insertAfter(codeSection, fader);
    }
}

function unclampCodeSection(codeSection) {
    codeSection.style.maxHeight = "none";
    codeSection.marginBottom = "20px";
}

function createFader(num) {
    let fader = document.createElement("DIV");
    fader.className = "fader";
    fader.setAttribute("fader-num", num);
    
    let showCodeBtn = createShowCodeBtn(num);
    fader.appendChild(showCodeBtn);

    return fader;
}

function createShowCodeBtn(num) {
    let showCodeBtn = document.createElement("DIV");
    showCodeBtn.className = "show-code";
    showCodeBtn.textContent = "Покажи още код";
    showCodeBtn.setAttribute("show-code-num", num);

    showCodeBtn.addEventListener("click", showHideCode);

    return showCodeBtn;
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

function showHideCode(e) {
    let num = e.target.getAttribute("show-code-num");
    let codeSection = getCodeSection(num);

    if (isCodeUnveiled(codeSection)) {
        unclampCodeSection(codeSection);
        e.target.textContent = "Скрий кода";

        return;
    }
    
    clampCodeSection(codeSection, num);
    e.target.textContent = "Покажи още код";
}

function isCodeUnveiled(codeSection) {
    return codeSection.style.maxHeight === MAX_CODE_SECTION_HEIGHT + "px";
}

function getCodeSection(num) {
    return document.querySelector('pre[code-num="' + num + '"]');
}

function getFader(num) {
    return document.querySelector('div[fader-num="' + num + '"]');
}

clampCodeSections();