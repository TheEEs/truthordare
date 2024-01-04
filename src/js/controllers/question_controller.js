import { Controller } from "@hotwired/stimulus";
import { themeChange } from 'theme-change'
import { HfInference } from "@huggingface/inference";

const hf = new HfInference('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')

window.hf = hf

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
        document.querySelector("[data-toggle-theme]").addEventListener("click",()=>{
            alert("OK")
        })
        themeChange()
        this.fetch()
    }


    async t(sentence) {
        return (await hf.translation({
            model: "VietAI/envit5-translation",
            inputs: `en: ${sentence}`,
        })).translation_text.slice(3).trim()
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
