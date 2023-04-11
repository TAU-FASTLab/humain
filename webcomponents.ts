const REPORT_TAB_STRING = "    "

class TestModeIndicator extends HTMLElement{
    constructor(){
        super();
        this.style.left = "0px"
        this.style.zIndex = "999"
        this.style.top = "0px";
        this.style.color = "black"
        this.style.padding = "10px"
        this.style.fontSize = "12pt"
        this.style.position = "fixed"
        this.style.background = "white";
        this.style.fontFamily = "monospace"
        this.style.border = "2px solid black"
        this.innerHTML = "You are currently in debug mode. <br>This is intended for development purposes."

    }
}


class NestedQuestion extends HTMLElement {
    answers: Array<HTMLLabelElement>;
    parentLabel:HTMLLabelElement;
    parentQuestion:QuestionBase
    tagname = "sub-question";
    dependencyID:string;
    dependencyElement:QuestionBase
    constructor(parentLabel:HTMLLabelElement) {
        super();
        this.style.display = "none"
        this.parentLabel = parentLabel
        this.parentQuestion = this.parentLabel.parentElement.parentElement as any
        this.answers = [];
        // console.log("dep",this.parentQuestion.questionObject);
        
        this.dependencyID = `question${this.parentQuestion.questionObject.question_answer_dependency}`
        for (let q of questionElements){
            if (q instanceof QuestionBase && q.id == this.dependencyID){
                this.dependencyElement = q
            }
        }

        // this.style.display = "block";
        this.style.marginLeft = "20px";
        this.style.padding = "10px";
        // this.style.border = "2px solid black"

        this.parentLabel.querySelector("input").addEventListener("input",(e)=>{
            this.refreshAnswers()
        })

        for (let depLabel of this.dependencyElement.querySelectorAll("label")){
            // Create a sub question input for each of the dependency question's inputs
            if (depLabel instanceof HTMLLabelElement){
                let depInput: HTMLInputElement = depLabel.querySelector("input")

                let newLabel:HTMLLabelElement = document.createElement("label") as any 
                newLabel.setAttribute("dependency", depInput.id)
                this.answers.push(newLabel)
                this.appendChild(newLabel)

                // this.innerHTML += "<br>"
                let newInput:HTMLInputElement = document.createElement("input") as any
                newInput.type = "checkbox"
                newLabel.appendChild(newInput)

                newLabel.innerHTML += depLabel.innerText

                // Refresh this sub question every time one of the dependency inputs is clicked
                depInput.addEventListener("input", (e)=>{
                    this.refreshAnswers()
                })

            }
        }
        this.refreshAnswers()
    }

    static getDependencyChoice(label:HTMLLabelElement){
        return document.getElementById(label.getAttribute("dependency")) as HTMLInputElement
    }

    // addAnswer(answerText, depCheckbox: HTMLInputElement) {
    //     // id format: idofthemainanswer-indexofsubquestionanswer
    //     // The previous element is the label of the main answer. 
    //     // Use previousElementSibling again to get the checkbox
    //     let idText = `${this.previousElementSibling.previousElementSibling.id}-${this.answers.length}`;

    //     // Create a new checkbox and add it as a child
    //     let newCheckbox = document.createElement("input") as any as HTMLInputElement;
    //     newCheckbox.setAttribute("type", "checkbox");
    //     newCheckbox.setAttribute("id", idText);
    //     newCheckbox.setAttribute(DEP_CHOICE_ATTNAME, depCheckbox.id);
    //     this.appendChild(newCheckbox);

    //     // Do the same thing for the label
    //     let newLabel = document.createElement("label");
    //     newLabel.setAttribute("for", idText);
    //     newLabel.innerText = answerText;
    //     this.appendChild(newLabel);
    //     this.appendChild(document.createElement("br"));

    //     this.answers.push(newCheckbox);
    // }

    refreshAnswers() {
        let anyChecked = false
        for (let label of this.querySelectorAll("label")){
            if (label instanceof HTMLLabelElement){
                let dependency = NestedQuestion.getDependencyChoice(label)
                if (dependency == undefined){
                    return
                }
                if (dependency.checked){
                    label.style.display = "block"
                    anyChecked = true
                }
                else{
                    label.style.display = "none"
                    label.querySelector("input").checked = false
                }
            }
        }
        if (anyChecked && this.parentLabel.querySelector("input").checked){
            this.style.display = "block"
        }
        else{
            this.style.display = "none"
        }
    }
}

