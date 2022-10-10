function choiceCheckedOR(choiceIDs: number[]): boolean {
    for (let a of storedAnswers) {
        if (choiceIDs.includes(a.choice)) {
            console.log(a)
            return true;
        }
    }
    return false
}

function choiceCheckedAND(choiceIDs: number[]): boolean {
    let storedChoiceIDs:number[] = storedAnswers.map((i)=>{return i.choice})
    for (let choice of choiceIDs){
        if (!(storedChoiceIDs.includes(choice))){
            return false
        }
    }
    return true
}

function apiCheckedRule(): boolean {
    return choiceCheckedOR([19])
}

function ARVRCheckedRule(): boolean {
    return choiceCheckedOR([21, 20]) && !apiCheckedRule()
}

function basicSkillsAndLowExperienceRule():boolean{
    return choiceCheckedAND([34,37]) && !apiCheckedRule()
}

// function returnFalse(){
//     return false;
// }

// function returnTrue(){
//     return true;
// }

function accessibilityConsideredRule(){
    return true
}

function seniorsConsideredRule(){
    return choiceCheckedAND([40])
}

function navigationOptionYESRule(){
    return choiceCheckedAND([43]) && !apiCheckedRule()
}

function interactionIsBidirectionalRule(){
    return choiceCheckedAND([44]) && !apiCheckedRule()
}

function loginRequiredRule(){
    return choiceCheckedAND([45]) && !apiCheckedRule()
}