# User Flow
```mermaid
graph LR
    C{is Authenticated?}
    C -->|Yes| D[Dashboard \n screen]
    C -->|No| E[Sign Up/In]
    E --> D
    D --> H[Search for \n keyboards]
    H --> I[Description view \n of the keyboard]
    I --> F[Find it On \n button]
    I --> G[Post a comment]
    I --> A[Mark keyboard as favorite]
    I --> B[Share]
    D --> J[Favorites \n screen]
    J --> K[View keyboards \n marked as favorite]
    D --> P[Profile \n Screen]
    P --> R[Change \n Username]
    P --> S[Change \n Email]
    P --> T[Send \n Feedback]
    P --> Q[Sign Out]
```

## User Flow documentation
A user can view and read. The user dosen't modify the content of the app, he can only interact with it.

### What a user can do?
* Post comments on a keyboard.
* Share a keyboard.
* Mark keyboard as favorite.
* Search a keyboard by tags.
* Search a keyboard by name.
* Change his username.
* Change his email.
* Send feedback to the developers about the app.
* Press the "Find On" button.

### What is the "Find On" button?
This button appears in the description view of the keyboard, it leads to a e-commerce website where you can buy the keyboard you selected.
