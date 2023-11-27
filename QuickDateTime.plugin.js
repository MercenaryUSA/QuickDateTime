/**
 * @name QuickDateTime
 * @author Mercenary (mercenaryusa)
 * @authorId 188477001990930432
 * @invite betterrl
 * @description Allows you to quickly send a unix timestamp in chat using a markdown-style command.
 * @version 1.0.0
 * @website 
 * @source 
 * @updateUrl
 */

const config = {
    info: {
        name: "QuickDateTime",
        authors: [
            {
                name: "Mercenary (mercenaryusa)",
                discord_id: "188477001990930432",
                github_username: "MercenaryUSA",
            }
        ],
        version: "1.0.0",
        description: "Allows you to quickly send a unix timestamp in chat using a markdown-style command.",
        github: "",
        github_raw: ""
    },
    defaultConfig: [
        {
            type: "category",
            id: "general",
            name: "General",
            collapsible: true,
            shown: false,
            settings: [
                {
                    type: "textbox",
                    id: "formatWrapper",
                    name: "Format Wrapper",
                    note: "The format wrapper that will be prefixed and suffixed to the formatted text. Must be ONE character",
                    value: "~",
                    placeholder: "~",
                }
            ]
        }
    ]
}

if (!global.ZeresPluginLibrary) {
    BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.name ?? config.info.name} is missing. Please click Download Now to install it.`, {
        confirmText: "Download Now",
        cancelText: "Cancel",
        onConfirm: () => {
            require("request").get("https://betterdiscord.app/gh-redirect?id=9", async (err, resp, body) => {
                if (err) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                if (resp.statusCode === 302) {
                    require("request").get(resp.headers.location, async (error, response, content) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), content, r));
                    });
                }
                else {
                    await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                }
            });
        }
    });
}

class Default {
    constructor() { this._config = config; }
    start() { }
    stop() { }
}

module.exports = !global.ZeresPluginLibrary ? Default : (([Plugin, Api]) => {
    const plugin = (Plugin, Api) => {
        const { UI, Patcher } = window.BdApi;
        const { DiscordModules } = Api;

        return class QuickFormats extends Plugin {
            constructor() {
                super();
            }

            async onStart() {
                Patcher.before(this.name, DiscordModules.MessageActions, "sendMessage", (_, [, msg]) => {
                    let command = msg.content.substring(msg.content.indexOf(`${this.defaultSettings.general.formatWrapper}`) + 1, msg.content.lastIndexOf(`${this.defaultSettings.general.formatWrapper}`));
                    if (command.includes(`date`)) {
                        let timeStamp;
                        let modifier = command.includes(':') ? command.split(":")[1].substring(0, 1) : null;
                        switch (modifier) {
                            case "d":
                                timeStamp = `<t:${Math.floor(Date.now() / 1000).toString()}:d>`;
                                UI.showToast("Formatted to short date.", { type: "info", timeout: 3000 });
                                break;
                            case "D":
                                timeStamp = `<t:${Math.floor(Date.now() / 1000).toString()}:D>`;
                                UI.showToast("Formatted to long date.", { type: "info", timeout: 3000 });
                                break;
                            case "t":
                                timeStamp = `<t:${Math.floor(Date.now() / 1000).toString()}:t>`;
                                UI.showToast("Formatted to short time.", { type: "info", timeout: 3000 });
                                break;
                            case "T":
                                timeStamp = `<t:${Math.floor(Date.now() / 1000).toString()}:T>`;
                                UI.showToast("Formatted to long time.", { type: "info", timeout: 3000 });
                                break;
                            case "f":
                                timeStamp = `<t:${Math.floor(Date.now() / 1000).toString()}:f>`;
                                UI.showToast("Formatted to short date and time.", { type: "info", timeout: 3000 });
                                break;
                            case "F":
                                timeStamp = `<t:${Math.floor(Date.now() / 1000).toString()}:F>`;
                                UI.showToast("Formatted to long date and time.", { type: "info", timeout: 3000 });
                                break;
                            case "R":
                                timeStamp = `<t:${Math.floor(Date.now() / 1000).toString()}:R>`;
                                UI.showToast("Formatted to relative time.", { type: "info", timeout: 3000 });
                                break;
                            default:
                                timeStamp = `<t:${Math.floor(Date.now() / 1000).toString()}>`;
                                UI.showToast("Formatted to default.", { type: "info", timeout: 3000 });
                                break;
                        }

                        msg.content = msg.content.replace(`${this.defaultSettings.general.formatWrapper}${command}${this.defaultSettings.general.formatWrapper}`, timeStamp ?? "");
                    }
                });
            }

            onStop() {
                Patcher.unpatchAll(this.name);
            }

            getSettingsPanel() {
                const panel = this.buildSettingsPanel();
                panel.addListener(this.updateSettings.bind(this));
                return panel.getElement();
            }

            updateSettings(group, id, value) {
                if(group == "general" && id == "formatWrapper") {
                    this.defaultSettings.general.formatWrapper = value;
                }
            }
        }
    };
    return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));