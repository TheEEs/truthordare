import { Application } from "@hotwired/stimulus"

import QuestionController from "./js/controllers/question_controller"

window.Stimulus = Application.start()

Stimulus.register("question", QuestionController)
