import { Hono } from "hono";
import { USER_FLAGS } from "./lib/userFlags";
import type { requestResponse } from "./types/response";

const app = new Hono();

app.get("/", (c) =>
    c.json({
        github: "https://git.dromzeh.dev/discord-lookup",
        route: "/user/{id}",
    })
);

app.get("/user/:id", async (c) => {
    const id = c.req.param("id");
    const token = c.env?.DISCORD_TOKEN;

    if (!token) return c.json({ error: "No token available" });
    if (!id) return c.json({ error: "No id provided" });

    const response = await fetch(`https://discord.com/api/v10/users/${id}`, {
        headers: {
            "Content-Type": "application/json",
            "User-Agent":
                "DiscordBot (https://git.dromzeh.dev/discord-lookup, 1.0.0)",
            Authorization: `Bot ${token}`,
        },
    })
        .then((res) => res.json())
        .catch((err) => c.json({ error: err }))
        .then((json) => {
            const res = json as requestResponse;

            const flags = [];

            for (let i = 0; i < USER_FLAGS.length; i++) {
                if (res.public_flags & USER_FLAGS[i].bitwise) {
                    flags.push(USER_FLAGS[i].flag);
                }
            }

            const response = {
                id: res.id,
                user: {
                    id: res.id,
                    username: res.username,
                    discriminator: res.discriminator,
                    isPomelo: res.discriminator === "0",
                    globalName: res.global_name,
                    accentColor: res.accent_color,
                },
                avatar: {
                    id: res.avatar,
                    url: res.avatar
                        ? `https://cdn.discordapp.com/avatars/${res.id}/${res.avatar}`
                        : null,
                    animated: res.avatar.startsWith("a_"),
                    avatarDecoration: res.avatar_decoration,
                },
                banner: {
                    id: res.banner,
                    url: res.banner
                        ? `https://cdn.discordapp.com/banners/${res.id}/${res.banner}`
                        : null,
                    color: res.banner_color,
                },
                flags: flags,
            };

            return c.json(response);
        });

    return response;
});

export default app;
