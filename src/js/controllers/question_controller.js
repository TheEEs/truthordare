import { Controller } from "@hotwired/stimulus";
import { translate } from "google-translate-api-browser/dist/browser/esm"
import { themeChange } from 'theme-change'

const END_POINTS = [
    "https://api.truthordarebot.xyz/v1/truth",
    "https://api.truthordarebot.xyz/api/dare",
    "https://api.truthordarebot.xyz/api/wyr",
    "https://api.truthordarebot.xyz/api/nhie",
    "https://api.truthordarebot.xyz/api/paranoia"
]

const TRANSLATION_URL = "https://translate.google.com"

const RATINGS = ["pg", "pg13", "r"]

export default class extends Controller {
    static targets = ["question", "rating", "originalQuestion"]

    connect() {
        themeChange()
        this.fetch()
    }


    t(sentence) {
        return translate(sentence, { to: "vi", corsUrl: "http://cors-anywhere.herokuapp.com/" })
            .then(res => {
                return res.text
            })
            .catch(err => {
                console.error(err);
            });
    }

    async fetch() {
        const rating = this.ratingTarget.value || RATINGS[Math.floor(Math.random() * RATINGS.length)]
        const url = new URL(END_POINTS[Math.floor(Math.random() * END_POINTS.length)])
        url.searchParams.append("rating", rating)
        const result = await fetch(url)
        const json_result = await result.json()
        const { question } = json_result
        this.questionTarget.innerText = await this.t(question)
        this.originalQuestionTarget.innerText = question
    }
}
