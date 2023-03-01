# Authentication Flow

## Sign Up and Sign In
```mermaid
flowchart LR
    id1([User Starts App]) --> id2{First launch?}
    id2 --> |Yes| id3[Sign Up Screen]
    id2 --> |No| id4[Sign In Screen]
    id3 --> |User \n Signs Up| id5[Dashboard Screen]
    id4 --> |User \n Signs In| id6{Is active?}
    id6 --> |Yes| id5[Dashboard Screen]
    id5 --> id7([End])
    id6 --> |No| id8[Message the user \n about the ban]
    id8 --> id7
    
```
### What is the "Message the user about the ban" action?
Tells the user that the account with which he tried to Sign In is banned.

Each time the user Sign Up/In a Json Web Token is sent to the client to be saved. The JWT expires in 24 hours
If the user closes the application and then opens it again, the application will check if the token is still validated, if it is, the user can use the app, if not, the user is asked to Sign In again.

```mermaid
flowchart LR
    id1([User Starts App]) --> id2{Is the token valid?}
    id2 --> |Yes| id3[Dashboard Screen]
    id2 --> |No| id4[Sign In Screen]
    id3 --> id5([End])
    id4 --> id5
```

## Password Recovery
```mermaid
flowchart LR
    id1([User Starts App]) --> id4[Sign In Screen]
    id4 --> |Clicks Forgot \n Password Button| id5[Password Recovery \n Screen]
    id5 --> id6[/Get User Email/]
    id6 --> |User clicked \n Recover button| id7[Email the User a \n temporal password]
    id7 --> |Ask the user \n to Sign In \n with the \n temporal password| id9[Sign In Screen]
    id9 --> id8([End])
```

In order to recover the password the app asks for the users Email and sends him a new temporal password with which he can Sign In and change his password to a new one in the Profile Screen.