class CollapseButton extends HTMLElement{
    collapseTarget:HTMLElement
    isCollapsed:boolean
    defaultDisplay:string
    icon:HTMLObjectElement
    constructor(collapseTarget:HTMLElement, defaultDisplay?:string){
        super()
        this.collapseTarget = collapseTarget
        this.isCollapsed = true
        this.style.cursor = "pointer"

        this.icon = document.createElement("object") as any as HTMLObjectElement
        this.icon.style.width = "50%"
        this.icon.style.pointerEvents = "none"
        this.icon.style.position = "relative"
        this.icon.style.top = "50%"
        this.icon.style.left = "50%"
        this.icon.style.translate = "-50% -50%"
        this.icon.data = "images/collapseArrow.svg"
        this.appendChild(this.icon)

        if (defaultDisplay == undefined){
            this.defaultDisplay = "block"
        }
        else{
            this.defaultDisplay = defaultDisplay
        }
        this.update()
        
        this.addEventListener("click",(e)=>{
            this.toggle()
        })
        this.icon.addEventListener("load", (e)=>{
            this.update()

        })
    }
    toggle(){
        this.setCollapsed(
            !(this.isCollapsed)
        )
    }
    setCollapsed(state:boolean){
        this.isCollapsed = state
        this.update()
    }
    update(){
        this.setAttribute("collapsed",String(this.isCollapsed))
        if (this.isCollapsed){
            this.collapseTarget.style.display = "none"
            this.icon.style.rotate = "90deg"
        }
        else{
            this.collapseTarget.style.display = this.defaultDisplay
            this.icon.style.rotate = "0deg"
        }
        this.updateColors()
    }

    updateColors(){
        if (this.icon.contentDocument == undefined){
            return;
        }
        let bodyStyle = window.getComputedStyle(document.body)
        for (let o of this.icon.contentDocument.querySelectorAll("*") as NodeListOf<SVGPathElement>){
            if (o.style != undefined){
                o.style.stroke = bodyStyle.getPropertyValue("--dark-fg")
            }
        }
    }

    changeShape(mode:"expand"|"flatten"){
        if (this.icon.contentDocument == undefined){
            return ;
        }
        let path = this.icon.contentDocument.querySelector("path") as any as SVGPathElement
        let d = path.getAttribute("d").split(" ").map((e)=>{
            return e.split(",")
        })
        console.log(d)

        if (mode == "flatten"){
            d[2][0] = d[1][0]
        }
        else {
            d[2][0] = "120"
        }
        const dString = d.map((e) => {
            return e.join(",");
        }).join(" ");
        path.setAttribute("d", dString)
    

    }


}


class RecommendationCardGroup extends HTMLElement{
    groupID:RecommendationGroupID;
    groupName:string
    collapseButton: CollapseButton
    contentArea:HTMLElement
    headlineBase:HTMLElement
    headlineTitle:HTMLElement
    headlineDivider: HTMLElement
    cards: RecommendationCard[]

    constructor(groupID:RecommendationGroupID){
        super()
        this.groupID = groupID

        this.headlineBase = document.createElement("div")
        this.headlineBase.style.display = "flex"
        // this.headlineBase.addEventListener("click", (e)=>{
        //     this.collapseButton.click()
        // })
        // this.headlineBase.style.cursor = "pointer"

        this.headlineTitle = document.createElement("h3")
        this.headlineTitle.innerHTML = RecommendationGroupNames.get(this.groupID)
        this.headlineBase.appendChild(this.headlineTitle)
        this.appendChild(this.headlineBase)

        this.headlineDivider = document.createElement("div")
        this.headlineDivider.style.flexGrow = "1"
        this.headlineBase.appendChild(this.headlineDivider)

        this.contentArea = document.createElement("div")
        this.appendChild(this.contentArea)

        // Create the collapse button
        this.collapseButton = new CollapseButton(this.contentArea)
        // this.collapseButton.setCollapsed(false)
        // this.collapseButton.style.backgroundColor = "black"
        this.collapseButton.style.width = "50px"
        this.headlineBase.appendChild(this.collapseButton)

        
        this.addContent()
    }

