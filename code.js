
// // -----Using JQuery-----
// const book_form = $("#book-form");
// const book_name = $("#book-name");
// const author_name = $("#author-name");
// const image_url = $("#image");
// const price = $("#price");

// let BookDetails = {};
// book_form.submit(function (event) {
//     event.preventDefault();
//     BookDetails = {
//         title: book_name.val(),
//         author: author_name.val(),
//         coverImageUrl: image_url.val(),
//         price: price.val()
//     };
//     console.log(BookDetails);
//     emptyForm();
//     console.log(BookDetails);
// });

// $.get("https://assignment3.rohanhussain.com/api/books/22020382", function(books) {
//     const booksArray = books.result.books;
//     // console.log(books);

//     // booksArray.forEach(function(book) {
//     //     console.log(book);
//     // })

//     const catalogue_list = $(".catalogue-list");
//     const bookCard = document.createElement("div"); 
// });

// console.log(booksObject);

// $.get("https://assignment3.rohanhussain.com/api/books/22020382/search", function (data) {
//     console.log(data);
// })

// $.post("https://assignment3.rohanhussain.com/api/books/22020382", function (data) {
//     console.log(data);
// })

// ----Without JQuery-----
// const book_form = document.querySelector("#book-form");
// const book_name = document.querySelector("#book-name");
// const author_name = document.querySelector("#author-name");
// const image_url = document.querySelector("#image");
// const price = document.querySelector("#price");

// function emptyForm() {
//     book_name.value = "";
//     author_name.value = null;
//     image_url.value = "";
//     price.value = "";
//     return;
// }

// let BookDetails = {};
// book_form.addEventListener("submit", function(event) {
//     event.preventDefault();
//     BookDetails = {
//         title: book_name.value,
//         author: author_name.value,
//         coverImageUrl: image_url.value,
//         price: price.value
//     };
//     console.log(BookDetails);
//     //emptyForm();
// });

function show(shown, hidden) {
    document.getElementById(shown).style.display='block';
    document.getElementById(hidden).style.display='none';
    return false;
};

// let user_input = 22320382;
let user_input;
function isValidSixDigitNumber(input) {
    const inputString = String(input);

    // Check if it has exactly 6 characters
    if (inputString.length == 6 | inputString.length == 8) {
        // console.log(Number(inputString));
        // console.log(isNaN(Number(inputString)));
        return !isNaN(Number(inputString));
    }

    // Check if the string contains only digits and is a valid number
    // Number() converts the string to a number; isNaN() checks if it resulted in "Not-a-Number"
    // The ! inverts the result, so it returns true if it IS a number
    // console.log(inputString.length);
    return false;
};

while (isValidSixDigitNumber(user_input) == false)
{
    user_input = prompt("Enter your Roll Number (8-digits)/Enter Random 6-digit Number");
    if (isValidSixDigitNumber(user_input) == false)
    {
        alert("That is not a valid number. Try Again!")
    }
};

const rollNum = user_input;

console.log("Roll number: " + rollNum);
const url = `https://assignment3.rohanhussain.com/api/books/${rollNum}`;
console.log(url);

//-----Catalogue Page-----
async function generate_catalogue() {
    try {
        const res = await fetch (url);
        const data = await res.json();
        console.log(data);

        if (!res.ok) {
            console.log(data.description);
            return;
        }

        return data.result.books;
    } catch (error) {
        console.log (error);
    }
};

function delete_catalogue(pgName) {
    const pgNameEl = document.querySelector(`${pgName}`);
    const cardsSectionEl = pgNameEl.lastElementChild.lastElementChild;
    const listEl = cardsSectionEl.querySelectorAll(".new-card");
    let len = listEl.length;
    for (i=0; i<len; i++)
    {
        listEl[i].remove();
    }
    return;
};

// async function display_books() {
//     let books_list = await generate_catalogue();
//     if (books_list.length == 0)
//     {
//         console.log("No books in catalogue \n");
//         return;
//     }
//     console.log("Number of Books: ", books_list.length, "\n List of Books: ", JSON.stringify(books_list));
//     return;
// };
// // display_books();


