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

function apiCheckedRule(): recommendationRuleResult {
    let result: recommendationRuleResult = {
        is_true: choiceCheckedOR([19]),
        reason: "You chose API in question 1"
    }
    return result
}
function apiNOTRule(): recommendationRuleResult {
    let result: recommendationRuleResult = {
        is_true: !choiceCheckedOR([19]),
        reason: "You did NOT choose API in question 1"
    }
    return result
}

function ARVRCheckedRule(): recommendationRuleResult {
    let result: recommendationRuleResult = {
        is_true: choiceCheckedOR([21, 20]) && !apiCheckedRule().is_true,
        reason: "You chose AR or VR in question 1" 
    }
    return result
}

function basicSkillsAndLowExperienceRule():recommendationRuleResult{
    return {
        is_true: choiceCheckedAND([34,37]) && !apiCheckedRule().is_true,
        reason: "You chose \"Basic skills\" and \"Low experience\""
    }
}
function NOTbasicSkillsAndLowExperienceRule():recommendationRuleResult{
    return {
        is_true: !basicSkillsAndLowExperienceRule().is_true,
        reason: "You did NOT choose \"Basic skills\" and \"Low experience\""
    }
}
// function returnFalse(){
//     return false;
// }

// function returnTrue(){
//     return true;
// }

function accessibilityConsideredRule(): recommendationRuleResult{
    return {
        is_true: true,
        reason:""
    }
}

function seniorsConsideredRule():recommendationRuleResult{

    return {
        is_true: choiceCheckedAND([40]),
        reason: "You checked that users over the age of 60 are expected"
    }
}
function NOTseniorsConsideredRule():recommendationRuleResult{
    return {
        is_true: !seniorsConsideredRule().is_true,
        reason: "You did NOT check that users over the age of 60 would be expected"
    }
}

function navigationOptionYESRule(): recommendationRuleResult{
    let result:recommendationRuleResult = {
        is_true:choiceCheckedAND([43]) && !apiCheckedRule().is_true,
        reason: "You chose \"yes\" for navigation"
    }
    return result
}

function interactionIsBidirectionalRule(): recommendationRuleResult{
    let result = {
        is_true:choiceCheckedAND([44]) && !apiCheckedRule().is_true,
        reason: "You chose \"Yes\" for bidirectional interaction"
    }
    return result
}

function loginRequiredRule(): recommendationRuleResult{
    let result:recommendationRuleResult = {
        is_true: choiceCheckedAND([45]) && !apiCheckedRule().is_true,
        reason: "You chose \"Yes\" for login required"
    }
    return result
}
