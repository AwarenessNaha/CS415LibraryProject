/**
 * appui.js
 * <!-- /*CS415 project Fairfield City Library
* @author Naha The Unborn One
* @since 2021-08-05
*/ 


// alert("js loaded");

window.onload = function() {

    fetch("http://localhost:4000/citylibrary/api/book/list")
  .then((response) => {
      if(response.ok) {    
        return response.json();
      } else {
        return Promise.reject({ status: response.status, statusText: response.statusText });
      }
    })
  .then(books => {
    let content = "";
      books.forEach(function(book, i) {

        content += `
              <tr>
                <th scope="row">${i+1}.</th>
                <td>${book.ISBN}</td>
                <td>${book.BookTitle}</td>
                <td>${new Intl.NumberFormat("en-US",{style:"currency",currency:"USD",minimumFractionDigits:2}).format(book.overdueFee)}</td>
                <td>${book.Publisher}</td>
                <td>${book.DatePublished}</td>
                <!--
                <td><a href="books/editBook.html?bookId=${book._id}">Edit</a></td>
                <td><a data-toggle="modal" data-bookid="${book._id}" data-bookisbn="${book.ISBN}" data-booktitle="${book.BookTitle}" href="#confirmDeleteBookModal">Delete</a></td>
                -->
              </tr>
            `;
      });
      document.querySelector("#tbody").innerHTML = content;
      //document.getElementById("tbodyBooks").innerHTML = content;
  })
  .catch(err => {
    console.log(err);
    console.log("Error message:", err.statusText);
    const errorMsgRow = `<tr><td colspan='6'><p style='color:#ff0000;'>We are sorry. The citylibrary books data service is unavailable. Please try again later</p></td></tr>`;
    document.getElementById("tbody").innerHTML = errorMsgRow;
  });
};