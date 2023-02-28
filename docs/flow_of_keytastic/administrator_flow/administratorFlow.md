# Administrator Flow
```mermaid
graph LR
    C{is Authenticated?}
    C -->|Yes| D[Dashboard \n screen]
    C -->|No| E[Sign Up/In]
    E -->|Forgot Password| Y(Password Recovery)
    Y -->|Password Recovered| E
    E --> D
    D --> H[Search screen]
    H --> I[Description view \n of the keyboard]
    D --> K[Favorites \n screen]
    K --> I
    I --> L(Delete unethical \n comments)
    I --> J(Make users invactive)
    D --> Z[New keyboard \n screen]
    Z --> X(Add a new keyboard)
    Z --> M(Validate a keyboard)
    X --> N(Keyboard gets \n added to the database)
    M --> N
```
## Administrator Flow documentation
Administrators manage the application and can ban users for unethical activities like chat spamming or being disrespectful.

### What an administrator can do?
* Everything that a [user](https://github.com/Vlastrix/keytastic_backend/blob/main/docs/flow_of_keytastic/userFlow.md) can do.
* Delete comments.
* Ban users (make them inactive).
* Validate keyboards sent by users (add them to the app).
* Add a new keyboard to the app.

### What are inactive users?
It means users that have violated the rules of the app and therefore were banned.

### How do administrators add or validate keyboards?
Administrators open the "New Keyboard" screen in which they can add new keyboards and validate keyboards that were sent by the users.

### What is validation in keyboards?
In the internet there is a lot technical errors regarding mechanical keyboards, those need to be erradicated by doing extra reseach and watching reviews about the keyboards so that the information is correct. A keyboard is only validated when you are sure that you have specified the right data.