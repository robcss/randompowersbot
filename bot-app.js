require('dotenv').config();
const { Telegraf } = require('telegraf')
const url = require("url")

const getPower = require("./utils/getPower")

const wikiUrl = "https://powerlisting.fandom.com/wiki/Special:Random"
const wikiPage = process.env.NODE_ENV === "production" ? process.env.WIKI_URL : wikiUrl


module.exports = (bot) => {

    //error handling
    bot.catch((err, ctx) => {
        console.log(`Ooops, encountered an error for ${ctx.updateType}`, err)
        ctx.reply("Something's wrong with my circuits :(")
    })

    //your bot logic
    bot.start((ctx) => {
        ctx.reply("Hello! Ready for some cool superpower?")
        ctx.reply("Use the /roll command to get a random power")
    })

    bot.help((ctx) => {
        ctx.reply("Use the /roll command to get a random power")
    })

    bot.command("roll", async (ctx) => {

        try {
            const powerLink = await getPower(wikiPage)

            const powerPath = url.parse(powerLink).path

            let powerName = "this cool superpower"

            if (powerPath) {
                powerName = powerPath.replace("/wiki/", "").replace(/_/g, " ")
            }

            const result = `You got <b>${powerName}</b>!\n${powerLink}`

            const msgId = ctx.update.message.message_id

            ctx.replyWithHTML(result, { reply_to_message_id: msgId })

        } catch (e) {
            console.log(e)
            ctx.reply(e.message, { disable_web_page_preview: true })
        }

    })

}