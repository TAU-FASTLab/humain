type QuestionType = "RADIO" | "CHECKBOX" | "NESTED" | "GROUP";
type NestedQuestionType = "ANSWER_RADIO" | "ANSWER_CHECKBOX" | "NONE";

type theme = "light" | "dark";

interface ChoiceObject {
    id: number
    text: string
    creation?: string
    last_update?: string
    tooltip?: string
    question?: number
    order?: number
    parent_group_question?: number
    question_answer_dependency?: number
    nested_type?: NestedQuestionType
}

interface QuestionObject {
    id: number
    choices?: Array<ChoiceObject>
    child_questions?: Array<QuestionObject>
    creation: string
    last_update: string
    type: QuestionType
    nested_type: NestedQuestionType
    text: string
    order: number
    question_answer_dependency?: number
    parent_group_question?: number

}

interface StoredAnswerObject_OLD {
    id: number
    choice: number
    creation?: string
    last_update?: string
    question?: number
    user?: string
}

interface StoredAnswerObject{
    question:number
    choice:number
    question_type?:QuestionType
}

interface CheckboxAnswerObject {
    question: number,
    choice: number
}

interface NestedAnswerObject {

    parent_choice: number,
    answer: number,

}

interface GroupAnswerObject {

    // Dependency answer ID (AS RECEIVED FROM THE SERVER)
    answer: number

    // Child question ID
    question: number

    // Child question answer ID
    choice: number

}

type SendableAnswerObject = GroupAnswerObject & CheckboxAnswerObject & NestedAnswerObject

interface RecommendationObject {
    id: number

    // Attribute is the "title" of the recommendation
    attribute: string
    min_value: string
    max_value: string
    description?:string
    extra_feedback?: string
    answer_text?: string
    rule?:() => recommendationRuleResult 
    min_rule?: () => recommendationRuleResult
    max_rule?: () => recommendationRuleResult
    group_id?:RecommendationGroupID
    reason?: string
}

interface recommendationRuleResult {
    is_true: boolean
    reason: string
}