    addContent(){
        this.contentArea.innerHTML = "";
        this.cards = []

        for (let recommendation of RECOMMENDATIONS) {
            let rule: ()=>recommendationRuleResult = recommendation.rule == undefined? apiNOTRule: recommendation.rule
            if (rule().is_true && this.groupID == recommendation.group_id) {
                let newCard = new RecommendationCard(recommendation);
                console.log(newCard)
                console.log(recommendation)

                this.contentArea.appendChild(newCard)
                this.contentArea.appendChild(document.createElement("div"))
                this.cards.push(newCard)

                // newCard.moveToSide()
            }
        }
        if (this.cards.length <=0){
            this.style.display = "none"
        }
        else{
            this.style.display = "block"
        }
        
        
    }
}

const NOT_APPLICABLE_TEXT = "Not Applicable";
class RecommendationCard extends HTMLElement {
    recommendation: RecommendationObject;
    headline: HTMLElement;
    table: HTMLTableElement;
    headlineBase:HTMLElement;
    tableBase:HTMLElement;
    headlineDivider:HTMLElement;
    descriptionBox:HTMLElement;
    reasonLine:HTMLElement;

    constructor(recommendation: RecommendationObject) {
        super();
        this.recommendation = recommendation;

        // Create the headline base
        this.headlineBase = document.createElement("div")
        this.headlineBase.style.display = "flex"
        this.appendChild(this.headlineBase)

        // Create the headline itself and attach to the headline base
        this.headline = document.createElement("h3");
        // this.headline.innerText = `${String(recommendation.id)}. ${recommendation.attribute}`
        this.headline.innerText = this.recommendation.attribute
        this.headlineBase.appendChild(this.headline)

        // Create the headline divider
        this.headlineDivider = document.createElement("div")
        this.headlineDivider.style.flexGrow="1"
        this.headlineBase.appendChild(this.headlineDivider)

        // Create the description box
        this.descriptionBox = document.createElement("p")
        const DESCRIPTION_PLACEHOLDER = "";
        this.descriptionBox.innerHTML = this.recommendation.description ? this.recommendation.description : DESCRIPTION_PLACEHOLDER

        if (this.recommendation.description != undefined){
            this.appendChild(this.descriptionBox)
        }

        this.reasonLine = document.createElement("p")
        let reason = this.getReason();
        if (reason != undefined && reason != ""){
            this.reasonLine.innerText += "REASON: ";
            this.reasonLine.innerText += reason;
            this.appendChild(this.reasonLine)
        }
        
        // Create the table base
        this.tableBase = document.createElement("div")
        this.appendChild(this.tableBase)
        
        // // Create the collapse button
        // this.collapseButton = new CollapseButton(this.tableBase)
        // // this.collapseButton.style.backgroundColor = "black"
        // this.collapseButton.style.width = "50px"
        // this.headlineBase.appendChild(this.collapseButton)

        // Create the table and its contents
        this.table = document.createElement("table") as any as HTMLTableElement;
        this.table.className = "recommendation-table"
        let headerRow = document.createElement("tr");
        let minMaxRow = document.createElement("tr");

        headerRow.appendChild(
            document.createElement("th")
        )
        minMaxRow.appendChild(
            document.createElement("td")
        )
        if (this.minRuleApplies()){

            headerRow.lastElementChild.innerHTML = "Minimum"
            minMaxRow.lastElementChild.innerHTML = this.getMinValue()
        }

        if (this.maxRuleApplies()){
            headerRow.appendChild(
                document.createElement("th")
            )
            headerRow.lastElementChild.innerHTML = "Maximum"
    
            
            minMaxRow.appendChild(
                document.createElement("td")
                )
            minMaxRow.lastElementChild.innerHTML = this.getMaxValue()

        }


        this.table.appendChild(headerRow)
        this.table.appendChild(minMaxRow);
        this.tableBase.appendChild(this.table)

        this.table.style.width = "100%"
        for (let tableCell of this.querySelectorAll("th,td") as NodeListOf<HTMLElement>) {
            tableCell.style.width = "50%"
        }
        this.style.position = "relative"
        // if (TEST_MODE){
        //     this.showDebugData()
        // }
       
    }
    private getMinValue(): string {
        return this.minRuleApplies() ? this.recommendation["min_value"] : NOT_APPLICABLE_TEXT;
    }

    private getMaxValue(): string {
        return this.maxRuleApplies() ? this.recommendation["max_value"] : NOT_APPLICABLE_TEXT;
    }

