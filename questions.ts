const QUESTIONS:QuestionObject[] = [
    {
        "id": 1,
        "choices": [
            {
                "id": 18,
                "creation": "2022-03-02T09:57:39.968438Z",
                "last_update": "2022-03-02T09:57:39.968493Z",
                "text": "GUI-WebUI",
                "tooltip": null,
                "question": 1
            },
            {
                "id": 19,
                "creation": "2022-03-02T09:58:04.359680Z",
                "last_update": "2022-03-02T09:58:04.359717Z",
                "text": "API",
                "tooltip": null,
                "question": 1
            },
            {
                "id": 20,
                "creation": "2022-03-02T09:58:16.281157Z",
                "last_update": "2022-03-02T09:58:16.281190Z",
                "text": "Augmented Reality (AR)",
                "tooltip": null,
                "question": 1
            },
            {
                "id": 21,
                "creation": "2022-03-02T09:58:26.059307Z",
                "last_update": "2022-03-02T09:58:26.059337Z",
                "text": "Virtual Reality (VR)",
                "tooltip": null,
                "question": 1
            },
            {
                "id": 22,
                "creation": "2022-03-02T09:58:37.365770Z",
                "last_update": "2022-03-02T09:58:37.365808Z",
                "text": "Proprietary tool",
                "tooltip": null,
                "question": 1
            },
            {
                "id": 23,
                "creation": "2022-03-02T09:58:54.107183Z",
                "last_update": "2022-03-02T09:58:54.107224Z",
                "text": "Mobile application (Android/IOS)",
                "tooltip": null,
                "question": 1
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T09:53:49.452262Z",
        "last_update": "2022-09-20T09:48:37.350960Z",
        "type": "RADIO",
        "nested_type": "NONE",
        "text": "Which technology is used by the user(s) for interaction? (you can only select one)",
        "order": 1,
        "question_answer_dependency": null,
        "parent_group_question": null
    },
    {
        "id": 5,
        "choices": [
            {
                "id": 34,
                "creation": "2022-03-02T10:40:23.371162Z",
                "last_update": "2022-03-02T10:40:23.371198Z",
                "text": "Basic",
                "tooltip": "Able to carry out simple tasks using simple digital technologies, such as the capacity to use basic digital devices or applications.",
                "question": 5
            },
            {
                "id": 35,
                "creation": "2022-03-02T10:40:41.648629Z",
                "last_update": "2022-03-02T10:40:41.648658Z",
                "text": "Intermediate",
                "tooltip": "Able to use a range of digital technologies, such as tools for e-commerce, digital payments and searching & analyzing information. Able to solve easy problems that arise when technologies do not work.",
                "question": 5
            },
            {
                "id": 36,
                "creation": "2022-03-02T10:40:54.593580Z",
                "last_update": "2022-03-02T10:40:54.593621Z",
                "text": "Advanced",
                "tooltip": "Able to use a variety of digital tools and to adopt digital modes and ways of communication that best fit the purpose. Able to solve a wide-range of problems that arise from the use of technology.",
                "question": 5
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:25:51.530513Z",
        "last_update": "2022-03-02T10:25:51.530545Z",
        "type": "RADIO",
        "nested_type": "NONE",
        "text": "Level of digital skills",
        "order": 1,
        "question_answer_dependency": null,
        "parent_group_question": 4
    },
    {
        "id": 6,
        "choices": [
            {
                "id": 37,
                "creation": "2022-03-02T10:41:11.854927Z",
                "last_update": "2022-03-02T10:41:11.854964Z",
                "text": "Less than 5 years",
                "tooltip": null,
                "question": 6
            },
            {
                "id": 38,
                "creation": "2022-03-02T10:41:21.402476Z",
                "last_update": "2022-03-02T10:41:21.402507Z",
                "text": "Between 5 to 10 years",
                "tooltip": null,
                "question": 6
            },
            {
                "id": 39,
                "creation": "2022-03-02T10:41:32.946264Z",
                "last_update": "2022-03-02T10:41:32.946298Z",
                "text": "More than 10 years",
                "tooltip": null,
                "question": 6
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:26:14.664845Z",
        "last_update": "2022-03-02T10:26:14.664876Z",
        "type": "RADIO",
        "nested_type": "NONE",
        "text": "Professional experience",
        "order": 2,
        "question_answer_dependency": null,
        "parent_group_question": 4
    },
    {
        "id": 2,
        "choices": [
            {
                "id": 24,
                "creation": "2022-03-02T10:13:24.632517Z",
                "last_update": "2022-03-02T10:13:24.632545Z",
                "text": "Personal computer (PC)",
                "tooltip": null,
                "question": 2
            },
            {
                "id": 25,
                "creation": "2022-03-02T10:13:31.406890Z",
                "last_update": "2022-03-02T10:13:31.406921Z",
                // NOTE: "Head-mounted Display" may be more correct
                "text": "Heads-up display (AR/VR)",
                "tooltip": null,
                "question": 2
            },
            {
                "id": 26,
                "creation": "2022-03-02T10:13:38.837289Z",
                "last_update": "2022-03-02T10:13:38.837324Z",
                "text": "Mobile device (smartphone, tablet)",
                "tooltip": null,
                "question": 2
            },
            {
                "id": 27,
                "creation": "2022-03-02T10:13:47.568460Z",
                "last_update": "2022-03-02T10:13:47.568489Z",
                "text": "AR projector",
                "tooltip": null,
                "question": 2
            },
            {
                "id": 28,
                "creation": "2022-03-02T10:13:58.083143Z",
                "last_update": "2022-03-02T10:13:58.083177Z",
                "text": "Gesture tracking/recognition",
                "tooltip": null,
                "question": 2
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:12:57.592529Z",
        "last_update": "2022-09-20T09:49:21.010206Z",
        "type": "CHECKBOX",
        "nested_type": "NONE",
        "text": "Which devices are enabled for the interaction? (you can select one or more)",
        "order": 2,
        "question_answer_dependency": null,
        "parent_group_question": null
    },
    {
        "id": 3,
        "choices": [
            {
                "id": 29,
                "creation": "2022-03-02T10:15:50.606007Z",
                "last_update": "2022-03-02T10:15:50.606037Z",
                "text": "Worker/operator",
                "tooltip": null,
                "question": 3
            },
            {
                "id": 30,
                "creation": "2022-03-02T10:15:57.855376Z",
                "last_update": "2022-03-02T10:15:57.855403Z",
                "text": "Developer/content developer",
                "tooltip": null,
                "question": 3
            },
            {
                "id": 31,
                "creation": "2022-03-02T10:16:05.802351Z",
                "last_update": "2022-03-02T10:16:05.802383Z",
                "text": "Integrator",
                "tooltip": null,
                "question": 3
            },
            {
                "id": 32,
                "creation": "2022-03-02T10:16:13.823658Z",
                "last_update": "2022-03-02T10:16:13.823701Z",
                "text": "Expert (e.g., process designer)",
                "tooltip": null,
                "question": 3
            },
            {
                "id": 33,
                "creation": "2022-03-02T10:16:23.206684Z",
                "last_update": "2022-03-02T10:16:23.206715Z",
                "text": "Robot programmer",
                "tooltip": null,
                "question": 3
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:15:16.890165Z",
        "last_update": "2022-09-20T09:52:55.804458Z",
        "type": "CHECKBOX",
        "nested_type": "NONE",
        "text": "Which target user(s) are you addressing?",
        "order": 3,
        "question_answer_dependency": null,
        "parent_group_question": null
    },
    {
        "id": 4,
        "choices": [],
        "child_questions": [
            {
                "id": 5,
                "creation": "2022-03-02T10:25:51.530513Z",
                "last_update": "2022-03-02T10:25:51.530545Z",
                "type": "RADIO",
                "nested_type": "NONE",
                "text": "Level of digital skills",
                "order": 1,
                "question_answer_dependency": null,
                "parent_group_question": 4
            },
            {
                "id": 6,
                "creation": "2022-03-02T10:26:14.664845Z",
                "last_update": "2022-03-02T10:26:14.664876Z",
                "type": "RADIO",
                "nested_type": "NONE",
                "text": "Professional experience",
                "order": 2,
                "question_answer_dependency": null,
                "parent_group_question": 4
            }
        ],
        "creation": "2022-03-02T10:19:07.272433Z",
        "last_update": "2022-03-02T10:19:07.272460Z",
        "type": "GROUP",
        "nested_type": "NONE",
        "text":
            "For each of the target users selected in Step 3, please provide the following info:",
        "order": 4,
        "question_answer_dependency": 3,
        "parent_group_question": null
    },
    {
        "id": 7,
        "choices": [
            {
                "id": 40,
                "creation": "2022-03-02T10:41:54.892125Z",
                "last_update": "2022-03-02T10:41:54.892153Z",
                "text": "It is expected to have users older than 60 years old.",
                "tooltip": null,
                "question": 7
            },
           
            {
                "id": 42,
                "creation": "2022-03-02T10:42:30.838861Z",
                "last_update": "2022-03-02T10:42:30.838894Z",
                "text": "Users can select different languages.",
                "tooltip": null,
                "question": 7
            } // {
            //     "id": 41,
            //     "creation": "2022-03-02T10:42:15.905122Z",
            //     "last_update": "2022-03-02T10:42:15.905153Z",
            //     "text": "I want to have accessibility aspects in mind.",
            //     "tooltip": "Having in mind accessibility aspects refers to design an inclusive solution, where not only target users are considered, but also users with disabilities, and even users from different cultures and countries.",
            //     "question": 7
            // },
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:28:21.537654Z",
        "last_update": "2022-03-02T10:28:21.537697Z",
        "type": "CHECKBOX",
        "nested_type": "NONE",
        "text": "At general level, please select the options that you want to consider from UX perspective",
        "order": 7,
        "question_answer_dependency": null,
        "parent_group_question": null
    },
    {
        "id": 8,
        "choices": [
            {
                "id": 43,
                "creation": "2022-03-02T10:47:56.673667Z",
                "last_update": "2022-03-02T10:47:56.673695Z",
                "text": "Yes",
                "tooltip": null,
                "question": 8
            },
            {
                "id": 48,
                "creation": "2022-03-02T10:48:14.864358Z",
                "last_update": "2022-03-02T10:48:14.864394Z",
                "text": "No",
                "tooltip": null,
                "question": 8
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:46:38.387692Z",
        "last_update": "2022-03-02T10:46:38.387737Z",
        "type": "RADIO",
        "nested_type": "NONE",
        "text": "Is there a navigation system to move through different interface elements?",
        "order": 8,
        "question_answer_dependency": null,
        "parent_group_question": null
    },
    {
        "id": 9,
        "choices": [
            {
                "id": 44,
                "creation": "2022-03-02T10:48:00.937505Z",
                "last_update": "2022-03-02T10:48:00.937539Z",
                "text": "Yes",
                "tooltip": null,
                "question": 9
            },
            {
                "id": 47,
                "creation": "2022-03-02T10:48:11.923587Z",
                "last_update": "2022-03-02T10:48:11.923622Z",
                "text": "No",
                "tooltip": null,
                "question": 9
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:46:52.303206Z",
        "last_update": "2022-03-02T10:46:52.303244Z",
        "type": "RADIO",
        "nested_type": "NONE",
        "text": "Is the interaction bidirectional, meaning that the user can introduce information (e.g. text, number) in your application/service/product?",
        "order": 9,
        "question_answer_dependency": null,
        "parent_group_question": null
    },
    {
        "id": 10,
        "choices": [
            {
                "id": 49,
                "creation": "2022-03-02T10:48:31.235472Z",
                "last_update": "2022-03-02T10:48:31.235504Z",
                "text": "Keyboard/mouse",
                "tooltip": null,
                "question": 10
            },
            {
                "id": 50,
                "creation": "2022-03-02T10:48:36.981805Z",
                "last_update": "2022-03-02T10:48:36.981833Z",
                "text": "Tactile",
                "tooltip": null,
                "question": 10
            },
            {
                "id": 51,
                "creation": "2022-03-02T10:48:42.332161Z",
                "last_update": "2022-03-02T10:48:42.332187Z",
                "text": "Gesture",
                "tooltip": null,
                "question": 10
            },
            {
                "id": 52,
                "creation": "2022-03-02T10:48:46.496504Z",
                "last_update": "2022-03-02T10:48:46.496541Z",
                "text": "Voice",
                "tooltip": null,
                "question": 10
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:47:08.671672Z",
        "last_update": "2022-03-02T10:47:08.671706Z",
        "type": "CHECKBOX",
        "nested_type": "NONE",
        "text": "Which types of interaction are available for users?",
        "order": 10,
        "question_answer_dependency": null,
        "parent_group_question": null
    },
    {
        "id": 11,
        "choices": [
            {
                "id": 45,
                "creation": "2022-03-02T10:48:04.253639Z",
                "last_update": "2022-03-02T10:48:04.253668Z",
                "text": "Yes",
                "tooltip": null,
                "question": 11
            },
            {
                "id": 46,
                "creation": "2022-03-02T10:48:08.289384Z",
                "last_update": "2022-03-02T10:48:08.289414Z",
                "text": "No",
                "tooltip": null,
                "question": 11
            }
        ],
        "child_questions": [],
        "creation": "2022-03-02T10:47:26.598564Z",
        "last_update": "2022-03-02T10:47:26.598594Z",
        "type": "RADIO",
        "nested_type": "NONE",
        "text": "Does your application/service/product require login?",
        "order": 11,
        "question_answer_dependency": null,
        "parent_group_question": null
    }
]
