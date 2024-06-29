# Menu Maker App

## TODOs

- [X] get and post calls on menu table view
      correct requirements from the button:
- [X] save: to database
- [X] add next item

- [X]login fixed
- [x] redirect to default page: fix that -> works but login gets messed up: fix that : Done : 5 June

### Capabilities

      - [ ] Extra: generate groceries

      - [ ] Random generation of next week's meals, based on old data (menu generation automation based on your preferences), important to maintain history to do that

- [x] Directs to view mode (todays meals): 8 June

- [x] todays meals, with images: done 6 June

- [x] button container on top right positioned there with flexbox, use it across the project: Must add login button in the
      todays meals page : 8 June

- [X] Add RLS policies on users allowed to access which rows
      - [x] Select only where user_id matches authenticated user
      - [x] Update only where user_id matches authenticated user

- [ ] Welcome page with instructions and capabilties of the apps

- [ ] Add a default menus page with option for initialization:
      - [X] create a backend table for default table
      - [ ] Give option to users to select a default menu
      - [ ] Default recommendations based on their home place (Give a page which asks where the person is located from and sets it as defaults)
      - [ ] Define Menu tags (for selecting and setting) in the table

- [X] CSS fixes for button to be % of screen size
- [ ] Create mobile View
      - [ ] table alternate
            - [X] Create modality
            - [X] Basic Page Done
            - [X] Login button, modal
            - [X] Add API to login flow to get or retrieve
      - [ ] View alternate
      - [ ] Redirection based on resolution
- [ ] Add user greetings on the page
- [ ] Generate User menu chat
      - [ ] Enforce last question of the type button which will call terminal function in chat.js
      - [ ] Convert chat.js to accept props
      - [ ] Make it more engaging with more buttons for simple conext questions
      - [ ] Allow for callables in functions, for example sugegsting top 5 meal items right there (multi integration with chatgpt)
      - [ ] Add animation in chat

## Guidelines

1. Maintain an offline version of the app for fast development, default for default menu.
