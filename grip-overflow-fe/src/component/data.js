export const rawData = [
    {
        replies: [
            {
                replyId: 1,
                replyDesc: "We use stream api with Collection",
                replyBy: "Nishu",
                replyLike: 10,
                replyDislike: 3,
                replyTime: "17-08-2023 08:00PM"
            },
            {
                replyId: 2,
                replyDesc: "Stream api helps in collections such as list, map, set etc",
                replyBy: "Mitu",
                replyLike: 8,
                replyDislike: 3,
                replyTime: "17-08-2023 08:00PM"
            },
            {
                replyId: 3,
                replyDesc: "Stream api helps in collections such as list, map, set to perform intermediate action",
                replyBy: "Basu",
                replyLike: 45,
                replyDislike: 2,
                replyTime: "17-08-2023 08:00PM"
            },
            {
                replyId: 6,
                replyDesc: "We dont user stream api with Collection",
                replyBy: "ProudCOder",
                replyLike: 0,
                replyDislike: 123,
                replyTime: "17-08-2023 08:00PM"
            }
        ],
        qtitle: "Java Stream API",
        qtime: "17-08-2023 08:00PM",
        qauthor: "Shesho",
        qupvote: 19,
        qdownvote: 4,
        qid: 1,
        qdesc: "What is JAVA Stream Api in Java8 and how we use it?"
    },
    {
        replies: [
            {
                replyId: 7,
                replyDesc: "Just Bullshit, Not Relevent",
                replyBy: "ProudCOder",
                replyLike: 100,
                replyDislike: 1,
                replyTime: "17-08-2023 08:00PM"
            },
            {
                replyId: 8,
                replyDesc: "Its somekind of dipshit created by HMHS team",
                replyBy: "Gaurav",
                replyLike: 1009,
                replyDislike: 1,
                replyTime: "17-08-2023 08:00PM"
            }
        ],
        qtitle: "What is EHS Product?",
        qtime: "17-08-2023 08:00PM",
        qauthor: "Shesho",
        qupvote: 5,
        qdownvote: 4,
        qid: 2,
        qdesc: "What are EHS product, I have heard it so many time but still have no Idea on it?"
    },
    {
        replies: [
            {
                replyId: 7,
                replyDesc: "It looks like you have configured redirect-based authentication in your back-end API. Technically speaking the correct solution for these cases is to implement the authentication in the front-end SPA and implement token authentication in the back-end. This means if the request has a valid token and the user is authorized to do the request, it returns a 200 OK. If the token is not valid, it should return a 401. The reason you are getting a CORS error is because your back-end is trying to redirect the AJAX request to AAD, which won't accept it",
                replyBy: "ProudCOder",
                replyLike: 100,
                replyDislike: 1,
                replyTime: "17-08-2023 08:00PM"
            },
            {
                replyId: 8,
                replyDesc: "You can use for example MSAL.js to acquire access tokens in the front-end application. It will manage expiry etc. for you and allow you to send the user to login when needed.",
                replyBy: "Gaurav",
                replyLike: 1009,
                replyDislike: 1,
                replyTime: "17-08-2023 08:00PM"
            },
            {
                replyId: 8,
                replyDesc: "After signing in with your account, you could get the account messages with getAccount() method.",
                replyBy: "Gaurav",
                replyLike: 1009,
                replyDislike: 1,
                replyTime: "17-08-2023 08:00PM"
            }
        ],
        qtitle: "Application showing CORS error after sometime (AZURE AD)",
        qtime: "17-08-2023 08:00PM",
        qauthor: "Shesho",
        qupvote: 5,
        qdownvote: 4,
        qid: 2,
        qdesc: "I am using Spring Boot + Azure AD + angular9 and using azure ad default provided api to get access to my application. After launching application Microsoft login appear -> verify creds -> show me my landing page. All api works fine. But after sometime (almost 5-6 mins) all api start failing. It showing CORS ERROR in browser console."
    }
]

export const questions = [
    "What is EHS Product?", "What is JAVA Stream Api in Java8 and how we use it?"
]

export const User = {
    name: "Sheshanath",
    skill: "Techincal",
    reputation: 123,
    image: "https://creazilla-store.fra1.digitaloceanspaces.com/icons/3251108/person-icon-md.png"
}