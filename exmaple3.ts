let fetchedQuestions: Array<QuestionObject>
let question2Checkboxes: NodeListOf<HTMLInputElement>;
let question3Checkboxes: NodeListOf<HTMLInputElement>;
let token: string;

const DISABLED_COLOR = "#aaa";
const API_CHECKBOX_ID = "19"
const Q1_ID_RANGE = {
    min: 18,
    max: 23
}
const QUESTION_DIV_CLASS = "questionDiv";
const MAIN_QUESTION_DIV_CLASS = "mainQuestionDiv";
const DEP_CHOICE_ATTNAME = "dep-choice";
const TEST_MODE = true

// Tag names for all of the custom web components
const ALERT_BOX_TAG_NAME = "alert-box";
const COLLAPSE_BUTTON_TAG_NAME = "collapse-button"
const GROUP_QUESTION_TAG_NAME = "group-question"
const LOADING_ICON_CLASS_NAME = "loading-icon";
const QUESTION_BASE_TAG_NAME = "question-base";
const RECOMMENDATION_CARD_TAG_NAME = "recommendation-card";
const SUB_QUESTION_TAG_NAME = "sub-question";
const TAB_ROW_TAG_NAME = "tab-row"
const TAB_SELECTOR_TAG_NAME = "tab-selector";
const TEST_MODE_INDICATOR_TAG_NAME = "test-mode-indicator"
const THEME_TOGGLE_TAG_NAME = "theme-toggle";
const RECOMMENDATION_CARD_GROUP_TAG_NAME = "recommendation-card-group"
const RECOMMENDATION_QUICK_LIST_TAG_NAME = "recommendation-quick-list"
const RECOMMENDATION_LINK_TAG_NAME = "recommendation-link"

// Defining all of the custom web components
window.customElements.define(ALERT_BOX_TAG_NAME, AlertBox);
window.customElements.define(COLLAPSE_BUTTON_TAG_NAME, CollapseButton)
window.customElements.define(GROUP_QUESTION_TAG_NAME, GroupQuestion);
window.customElements.define(QUESTION_BASE_TAG_NAME, QuestionBase);
window.customElements.define(RECOMMENDATION_CARD_TAG_NAME, RecommendationCard);
window.customElements.define(SUB_QUESTION_TAG_NAME, NestedQuestion);
window.customElements.define(TAB_SELECTOR_TAG_NAME, TabSelector);
window.customElements.define(TAB_ROW_TAG_NAME, TabRow);
window.customElements.define(TEST_MODE_INDICATOR_TAG_NAME, TestModeIndicator);
window.customElements.define(THEME_TOGGLE_TAG_NAME, ThemeToggle);
window.customElements.define(RECOMMENDATION_CARD_GROUP_TAG_NAME,
                             RecommendationCardGroup);
window.customElements.define(RECOMMENDATION_QUICK_LIST_TAG_NAME,
                             RecommendationQuickList);
window.customElements.define(RECOMMENDATION_LINK_TAG_NAME, RecommendationLink);

let storedAnswers: StoredAnswerObject[] = [];

let themeToggler = new ThemeToggle()

let appDiv: HTMLDivElement = document.getElementById("app") as HTMLDivElement

let questionElements: (QuestionBase | GroupQuestion)[] = []

let themes = {
    "light": getCssStringBySelector("#root-light"),
    "dark": getCssStringBySelector("#root-dark")
}

// The SVG diagrams
let flowDiagram = document.getElementById("flow-diagram") as any as
HTMLObjectElement
let devDiagram = document.getElementById("dev-diagram") as any as
HTMLObjectElement

let submitButton: HTMLElement

let generateReportButton = document.getElementById("generate-report-button")

// Returns the CSS rule that matches the given selector string 
function getCssStringBySelector(selector: string) {
    try {
        let rules = document.styleSheets[0].cssRules as any
        for (let r of rules) {
            if (r.selectorText == selector) {
                return r.style.cssText
            }
        }
    } catch (error) {
        return window.getComputedStyle(document.body).cssText
    }
    return "";
}

// Clears the stored answers so that the questionnaire can be retaken
function deleteAllAnswers() {
    storedAnswers = []
}

// Test function to automate filling the questionnaire randomly. Used to
// rapidly test recommendation behaviour
function doTestStuff() {
    deleteAllAnswers();
    showQuestions();
    testClicks();
    setTimeout(() => {
        submitButton.dispatchEvent(new MouseEvent("click"))

    }, 200);
}

// Causes the browser to "download" a file with the given name and contents
function generateDownload(filename: string, fileContent: string) {
    let donwloadLink = document.createElement("a")
    donwloadLink.setAttribute("href", "data:text/plain;charset=utf8, " +
                              encodeURIComponent(fileContent))
    donwloadLink.setAttribute("download", filename);
    document.body.appendChild(donwloadLink)
    donwloadLink.click()
    document.body.removeChild(donwloadLink)

}