    getReason(): string {
        return this.recommendation.rule == undefined ? "" : this.recommendation.rule().reason
    }

    moveToSide() {
        let rect = this.getBoundingClientRect();
        this.style.left = `${rect.width}px`
    }
    slideBack(duration:number) {
        this.style.transitionDuration = `${duration}ms`
        this.style.left = "0px"
    }
    slideBackAll(duration:number) {
        this.slideBack(duration);
        let nextCard = this.nextElementSibling as RecommendationCard
        if (nextCard != undefined && nextCard.tagName == this.tagName) {
            setTimeout(() => {
                nextCard.slideBackAll(duration)
            }, duration / 2);
        }
    }

    

    showDebugData() {
        let debugTable = document.createElement("table")
        debugTable.style.backgroundColor = "#ccc"
        debugTable.style.padding = "10px"

        for (let [key, value] of Object.entries(this.recommendation)) {
            let newRow = document.createElement("tr");
            let keyCell = document.createElement("th")
            let valCell = document.createElement("td")

            keyCell.style.borderTop = "2px solid black"
            valCell.style.borderTop = "2px solid black"

            keyCell.innerHTML = key
            valCell.innerHTML = `${value}`
            newRow.appendChild(keyCell)
            newRow.appendChild(valCell)
            debugTable.appendChild(newRow)
        }
        this.tableBase.appendChild(debugTable)
    }

    maxRuleApplies():boolean{
        return this.recommendation.max_rule == undefined ||
            this.recommendation.max_rule().is_true == true
    }
    minRuleApplies(): boolean {
        return this.recommendation.min_rule == undefined ||
            this.recommendation.min_rule().is_true == true
    }

    generateReport(indentLevel:number = 0){
        let result = ""
        indent();
        result += "Recommendation: "+ this.recommendation.attribute
        newline();
        result += this.recommendation.description == undefined? "" : 
            REPORT_TAB_STRING.repeat(indentLevel+1)+"description: " + 
            this.recommendation.description
        newline();
        indent(1);
        result+= "minimum: "+this.getMinValue()
        newline()
        indent(1)
        result+= "maximum: "+this.getMaxValue()
        newline()
        indent(1)
        result += "reason: "+ this.getReason()
        return result

        function indent(i=0) {
            result += REPORT_TAB_STRING.repeat(indentLevel+i);
        }

        function newline() {
            result += '\n';
        }
    }
}

class AlertBox extends HTMLElement {
    paragraph: HTMLParagraphElement
    constructor(text: string) {
        super()
        this.style.visibility = "hidden"
        this.style.position = "absolute"
        this.style.height = "0px"
        this.style.bottom = "0px"
        this.style.overflowY = "hidden"
        this.paragraph = document.createElement("p") as any as 
            HTMLParagraphElement
        this.paragraph.style.color = "var(--alert-dark)"
        this.appendChild(this.paragraph)
        this.paragraph.innerText = text

        this.style.width = "30vw"
    }
    displayAlert(timeout = 2000) {

        // Turn visible
        this.style.transitionDuration = "0ms"
        this.style.visibility = "visible"
        this.style.opacity = "1"


        // Set height position
        this.style.left = 
            `${this.parentElement.getBoundingClientRect().width + 5}px`
        this.style.height = "auto"
        this.style.bottom = ""
        this.style.top = 
            `-${this.getBoundingClientRect().height * (3 / 4)}px`

        // console.log("show");
        // console.log(this)
        setTimeout(() => {
            this.style.transitionDuration = "1000ms"
            this.style.visibility = "hidden"
            this.style.opacity = "0"
            // console.log("hide");
        }, timeout);
    }
}

// class LoginScreen extends HTMLElement {
//     alertBox:AlertBox
//     loginBox: HTMLElement
//     loginBoxTitle: HTMLElement
//     passwordField: HTMLInputElement
//     submitButton: HTMLButtonElement
//     textFieldHeight: number
//     usernameField: HTMLInputElement
//     constructor() {
//         super();
//         this.textFieldHeight = 30
//         this.style.height = "100vh";
//         this.style.left = "0px";
//         this.style.position = "fixed";
//         this.style.top = "0px";
//         this.style.width = "100vw";
//         this.style.zIndex = "1";
//         this.alertBox = new AlertBox("Login failed")
//         this.createLoginBox();
//         // console.log(this.usernameField)

