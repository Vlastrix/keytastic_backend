```mermaid
classDiagram
    class Keyboard {
        +String _id  
    }

    Keyboard <|-- User

    class User {
        +String _id  
        +String f_name
        +String email
        +String password
        +Array IdFavKeyboards
    }
```