// Make the "Generate report" button actually generate a report file when
// clicked
generateReportButton.addEventListener("click", () => {
    let result = ""
    let mainQuestions =
        document.querySelectorAll(`.${MAIN_QUESTION_DIV_CLASS}`) as
        NodeListOf<QuestionBase>

    let groupQuestions = document.querySelectorAll(GROUP_QUESTION_TAG_NAME) as
        NodeListOf<GroupQuestion>

    let recommendationCards =
        document.querySelectorAll(RECOMMENDATION_CARD_TAG_NAME) as
        NodeListOf<RecommendationCard>

    mainQuestions.forEach(
        function (i) {result += i.generateReport() + "\n\n";}
    )
    groupQuestions.forEach(
        function (i) {result += i.generateReport() + "\n\n";}
    )
    recommendationCards.forEach(
        function (i) {result += i.generateReport() + "\n\n";}
    )

    generateDownload("report.txt", result)
})

// Adds a nested question to a checkbox / radio answer. Currently not
// functional
function addSubQuestion(element: HTMLLabelElement) {
    let newSubQuestion = new NestedQuestion(element)
    element.appendChild(newSubQuestion)
}

function getQuestions() {
    return QUESTIONS;
}

async function getTestQuestions() {
    try {
        let response = await fetch("test.json");
        let data3 = await response.json();
        return data3;
    } catch (error) {
        return error;
    }
}

function submit() {
    storedAnswers = []
    let questionElementArray =
        document.getElementsByTagName(QUESTION_BASE_TAG_NAME) as
    HTMLCollectionOf<QuestionBase>
    for (let question of questionElementArray) {
        for (let answer of question.getAnswers()) {
            storedAnswers.push(answer)
        }
    }
}

function showRecommendations() {
    let recommendationArea = document.getElementById("recommendation-area")
    recommendationArea.innerHTML = ""
    for (let i of [...Array(5).keys()]) {
        let newCardGroup = new RecommendationCardGroup(i)
        recommendationArea.appendChild(newCardGroup)
    }

    let recommendationTabSelector = document.getElementById(
            "recommendation-tab" + TAB_SELECTOR_ID_SUFFIX
    ) as TabSelector
    recommendationTabSelector.select()
}


function scrollToAppDiv() {
    appDiv.scrollIntoView({
        behavior: "smooth"
    })
}


function storeAnswer(answer: SendableAnswerObject) {
    let result: StoredAnswerObject = {
        question: answer.question,
        choice: answer.choice
    }
    storedAnswers.push(result)
    return result
}

function randomFrom(arr: any[]) {
    return arr[Math.floor(Math.random() * arr.length)]
}


function isIn(a: any, arr: any) {
    for (let b of arr) {
        if (a === b) {
            return true
        }
    }
    return false
}

function testClicks() {

    // Start with just the standard questions
    let questionDivArray = document.querySelectorAll(`fieldset`)
    for (let i = 0; i < 3; i++) {
        for (let div of questionDivArray) {
            let itemToClick = div.querySelector("input")
            if (itemToClick != undefined) {
                // Only click unclicked
                if (itemToClick.checked != undefined &&
                    itemToClick.checked === false) {
                    itemToClick.click()
                }
            }
        }

        // move on to group and nested questions
        questionDivArray = document.querySelectorAll(
            `${SUB_QUESTION_TAG_NAME}, ${GROUP_QUESTION_TAG_NAME} fieldset`)

    }

    let subQuestionArray = document.getElementsByTagName(
        SUB_QUESTION_TAG_NAME)  as HTMLCollectionOf<NestedQuestion>;

    for (let div of subQuestionArray) {
        randomFrom(div.querySelectorAll("input") as any).click();
    }
}

function enoughChecked() {
    let questionElementArray = document.querySelectorAll(
        "*") as NodeListOf<HTMLElement>;

    for (let q of questionElementArray) {
        if (q instanceof NestedQuestion || q instanceof QuestionBase) {

            let enoughHere = false

            // If the question is a checkbox question, allow zero choices
            if (q instanceof QuestionBase && 
                q.questionObject.type == "CHECKBOX") {
                enoughHere = true
            }

            let checkboxes = q.querySelectorAll(
                "input") as NodeListOf<HTMLInputElement>
            if (checkboxes.length > 0) {
                for (let cb of checkboxes) {
                    enoughHere = (cb.checked || cb.disabled || enoughHere ||
                                  q.style.display == "none")
                }
                if (enoughHere === false) {
                    console.log("Not enough checked")
                    return false
                }
            }
        }
    }
    return true
}