//     }
//     createLoginBox() {
//         this.loginBox = document.createElement("div")
//         this.loginBox.classList.add("login-box")
//         this.loginBox.style.top = "50%";
//         this.loginBox.style.margin = "auto"
//         this.loginBox.style.display = "grid";
//         this.loginBox.style.columnGap = "15px"
//         this.loginBox.style.position = "relative"
//         this.loginBox.style.transform = "translateY(-50%)"
//         this.loginBox.style.gridTemplateColumns = "30% 70%";
//         this.appendChild(this.loginBox);

//         // Create the contents of the login box 
//         this.loginBoxTitle = document.createElement("strong");
//         this.loginBoxTitle.style.gridColumnStart = "1";
//         this.loginBoxTitle.style.gridColumnEnd = "3";
//         this.loginBoxTitle.innerText = "Please log in before continuing";
//         this.loginBox.appendChild(this.loginBoxTitle)

//         let usernameLabel = document.createElement("p");
//         usernameLabel.innerText = "Username:"
//         this.loginBox.appendChild(usernameLabel)

//         this.usernameField = document.createElement("input") as any as HTMLInputElement
//         this.usernameField.type = "text"
//         this.usernameField.style.height = `${this.textFieldHeight}px`
//         this.usernameField.style.margin = "auto"
//         this.loginBox.appendChild(this.usernameField)

//         let passwordLabel = document.createElement("p");
//         passwordLabel.innerText = "Password:"
//         this.loginBox.appendChild(passwordLabel)

//         this.passwordField = document.createElement("input") as any as HTMLInputElement
//         this.passwordField.type = "password"
//         this.passwordField.style.height = `${this.textFieldHeight}px`
//         this.passwordField.style.margin = "auto"
//         this.loginBox.appendChild(this.passwordField)

//         this.submitButton = document.createElement("button") as any as HTMLButtonElement
//         this.submitButton.type = "button";
//         this.submitButton.style.gridColumnStart = "2";
//         this.submitButton.innerText = "Login"
//         this.submitButton.appendChild(this.alertBox)
//         this.submitButton.addEventListener("click", () => {
//             this.fieldLogin(this)
//         })
//         this.passwordField.addEventListener("keyup", (e)=>{
//             if (e.key == "Enter"){
//                 this.fieldLogin(this)
//             }
//         })
//         this.loginBox.appendChild(this.submitButton)
//     }

//     fieldLogin(screen: LoginScreen) {
//         // console.log(this.submitButton);

//         let credentials = {
//             username: screen.usernameField.value,
//             password: screen.passwordField.value
//         }
//         login(credentials).then(
//             function (response) {
//                 if (response.errors != undefined){
//                     screen.alertBox.displayAlert()
//                 }
//                 else{
//                     token = response.token
//                     // console.log(response);
    
//                     getQuestions_OLD(token).then(
//                         (value) => {
//                             fetchedQuestions = value
//                             screen.style.display = "none"
//                         }
//                     )
//                 }
                
//             }
//         )
//     }
// }

class ThemeToggle extends HTMLElement {
    state: theme;
    width: number;
    padding: number;
    knob: HTMLElement;
    svgIcon: HTMLObjectElement;
    stateIconPaths;
    constructor() {
        super();
        this.width = 30;
        this.padding = 3;
        this.state = "light";
        this.style.zIndex = "2";
        this.style.top = "30vh";
        this.style.right = "5px";
        this.style.position = "fixed";
        this.style.width = `${this.width}px`;
        this.style.boxSizing = "content-box";
        this.style.padding = `${this.padding}px`;
        this.style.height = `${this.width * 2}px`;
        this.style.border=`3px solid var(--dark-fg)`
        this.style.backgroundColor = "var(--main-bg)";
        this.style.borderRadius = `${this.width/2 + this.padding}px`;
        this.style.cursor = "pointer"

        this.stateIconPaths = {
            "light": "./images/sun.svg",
            "dark": "./images/moon.svg"
        }

        this.createKnob();
        this.appendChild(this.knob);
        this.addEventListener("click", () => {
            this.toggleState();
        })

    }
    createKnob() {
        this.knob = document.createElement("div");
        this.knob.style.position = "absolute";
        this.knob.style.width = `${this.width}px`;
        this.knob.style.height = `${this.width}px`;
        this.knob.style.backgroundColor = "var(--dark-fg)";
        this.knob.style.borderRadius = `${this.width / 2}px`;

        this.svgIcon = document.createElement("object") as any;
        this.svgIcon.style.pointerEvents = "none"
        this.svgIcon.style.padding = `${this.padding}px`
        this.svgIcon.style.width=`${this.width - this.padding*2}px`
        this.svgIcon.style.height=`${this.width - this.padding*2}px`

        this.knob.appendChild(this.svgIcon)
        this.updateKnobPosition()

    }
    toggleState(){
        if (this.state == "dark"){
            this.state = "light";
        }
        else{
            this.state = "dark";
        }
        setTheme(this.state);
        this.updateKnobPosition()
    }
    updateKnobPosition(){
        if (this.state == "dark"){
            this.knob.style.top = `${this.width + this.padding}px`
        }
        else{
            this.knob.style.top = `${this.padding}px`;
        }

        // Update icon
        this.svgIcon.data = this.stateIconPaths[this.state];
        this.svgIcon.addEventListener("load", ()=>{
            const bodyStyle = window.getComputedStyle(document.body)
            const newColor = bodyStyle.getPropertyValue("--main-bg");
            // console.log(newColor)
            this.svgIcon.contentDocument.getElementById("main-path").style.fill = newColor
        })
        
    }
}

