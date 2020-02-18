# Elm Narrative Engine Editor

This is simple browser based editor for building the manifest and rules for [Elm
Narrative Engine] stories.

Main Goals:

- Minimal interface, maximum authoring efficiency
- Easy navigation, searching, filtering
- Autocomplete entity IDs and tag/stat/link keys to avoid spelling bugs
- Auto-save data locally and in the cloud
- Export consumable JSON for static content loading

Other Goals:

- Simple preview theme with minor customization options
- Real-time collaboration
- Provide JSON data as REST API for dynamic content loading
- Provide API to make game previews publicly available

## Local dev

Simple live reloading static web server: `npx livereloadx -s .`.

[elm narrative engine]: http://elmnarrativeengine.com/