async function showQuestions() {
    deleteAllAnswers()
    questionElements = []
    document.getElementById("app").innerHTML = ""
    // let formContents = []
    submitButton = createSubmitButton()
    for (let q of fetchedQuestions) {
        let questionElement = questionTemplate(q)
        if (questionElement instanceof QuestionBase || 
            questionElement instanceof GroupQuestion) {
            questionElements.push(
                questionElement
            )
        }
    }
    let form: HTMLElement = document.createElement("div") as any
    document.getElementById("app").appendChild(form)
    for (let q of questionElements) {
        form.appendChild(q)
    }

    // Get the checkboxes under question 1
    let question1Checkboxes = document.querySelectorAll("#question1 input") as
    NodeListOf<HTMLInputElement>

    let apiCheckbox = document.getElementById(API_CHECKBOX_ID) as
    HTMLInputElement

    question1Checkboxes.forEach(function (e) {
        e.addEventListener("click", function () {
            let allInputs = document.getElementsByTagName("input") as
            HTMLCollectionOf<HTMLInputElement>

            for (let cb of allInputs) {
                if (isIn(cb, question1Checkboxes) == false) {
                    if (apiCheckbox.checked) {
                        if (cb.checked) {
                            cb.click()
                        }
                        cb.labels[0].style.color = DISABLED_COLOR
                    }
                    else {
                        cb.labels[0].style.color = "var(--text-color)"
                    }
                    cb.disabled = apiCheckbox.checked
                    cb.checked = apiCheckbox.checked ? false : cb.checked
                }
            }
        }
        )
    })
    let buttonBase = document.createElement("div")
    buttonBase.appendChild(submitButton);
    buttonBase.style.display = "flex";
    buttonBase.style.flexDirection = "row";
    buttonBase.id = "submit-button-base"
    buttonBase.appendChild(submitButton)
    form.appendChild(buttonBase)
    scrollToAppDiv()
}


// Generate a question element from a question object
function questionTemplate(questionObject: QuestionObject) {
    if (questionObject.parent_group_question != undefined) {
        return undefined
    }
    let mainDiv: (QuestionBase | GroupQuestion)
    if (questionObject.type == "GROUP") {
        mainDiv = new GroupQuestion(questionObject)
    }
    else {
        mainDiv = new QuestionBase(questionObject)
        if (questionObject.nested_type != undefined &&
            questionObject.nested_type != "NONE") {
            for (let label of mainDiv.querySelectorAll("label")) {
                addSubQuestion(label)
            }
        }
    }
    return mainDiv
}

function makeTooltip(text: string) {
    let outputElement = document.createElement("span")
    outputElement.setAttribute("class", "tooltip")
    outputElement.innerText = text
    outputElement.style.transitionDuration = "0s"
    return outputElement.outerHTML
}

function getStoredAnswers(type?: QuestionType): StoredAnswerObject[] {
    let result: StoredAnswerObject[] = [];
    for (let a of storedAnswers) {
        if (a.question_type == type || type == undefined) {
            result.push(a)
        }

    }
    return result;
}

function checkboxQuestionHandler(questionElement: QuestionBase): any[] {
    let answersToSend: CheckboxAnswerObject[] = []
    let questionID = questionElement.questionObject.id
    for (let checkbox of questionElement.querySelectorAll("input")) {
        if (checkbox.checked && checkbox.id.indexOf("-") == -1) {
            let newAnswerObject: CheckboxAnswerObject = {
                "question": questionID,
                "choice": parseInt(checkbox.id)
            }
            answersToSend.push(newAnswerObject)
        }
    }

    return answersToSend
}

function updateDiagram(diagram: HTMLObjectElement) {
    if (diagram == undefined) {
        return;
    }

    // ids to handle: gray, cyan, black

    let bodyStyle = window.getComputedStyle(document.body)
    if (diagram.contentDocument.getElementById("gray") != undefined) {
        diagram.contentDocument.getElementById("gray").style.fill =
            bodyStyle.getPropertyValue("--card-color")
    }

    if (diagram.contentDocument.getElementById("gray") != undefined) {
        diagram.contentDocument.getElementById("gray").style.stroke =
            bodyStyle.getPropertyValue("--dark-fg")
    }


    if (diagram.contentDocument.getElementById("cyan") != undefined) {
        diagram.contentDocument.getElementById("cyan").style.fill =
            bodyStyle.getPropertyValue("--main-fg")
    }

    if (diagram.contentDocument.getElementById("black") != undefined) {
        diagram.contentDocument.getElementById("black").style.fill =
            bodyStyle.getPropertyValue("--text-color")
    }
}

function setTheme(themeName: theme) {
    let rootStyle = document.styleSheets[0].cssRules[1] as any
    let theme = themes[themeName];

    // console.log(rootStyle.style.cssText, theme)
    rootStyle.style.cssText = theme;
    updateDiagram(flowDiagram)
    updateDiagram(devDiagram)
    for (let o of document.getElementsByTagName(COLLAPSE_BUTTON_TAG_NAME) as
         HTMLCollectionOf<CollapseButton>){
        o.updateColors()
    }
}

function getLabel(input:HTMLInputElement){
    let result:HTMLLabelElement = input.labels[0]
    if (result == undefined){
        result = input.parentElement as HTMLLabelElement
        if (!(result instanceof HTMLLabelElement)){
            return undefined
        }
    }
    return result
}

async function main() {
    flowDiagram.addEventListener("load", (_e) => {
        updateDiagram(flowDiagram)
    })
    devDiagram.addEventListener("load", (_e) => {
        updateDiagram(devDiagram)
    })
    fetchedQuestions = getQuestions()

    document.body.appendChild(
        themeToggler
    )

}

main();