function createLoadingIcon() {
    let loadingIcon = document.createElement("video") as any as HTMLVideoElement;
    loadingIcon.classList.add(LOADING_ICON_CLASS_NAME);
    loadingIcon.loop = true;
    loadingIcon.autoplay = true;
    loadingIcon.controls = false;
    loadingIcon.src = "./loading_animation.webm";
    loadingIcon.play()
    return loadingIcon;
}

function createSubmitButton() {
    // let buttonBase = document.createElement("div");
    let submitButton = document.createElement("button");
    

    submitButton.innerText = "Submit"
    submitButton.style.position = "relative"
    submitButton.style.marginLeft = "0px"

    let alertBox = new AlertBox("Please answer all questions before proceeding")
    submitButton.appendChild(alertBox)
    submitButton.addEventListener("click", function () {
        console.log("plimplom")

        if (enoughChecked()) {
            // deleteAllAnswers()
            // let loadingIcon = createLoadingIcon();
            // loadingIcon.style.height = window.getComputedStyle(submitButton).height
            // buttonBase.appendChild(loadingIcon);
            setTimeout(() => {
                submit()
                showRecommendations()
            }, 500);
        }
        else {
            alertBox.displayAlert()
        }
    })
    return submitButton
}

const BASE_CHOICE_CLASS_NAME = "baseQuestionChoice";
const LABEL_TEXT_ATTRIBUTE = "label-base-text";
class QuestionBase extends HTMLElement{
    customName:string 
    fieldset:HTMLFieldSetElement
    headLine: string
    headLineElement:HTMLParagraphElement
    questionObject:QuestionObject
    constructor(qObject:QuestionObject, isMain?:boolean, customName?:string){
        super();
        if (customName == undefined){
            this.customName = qObject.id.toString()
        }
        else{
            this.customName = customName
        }
        // console.log(qObject);
        isMain = isMain == undefined?true:isMain
        this.questionObject = qObject;
        this.headLine = `${this.questionObject.id}. ${this.questionObject.text}`
        this.id = "question" + this.questionObject.id
        this.className = QUESTION_DIV_CLASS;
        if (isMain){
            this.classList.add(MAIN_QUESTION_DIV_CLASS)
        }

        this.fieldset = document.createElement("fieldset") as any 

        this.headLineElement = document.createElement("p") as any 
        this.headLineElement.innerText = this.headLine
        this.headLineElement.style.fontWeight = "strong"
        this.fieldset.appendChild(this.headLineElement)
        this.fieldset.style.columns = "1"
        this.appendChild(this.fieldset)

        for (let choice of this.questionObject.choices){
            this.fieldset.appendChild(
                this.createChoice(choice)
            )
            // Add line break after choice
            this.fieldset.innerHTML += "</br>"
        }
        
    }
    