async function appendCards (pgName, array) {
    const pgNameEl = document.querySelector(`${pgName}`);
    console.log(pgNameEl);
    const cardsSectionEl = pgNameEl.lastElementChild.lastElementChild;
    console.log(cardsSectionEl);
    let temparray = await array;
    // console.log("here \n", temparray.length, "\n", temparray);
    if (temparray.length!=0)
    {
        for (i=0; i<temparray.length; i++)
        {
            // console.log(temparray[i].title);
            let newCard = document.createElement("div");
            newCard.className = "new-card";

            let cardTitle = document.createElement("h3");
            console.log(temparray[i].title);
            cardTitle.innerText = temparray[i].title;
            cardTitle.className = "card-title";
            newCard.appendChild(cardTitle);

            let cardAuthor = document.createElement("p");
            cardAuthor.innerText = "Author: "+temparray[i].author;
            cardAuthor.className = "card-author";
            newCard.appendChild(cardAuthor);
            
            let cardPrice = document.createElement("p");
            console.log(temparray[i].price);
            cardPrice.innerText = "Price: "+temparray[i].price+" PKR";
            cardPrice.className = "card-price";
            newCard.appendChild(cardPrice);
            
            let cardCover = document.createElement("img");
            cardCover.src = temparray[i].coverImageUrl;
            cardCover.className = "card-img";
            newCard.appendChild(cardCover);

            //-----------Delete Functionality (incomplete)--------------
            let delButton = document.createElement("button");
            delButton.className = "del-button";
            delButton.innerHTML = "Remove";
            delButton.onclick = async function (event) {
                let name_check = event.target.parentElement.children[0].innerText;
                // console.log("name check is: ", name_check);
                let confirmation = prompt("Are you sure you want to remove this book from your catalogue? \n\nType Yes to proceed");
                if (confirmation == "Yes")
                {
                    let tempIdarray = await generate_catalogue();
                    console.log(tempIdarray);
                    let tempId;
                    for (let i=0; i<tempIdarray.length; i++)
                    {
                        if (tempIdarray[i].title == name_check)
                        {
                            tempId = i;
                        }
                    };
                    console.log("tempId is: ", tempId, "\nBook name is: ", name_check);
                    const eventId = tempId;
                    console.log(url+"/result/books/"+eventId);
                    try {
                        const res = await fetch(url+"/result/books/"+eventId, {
                            method: 'DELETE',
                        });

                        if(!res.ok)
                        {
                            console.log("Failed to remove book");
                            alert("Deletion doesnt work for now.");
                            return;
                        }
                        console.log(`${name_check} has been removed successfully!`);
                        delete_catalogue("#cat-page");
                        appendCards("#cat-page", generate_catalogue());
                        return;

                    }
                    catch (error) {
                        console.log("Error during deletion:", error.message);
                    }
                }
                else
                {
                    return;
                }
            }
            newCard.appendChild(delButton);

            cardsSectionEl.appendChild(newCard);
        }
        return;
    }
    else
    {
        console.log("empty list");
        return;
    }
};

document.querySelector(".bookform").addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    // console.log(typeof(data), "\n", data);

    const int_price = parseInt(data.price, 10);
    // console.log(typeof(int_price));
    data.price = int_price;
    // console.log(typeof(data.price));

    let newBookTitle = data.title;
    console.log("Title of new book: ", newBookTitle);

    let books_list = await generate_catalogue();
    for (let i=0; i<books_list.length; i++)
        {
            if (newBookTitle == books_list[i].title)
            {
                console.log(`${newBookTitle} already exists in your catalogue`);
                alert(`${newBookTitle} already exists in your catalogue`);
                return;
            }
        }

    const json = JSON.stringify(data);
    // console.log(json);

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        });
        
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }
        
        console.log("Success:", res, "\n");
        alert(`Successfully added ${newBookTitle} to your catalogue!`);
        // console.log(display_books());
        // refreshing the catalogue, otherwise duplicates appear
        delete_catalogue("#cat-page");
        appendCards("#cat-page", generate_catalogue());
        return;
    } 
    catch(error) {
        console.log("Error submitting form: ", error);
    }
});

appendCards("#cat-page", generate_catalogue());

//-------Search Page-------
document.querySelector(".searchform").addEventListener('submit', async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    const searchString = event.target.children[0].value;
    // console.log(typeof(data), "\n", data);
    console.log("Search string is: ",searchString);
    if (searchString==null | searchString=="")
    {
        delete_catalogue("#search-page");
        return;
    }

    try {
        const res = await fetch(url+"/search?query="+searchString);
        const data = await res.json();

        if (!res.ok) {
            console.log(data.description);
            return;
        }
        
        console.log(data);
        // refreshing the catalogue, otherwise duplicates appear
        if (data.result.books.length!=0)
        {
            delete_catalogue("#search-page");
            appendCards("#search-page", data.result.books);
            return;
        }
        alert("Could not find any books with those keywords. Try Again!");
    } 
    catch(error) {
        console.log("Error submitting form: ", error);
    }
});





