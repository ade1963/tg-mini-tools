# tg-mini-tools
A Telegram Mini App with a growing collection of tools like calculators, converters, and more. All tools are created using advanced Large Language Models (LLMs), ensuring smart and efficient functionality. Lightweight, user-friendly, and regularly updated to simplify everyday tasks directly within Telegram.

## Features

- **Sales Tax Calculator**: Calculate the total price including tax.
- **QR Code Scanner**: Scan QR codes from images.
- **Wallpaper Calculator**: Calculate the number of wallpaper rolls needed for a room.
- **Unit Converter**: Convert between different units of measurement (length, weight, volume).
- **Minesweeper Game:** A classic Minesweeper game for entertainment.

## Access the App

- **GitHub Pages**: Visit our hosted version of the app at [GitHub Pages](https://ade1963.github.io/tg-mini-tools/) to explore all tools in action.
- **Telegram Bot**: Interact with our tools directly through Telegram by connecting with [@AccountingCalculatorBot](https://t.me/AccountingCalculatorBot).
- **Source Code**: Check out the source code on [GitHub](https://github.com/ade1963/tg-mini-tools) to contribute or learn how the app works.

## API Endpoints

The application communicates with a backend API for fetching and saving user-specific settings and managing tools data. Below is a summary of the endpoints used:

### GET /api/user/favorites/
- Description: Fetches user-specific tool preferences and settings.
- Query Parameters:
  hashed_user_id (string): The unique identifier for the user.
- Response example:
```
[
  {
    "tool_id": 1,
    "position": 1,
    "settings": {
      "taxRate": 10
    }
  },
  ...
]
```

## PUT /api/user/favorites/{tool_id}
- Description: Updates or saves user-specific preferences and settings for a specific tool.
- Path Parameters:
  tool_id (integer): The ID of the tool to update.
- Query Parameters:
 hashed_user_id (string): The unique identifier for the user.
- Request Body:
```
{
  "position": 1,
  "settings": {
    "taxRate": 15
  }
}
```

## License

This project is licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