    createChoice(choice:ChoiceObject){
        let input:HTMLInputElement = document.createElement("input") as any
        input.type =this.questionObject.type.toLowerCase()
        input.id = choice.id.toString()
        input.name = this.customName

        let label:HTMLLabelElement = document.createElement("label") as any 
        label.appendChild(input)
        label.innerHTML += choice.text
        label.setAttribute(LABEL_TEXT_ATTRIBUTE, label.innerText)
        if (choice.tooltip != undefined){
            label.className = "hasToolTip"
            label.innerHTML += makeTooltip(choice.tooltip)
        }
        label.style.width = "100%"
        label.classList.add(BASE_CHOICE_CLASS_NAME)
        // label.className =`${ choice.tooltip == null ? "" : "hasTooltip" }` 
        return label
    }

    public getAnswers(){
        let result:StoredAnswerObject[] = []
        for (let input of this.querySelectorAll("input") as NodeListOf<HTMLInputElement>){
            if (input.checked){
                let label = getLabel(input)
                if (label != undefined){
                    result.push(
                        {
                            "choice":parseInt(input.id),
                            "question":this.questionObject.id
                        }
                    )
                }
            }
        }
        return result

    }

    generateReport(indentLevel:number = 0){
        let result = "";
        result += REPORT_TAB_STRING.repeat(indentLevel)
        result += "Question: "+this.questionObject.text + "\n"
        result += REPORT_TAB_STRING.repeat(indentLevel+1) + "Your answers:\n"
        for (let input of this.querySelectorAll("input")){
            if (input.checked){
                let label = getLabel(input)
                if (label != undefined){
                    result += REPORT_TAB_STRING.repeat(indentLevel+2)
                    result+= label.getAttribute(LABEL_TEXT_ATTRIBUTE)?label.getAttribute(LABEL_TEXT_ATTRIBUTE):label.textContent
                    result += "\n"
                }
            }
        }
        return result
    }

}

class GroupQuestion extends HTMLElement {
    childQuestions:QuestionBase[]
    dependencyElement:QuestionBase
    headLine:string 
    headLineElement:HTMLParagraphElement
    questionObject:QuestionObject
    placeholder = "(<b>Note</b>: Questions will appear here when you select answers in question 3)";
    subTitles:string[]

    constructor(questionObject:QuestionObject){
        super()
        
        this.questionObject = questionObject
        this.subTitles = []
        for (let q of questionElements){
            // console.log(q,this.questionObject.question_answer_dependency);
            if (q != undefined && q.questionObject.id == this.questionObject.question_answer_dependency){
                
                if (q instanceof QuestionBase){
                    this.dependencyElement = q
                }
            }
        }
        this.headLine = this.questionObject.text
        this.headLineElement = document.createElement("p") as any
        this.headLineElement.innerText = this.headLine
        this.headLineElement.style.fontWeight = "strong"
        this.appendChild(this.headLineElement)
        
        for (let input of this.dependencyElement.querySelectorAll("input")){
            if (getLabel(input).classList.contains(BASE_CHOICE_CLASS_NAME)){
                input.addEventListener("input", (e)=>{
                    this.refreshQuestions()
                })
            }
        }
    }
    refreshQuestions(){
        // First, Clear the element completely
        this.innerHTML = ""
        this.subTitles = []

        // Add back the headline immediately after clearing
        this.appendChild(this.headLineElement)

        // Loop through all input labels of the dependency question
        for (let label of this.dependencyElement.querySelectorAll("label")){
            if (label.querySelector("input").checked && label.classList.contains(BASE_CHOICE_CLASS_NAME)){
                let p:HTMLParagraphElement = document.createElement("p") as any
                let input = label.querySelector("input")
                p.innerText = label.innerText.split("\n")[0]
                p.style.fontWeight = "bold"
                this.appendChild(p)
                this.subTitles.push(p.innerText)

                for (let cq of this.questionObject.child_questions){
                    for (let cq2 of fetchedQuestions){
                        if (cq2.id == cq.id && cq2.choices != undefined){
                            let customName = `${label.querySelector("input").id}.${cq.id}`
                            let childQuestion = new QuestionBase(cq2, false, customName)
                            childQuestion.setAttribute("dependency", input.id)
                            this.appendChild(childQuestion)
                        }
                    }
                }
            }
        }

    }
    getChildQuestions(): QuestionBase[]{
        let result:QuestionBase[] = []
        for (let q of this.querySelectorAll("*")){
            if (q instanceof QuestionBase){
                result.push(q)
            }
        }
        return result
    }

