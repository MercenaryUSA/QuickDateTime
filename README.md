# QuickDateTime

BetterDiscord plugin that allows you to quickly send a unix timestamp in chat using a markdown-style command.

![Example](https://puu.sh/JVpN5/ed625de4c7.gif)

# Usage

You use a _single_ format wrapper (character) with "date:[modifier]", which follows the Discord unix formatting rules.

|Style|Input|Output (12-hour clock)|Output (24-hour clock)
|--|--|--|--
|Default|`<t:1543392060>`|November 28, 2018 9:01 AM|28 November 2018 09:01
|Short Time|`<t:1543392060:t>`|9:01 AM|09:01
|Long Time|`<t:1543392060:T>`|9:01:00 AM|09:01:00
|Short Date|`<t:1543392060:d>`|11/28/2018|28/11/2018
|Long Date|`<t:1543392060:D>`|November 28, 2018|28 November 2018
|Short Date/Time|`<t:1543392060:f>`|November 28, 2018 9:01 AM|28 November 2018 09:01
|Long Date/Time|`<t:1543392060:F>`|Wednesday, November 28, 2018 9:01 AM|Wednesday, 28 November 2018 09:01
|Relative Time|`<t:1543392060:R>`|3 years ago|3 years ago

# Settings

You can change the format wrapper in the plugin settings.
* Make sure to use a _single_ character.

# Contact

Discord: mercenaryusa