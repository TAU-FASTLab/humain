enum RecommendationGroupID {
    feedbackMessages,
    inputAndInteraction,
    navigation,
    profiling,
    visualAspects,
}

const RecommendationGroupNames = new Map<RecommendationGroupID, string>([
    [RecommendationGroupID.feedbackMessages, "Feedback messages"],
    [RecommendationGroupID.inputAndInteraction, "User input and interaction"],
    [RecommendationGroupID.navigation, "Navigation"],
    [RecommendationGroupID.profiling, "Profiling"],
    [RecommendationGroupID.visualAspects, "UI Visual aspects"],
])


const RECOMMENDATIONS: RecommendationObject[] = [
    {
        "id": 1,
        "attribute": "Accessibility in navigation",
        "min_value": "Navigation menu should be available but may be hidden in certain situations",
        "max_value": "Navigation menu should always be visible",
        "extra_feedback": null,
        "rule": navigationOptionYESRule,
        "group_id":RecommendationGroupID.navigation,
        "description":"Accessibility in navigation relates to whether a navigation menu/method is implemented, its visiblity, and how the users can access them throughout different UI screens.",

        "reason": "You chose \"yes\" for navigation"
    },
    {
        "id": 2,
        "attribute": "Navigation levels",
        "min_value": "Navigation level should be between 3-4",
        "max_value": "Maximum 2 navigation levels should be implemented",
        "extra_feedback": null,
        "rule": navigationOptionYESRule,
        "group_id":RecommendationGroupID.navigation,
        "description":"Navigation levels relate to the function encompassed in different UI levels and how those levels are designed, which require the user to proceed to those level (e.g., selecting desired tab and clicking) for accessing the functionality. ",
        "reason": "You chose \"yes\" for navigation"
    },
    {
        "id": 3,
        "attribute": "Home menu availability",
        "min_value": "Home menu should be available but can be not visible (e.g., accessible trough a shortcut or just with one click)",
        "max_value": "Home menu should always be available and visible from every screen",
        "extra_feedback": null,
        "rule": navigationOptionYESRule,
        "min_rule":NOTseniorsConsideredRule,
        "group_id":RecommendationGroupID.navigation,
        "description":"Home menu availability relates to the availabiliy of a home menu and its visisbility throughout different UI screens.",
        "reason": "You chose \"yes\" for navigation"
    },
    {
        "id": 4,
        "attribute": "Back option",
        "min_value": "Some of the screens should have possibility of back option",
        "max_value": "Every screen should have a back option to go to the previous screen",
        "extra_feedback": null,
        "rule": navigationOptionYESRule,
        "group_id":RecommendationGroupID.navigation,
        "description":"In UIs with multiple navigation levels, the back option relates to whether the users have the possibility to select the back button to go to the previous sections.",
        "reason": "You chose \"yes\" for navigation"
    },
    {
        "id": 5,
        "attribute": "Exit option",
        "min_value": "Exit option must not be always present",
        "max_value": "Exit option should always be present",
        "extra_feedback": null,
        "rule": navigationOptionYESRule,
        "group_id":RecommendationGroupID.navigation,
        "description":"In UIs with multiple navigation levels, the exit option relates to whether the users have the possibility to select the exit button to close the current section.",
        "reason": "You chose \"yes\" for navigation"
    },
    {
        "id": 6,
        "attribute": "Screen identification",
        "min_value": "Every screen should have a title, which can be undescriptive and ambiguous",
        "max_value": "Every screen should be clearly identified by a descriptive, unique and unambiguous title",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.visualAspects,
        "description":"Screen identification relates to the identification of each screen and how the identifiers are formatted.",
        "reason": ""
    },
    {
        "id": 7,
        "attribute": "Aesthetics",
        "min_value": "The UI should have personalized aesthetics (images, icons), which are not aligned with the component objective",
        "max_value": "The UI should have personalized aesthetics (icons, images) and aligned with the component objective",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.visualAspects,
        "description":"Aesthetics relate to whether the UI elements are designed after or inspired by any particular objectives.",
        "reason": ""
    },
    {
        "id": 8,
        "attribute": "HMI elements consistency",
        "min_value": "Some functionalities (e.g., transitions between windows) can use the same HMI element across the component",
        "max_value": "A functionality should always use the same HMI element for user's interaction across the component",
        "extra_feedback": null,
        "rule": apiNOTRule,
        "group_id":RecommendationGroupID.visualAspects,
        "description": "This issue assesses if HMI elements with the same objective are used always in the same way and have similar aesthetics.",
        "reason": "You did NOT choose API in question 1"
    },
    {
        "id": 9,
        "attribute": "Information shown in a similar way",
        "min_value": "Information should mainly be shown in a similar way across the screens",
        "max_value": "Information should be shown in the same way across all the screens",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.visualAspects,
        "description":"Information shown relates to how information is presented to the users accross different UI screens.",
        "reason": ""
    },
    {
        "id": 10,
        "attribute": "Fonts",
        "min_value": "The text should be legible with an adequate size and line spacing (without rich text features like underlining or bold)",
        "max_value": "The text should be legible with an adequate size, line spacing and rich text features.",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.visualAspects,
        "description":"Font relates to how the text has been positioned and formatted in the UI.",
        "reason": ""
    },
    {
        "id": 11,
        "attribute": "Tooltips",
        "min_value": "Tooltips can only be available in the navigation menu.",
        "max_value": "Tooltips should be available for all interactable HMI elements.",
        "extra_feedback": null,
        // "max_rule":basicSkillsAndLowExperienceRule,
        "min_rule": NOTbasicSkillsAndLowExperienceRule,
        "rule": apiNOTRule,
        "group_id":RecommendationGroupID.visualAspects,
        "description":"Tooltips relate to whether the UI provides any additional information to the user using tooltips.",
        "reason": "You did NOT choose API in question 1"
    },
    {
        "id": 12,
        "attribute": "Info groups",
        "min_value": "The information and HMI elements should be logically grouped (wihout having a descriptive title)",
        "max_value": "The information and HMI elements should be logically grouped including a descriptive title.",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.visualAspects,
        "description":"Info groups relate to how information and HMI elements are grouped.",
        "reason": ""
    },
    {
        "id": 13,
        "attribute": "Pictorical information in elements",
        "min_value": "The UI should offer visual/textual information",
        "max_value": "The UI should offer universal and intuitive icons",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.visualAspects,
        "description":"Pictorical information in elements relates to how the UI shows textual and visual information.",
        "reason": ""
    },
    {
        "id": 14,
        "attribute": "Information messages",
        "min_value": "Information message should be available, even if not clearly described",
        "max_value": "Information message should be available, clearly described, and understandable",
        "extra_feedback": null,
        "rule":apiCheckedRule,
        "group_id":RecommendationGroupID.feedbackMessages,
        "description": "Information messages provide an informative description about an event.",
        "reason": ""
    },
    {
        "id": 15,
        "attribute": "Warning messages",
        "min_value": "The warning message should be clear (without possibility of human intervention)",
        "max_value": "The warning message should be clear and the process can be cancelled by the user",
        "extra_feedback": null,
        "rule":apiCheckedRule,
        "group_id":RecommendationGroupID.feedbackMessages,
        "description":"Warning messages alert the user of a condition that might cause a problem in the future"
    },
    {
        "id": 16,
        "attribute": "Error messages",
        "min_value": "The error message should be clear (system doesn't provide additional help)",
        "max_value": "The error message should be clear and provide additional help",
        "extra_feedback": null,
        "rule":apiCheckedRule,
        "group_id":RecommendationGroupID.feedbackMessages,
        "description":"Error messages refer to information displayed when an unforeseen problem occurs and the process/event cannot continue."
    },
    {
        "id": 17,
        "attribute": "Progress messages",
        "min_value": "The UI should provide feedback that the system is working even though estimated time remaining for operations is not available.",
        "max_value": "The UI should provide information about the operation's progress  and estimated  time remaining.",
        "extra_feedback": null,
        "rule":apiCheckedRule,
        "group_id":RecommendationGroupID.feedbackMessages,
        "description":"Progress messages relate to the information/feedback the user may recieve regarding the state of a process and/or its estimated finishing time."
    },
    {
        "id": 18,
        "attribute": "Interaction devices",
        "min_value": "User should have the ability to interact directly with the system (e.g., tactile device)",
        "max_value": "Users should have the ability to interact with the system through  natural input methods (e.g., gesture tracking, voice input)",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.inputAndInteraction,
        "description":"Interaction devices relate the different interaction devices availbale to the user to interact with the system."
    },
    {
        "id": 19,
        "attribute": "Fail-safe interaction design",
        "min_value": "The UI design should be adequate (no feedback regarding selected actions)",
        "max_value": "The UI design is adequate and there is a good/specific feedback regarding the selected actions (e.g., button colour change)",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.inputAndInteraction,
        "description":"Fail-safe interaction design relates to whether the UI design provides any specific feedback to the user for selected actions."
    },
    {
        "id": 20,
        "attribute": "Input format",
        "min_value": "The system should provide feedback about the format of the input data.",
        "max_value": "The system should be able to infer and adapt automatically to multiple input data formats.",
        "extra_feedback": null,
        "rule": interactionIsBidirectionalRule,
        "group_id":RecommendationGroupID.inputAndInteraction,
        "description":"Input format relate to whether the system provides any feedback regarding the format of the input data."
    },
    {
        "id": 21,
        "attribute": "Exact numeric values",
        "min_value": "The UI should enable the user to introduce numeric values via plus/minus buttons.",
        "max_value": "The UI should enable the user to introduce numeric values via keyboard/numeric pads.",
        "extra_feedback": null,
        "rule": interactionIsBidirectionalRule,
        "min_rule": NOTseniorsConsideredRule,
        "group_id":RecommendationGroupID.inputAndInteraction,
        "description":"Exact numeric values relates to how the user can introduce numeric values to the system."
    },
    {
        "id": 22,
        "attribute": "Use of profiles",
        "min_value": "The system should allows users' privileges (no profiles for specific roles)",
        "max_value": "The system should allows the assigning of user and profile-based privileges.",
        "extra_feedback": null,
        "rule":loginRequiredRule,
        "group_id":RecommendationGroupID.profiling,
        "description":"Use of profiles relates to whether the system has a profile management mechanism and how the profiling can assign roles, functionalities, and previliages."
    },
    {
        "id": 23,
        "attribute": "Accessibility configuration",
        "min_value": "The system should allow the user configuration of accessibility parameters (configuration is shared between all users)",
        "max_value": "The system should allow configuration of accessibility parameters that can be customized per user.",
        "extra_feedback": null,
        "rule":accessibilityConsideredRule,
        "group_id":RecommendationGroupID.profiling,
        "description":"Accessibility configuration relate to whether the users can configure accessibility parameters. "
    },
    {
        "id": 24,
        "attribute": "User's account",
        "min_value": "The system should allow the user to reset/change the password.",
        "max_value": "The system should allow the user to reset/change the password and update personal data.",
        "extra_feedback": null,
        "rule":loginRequiredRule,
        "group_id":RecommendationGroupID.profiling,
        "description":"User's account relates to how the profile managment system handles user's login data recovery and profile data management options."
    },
    {
        "id": 25,
        "attribute": "Customization",
        "min_value": "The menu should be customizable (configuration is shared between all users)",
        "max_value": "The menu should be customizable per user.",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.profiling,
        "rule":apiNOTRule,
        "description":"Customization relates to whether the menu is customizable and how configuration is shared between users."
    },
    {
        "id": 26,
        "attribute": "Languages",
        "min_value": "The component should support more than one language. Change is uniquely allowed when registering/logging in the component.",
        "max_value": "The component should support more than one language, which can be changed in every screen.",
        "extra_feedback": null,
        "group_id":RecommendationGroupID.profiling,
        "rule":apiNOTRule,
        "description":"Languages relates to the available languages for the user to choose from and how they are configured."
    },
    {
        "id": 27,
        "attribute": "Extra navigation feedback",
        "min_value": null,
        "max_value": null,
        "extra_feedback": "Navigation should allow users to easily start (home screen), pause, restart and exit the AR/VR application.",
        "rule":ARVRCheckedRule
    },
    {
        "id": 28,
        "attribute": "Extra visual aspects feedback",
        "min_value": null,
        "max_value": null,
        "extra_feedback": null
    },
    {
        "id": 29,
        "attribute": "Extra feedback messages feedback",
        "min_value": null,
        "max_value": null,
        "extra_feedback": null
    },
    {
        "id": 30,
        "attribute": "Extra user input and navigation feedback",
        "min_value": null,
        "max_value": null,
        "extra_feedback": null
    },
    {
        "id": 31,
        "attribute": "Extra profiling feedback",
        "min_value": null,
        "max_value": null,
        "extra_feedback": null
    }
]
