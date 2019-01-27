var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

function getQuote() {
    var el =  document.querySelector('.trigger');
    el.setAttribute('disabled', '');
    console.log(el.attributes);
    fetch(quoteUrl, { cache: 'no-cache' })
        .then(function (resp) {
            return resp.json();
        })
        .then(createTweet)
        .then(document.querySelector('.trigger').removeAttribute('disabled'));
}

function createTweet(input) {
    var data = input[0];
    var dataElement = document.createElement('div');
    dataElement.innerHTML = data.content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = data.title;
    if (!quoteAuthor.length) {
        quoteAuthor = 'Uknown author';
    };
    var tweetText = 'Quote of the day: ' + quoteText + ' Author: ' + quoteAuthor;
    if (tweetText.length > 140) {
        getQuote();
    } else {
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    getQuote();
    document.querySelector('.trigger').addEventListener('click', getQuote )
});