    generateReport(indentLevel = 0){
        let result = ""
        indent();
        result += "Group question: "+this.questionObject.text 
        newline();
        let n = 0;
        let subTitleIndex=0
        this.getChildQuestions().forEach((i)=>{
            if (n%this.questionObject.child_questions.length == 0){
                indent(1);
                result+=this.subTitles[subTitleIndex]
                subTitleIndex+=1
                newline()
            }
            n+=1
            result += i.generateReport(indentLevel+2)
        })
        return result

        function newline() {
            result += "\n";
        }

        function indent(i=0) {
            result += REPORT_TAB_STRING.repeat(indentLevel+i);
        }
    }
}

const TAB_SELECTOR_ID_SUFFIX = "_TAB"


class TabSelector extends HTMLElement{
    tabName:string;
    tabID:string;
    tabElement:HTMLElement;
    selected:boolean;
    textElement:HTMLElement
    // siblings:HTMLCollectionOf<TabSelector>
    constructor(tabID:string, tabName?:string){
        super()
        this.selected = false;
        this.tabID = tabID;
        this.id = this.tabID + TAB_SELECTOR_ID_SUFFIX
        // this.style.paddingTop = "auto"
        this.style.border = "2px solid var(--dark-fg)"
        this.style.borderBottomWidth = "0px"
        this.style.borderRadius = "15px 15px 0px 0px"
        this.style.boxSizing = "border-box"
        this.style.cursor = "pointer"
        this.style.flexGrow = "1"
        this.style.fontSize = "13pt"
        this.style.height = "100%"
        this.style.marginBottom = "-2px"
        this.style.marginLeft = "-2px"
        // this.style.transition = "height 100ms"
        // this.style.padding = "auto"
        // this.style.textAlign = "center"
        // this.style.verticalAlign="middle"
        this.style.position = "relative"
        this.style.zIndex = "1"
        if (tabName == undefined || tabName == ""){
            this.tabName = tabID
        }
        else{
            this.tabName = tabName
        }
        this.textElement = document.createElement("div")
        this.textElement.style.position = "absolute"
        this.textElement.style.top = "50%"
        this.textElement.style.left = "50%"
        this.textElement.style.transform = "translate(-50%,-50%)"

        this.textElement.innerHTML = this.tabName
        this.appendChild(this.textElement)

        this.tabElement = document.getElementById(this.tabID)
        this.tabElement.style.zIndex = "2"
        
        // this.tabElement.style.transitionDelay = `display ${window.getComputedStyle(this).transitionDuration}`
        
        this.addEventListener("click", (e)=>{
            this.select()
        })
        this.update()
    }
    siblings(): HTMLCollectionOf<TabSelector>{
        return this.parentElement.getElementsByTagName(this.tagName) as HTMLCollectionOf<TabSelector>

    }
    update(){
        if (this.selected){
            this.tabElement.style.display = "block"
            this.tabElement.style.opacity = "1"
            this.tabElement.style.left = "0%"
            this.style.backgroundColor = "var(--main-bg)"
            // this.style.marginTop = "0px"
            this.style.height = "100%"

            
        }
        else{
            this.tabElement.style.display = "none"
            this.tabElement.style.opacity = "0"
            this.style.backgroundColor = "transparent"
            // this.style.marginTop = "10px"
            this.style.height = "80%"

        }
    }
    setSelect(state:boolean){
        this.selected = state;
        this.update()
    }
    select(){
        for (let t of this.siblings()) {
            t.deselect()
        }
        this.setSelect(true);
    }
    deselect(){
        this.setSelect(false);
    }
}

const TAB_CLASS_NAME = "tab";
class TabRow extends HTMLElement{
    tabSelectors:TabSelector[]
    constructor(){
        super()
        this.style.display = "flex"
        this.style.flexDirection = "row"
        this.style.height = "60px"
        this.style.paddingLeft = "auto"
        this.style.paddingRight = "auto"
        this.style.alignItems = "flex-end"
        this.style.borderBottom = "2px solid var(--dark-fg)"
        this.style.marginBottom = "-1px"

        this.tabSelectors = []
        for (let tab of document.getElementsByClassName(TAB_CLASS_NAME)){
            this.tabSelectors.push(
                new TabSelector(tab.id, tab.getAttribute("tabname"))
            )
            this.appendChild(
                this.tabSelectors[this.tabSelectors.length-1]
            )
        }
        this.tabSelectors[0].select()
    }
}

