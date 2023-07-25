## discord-lookup

A Discord User Lookup API built with CF Workers & Hono.

## API Reference

#### Get user by ID

```http
  GET /user/{user}
```

| Parameter | Type     | Description           |
| :-------- | :------- | :-------------------- |
| `id`      | `number` | **Required**. User ID |

Returns information about a user.

## Local Development

To run this project locally, install the dependencies and run the following command:

```bash
  pnpm run dev
```

## Local Deployment

Create a CF worker and install wrangler - set your discord token as a secret named `DISCORD_TOKEN` and run the following command:

```bash
  pnpm run deploy
```

## Authors

-   [@dromzeh](https://www.github.com/dromzeh)
